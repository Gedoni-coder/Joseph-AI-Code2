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
import ModuleHeader from "@/components/ui/module-header";
import { usePricingData } from "@/hooks/usePricingData";
import { PricingStrategies } from "@/components/pricing/pricing-strategies";
import { CompetitiveAnalysis } from "@/components/pricing/competitive-analysis";
import { PriceTesting } from "@/components/pricing/price-testing";
import { DynamicPricingComponent } from "@/components/pricing/dynamic-pricing";
import { ModuleConversation } from "@/components/conversation/module-conversation";
import { SummarySection } from "@/components/module/summary-section";
import { RecommendationSection } from "@/components/module/recommendation-section";
import {
  DollarSign,
  Target,
  TrendingUp,
  BarChart3,
  Home,
  Briefcase,
  Calculator,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingStrategy() {
  const {
    strategies,
    competitors,
    tests,
    metrics,
    dynamicPrices,
    isLoading,
    isConnected,
    lastUpdated,
    error,
    refreshData,
  } = usePricingData();
  const [activeTab, setActiveTab] = useState("overview");

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Connection Error</CardTitle>
            <CardDescription>
              Unable to load pricing data. Please check your connection and try
              again.
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

  return (
    <div className="min-h-screen bg-gray-50">
      <LoadingSpinner isVisible={isLoading} />

      <ModuleHeader
        icon={<Target className="h-6 w-6" />}
        title="Pricing Strategy"
        description="Dynamic pricing models, competitive analysis, and optimization strategies for maximum profitability"
        isConnected={isConnected}
        lastUpdated={lastUpdated}
        onReconnect={refreshData}
        connectionLabel="Live"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6 bg-white border">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="strategies"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Strategies
            </TabsTrigger>
            <TabsTrigger
              value="competitive"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Competitive
            </TabsTrigger>
            <TabsTrigger
              value="testing"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Testing
            </TabsTrigger>
            <TabsTrigger
              value="dynamic"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Dynamic
            </TabsTrigger>
            <TabsTrigger
              value="conversation"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              JOSEPH
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {metrics.map((metric) => (
                <Card key={metric.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">
                          {metric.name}
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {metric.value.toFixed(metric.unit === "$" ? 2 : 1)}
                          {metric.unit}
                        </div>
                        <div
                          className={`text-sm flex items-center ${
                            metric.trend === "up"
                              ? "text-green-600"
                              : metric.trend === "down"
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          <TrendingUp
                            className={`w-3 h-3 mr-1 ${
                              metric.trend === "down" ? "rotate-180" : ""
                            }`}
                          />
                          {metric.change > 0 ? "+" : ""}
                          {metric.change.toFixed(1)}% {metric.period}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Active Pricing Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {strategies.slice(0, 3).map((strategy) => (
                      <div
                        key={strategy.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{strategy.name}</div>
                          <div className="text-sm text-gray-600">
                            {strategy.type.replace("-", " ")}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            ${strategy.suggestedPrice}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {strategy.confidence}% confidence
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    Running Price Tests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tests
                      .filter((t) => t.status === "running")
                      .map((test) => (
                        <div
                          key={test.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <div className="font-medium">{test.name}</div>
                            <div className="text-sm text-gray-600">
                              {test.testType} test
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{test.confidence}%</div>
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Running
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="strategies">
            <PricingStrategies strategies={strategies} />
          </TabsContent>

          <TabsContent value="competitive">
            <CompetitiveAnalysis
              competitors={competitors}
              onRefresh={refreshData}
            />
          </TabsContent>

          <TabsContent value="testing">
            <PriceTesting tests={tests} />
          </TabsContent>

          <TabsContent value="dynamic">
            <DynamicPricingComponent dynamicPrices={dynamicPrices} />
          </TabsContent>

          <TabsContent value="conversation" className="h-[600px]">
            <ModuleConversation module="pricing_strategy" moduleTitle="Pricing Strategy" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
