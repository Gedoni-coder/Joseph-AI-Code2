import React, { useEffect, useMemo, useState } from "react";
import ModuleHeader from "@/components/ui/module-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Gauge, CalendarClock, Tag, FileText, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateAIResponse } from "@/lib/ai";
import type { ChatMessage } from "@/lib/chatbot-data";

// Modes
type Mode = "Conservative" | "Safe" | "Wild";

// Inputs used to compute feasibility
interface Inputs {
  risk: number; // 0-100
  timeValue: number; // % (discount rate)
  roiTime: number; // months
  lengthTimeFactor: number; // months
  interestRate: number; // %
}

// Per-mode computed result
interface ModeResult {
  score: number; // 0-100
  verdict: "Feasible" | "Borderline" | "Not Feasible";
  colorClass: string;
  pvFactor: number;
  combinedRate: number; // %
  details: {
    riskPenalty: number;
    timelinePenalty: number;
    ratePenalty: number;
    thresholds: { feasible: number; borderline: number };
  };
  narrative?: string;
}

// Full report for an idea
interface FeasibilityReport {
  id: string;
  idea: string;
  createdAt: string;
  tags: string[];
  derivedInputs: Inputs;
  resultsByMode: Record<Mode, ModeResult>;
}

const STORAGE_KEY = "joseph_feasibility_ideas_v1";

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function computeFeasibility(mode: Mode, inputs: Inputs): ModeResult {
  const { risk, timeValue, roiTime, lengthTimeFactor, interestRate } = inputs;
  const combinedRate = (timeValue + interestRate) / 100;
  const years = Math.max(roiTime, 0) / 12;
  const pvFactor = 1 / Math.pow(1 + combinedRate, years || 0);

  const thresholds = (
    {
      Conservative: { risk: 1.0, time: 0.8, rate: 0.8, feasible: 60, borderline: 45 },
      Safe: { risk: 0.7, time: 0.5, rate: 0.6, feasible: 50, borderline: 40 },
      Wild: { risk: 0.4, time: 0.3, rate: 0.4, feasible: 40, borderline: 30 },
    } as const
  )[mode];

  const baseScore = 100 * pvFactor;
  const riskPenalty = risk * thresholds.risk;
  const timelinePenalty = Math.max(0, roiTime - lengthTimeFactor) * thresholds.time;
  const ratePenalty = (combinedRate * 100) * thresholds.rate;
  const rawScore = baseScore - riskPenalty - timelinePenalty - ratePenalty;
  const score = clamp(Number.isFinite(rawScore) ? rawScore : 0);

  let verdict: ModeResult["verdict"] = "Not Feasible";
  if (score >= thresholds.feasible) verdict = "Feasible";
  else if (score >= thresholds.borderline) verdict = "Borderline";

  const colorClass =
    verdict === "Feasible"
      ? "text-green-700 bg-green-100 border-green-200"
      : verdict === "Borderline"
      ? "text-yellow-700 bg-yellow-100 border-yellow-200"
      : "text-red-700 bg-red-100 border-red-200";

  return {
    score: Math.round(score),
    verdict,
    colorClass,
    pvFactor,
    combinedRate: Math.round(combinedRate * 10000) / 100,
    details: {
      riskPenalty: Math.round(riskPenalty),
      timelinePenalty: Math.round(timelinePenalty),
      ratePenalty: Math.round(ratePenalty),
      thresholds: { feasible: thresholds.feasible, borderline: thresholds.borderline },
    },
  };
}

function extractKeywords(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !["with", "that", "this", "from", "your", "have", "will", "they", "them", "into", "about", "idea", "market", "users", "their", "more", "less"].includes(w));
  const counts: Record<string, number> = {};
  for (const w of words) counts[w] = (counts[w] || 0) + 1;
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([w]) => w);
}

function deriveInputsFromIdea(text: string): Inputs {
  const lower = text.toLowerCase();
  const pct = /([0-9]{1,2}(?:\.[0-9]+)?)%/;
  const months = /([0-9]{1,3})\s*(?:months|month|mo)/;
  const rateMatch = lower.match(pct);
  const monthsMatch = lower.match(months);

  let interestRate = rateMatch ? clamp(parseFloat(rateMatch[1]), 0, 100) : 6.5;
  let timeValue = interestRate > 0 ? Math.max(3, Math.min(interestRate, 12)) : 5;
  let roiTime = monthsMatch ? clamp(parseInt(monthsMatch[1], 10), 0, 600) : 18;

  let risk = 35;
  if (/(high\s*risk|uncertain|unproven|new\s*market)/.test(lower)) risk = 60;
  if (/(regulated|enterprise|long\s*cycle)/.test(lower)) risk = Math.max(risk, 50);
  if (/(recurring|existing\s*customers|loyal)/.test(lower)) risk = 25;

  let lengthTimeFactor = 12;
  if (/(infrastructure|hardware|manufacturing)/.test(lower)) lengthTimeFactor = 24;
  if (/(software|saas|app)/.test(lower)) lengthTimeFactor = 12;

  return { risk, timeValue, roiTime, lengthTimeFactor, interestRate };
}

async function buildNarrative(idea: string, mode: Mode, res: ModeResult): Promise<string | undefined> {
  const history: ChatMessage[] = [
    { id: "u1", type: "user", content: idea, timestamp: new Date(), context: "business-feasibility" },
  ];
  const system = `You are Joseph AI. Create a concise business feasibility narrative for the ${mode} mode.
Include: Risk, Time Value (NPV intuition), ROI Time, Length Time Factor, Interest Rate, and an overall verdict (${res.verdict}) with score ${res.score}/100. Avoid fluff.`;
  try {
    const text = await generateAIResponse(history, { system });
    return text || undefined;
  } catch {
    return undefined;
  }
}

export default function BusinessFeasibility() {
  const [ideaInput, setIdeaInput] = useState("");
  const [reports, setReports] = useState<FeasibilityReport[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedReport = useMemo(() => reports.find((r) => r.id === selectedId) || null, [reports, selectedId]);

  // Load/save from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setReports(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    } catch {}
  }, [reports]);

  const analyzeIdea = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = ideaInput.trim();
    if (!text) return;

    const derivedInputs = deriveInputsFromIdea(text);
    const modes: Mode[] = ["Conservative", "Safe", "Wild"];
    const resultsByMode: Record<Mode, ModeResult> = {
      Conservative: computeFeasibility("Conservative", derivedInputs),
      Safe: computeFeasibility("Safe", derivedInputs),
      Wild: computeFeasibility("Wild", derivedInputs),
    };

    // Optional AI narratives (non-blocking)
    for (const m of modes) {
      buildNarrative(text, m, resultsByMode[m]).then((n) => {
        if (!n) return;
        setReports((prev) =>
          prev.map((r) =>
            r.id === id
              ? { ...r, resultsByMode: { ...r.resultsByMode, [m]: { ...r.resultsByMode[m], narrative: n } } }
              : r,
          ),
        );
      });
    }

    const id = `idea_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const report: FeasibilityReport = {
      id,
      idea: text,
      createdAt: new Date().toISOString(),
      tags: extractKeywords(text),
      derivedInputs,
      resultsByMode,
    };

    setReports((prev) => [report, ...prev]);
    setSelectedId(id);
    setIdeaInput("");
  };

  const deleteReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ModuleHeader
        icon={<CheckCircle className="h-6 w-6" />}
        title="Business Feasibility Analysis"
        description="Helps decide if a business idea is viable"
        showConnectionStatus={false}
      />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Conversational Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Got an Idea?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={analyzeIdea} className="flex gap-2">
              <Input
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
                placeholder="Got an Idea?"
              />
              <Button type="submit">Analyze</Button>
            </form>
            <div className="text-xs text-muted-foreground mt-2">
              Tip: include rough timelines (e.g., “18 months”) or rates (e.g., “8%”) to refine the analysis.
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Past Ideas */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Past Ideas</h3>
              <Badge variant="secondary">{reports.length}</Badge>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {reports.map((r) => (
                <Card
                  key={r.id}
                  className={cn("cursor-pointer transition-all", selectedId === r.id ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md")}
                  onClick={() => setSelectedId(r.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded bg-blue-100 text-blue-700">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium line-clamp-2">{r.idea}</div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                          <CalendarClock className="h-3 w-3" />
                          {new Date(r.createdAt).toLocaleString()}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {r.tags.map((t) => (
                            <Badge key={t} variant="outline" className="text-2xs flex items-center gap-1">
                              <Tag className="h-3 w-3" /> {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={(e) => { e.stopPropagation(); deleteReport(r.id); }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {reports.length === 0 && (
                <div className="text-xs text-muted-foreground">No ideas analyzed yet. Enter an idea above to get started.</div>
              )}
            </div>
          </div>

          {/* Right: Report Detail */}
          <div className="lg:col-span-2">
            {selectedReport ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Feasibility Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm font-semibold mb-1">Idea</div>
                      <div className="text-sm bg-muted/30 border border-border/50 rounded p-3">{selectedReport.idea}</div>
                    </div>

                    <Tabs defaultValue="Conservative">
                      <TabsList className="flex flex-wrap">
                        <TabsTrigger value="Conservative">Conservative</TabsTrigger>
                        <TabsTrigger value="Safe">Safe</TabsTrigger>
                        <TabsTrigger value="Wild">Wild</TabsTrigger>
                      </TabsList>

                      {(["Conservative", "Safe", "Wild"] as Mode[]).map((m) => {
                        const res = selectedReport.resultsByMode[m];
                        return (
                          <TabsContent key={m} value={m}>
                            <div className="space-y-4">
                              <div className={cn("p-4 border rounded-lg", res.colorClass)}>
                                <div className="flex items-center justify-between">
                                  <div className="text-lg font-semibold">{res.verdict}</div>
                                  <div className="text-sm">Score: <span className="font-semibold">{res.score}/100</span></div>
                                </div>
                                <div className="text-xs mt-1 text-muted-foreground">PV factor: {res.pvFactor.toFixed(3)} | Combined rate: {res.combinedRate}%</div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <Card className="bg-muted/30">
                                  <CardContent className="p-4">
                                    <div className="text-xs text-muted-foreground mb-1">Risk</div>
                                    <div className="text-sm font-medium">-{res.details.riskPenalty} pts</div>
                                  </CardContent>
                                </Card>
                                <Card className="bg-muted/30">
                                  <CardContent className="p-4">
                                    <div className="text-xs text-muted-foreground mb-1">Time Value</div>
                                    <div className="text-sm font-medium">PV {res.pvFactor.toFixed(3)}</div>
                                  </CardContent>
                                </Card>
                                <Card className="bg-muted/30">
                                  <CardContent className="p-4">
                                    <div className="text-xs text-muted-foreground mb-1">ROI Time</div>
                                    <div className="text-sm font-medium">{selectedReport.derivedInputs.roiTime} months</div>
                                  </CardContent>
                                </Card>
                                <Card className="bg-muted/30">
                                  <CardContent className="p-4">
                                    <div className="text-xs text-muted-foreground mb-1">Length Time Factor</div>
                                    <div className="text-sm font-medium">{selectedReport.derivedInputs.lengthTimeFactor} months</div>
                                  </CardContent>
                                </Card>
                                <Card className="bg-muted/30">
                                  <CardContent className="p-4">
                                    <div className="text-xs text-muted-foreground mb-1">Interest Rate</div>
                                    <div className="text-sm font-medium">{selectedReport.derivedInputs.interestRate}%</div>
                                  </CardContent>
                                </Card>
                                <Card className="bg-muted/30">
                                  <CardContent className="p-4">
                                    <div className="text-xs text-muted-foreground mb-1">Final Result</div>
                                    <div className="text-sm font-medium">{res.verdict} ({res.score}/100)</div>
                                  </CardContent>
                                </Card>
                              </div>

                              {res.narrative && (
                                <div className="text-sm bg-white border border-border/50 rounded p-3 whitespace-pre-wrap">
                                  {res.narrative}
                                </div>
                              )}

                              <div className="text-xs text-muted-foreground">
                                Thresholds ({m}): Feasible ≥ {res.details.thresholds.feasible}, Borderline ≥ {res.details.thresholds.borderline}
                              </div>
                            </div>
                          </TabsContent>
                        );
                      })}
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="h-5 w-5" />
                    No Idea Selected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Analyze an idea above or select a past idea to view its feasibility report.
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
