import React, { useMemo, useState } from "react";
import ModuleHeader from "@/components/ui/module-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Gauge, ShieldAlert, Calculator, Clock, Percent, TrendingUp } from "lucide-react";

type Mode = "Conservative" | "Safe" | "Wild";

interface Inputs {
  risk: number; // 0-100
  timeValue: number; // %
  roiTime: number; // months
  lengthTimeFactor: number; // months
  interestRate: number; // %
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function computeFeasibility(mode: Mode, inputs: Inputs) {
  const { risk, timeValue, roiTime, lengthTimeFactor, interestRate } = inputs;
  const combinedRate = (timeValue + interestRate) / 100; // annualized
  const years = Math.max(roiTime, 0) / 12;
  const pvFactor = 1 / Math.pow(1 + combinedRate, years || 0);

  const weights = {
    Conservative: { risk: 1.0, time: 0.8, rate: 0.8, feasible: 60, borderline: 45 },
    Safe: { risk: 0.7, time: 0.5, rate: 0.6, feasible: 50, borderline: 40 },
    Wild: { risk: 0.4, time: 0.3, rate: 0.4, feasible: 40, borderline: 30 },
  }[mode];

  const baseScore = 100 * pvFactor;
  const riskPenalty = risk * weights.risk;
  const timelinePenalty = Math.max(0, roiTime - lengthTimeFactor) * weights.time;
  const ratePenalty = (combinedRate * 100) * weights.rate;
  const rawScore = baseScore - riskPenalty - timelinePenalty - ratePenalty;
  const score = clamp(Number.isFinite(rawScore) ? rawScore : 0);

  let verdict: "Feasible" | "Borderline" | "Not Feasible" = "Not Feasible";
  if (score >= weights.feasible) verdict = "Feasible";
  else if (score >= weights.borderline) verdict = "Borderline";

  const color = verdict === "Feasible" ? "text-green-700 bg-green-100 border-green-200" : verdict === "Borderline" ? "text-yellow-700 bg-yellow-100 border-yellow-200" : "text-red-700 bg-red-100 border-red-200";

  return {
    score: Math.round(score),
    verdict,
    color,
    pvFactor,
    combinedRate: Math.round(combinedRate * 10000) / 100, // %
    details: {
      riskPenalty: Math.round(riskPenalty),
      timelinePenalty: Math.round(timelinePenalty),
      ratePenalty: Math.round(ratePenalty),
      thresholds: weights,
    },
  };
}

const NumberInput = ({ label, value, onChange, suffix = "", min = 0, max = 1000, step = 1 }: { label: string; value: number; onChange: (n: number) => void; suffix?: string; min?: number; max?: number; step?: number; }) => (
  <div>
    <label className="text-sm font-medium mb-2 block">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 border rounded-md"
      />
      {suffix && <span className="text-sm text-muted-foreground whitespace-nowrap">{suffix}</span>}
    </div>
  </div>
);

export default function BusinessFeasibility() {
  const [mode, setMode] = useState<Mode>("Conservative");
  const [inputs, setInputs] = useState<Inputs>({
    risk: 35,
    timeValue: 5,
    roiTime: 18,
    lengthTimeFactor: 12,
    interestRate: 6.5,
  });

  const result = useMemo(() => computeFeasibility(mode, inputs), [mode, inputs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ModuleHeader
        icon={<CheckCircle className="h-6 w-6" />}
        title="Business Feasibility Analysis"
        description="Helps decide if a business idea is viable"
        showConnectionStatus={false}
      />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Modes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Conservative", "Safe", "Wild"].map((m) => (
                <Button
                  key={m}
                  variant={mode === m ? "default" : "outline"}
                  onClick={() => setMode(m as Mode)}
                  className={mode === m ? "" : "bg-white"}
                >
                  {m}
                </Button>
              ))}
              <Badge variant="secondary" className="ml-auto">Current: {mode}</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Inputs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <NumberInput label="Risk" value={inputs.risk} onChange={(n) => setInputs((s) => ({ ...s, risk: clamp(n, 0, 100) }))} suffix="%" min={0} max={100} />
                <NumberInput label="Time Value (Discount Rate)" value={inputs.timeValue} onChange={(n) => setInputs((s) => ({ ...s, timeValue: clamp(n, 0, 100) }))} suffix="%" min={0} max={100} step={0.1} />
                <NumberInput label="ROI Time" value={inputs.roiTime} onChange={(n) => setInputs((s) => ({ ...s, roiTime: clamp(n, 0, 600) }))} suffix="months" min={0} max={600} />
                <NumberInput label="Length Time Factor" value={inputs.lengthTimeFactor} onChange={(n) => setInputs((s) => ({ ...s, lengthTimeFactor: clamp(n, 0, 600) }))} suffix="months" min={0} max={600} />
                <NumberInput label="Interest Rate" value={inputs.interestRate} onChange={(n) => setInputs((s) => ({ ...s, interestRate: clamp(n, 0, 100) }))} suffix="%" min={0} max={100} step={0.1} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Final Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`p-4 border rounded-lg ${result.color}`}>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">{result.verdict}</div>
                    <div className="text-sm">Score: <span className="font-semibold">{result.score}/100</span></div>
                  </div>
                  <div className="text-xs mt-1 text-muted-foreground">PV factor: {result.pvFactor.toFixed(3)} | Combined rate: {result.combinedRate}%</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground mb-1">Risk Impact</div>
                      <div className="text-sm font-medium">-{result.details.riskPenalty} pts</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground mb-1">Timeline Impact</div>
                      <div className="text-sm font-medium">-{result.details.timelinePenalty} pts</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="text-xs text-muted-foreground mb-1">Rate Impact</div>
                      <div className="text-sm font-medium">-{result.details.ratePenalty} pts</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-xs text-muted-foreground">
                  Thresholds ({mode}): Feasible ≥ {result.details.thresholds.feasible}, Borderline ≥ {result.details.thresholds.borderline}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Subsections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="risk">
              <TabsList className="flex flex-wrap">
                <TabsTrigger value="risk">Risk</TabsTrigger>
                <TabsTrigger value="time-value">Time Value</TabsTrigger>
                <TabsTrigger value="roi-time">ROI Time</TabsTrigger>
                <TabsTrigger value="length-time">Length Time Factor</TabsTrigger>
                <TabsTrigger value="interest">Interest Rate</TabsTrigger>
                <TabsTrigger value="final">Final Result</TabsTrigger>
              </TabsList>
              <TabsContent value="risk">
                <p className="text-sm text-muted-foreground">Risk represents uncertainty and potential downsides. Higher risk reduces feasibility, with stronger impact in Conservative mode.</p>
              </TabsContent>
              <TabsContent value="time-value">
                <p className="text-sm text-muted-foreground">Time value (discount rate) reduces the present value of future returns. Combine with interest rate to assess real cost of capital.</p>
              </TabsContent>
              <TabsContent value="roi-time">
                <p className="text-sm text-muted-foreground">ROI Time is how long until breakeven. Shorter ROI times improve feasibility; long ROI times increase uncertainty and cost.</p>
              </TabsContent>
              <TabsContent value="length-time">
                <p className="text-sm text-muted-foreground">Length Time Factor is your acceptable project horizon. If ROI time exceeds this, feasibility drops, especially in Conservative mode.</p>
              </TabsContent>
              <TabsContent value="interest">
                <p className="text-sm text-muted-foreground">Interest rate reflects borrowing or opportunity cost. Higher rates raise the hurdle and reduce feasibility.</p>
              </TabsContent>
              <TabsContent value="final">
                <p className="text-sm text-muted-foreground">The final verdict blends risk, time value, ROI timing, project length, and interest rate under the selected mode.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
