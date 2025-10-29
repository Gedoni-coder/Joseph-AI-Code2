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
import ModuleHeader from "@/components/ui/module-header";
import { useRevenueData } from "@/hooks/useRevenueData";
import { RevenueStreams } from "@/components/revenue/revenue-streams";
import { RevenueForecasting } from "@/components/revenue/revenue-forecasting";
import { ChurnAnalysisComponent } from "@/components/revenue/churn-analysis";
import { UpsellOpportunities } from "@/components/revenue/upsell-opportunities";
import { ModuleConversation } from "@/components/conversation/module-conversation";
import { SummarySection } from "@/components/module/summary-section";
import { RecommendationSection } from "@/components/module/recommendation-section";
import {
  DollarSign,
  TrendingUp,
  Users,
  AlertTriangle,
  Home,
  Briefcase,
  Calculator,
  ArrowLeft,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function RevenueStrategy() {
  const {
    streams,
    scenarios,
    churn,
    upsells,
    metrics,
    discounts,
    channels,
    isLoading,
    isConnected,
    lastUpdated,
    error,
    refreshData,
  } = useRevenueData();
  const [activeTab, setActiveTab] = useState("overview");

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Connection Error</CardTitle>
            <CardDescription>
              Unable to load revenue data. Please check your connection and try
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
        icon={<TrendingUp className="h-6 w-6" />}
        title="Revenue Strategy & Analysis"
        description="Grow and protect revenue across products and channels"
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
          <TabsList className="grid w-full grid-cols-8 bg-white border">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Summary
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Recommendations
            </TabsTrigger>
            <TabsTrigger
              value="streams"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Revenue Streams
            </TabsTrigger>
            <TabsTrigger
              value="forecasting"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Forecasting
            </TabsTrigger>
            <TabsTrigger
              value="churn"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Churn Analysis
            </TabsTrigger>
            <TabsTrigger
              value="upsell"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Upsell
            </TabsTrigger>
            <TabsTrigger
              value="conversation"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              JOSEPH
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metrics.slice(0, 6).map((metric) => (
                <Card key={metric.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">
                          {metric.name}
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {metric.unit === "$" ? "$" : ""}
                          {metric.value.toLocaleString()}
                          {metric.unit !== "$" ? metric.unit : ""}
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
                    Top Revenue Streams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {streams.slice(0, 3).map((stream) => (
                      <div
                        key={stream.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{stream.name}</div>
                          <div className="text-sm text-gray-600">
                            {stream.type.replace("-", " ")}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            ${(stream.currentRevenue / 1000000).toFixed(1)}M
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {stream.growth > 0 ? "+" : ""}
                            {stream.growth.toFixed(1)}% growth
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
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                    Churn Risk Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {churn.map((segment) => (
                      <div
                        key={segment.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{segment.segment}</div>
                          <div className="text-sm text-gray-600">
                            {segment.customers.toLocaleString()} customers
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-red-600">
                            {segment.churnRate}%
                          </div>
                          <div className="text-xs text-gray-600">
                            ${(segment.revenueAtRisk / 1000).toFixed(0)}K at
                            risk
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Top Upsell Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upsells.slice(0, 3).map((upsell) => (
                      <div
                        key={upsell.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{upsell.customer}</div>
                          <div className="text-sm text-gray-600">
                            {upsell.currentPlan} → {upsell.suggestedPlan}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">
                            +$
                            {(
                              upsell.potentialMRR - upsell.currentMRR
                            ).toLocaleString()}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {upsell.probabilityScore}% likely
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
                    <Users className="w-5 h-5 mr-2 text-purple-600" />
                    Channel Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {channels.slice(0, 3).map((channel) => (
                      <div
                        key={channel.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{channel.channel}</div>
                          <div className="text-sm text-gray-600">
                            {channel.customers.toLocaleString()} customers
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            ${(channel.revenue / 1000000).toFixed(1)}M
                          </div>
                          <div className="text-xs text-gray-600">
                            {channel.profitability.toFixed(1)}% margin
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="streams">
            <RevenueStreams streams={streams} />
          </TabsContent>

          <TabsContent value="forecasting">
            <RevenueForecasting scenarios={scenarios} />
          </TabsContent>

          <TabsContent value="churn">
            <ChurnAnalysisComponent churn={churn} />
          </TabsContent>

          <TabsContent value="upsell">
            <UpsellOpportunities upsells={upsells} />
          </TabsContent>

          <TabsContent value="conversation" className="h-[600px]">
            <ModuleConversation module="revenue_strategy" moduleTitle="Revenue Strategy" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
