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
import { SummarySection } from "../components/module/summary-section";
import { RecommendationSection } from "../components/module/recommendation-section";
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
              <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 relative"
                      >
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">Notifications</span>
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
                            <p className="text-sm font-medium">Budget Alert</p>
                            <p className="text-xs text-muted-foreground">Q2 budget variance exceeds threshold</p>
                            <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg border bg-card">
                        <div className="flex items-start gap-3">
                          <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Cash Flow Update</p>
                            <p className="text-xs text-muted-foreground">Monthly projections updated successfully</p>
                            <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
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
                            <p className="text-sm font-medium">Budget Optimization</p>
                            <p className="text-xs text-muted-foreground">Reallocate 8% from marketing to R&D for better ROI</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg border bg-card">
                        <div className="flex items-start gap-3">
                          <Target className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Cash Flow Strategy</p>
                            <p className="text-xs text-muted-foreground">Consider negotiating 45-day payment terms with suppliers</p>
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
              value="summary"
              className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Summary</span>
              <span className="sm:hidden">Summary</span>
            </TabsTrigger>

            <TabsTrigger
              value="recommendations"
              className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Recommendations</span>
              <span className="sm:hidden">Rec.</span>
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
