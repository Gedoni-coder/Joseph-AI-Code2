import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFinancialAdvisoryData } from "../hooks/useFinancialAdvisoryData";
import ModuleNavigation from "../components/ui/module-navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { ConnectionStatus } from "../components/ui/connection-status";
import { StrategicBudgeting } from "../components/financial/strategic-budgeting";
import { CashFlowPlanning } from "../components/financial/cash-flow-planning";
import { BudgetValidation } from "../components/financial/budget-validation";
import { ScenarioTesting } from "../components/financial/scenario-testing";
import { RiskAssessmentComponent } from "../components/financial/risk-assessment";
import { PerformanceDrivers } from "../components/financial/performance-drivers";
import { AdvisoryInsights } from "../components/financial/advisory-insights";
import { SummaryRecommendationSection } from "../components/module/summary-recommendation-section";
import {
  Loader2,
  Calculator,
  TrendingUp,
  Target,
  AlertTriangle,
  Shield,
  BarChart3,
  Lightbulb,
  Bell,
  X,
  Activity,
} from "lucide-react";

export default function FinancialAdvisory() {
  const {
    budgetForecasts,
    cashFlowProjections,
    scenarioTests,
    riskAssessments,
    performanceDrivers,
    advisoryInsights,
    budgetAssumptions,
    liquidityMetrics,
    isLoading,
    error,
    lastUpdated,
    createBudgetForecast,
    updateBudgetAssumption,
    runScenarioTest,
    updateRiskStatus,
    updateInsightStatus,
    addCashFlowProjection,
  } = useFinancialAdvisoryData();

  const [activeTab, setActiveTab] = useState("strategic-budgeting");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [ideasOpen, setIdeasOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-lg font-medium text-gray-700">
            Loading Financial Advisory Data...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white/60 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl text-white">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                      Financial Advisory & Planning
                    </h1>
                    <p className="text-sm text-gray-600">
                      Strategic budgeting, cash flow management, and advisory
                      insights
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ModuleNavigation />
                <ConnectionStatus lastUpdated={lastUpdated} />

                {/* Notifications Tab */}
                <Popover
                  open={notificationsOpen}
                  onOpenChange={setNotificationsOpen}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 relative"
                        >
                          <Bell className="h-4 w-4" />
                          <span className="hidden sm:inline">
                            Notifications
                          </span>
                          <Badge
                            variant="destructive"
                            className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs min-w-5 h-5 flex items-center justify-center rounded-full"
                          >
                            2
                          </Badge>
                        </Button>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View notifications and alerts</p>
                    </TooltipContent>
                  </Tooltip>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Notifications</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNotificationsOpen(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg border bg-card">
                          <div className="flex items-start gap-3">
                            <Calculator className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">
                                Budget Alert
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Q2 budget variance exceeds threshold
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                15 minutes ago
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg border bg-card">
                          <div className="flex items-start gap-3">
                            <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">
                                Cash Flow Update
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Monthly projections updated successfully
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                1 hour ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link to="/notifications">
                        <Button variant="outline" className="w-full" size="sm">
                          View All Notifications
                        </Button>
                      </Link>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Ideas Tab */}
                <Popover open={ideasOpen} onOpenChange={setIdeasOpen}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Lightbulb className="h-4 w-4" />
                          <span className="hidden sm:inline">Ideas</span>
                        </Button>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>AI-powered financial insights</p>
                    </TooltipContent>
                  </Tooltip>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Financial Ideas</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIdeasOpen(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg border bg-card">
                          <div className="flex items-start gap-3">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">
                                Budget Optimization
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Reallocate 8% from marketing to R&D for better
                                ROI
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg border bg-card">
                          <div className="flex items-start gap-3">
                            <Target className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">
                                Cash Flow Strategy
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Consider negotiating 45-day payment terms with
                                suppliers
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link to="/ai-insights">
                        <Button variant="outline" className="w-full" size="sm">
                          Generate More Ideas
                        </Button>
                      </Link>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-9 bg-white shadow-sm">
              <TabsTrigger
                value="strategic-budgeting"
                className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Strategic Budgeting</span>
                <span className="sm:hidden">Budgeting</span>
              </TabsTrigger>

              <TabsTrigger
                value="summary-recommendation"
                className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Summary & Recommendation</span>
                <span className="sm:hidden">Summary</span>
              </TabsTrigger>

              <TabsTrigger
                value="cash-flow"
                className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Cash Flow</span>
                <span className="sm:hidden">Cash</span>
              </TabsTrigger>

              <TabsTrigger
                value="budget-validation"
                className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Validation</span>
                <span className="sm:hidden">Validation</span>
              </TabsTrigger>

              <TabsTrigger
                value="scenario-testing"
                className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Scenarios</span>
                <span className="sm:hidden">Scenarios</span>
              </TabsTrigger>

              <TabsTrigger
                value="risk-assessment"
                className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Risk</span>
                <span className="sm:hidden">Risk</span>
              </TabsTrigger>

              <TabsTrigger
                value="performance-drivers"
                className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Performance</span>
                <span className="sm:hidden">KPIs</span>
              </TabsTrigger>

              <TabsTrigger
                value="advisory-insights"
                className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                <Lightbulb className="w-4 h-4" />
                <span className="hidden sm:inline">Insights</span>
                <span className="sm:hidden">Insights</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="strategic-budgeting" className="space-y-6">
              <StrategicBudgeting
                budgetForecasts={budgetForecasts}
                budgetAssumptions={budgetAssumptions}
                onCreateForecast={createBudgetForecast}
                onUpdateAssumption={updateBudgetAssumption}
              />
            </TabsContent>

            <TabsContent value="summary-recommendation" className="space-y-8">
              <SummaryRecommendationSection
                summaryTitle="Financial Advisory Summary"
                summaryDescription="Executive summary of financial position and key metrics"
                summaryText={`1. FINANCIAL POSITION OVERVIEW
The organization maintains a strong financial position with healthy liquidity and profitability metrics. Cash flow projections show positive trends with adequate reserves to support operational needs and strategic investments.

2. BUDGET PERFORMANCE
Current budget execution shows ${budgetForecasts.length} active forecasts tracking within acceptable variance ranges. Actual spending aligns with planning assumptions, indicating strong cost controls and forecast accuracy.

3. CASH FLOW MANAGEMENT
Monthly cash flow projections indicate stable operational liquidity with ${liquidityMetrics.length} key metrics within target parameters. Working capital management is efficient with appropriate levels of inventory and receivables.

4. FINANCIAL RISKS
${riskAssessments.length} financial risks have been identified and are being actively monitored. Mitigation strategies are in place for material risks. Scenario analysis shows resilience across multiple stress test scenarios.

5. STRATEGIC FINANCIAL INITIATIVES
Performance drivers analysis indicates key areas for financial optimization. Recommended initiatives focus on improving profitability, optimizing capital deployment, and enhancing shareholder value.`}
                summaryMetrics={[
                  {
                    index: 1,
                    title: "Budget Forecasts",
                    value: budgetForecasts.length,
                    insight: "Active financial forecasts being tracked",
                  },
                  {
                    index: 2,
                    title: "Cash Flow Projections",
                    value: cashFlowProjections.length,
                    insight: "Monthly cash flow forecasts available",
                  },
                  {
                    index: 3,
                    title: "Scenario Tests",
                    value: scenarioTests.length,
                    insight: "Financial scenario models for planning",
                  },
                  {
                    index: 4,
                    title: "Risk Assessments",
                    value: riskAssessments.length,
                    insight: "Financial risks under active review",
                  },
                ]}
                recommendationTitle="Financial Advisory Recommendations"
                recommendationDescription="Strategic recommendations for financial optimization and risk management"
                recommendationText={`1. BUDGET OPTIMIZATION
Implement zero-based budgeting approach for discretionary spending categories. Establish monthly variance analysis with accountability for budget managers. Consider rolling forecasts to improve planning accuracy and flexibility.

2. CASH FLOW MANAGEMENT
Implement daily cash position monitoring and forecasting. Optimize working capital through improved payables management and receivables collection. Establish cash reserve policy to ensure adequate liquidity buffers.

3. FINANCIAL PLANNING
Develop integrated financial plan linking operational and strategic objectives. Implement quarterly business reviews to track progress and adjust plans. Build scenario planning capability for strategic decision-making.

4. RISK MANAGEMENT
Implement enhanced financial risk monitoring and reporting. Develop mitigation strategies for material financial risks. Establish governance process for financial risk decisions.

5. PERFORMANCE MANAGEMENT
Implement comprehensive KPI dashboard for financial performance tracking. Establish targets and accountability for key financial drivers. Conduct regular variance analysis with root cause assessment.`}
                actionItems={[
                  {
                    index: 1,
                    title: "Enhanced Budget Forecasting",
                    description:
                      "Implement advanced budgeting system with rolling forecasts and monthly variance tracking",
                    priority: "high",
                    timeline: "Q1 2025",
                  },
                  {
                    index: 2,
                    title: "Cash Flow Optimization Program",
                    description:
                      "Launch comprehensive working capital optimization initiative to improve cash conversion and liquidity",
                    priority: "high",
                    timeline: "Q1 2025",
                  },
                  {
                    index: 3,
                    title: "Financial Risk Framework",
                    description:
                      "Develop and implement financial risk management framework with regular monitoring and reporting",
                    priority: "medium",
                    timeline: "Q2 2025",
                  },
                  {
                    index: 4,
                    title: "Performance Dashboard Implementation",
                    description:
                      "Build comprehensive financial performance dashboard with real-time KPI tracking and alerts",
                    priority: "medium",
                    timeline: "Q2 2025",
                  },
                  {
                    index: 5,
                    title: "Strategic Planning Process",
                    description:
                      "Establish integrated strategic planning process linking financial and operational objectives",
                    priority: "low",
                    timeline: "Q2-Q3 2025",
                  },
                ]}
                nextSteps={[
                  {
                    index: 1,
                    step: "Review and validate all budget assumptions and forecasts",
                    owner: "Finance Team",
                    dueDate: "End of Week 1",
                  },
                  {
                    index: 2,
                    step: "Conduct financial risk assessment and prioritize risks",
                    owner: "Risk Management Team",
                    dueDate: "End of Week 2",
                  },
                  {
                    index: 3,
                    step: "Develop financial recommendations for executive review",
                    owner: "CFO",
                    dueDate: "Mid-Month",
                  },
                  {
                    index: 4,
                    step: "Establish monthly financial review cadence",
                    owner: "Controller",
                    dueDate: "Ongoing",
                  },
                ]}
              />
            </TabsContent>


            <TabsContent value="cash-flow" className="space-y-6">
              <CashFlowPlanning
                cashFlowProjections={cashFlowProjections}
                liquidityMetrics={liquidityMetrics}
                onAddProjection={addCashFlowProjection}
              />
            </TabsContent>

            <TabsContent value="budget-validation" className="space-y-6">
              <BudgetValidation budgetForecasts={budgetForecasts} />
            </TabsContent>

            <TabsContent value="scenario-testing" className="space-y-6">
              <ScenarioTesting
                scenarioTests={scenarioTests}
                onRunScenario={runScenarioTest}
              />
            </TabsContent>

            <TabsContent value="risk-assessment" className="space-y-6">
              <RiskAssessmentComponent
                riskAssessments={riskAssessments}
                onUpdateRiskStatus={updateRiskStatus}
              />
            </TabsContent>

            <TabsContent value="performance-drivers" className="space-y-6">
              <PerformanceDrivers performanceDrivers={performanceDrivers} />
            </TabsContent>

            <TabsContent value="advisory-insights" className="space-y-6">
              <AdvisoryInsights
                advisoryInsights={advisoryInsights}
                onUpdateInsightStatus={updateInsightStatus}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </TooltipProvider>
  );
}
