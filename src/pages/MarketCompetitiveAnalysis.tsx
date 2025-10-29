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
import { useMarketData } from "@/hooks/useMarketData";
import { useCompetitiveData } from "@/hooks/useCompetitiveData";
import { MarketAnalysis } from "@/components/market/market-analysis";
import { ReportNotes } from "@/components/market/report-notes";
import { CompetitiveAnalysis } from "@/components/competitive/competitive-analysis";
import { CompetitiveStrategy } from "@/components/competitive/competitive-strategy";
import { ModuleConversation } from "@/components/conversation/module-conversation";
import { SummarySection } from "@/components/module/summary-section";
import { RecommendationSection } from "@/components/module/recommendation-section";
import {
  BarChart3,
  TrendingUp,
  Target,
  Users,
  Globe,
  Home,
  Briefcase,
  Calculator,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MarketCompetitiveAnalysis() {
  const {
    marketSizes,
    customerSegments,
    marketTrends,
    demandForecasts,
    industryInsights,
    reportNotes,
    isLoading: marketLoading,
    isConnected: marketConnected,
    lastUpdated: marketLastUpdated,
    error: marketError,
    refreshData: refreshMarketData,
  } = useMarketData();

  const {
    competitors,
    swotAnalyses,
    productComparisons,
    marketPositions,
    competitiveAdvantages,
    strategyRecommendations,
    isLoading: competitiveLoading,
    isConnected: competitiveConnected,
    lastUpdated: competitiveLastUpdated,
    error: competitiveError,
    refreshData: refreshCompetitiveData,
  } = useCompetitiveData();

  const [activeTab, setActiveTab] = useState("overview");

  const isLoading = marketLoading || competitiveLoading;
  const isConnected = marketConnected && competitiveConnected;
  const lastUpdated = new Date(
    Math.max(marketLastUpdated.getTime(), competitiveLastUpdated.getTime()),
  );
  const error = marketError || competitiveError;

  const refreshData = () => {
    refreshMarketData();
    refreshCompetitiveData();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Connection Error</CardTitle>
            <CardDescription>
              Unable to load market and competitive data. Please check your
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

  return (
    <div className="min-h-screen bg-gray-50">
      <LoadingSpinner isVisible={isLoading} />

      <ModuleHeader
        icon={<BarChart3 className="h-6 w-6" />}
        title="Market Analysis"
        description="Competitive intelligence, market trends, and strategic positioning analysis for informed decisions"
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
              value="market"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Market Analysis
            </TabsTrigger>
            <TabsTrigger
              value="competitive"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Competitive Analysis
            </TabsTrigger>
            <TabsTrigger
              value="strategy"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Strategy & Advantages
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Report Notes
            </TabsTrigger>
            <TabsTrigger
              value="conversation"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              JOSEPH
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Market Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">Total TAM</div>
                      <div className="text-2xl font-bold text-gray-900">
                        $
                        {(
                          marketSizes.reduce((acc, m) => acc + m.tam, 0) /
                          1000000000
                        ).toFixed(0)}
                        B
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">
                        Customer Segments
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {customerSegments.length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">Competitors</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {competitors.length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">Market Growth</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {(
                          marketSizes.reduce(
                            (acc, m) => acc + m.growthRate,
                            0,
                          ) / marketSizes.length
                        ).toFixed(1)}
                        %
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
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    Market Trends Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {marketTrends.slice(0, 3).map((trend) => (
                      <div
                        key={trend.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{trend.trend}</div>
                          <div className="text-sm text-gray-600">
                            {trend.category}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              trend.impact === "high"
                                ? "bg-red-100 text-red-800"
                                : trend.impact === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {trend.impact} impact
                          </Badge>
                          <div className="text-sm text-gray-600">
                            {trend.confidence}% confidence
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
                    <Target className="w-5 h-5 mr-2 text-red-600" />
                    Top Competitors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {competitors.slice(0, 3).map((competitor) => (
                      <div
                        key={competitor.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{competitor.name}</div>
                          <div className="text-sm text-gray-600">
                            {competitor.type} competitor
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            {competitor.marketShare}%
                          </div>
                          <div className="text-sm text-gray-600">
                            market share
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="market">
            <MarketAnalysis
              marketSizes={marketSizes}
              customerSegments={customerSegments}
              marketTrends={marketTrends}
              demandForecasts={demandForecasts}
              industryInsights={industryInsights}
            />
          </TabsContent>

          <TabsContent value="competitive">
            <CompetitiveAnalysis
              competitors={competitors}
              swotAnalyses={swotAnalyses}
              productComparisons={productComparisons}
              marketPositions={marketPositions}
            />
          </TabsContent>

          <TabsContent value="strategy">
            <CompetitiveStrategy
              competitiveAdvantages={competitiveAdvantages}
              strategyRecommendations={strategyRecommendations}
            />
          </TabsContent>

          <TabsContent value="reports">
            <ReportNotes reportNotes={reportNotes} />
          </TabsContent>

          <TabsContent value="conversation" className="h-[600px]">
            <ModuleConversation module="market_analysis" moduleTitle="Market Analysis" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
