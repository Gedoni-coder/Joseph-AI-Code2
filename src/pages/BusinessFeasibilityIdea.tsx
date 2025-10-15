import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModuleHeader from "@/components/ui/module-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle, MessageSquare, FileText, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateAIResponse } from "@/lib/ai";
import type { ChatMessage } from "@/lib/chatbot-data";
import { STORAGE_KEY, FeasibilityReport, Mode, computeFeasibility } from "@/lib/feasibility";

const chatKey = (id: string) => `joseph_feasibility_chat_${id}`;

export default function BusinessFeasibilityIdea() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<FeasibilityReport | null>(null);
  const [activeTab, setActiveTab] = useState<"chat" | "report">("chat");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  // Load report
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: FeasibilityReport[] = raw ? JSON.parse(raw) : [];
      const r = list.find((x) => x.id === id);
      if (r) setReport(r);
    } catch {}
  }, [id]);

  // Load chat
  useEffect(() => {
    if (!id) return;
    try {
      const raw = localStorage.getItem(chatKey(id));
      if (raw) setMessages(JSON.parse(raw));
    } catch {}
  }, [id]);

  useEffect(() => {
    if (!id) return;
    try {
      localStorage.setItem(chatKey(id), JSON.stringify(messages));
    } catch {}
  }, [id, messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || !report) return;
    const user: ChatMessage = { id: `u_${Date.now()}`, type: "user", content: text, timestamp: new Date(), context: "business-feasibility" };
    setMessages((prev) => [...prev, user]);
    setInput("");
    setIsTyping(true);

    const history = [...messages, user];
    const system = `You are Joseph AI. Business Feasibility conversation for idea: "${report.idea}". Provide clear, bold, practical analysis with metrics and next steps. Prefer concise bullets. Use green/yellow/red language for feasibility and risks.`;
    const ai = await generateAIResponse(history, { system });
    const content = ai || "Sorry, I couldn't reach the AI. Please try again.";
    const assistant: ChatMessage = { id: `a_${Date.now()}`, type: "assistant", content, timestamp: new Date(), context: "business-feasibility" };
    setMessages((prev) => [...prev, assistant]);
    setIsTyping(false);
  };

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <ModuleHeader icon={<CheckCircle className="h-6 w-6" />} title="Business Feasibility Analysis" description="Helps decide if a business idea is viable" showConnectionStatus={false} />
        <main className="container mx-auto px-4 py-8">
          <Button variant="outline" onClick={() => navigate("/business-feasibility")}> <ArrowLeft className="h-4 w-4 mr-2"/> Back</Button>
          <div className="mt-6 text-sm text-muted-foreground">Idea not found.</div>
        </main>
      </div>
    );
  }

  const verdictColor = (v: string) => v === "Feasible" ? "text-green-700" : v === "Borderline" ? "text-yellow-700" : "text-red-700";
  const getImpactIcon = (value: number) => value > 0 ? <ArrowUp className="h-4 w-4 text-green-600" /> : value < 0 ? <ArrowDown className="h-4 w-4 text-red-600" /> : <Minus className="h-4 w-4 text-gray-600" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ModuleHeader
        icon={<CheckCircle className="h-6 w-6" />}
        title="Business Feasibility Analysis"
        description="Helps decide if a business idea is viable"
        showConnectionStatus={false}
      />

      <main className="container mx-auto px-4 py-8 space-y-6">
        <Button variant="outline" onClick={() => navigate("/business-feasibility")}> <ArrowLeft className="h-4 w-4 mr-2"/> Back to Ideas</Button>

        <Card className="bg-gradient-to-r from-yellow-50 via-white to-green-50 border-border/60">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold mb-1">Idea</div>
                <div className="text-base bg-white border border-border/50 rounded p-3 shadow-sm max-w-2xl">{report.idea}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {report.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">#{t}</Badge>
                  ))}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">Created {new Date(report.createdAt).toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="chat"><MessageSquare className="h-4 w-4 mr-1"/>Chat</TabsTrigger>
            <TabsTrigger value="report"><FileText className="h-4 w-4 mr-1"/>Report</TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <Card>
              <CardContent className="p-4">
                <div className="h-[380px] overflow-y-auto space-y-3 pr-1">
                  {messages.map((m) => (
                    <div key={m.id} className={cn("flex", m.type === "user" ? "justify-end" : "justify-start")}> 
                      <div className={cn("max-w-[80%] rounded-xl px-4 py-2 border shadow-sm", m.type === "user" ? "bg-primary text-primary-foreground border-primary/20" : "bg-white border-border/50")}>{m.content}</div>
                    </div>
                  ))}
                  {isTyping && <div className="text-xs text-muted-foreground">Joseph is thinking…</div>}
                  <div ref={endRef} />
                </div>
                <div className="mt-3 flex gap-2">
                  <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about feasibility, risks, ROI timing…" onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} />
                  <Button onClick={sendMessage} disabled={!input.trim() || isTyping}>Send</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="report">
            <Card>
              <CardHeader>
                <CardTitle>Feasibility Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(["Conservative","Safe","Wild"] as Mode[]).map((m) => {
                  const res = report.resultsByMode[m] || computeFeasibility(m, report.derivedInputs);
                  return (
                    <Card key={m} className="border-l-4" style={{ borderLeftColor: m === 'Conservative' ? '#f59e0b' : m === 'Safe' ? '#22c55e' : '#ef4444' }}>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-base font-semibold">{m}</div>
                          <Badge className={cn("text-xs", verdictColor(res.verdict))}>{res.verdict} • {res.score}/100</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Card className="bg-yellow-50 border-yellow-200">
                            <CardContent className="p-3">
                              <div className="text-xs text-yellow-700">Risk</div>
                              <div className="flex items-center gap-2 text-sm font-medium">-{res.details.riskPenalty} pts {getImpactIcon(-res.details.riskPenalty)}</div>
                            </CardContent>
                          </Card>
                          <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-3">
                              <div className="text-xs text-blue-700">Time Value</div>
                              <div className="text-sm font-medium">PV {res.pvFactor.toFixed(3)}</div>
                            </CardContent>
                          </Card>
                          <Card className="bg-green-50 border-green-200">
                            <CardContent className="p-3">
                              <div className="text-xs text-green-700">ROI Time</div>
                              <div className="text-sm font-medium">{report.derivedInputs.roiTime} months</div>
                            </CardContent>
                          </Card>
                          <Card className="bg-purple-50 border-purple-200">
                            <CardContent className="p-3">
                              <div className="text-xs text-purple-700">Length Time Factor</div>
                              <div className="text-sm font-medium">{report.derivedInputs.lengthTimeFactor} months</div>
                            </CardContent>
                          </Card>
                          <Card className="bg-red-50 border-red-200">
                            <CardContent className="p-3">
                              <div className="text-xs text-red-700">Interest Rate</div>
                              <div className="text-sm font-medium">{report.derivedInputs.interestRate}%</div>
                            </CardContent>
                          </Card>
                          <Card className="bg-gray-50 border-gray-200">
                            <CardContent className="p-3">
                              <div className="text-xs text-gray-700">Final Result</div>
                              <div className="text-sm font-medium">{res.verdict} ({res.score}/100)</div>
                            </CardContent>
                          </Card>
                        </div>
                        {res.narrative && (
                          <div className="text-sm bg-white border border-border/50 rounded p-3 whitespace-pre-wrap">{res.narrative}</div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
