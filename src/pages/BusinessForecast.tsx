import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingOverlay } from "@/components/ui/loading-spinner";
import ModuleHeader from "@/components/ui/module-header";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useBusinessData } from "@/hooks/useBusinessData";
import { CustomerProfileComponent } from "@/components/business/customer-profile";
import { RevenueProjections } from "@/components/business/revenue-projections";
import { KPIDashboard } from "@/components/business/kpi-dashboard";
import { ScenarioPlanningComponent } from "@/components/business/scenario-planning";
import { BusinessMetricsTable } from "@/components/business/business-metrics-table";
import { FinancialLayout } from "@/components/business/financial-layout";
import { DocumentsSection } from "@/components/business/documents-section";
import {
  costStructure as mockCosts,
  cashFlowForecast as mockCashFlow,
} from "@/lib/business-forecast-data";
import {
  Building2,
  RefreshCw,
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  PieChart,
  BarChart3,
  AlertTriangle,
  Activity,
  Briefcase,
  Wifi,
  Bell,
  X,
  Lightbulb,
} from "lucide-react";

const BusinessForecast = () => {
  const {
    customerProfiles,
    revenueProjections,
    kpis,
    scenarios,
    lastUpdated,
    isLoading,
    error,
    isConnected,
    refreshData,
    updateKPI,
    updateScenario,
    reconnect,
  } = useBusinessData();

  const handleRefresh = async () => {
    await refreshData();
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <ModuleHeader
          icon={<TrendingUp className="h-6 w-6" />}
          title="Business Forecasting"
          description="Advanced predictive analytics for revenue projections and comprehensive business planning"
          isConnected={isConnected}
          lastUpdated={lastUpdated}
          onReconnect={reconnect}
          error={error}
          connectionLabel="Live"
        />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-economic-positive/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-economic-positive" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Annual Revenue Target
                  </div>
                  <div className="text-lg font-bold">$13.7M</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Customer Segments
                  </div>
                  <div className="text-lg font-bold">
                    {customerProfiles.length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-economic-warning/10 rounded-lg">
                  <Target className="h-5 w-5 text-economic-warning" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    KPIs Tracked
                  </div>
                  <div className="text-lg font-bold">{kpis.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-economic-neutral/10 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-economic-neutral" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Scenarios Modeled
                  </div>
                  <div className="text-lg font-bold">{scenarios.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TabsList className="grid grid-cols-7 w-full sm:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tables">Tables</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="costs">Costs</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Badge
                variant={isConnected ? "default" : "destructive"}
                className="flex items-center gap-1"
              >
                {isConnected ? (
                  <Wifi className="h-3 w-3" />
                ) : (
                  <Activity className="h-3 w-3" />
                )}
                {isConnected ? "Live Data" : "Offline Mode"}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Forecast Active
              </Badge>
              {error && (
                <Badge
                  variant="destructive"
                  className="flex items-center gap-1"
                >
                  <AlertTriangle className="h-3 w-3" />
                  Data Sync Issue
                </Badge>
              )}
            </div>
          </div>

          <TabsContent value="overview" className="space-y-8">
            {/* Customer Profiles */}
            <section>
              <LoadingOverlay
                isLoading={isLoading}
                loadingText="Updating customer data..."
              >
                <CustomerProfileComponent profiles={customerProfiles} />
              </LoadingOverlay>
            </section>

            {/* Revenue Projections */}
            <section>
              <LoadingOverlay
                isLoading={isLoading}
                loadingText="Calculating revenue projections..."
              >
                <RevenueProjections projections={revenueProjections} />
              </LoadingOverlay>
            </section>

            {/* Key Performance Indicators */}
            <section>
              <LoadingOverlay
                isLoading={isLoading}
                loadingText="Refreshing KPIs..."
              >
                <KPIDashboard
                  kpis={kpis.slice(0, 6)}
                  title="Key Performance Indicators"
                />
              </LoadingOverlay>
            </section>
          </TabsContent>

          <TabsContent value="tables" className="space-y-8">
            {/* Business Metrics Table */}
            <section>
              <BusinessMetricsTable />
            </section>

            {/* Financial Layout Metrics */}
            <section>
              <FinancialLayout />
            </section>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-8">
            {/* Revenue Projections */}
            <section>
              <RevenueProjections projections={revenueProjections} />
            </section>

            {/* Customer Demand Analysis */}
            <section>
              <CustomerProfileComponent profiles={customerProfiles} />
            </section>

            {/* Revenue Breakdown */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Revenue Breakdown Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">
                        By Customer Segment
                      </h4>
                      <div className="space-y-2">
                        {customerProfiles.map((profile, index) => (
                          <div
                            key={profile.id}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm">{profile.segment}</span>
                            <span className="font-medium">
                              $
                              {(
                                (profile.demandAssumption *
                                  profile.avgOrderValue) /
                                1000000
                              ).toFixed(1)}
                              M
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">
                        Growth Trajectory
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Q1 2025: Foundation building phase</p>
                        <p>• Q2 2025: Accelerated growth period</p>
                        <p>• Q3 2025: Market expansion phase</p>
                        <p>• Q4 2025: Optimization and scaling</p>
                        <div className="mt-3">
                          <Link to="/growth-planning">
                            <Button variant="outline" size="sm" className="border-green-200 text-green-700">
                              <Target className="h-4 w-4 mr-2" />
                              Plan Growth Strategy
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="costs" className="space-y-8">
            {/* Cost Structure */}
            <section>
              <LoadingOverlay
                isLoading={isLoading}
                loadingText="Analyzing cost structure..."
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Cost of Goods Sold (COGS) & Operating Expenses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mockCosts.map((cost) => (
                        <Card key={cost.id} className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">
                                {cost.category}
                              </h4>
                              <Badge
                                variant={
                                  cost.type === "COGS" ? "default" : "secondary"
                                }
                              >
                                {cost.type}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Amount
                                </span>
                                <span className="font-semibold">
                                  ${(cost.amount / 1000).toFixed(0)}K
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  % of Total
                                </span>
                                <span className="font-medium">
                                  {cost.percentage}%
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Type
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {cost.variability}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </LoadingOverlay>
            </section>

            {/* Cash Flow Forecast */}
            <section>
              <LoadingOverlay
                isLoading={isLoading}
                loadingText="Updating cash flow..."
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Cash Flow Forecast
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                        {mockCashFlow.map((flow) => (
                          <Card key={flow.id} className="p-3">
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm">
                                {flow.month}
                              </h4>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-muted-foreground">
                                    Inflow
                                  </span>
                                  <span className="text-economic-positive">
                                    ${(flow.cashInflow / 1000000).toFixed(1)}M
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-muted-foreground">
                                    Outflow
                                  </span>
                                  <span className="text-economic-negative">
                                    ${(flow.cashOutflow / 1000000).toFixed(1)}M
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm border-t pt-1">
                                  <span className="font-medium">Net</span>
                                  <span
                                    className={
                                      flow.netCashFlow > 0
                                        ? "text-economic-positive"
                                        : "text-economic-negative"
                                    }
                                  >
                                    ${(flow.netCashFlow / 1000000).toFixed(1)}M
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </LoadingOverlay>
            </section>
          </TabsContent>

          <TabsContent value="planning" className="space-y-8">
            {/* Scenario Planning */}
            <section>
              <LoadingOverlay
                isLoading={isLoading}
                loadingText="Updating scenarios..."
              >
                <ScenarioPlanningComponent scenarios={scenarios} />
              </LoadingOverlay>
            </section>

            {/* Risk & Assumption Analysis */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Risk & Assumption Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Key Risks</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Market Competition</span>
                          <Badge variant="destructive" className="text-xs">
                            High
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">
                            Supply Chain Disruption
                          </span>
                          <Badge className="text-xs bg-economic-warning text-economic-warning-foreground">
                            Medium
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Regulatory Changes</span>
                          <Badge variant="secondary" className="text-xs">
                            Low
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Key Assumptions</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Market growth rate: 15% annually</p>
                        <p>• Customer retention: 85% average</p>
                        <p>• Cost inflation: 3-5% per year</p>
                        <p>• Technology adoption: 25% improvement</p>
                        <div className="mt-3">
                          <Link to="/risk-management">
                            <Button variant="outline" size="sm" className="border-orange-200 text-orange-700">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Risk Management
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            {/* Performance Metrics & KPIs */}
            <section>
              <KPIDashboard kpis={kpis} />
            </section>

            {/* Competitive & Market Context */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Competitive & Market Context
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Market Share</h4>
                          <div className="text-2xl font-bold">12.5%</div>
                          <div className="text-xs text-muted-foreground">
                            Target: 15%
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">
                            Competitive Position
                          </h4>
                          <div className="text-2xl font-bold">#3</div>
                          <div className="text-xs text-muted-foreground">
                            In target market
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Price Premium</h4>
                          <div className="text-2xl font-bold">+8%</div>
                          <div className="text-xs text-muted-foreground">
                            vs. market average
                          </div>
                        </div>
                      </Card>
                    </div>
                    <div className="mt-6 text-center">
                      <Link to="/market-competitive-analysis">
                        <Button variant="outline" className="border-blue-200 text-blue-700">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Detailed Market Analysis
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© 2024 Business Forecast Platform</span>
              <span>•</span>
              <span>Data updated every hour</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                Models: Monte Carlo, Linear Regression, Scenario Analysis
              </span>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </TooltipProvider>
  );
};

export default BusinessForecast;
