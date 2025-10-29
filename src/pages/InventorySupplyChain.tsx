import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ConnectionStatus } from "@/components/ui/connection-status";
import { useInventoryData } from "@/hooks/useInventoryData";
import { useSupplyChainData } from "@/hooks/useSupplyChainData";
import { StockMonitoring } from "@/components/inventory/stock-monitoring";
import { DemandForecasting } from "@/components/inventory/demand-forecasting";
import { ValuationTracking } from "@/components/inventory/valuation-tracking";
import { InventoryAnalytics } from "@/components/inventory/inventory-analytics";
import { SupplierManagement } from "@/components/supply-chain/supplier-management";
import { ProcurementTracking } from "@/components/supply-chain/procurement-tracking";
import { ProductionPlanning } from "@/components/supply-chain/production-planning";
import { SupplyChainAnalytics } from "@/components/supply-chain/supply-chain-analytics";
import ModuleHeader from "@/components/ui/module-header";
import { SummaryRecommendationSection } from "@/components/module/summary-recommendation-section";
import {
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Truck,
  Factory,
  Users,
  BarChart3,
  Home,
  Briefcase,
  Calculator,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function InventorySupplyChain() {
  const {
    inventoryItems,
    stockMovements,
    demandForecasts,
    inventoryValuation,
    deadStock,
    locations,
    inventoryAudits,
    turnoverMetrics,
    isLoading: inventoryLoading,
    isConnected: inventoryConnected,
    lastUpdated: inventoryLastUpdated,
    error: inventoryError,
    refreshData: refreshInventoryData,
    updateStockLevel,
    addStockMovement,
  } = useInventoryData();

  const {
    suppliers,
    procurementOrders,
    productionPlans,
    warehouseOperations,
    logisticsMetrics,
    marketVolatility,
    regulatoryCompliance,
    disruptionRisks,
    sustainabilityMetrics,
    isLoading: supplyChainLoading,
    isConnected: supplyChainConnected,
    lastUpdated: supplyChainLastUpdated,
    error: supplyChainError,
    refreshData: refreshSupplyChainData,
    updateSupplierPerformance,
    updateOrderStatus,
  } = useSupplyChainData();

  const [activeTab, setActiveTab] = useState("overview");

  const isLoading = inventoryLoading || supplyChainLoading;
  const isConnected = inventoryConnected && supplyChainConnected;
  const lastUpdated = new Date(
    Math.max(inventoryLastUpdated.getTime(), supplyChainLastUpdated.getTime()),
  );
  const error = inventoryError || supplyChainError;

  const refreshData = () => {
    refreshInventoryData();
    refreshSupplyChainData();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Connection Error</CardTitle>
            <CardDescription>
              Unable to load inventory and supply chain data. Please check your
              connection and try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={refreshData} className="w-full">
              Retry Connection
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  // Calculate key metrics
  const totalInventoryValue = inventoryValuation.totalValue;
  const lowStockItems = inventoryItems.filter(
    (item) => item.status === "low-stock" || item.status === "out-of-stock",
  ).length;
  const avgSupplierPerformance =
    suppliers.reduce((acc, s) => acc + s.performanceMetrics.overallScore, 0) /
    suppliers.length;
  const highRiskDisruptions = disruptionRisks.filter(
    (risk) => risk.riskScore > 20,
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <LoadingSpinner isVisible={isLoading} />

      <ModuleHeader
        icon={<Package className="h-6 w-6" />}
        title="Inventory & Supply Chain Management"
        description="Comprehensive inventory and supply chain optimization"
        isConnected={isConnected}
        lastUpdated={lastUpdated}
        onReconnect={refreshData}
        error={error}
        connectionLabel="Live"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-11 bg-white border text-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="summary-recommendation"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Summary & Recommendation
            </TabsTrigger>
            <TabsTrigger
              value="stock-monitoring"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Stock
            </TabsTrigger>
            <TabsTrigger
              value="demand-forecasting"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Demand
            </TabsTrigger>
            <TabsTrigger
              value="valuation"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Valuation
            </TabsTrigger>
            <TabsTrigger
              value="suppliers"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Suppliers
            </TabsTrigger>
            <TabsTrigger
              value="procurement"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Procurement
            </TabsTrigger>
            <TabsTrigger
              value="production"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Production
            </TabsTrigger>
            <TabsTrigger
              value="supply-analytics"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              SC Analytics
            </TabsTrigger>
            <TabsTrigger
              value="inventory-analytics"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Inv Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="text-sm text-blue-700">
                        Inventory Value
                      </div>
                      <div className="text-2xl font-bold text-blue-900">
                        {formatCurrency(totalInventoryValue)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                    <div>
                      <div className="text-sm text-red-700">Stock Alerts</div>
                      <div className="text-2xl font-bold text-red-900">
                        {lowStockItems}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="text-sm text-green-700">
                        Supplier Performance
                      </div>
                      <div className="text-2xl font-bold text-green-900">
                        {avgSupplierPerformance.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                    <div>
                      <div className="text-sm text-orange-700">Risk Alerts</div>
                      <div className="text-2xl font-bold text-orange-900">
                        {highRiskDisruptions}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2 text-blue-600" />
                    Inventory Status Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      {
                        status: "in-stock",
                        count: inventoryItems.filter(
                          (item) => item.status === "in-stock",
                        ).length,
                        color: "text-green-600",
                        label: "In Stock",
                      },
                      {
                        status: "low-stock",
                        count: inventoryItems.filter(
                          (item) => item.status === "low-stock",
                        ).length,
                        color: "text-yellow-600",
                        label: "Low Stock",
                      },
                      {
                        status: "out-of-stock",
                        count: inventoryItems.filter(
                          (item) => item.status === "out-of-stock",
                        ).length,
                        color: "text-red-600",
                        label: "Out of Stock",
                      },
                      {
                        status: "overstock",
                        count: inventoryItems.filter(
                          (item) => item.status === "overstock",
                        ).length,
                        color: "text-blue-600",
                        label: "Overstock",
                      },
                    ].map((item) => (
                      <div
                        key={item.status}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">{item.label}</span>
                        <span className={`text-xl font-bold ${item.color}`}>
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => setActiveTab("stock-monitoring")}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    View Detailed Monitoring
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-green-600" />
                    Supply Chain Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Active Suppliers</span>
                      <span className="text-xl font-bold text-blue-600">
                        {suppliers.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Pending Orders</span>
                      <span className="text-xl font-bold text-yellow-600">
                        {
                          procurementOrders.filter(
                            (order) => order.status === "pending",
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Production Plans</span>
                      <span className="text-xl font-bold text-green-600">
                        {productionPlans.length}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setActiveTab("supply-chain")}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    View Supply Chain Details
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                    Demand Forecasting Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {demandForecasts.slice(0, 3).map((forecast) => (
                    <div
                      key={forecast.id}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="font-medium text-sm">
                        {forecast.itemName}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-600">
                          Predicted: {forecast.predictedDemand}
                        </span>
                        <Badge
                          className={
                            forecast.reorderSuggestion.urgency === "high"
                              ? "bg-red-100 text-red-800"
                              : forecast.reorderSuggestion.urgency === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {forecast.reorderSuggestion.urgency}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={() => setActiveTab("demand-forecasting")}
                    variant="outline"
                    className="w-full"
                  >
                    View All Forecasts
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Factory className="w-5 h-5 mr-2 text-orange-600" />
                    Warehouse Operations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {warehouseOperations.map((warehouse) => (
                    <div
                      key={warehouse.id}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="font-medium text-sm">
                        {warehouse.warehouseName}
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                        <div>
                          <span className="text-gray-600">Utilization:</span>
                          <span className="ml-1 font-medium">
                            {warehouse.efficiency.storageUtilization.toFixed(1)}
                            %
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Accuracy:</span>
                          <span className="ml-1 font-medium">
                            {warehouse.efficiency.pickingAccuracy.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={() => setActiveTab("supply-chain")}
                    variant="outline"
                    className="w-full"
                  >
                    View Operations Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="summary-recommendation" className="space-y-8">
            <SummaryRecommendationSection
              summaryTitle="Inventory & Supply Chain Summary"
              summaryDescription="Key observations across inventory levels, supplier performance, and risk profile"
              summaryText={`1. INVENTORY VALUE
Total on-hand inventory value stands at ${formatCurrency(totalInventoryValue)} across ${locations.length} locations.

2. STOCK STATUS
There are ${lowStockItems} items in low/out-of-stock status requiring attention. Inventory audits recorded ${inventoryAudits.length} recent entries.

3. SUPPLIER PERFORMANCE
Average supplier performance score is ${avgSupplierPerformance.toFixed(1)}% across ${suppliers.length} active suppliers.

4. RISK OVERVIEW
${highRiskDisruptions} high-risk disruption alerts identified. Market volatility and regulatory changes are being monitored.

5. OPERATIONS OUTLOOK
Production plans: ${productionPlans.length}. Procurement orders pending: ${procurementOrders.filter((o) => o.status === "pending").length}. Focus remains on service levels and turnover improvement.`}
              summaryMetrics={[
                {
                  index: 1,
                  title: "Inventory Value",
                  value: formatCurrency(totalInventoryValue),
                  insight: "Current total value of inventory",
                },
                {
                  index: 2,
                  title: "Low/Out-of-Stock Items",
                  value: lowStockItems,
                  insight: "SKUs needing replenishment",
                },
                {
                  index: 3,
                  title: "Avg Supplier Score",
                  value: `${avgSupplierPerformance.toFixed(1)}%`,
                  unit: "%",
                  insight: "Overall supplier performance",
                },
                {
                  index: 4,
                  title: "High-Risk Disruptions",
                  value: highRiskDisruptions,
                  insight: "Risks requiring mitigation",
                },
              ]}
              recommendationTitle="Inventory & Supply Chain Recommendations"
              recommendationDescription="Practical actions to improve availability, efficiency, and resilience"
              recommendationText={`1. REPLENISHMENT & FORECASTING
Tighten reorder points using recent demand forecasts and lead-time variability. Prioritize ${lowStockItems} low/out-of-stock items.

2. SUPPLIER PERFORMANCE PROGRAM
Engage suppliers below target to improve on-time delivery and quality; expand scorecards and quarterly reviews.

3. RISK MITIGATION
Create mitigation plans for ${highRiskDisruptions} high-risk disruptions; diversify lanes and review safety stock.

4. PRODUCTION & PROCUREMENT ALIGNMENT
Synchronize production plans (${productionPlans.length}) with procurement orders to reduce bottlenecks and expedite critical materials.

5. ANALYTICS & GOVERNANCE
Enhance inventory analytics, turnover monitoring, and audit cadence; set weekly dashboards and alerts.`}
              actionItems={[
                {
                  index: 1,
                  title: "Reorder Point Review",
                  description:
                    "Recalculate reorder points using demand forecast error and supplier lead-time variability",
                  priority: "high",
                  timeline: "This Month",
                },
                {
                  index: 2,
                  title: "Supplier QBRs",
                  description:
                    "Run quarterly business reviews for underperforming suppliers and agree on improvement plans",
                  priority: "high",
                  timeline: "Quarterly",
                },
                {
                  index: 3,
                  title: "Risk Playbooks",
                  description:
                    "Draft disruption playbooks for top risk scenarios; pre-approve alternates and routes",
                  priority: "medium",
                  timeline: "Next 6 Weeks",
                },
                {
                  index: 4,
                  title: "Demand-Procurement Sync",
                  description:
                    "Align MRP with latest forecasts and production constraints to reduce expedite costs",
                  priority: "medium",
                  timeline: "Biweekly",
                },
                {
                  index: 5,
                  title: "Turnover Dashboard",
                  description:
                    "Deploy SKU-level turnover and dead-stock dashboard with alerting",
                  priority: "low",
                  timeline: "Next Quarter",
                },
              ]}
              nextSteps={[
                {
                  index: 1,
                  step: "Publish replenishment list for low/out-of-stock SKUs",
                  owner: "Inventory Ops",
                  dueDate: "End of Week 1",
                },
                {
                  index: 2,
                  step: "Run supplier performance review and notify corrective actions",
                  owner: "Procurement",
                  dueDate: "End of Week 2",
                },
                {
                  index: 3,
                  step: "Approve risk mitigation plans and safety stock updates",
                  owner: "Supply Chain Director",
                  dueDate: "Mid-Month",
                },
                {
                  index: 4,
                  step: "Sync production and procurement schedules",
                  owner: "Planning",
                  dueDate: "Weekly",
                },
              ]}
            />
          </TabsContent>

          <TabsContent value="stock-monitoring">
            <StockMonitoring
              inventoryItems={inventoryItems}
              onUpdateStock={updateStockLevel}
              onRefresh={refreshInventoryData}
            />
          </TabsContent>

          <TabsContent value="demand-forecasting">
            <DemandForecasting demandForecasts={demandForecasts} />
          </TabsContent>

          <TabsContent value="valuation">
            <ValuationTracking inventoryValuation={inventoryValuation} />
          </TabsContent>

          <TabsContent value="suppliers">
            <SupplierManagement
              suppliers={suppliers}
              procurementOrders={procurementOrders}
            />
          </TabsContent>

          <TabsContent value="procurement">
            <ProcurementTracking
              procurementOrders={procurementOrders}
              suppliers={suppliers}
              productionPlans={productionPlans}
            />
          </TabsContent>

          <TabsContent value="production">
            <ProductionPlanning
              productionPlans={productionPlans}
              warehouseOperations={warehouseOperations}
              disruptionRisks={disruptionRisks}
            />
          </TabsContent>

          <TabsContent value="supply-analytics">
            <SupplyChainAnalytics
              marketVolatility={marketVolatility}
              disruptionRisks={disruptionRisks}
              sustainabilityMetrics={sustainabilityMetrics}
              regulatoryCompliance={regulatoryCompliance}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Reporting</CardTitle>
                  <CardDescription>
                    Advanced analytics and comprehensive reporting tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Advanced Analytics Coming Soon
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Comprehensive inventory analytics, turnover analysis, and
                      automated reporting features are in development.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="p-4 bg-purple-50 rounded-lg text-left">
                        <h4 className="font-semibold text-purple-900 mb-2">
                          Inventory Analytics
                        </h4>
                        <ul className="text-sm text-purple-800 space-y-1">
                          <li>• Turnover ratio analysis</li>
                          <li>• Dead stock identification</li>
                          <li>• Audit reporting</li>
                          <li>• Multi-location sync</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg text-left">
                        <h4 className="font-semibold text-orange-900 mb-2">
                          Performance Reports
                        </h4>
                        <ul className="text-sm text-orange-800 space-y-1">
                          <li>• Supplier scorecards</li>
                          <li>• Cost analysis reports</li>
                          <li>• Efficiency metrics</li>
                          <li>• Trend analysis</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-teal-50 rounded-lg text-left">
                        <h4 className="font-semibold text-teal-900 mb-2">
                          Automated Insights
                        </h4>
                        <ul className="text-sm text-teal-800 space-y-1">
                          <li>• Predictive analytics</li>
                          <li>• Anomaly detection</li>
                          <li>• Recommendation engine</li>
                          <li>• Real-time dashboards</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory-analytics">
            <InventoryAnalytics
              inventoryItems={inventoryItems}
              inventoryAudits={inventoryAudits}
              turnoverMetrics={turnoverMetrics}
              deadStock={deadStock}
              locations={locations}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
