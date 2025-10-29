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

          <TabsContent value="summary" className="space-y-8">
            <SummarySection
              title="Market & Competitive Analysis Summary"
              description="Executive summary of market conditions and competitive positioning"
              summaryText={`1. MARKET OVERVIEW
Total addressable market (TAM) stands at approximately $${(
                marketSizes.reduce((acc, m) => acc + m.tam, 0) / 1000000000
              ).toFixed(0)}B with an average growth rate of ${(
                marketSizes.reduce((acc, m) => acc + m.growthRate, 0) /
                marketSizes.length
              ).toFixed(1)}% across segments. The market is fragmented with ${competitors.length} active competitors.

2. CUSTOMER SEGMENTATION
We operate across ${customerSegments.length} distinct customer segments with varying needs and willingness to pay. Each segment shows unique growth trajectories and profit margins.

3. COMPETITIVE LANDSCAPE
The market shows clear differentiation between pure-play competitors and diversified incumbents. Our unique value proposition addresses underserved segments with strong growth potential.

4. MARKET TRENDS
Key trends shaping the market include digital transformation, consolidation among mid-market players, and increasing price sensitivity. These trends create both opportunities and threats to current positioning.

5. STRATEGIC POSITIONING
Our competitive position is differentiated through superior customer service and faster innovation cycles. Market share growth is achievable through selective expansion into adjacent segments.`}
              metrics={[
                {
                  index: 1,
                  title: "Total Market Size (TAM)",
                  value: `$${(marketSizes.reduce((acc, m) => acc + m.tam, 0) / 1000000000).toFixed(0)}B`,
                  insight: "Full addressable market across all segments",
                },
                {
                  index: 2,
                  title: "Market Growth Rate",
                  value: `${(marketSizes.reduce((acc, m) => acc + m.growthRate, 0) / marketSizes.length).toFixed(1)}%`,
                  insight: "Average annual growth across market segments",
                },
                {
                  index: 3,
                  title: "Customer Segments",
                  value: customerSegments.length,
                  insight: "Distinct market segments identified",
                },
                {
                  index: 4,
                  title: "Competitors",
                  value: competitors.length,
                  insight: "Direct and indirect competitors in market",
                },
              ]}
            />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-8">
            <RecommendationSection
              title="Market & Competitive Recommendations"
              description="Strategic recommendations for market expansion and competitive positioning"
              recommendationText={`1. MARKET PENETRATION
Focus on deepening market penetration in high-growth segments. Increase marketing investment in channels with highest ROI. Consider strategic partnerships to expand distribution reach.

2. COMPETITIVE DIFFERENTIATION
Strengthen unique value proposition through continuous innovation. Invest in brand building to create higher switching costs. Develop thought leadership to attract talent and customers.

3. PRICING STRATEGY
Optimize pricing across customer segments based on willingness to pay analysis. Implement dynamic pricing for seasonal demand variations. Bundle complementary products to increase customer lifetime value.

4. MARKET EXPANSION
Identify and evaluate adjacent market opportunities with similar customer profiles. Develop entry strategy for new geographies with high growth potential. Build capability in new product categories.

5. COMPETITIVE MONITORING
Establish competitive intelligence function to monitor competitor moves. Track customer satisfaction and NPS relative to competitors. Conduct quarterly strategic reviews to adapt positioning.`}
              actionItems={[
                {
                  index: 1,
                  title: "Market Segmentation Study",
                  description:
                    "Conduct detailed market segmentation analysis to identify highest-value customer segments and prioritize go-to-market strategy",
                  priority: "high",
                  timeline: "Q1 2025",
                },
                {
                  index: 2,
                  title: "Competitive Benchmarking",
                  description:
                    "Establish quarterly competitive benchmarking process to track competitor performance, pricing, and customer perception",
                  priority: "high",
                  timeline: "Q1 2025",
                },
                {
                  index: 3,
                  title: "Value Proposition Enhancement",
                  description:
                    "Refine and communicate unique value proposition through updated marketing materials and customer-facing messaging",
                  priority: "medium",
                  timeline: "Q1-Q2 2025",
                },
                {
                  index: 4,
                  title: "Customer Win/Loss Analysis",
                  description:
                    "Conduct win/loss interviews with customers and prospects to understand decision drivers and competitive strengths/weaknesses",
                  priority: "medium",
                  timeline: "Q2 2025",
                },
                {
                  index: 5,
                  title: "Market Entry Planning",
                  description:
                    "Develop detailed entry strategy for adjacent market segments including customer acquisition cost and revenue projections",
                  priority: "low",
                  timeline: "Q2-Q3 2025",
                },
              ]}
              nextSteps={[
                {
                  index: 1,
                  step: "Complete market sizing and TAM/SAM/SOM analysis",
                  owner: "Strategy Team",
                  dueDate: "End of Week 2",
                },
                {
                  index: 2,
                  step: "Conduct competitor SWOT analysis for top 5 competitors",
                  owner: "Competitive Intel Team",
                  dueDate: "End of Week 3",
                },
                {
                  index: 3,
                  step: "Develop customer persona profiles by segment",
                  owner: "Product Marketing",
                  dueDate: "End of Month",
                },
                {
                  index: 4,
                  step: "Present market recommendations to executive team",
                  owner: "Chief Strategist",
                  dueDate: "Mid-Month Review",
                },
              ]}
            />
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
