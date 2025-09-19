import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Lightbulb,
  Target,
  Clock,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";
import {
  type CompetitiveAdvantage,
  type StrategyRecommendation,
} from "@/lib/competitive-data";

interface CompetitiveStrategyProps {
  competitiveAdvantages: CompetitiveAdvantage[];
  strategyRecommendations: StrategyRecommendation[];
}

export function CompetitiveStrategy({
  competitiveAdvantages,
  strategyRecommendations,
}: CompetitiveStrategyProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "technology":
        return <Zap className="w-5 h-5 text-purple-600" />;
      case "cost":
        return <Target className="w-5 h-5 text-green-600" />;
      case "service":
        return <Award className="w-5 h-5 text-blue-600" />;
      case "brand":
        return <Shield className="w-5 h-5 text-red-600" />;
      case "distribution":
        return <TrendingUp className="w-5 h-5 text-orange-600" />;
      case "partnerships":
        return <Lightbulb className="w-5 h-5 text-indigo-600" />;
      default:
        return <Shield className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "technology":
        return "bg-purple-100 text-purple-800";
      case "cost":
        return "bg-green-100 text-green-800";
      case "service":
        return "bg-blue-100 text-blue-800";
      case "brand":
        return "bg-red-100 text-red-800";
      case "distribution":
        return "bg-orange-100 text-orange-800";
      case "partnerships":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSustainabilityColor = (sustainability: string) => {
    switch (sustainability) {
      case "high":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "important":
        return "bg-yellow-100 text-yellow-800";
      case "moderate":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimeframeColor = (timeframe: string) => {
    switch (timeframe) {
      case "immediate":
        return "bg-red-100 text-red-800";
      case "short-term":
        return "bg-yellow-100 text-yellow-800";
      case "long-term":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {/* Competitive Advantage Evaluation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Competitive Advantage Evaluation
          </h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Shield className="w-4 h-4 mr-2" />
            Analyze New Advantage
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {competitiveAdvantages.map((advantage) => (
            <Card
              key={advantage.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(advantage.type)}
                    <CardTitle className="text-lg">
                      {advantage.advantage}
                    </CardTitle>
                  </div>
                  <Badge className={getTypeColor(advantage.type)}>
                    {advantage.type}
                  </Badge>
                </div>
                <CardDescription>{advantage.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Sustainability</div>
                    <div
                      className={`text-lg font-bold ${getSustainabilityColor(advantage.sustainability)}`}
                    >
                      {advantage.sustainability}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">
                      Time to Replicate
                    </div>
                    <div className="text-lg font-bold">
                      {advantage.timeToReplicate} months
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Strategic Importance
                    </span>
                    <Badge
                      className={getImportanceColor(
                        advantage.strategicImportance,
                      )}
                    >
                      {advantage.strategicImportance}
                    </Badge>
                  </div>
                  <Progress
                    value={
                      advantage.strategicImportance === "critical"
                        ? 100
                        : advantage.strategicImportance === "important"
                          ? 75
                          : 50
                    }
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Potential Competitor Responses
                  </div>
                  <ul className="space-y-1">
                    {advantage.competitorResponse.map((response, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-700 flex items-start"
                      >
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {response}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-2 pt-3 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    Monitor
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Strengthen
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Strategy Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Strategy Recommendations
          </h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Lightbulb className="w-4 h-4 mr-2" />
            Create Strategy
          </Button>
        </div>

        <div className="space-y-6">
          {strategyRecommendations.map((strategy) => (
            <Card
              key={strategy.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-xl">
                        {strategy.title}
                      </CardTitle>
                      <Badge className={getTypeColor(strategy.category)}>
                        {strategy.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {strategy.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Badge className={getImpactColor(strategy.expectedImpact)}>
                      {strategy.expectedImpact} impact
                    </Badge>
                    <Badge className={getTimeframeColor(strategy.timeframe)}>
                      {strategy.timeframe}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Implementation Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Expected Impact</div>
                    <Badge className={getImpactColor(strategy.expectedImpact)}>
                      {strategy.expectedImpact}
                    </Badge>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Complexity</div>
                    <Badge
                      className={getComplexityColor(
                        strategy.implementationComplexity,
                      )}
                    >
                      {strategy.implementationComplexity}
                    </Badge>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Timeframe</div>
                    <Badge className={getTimeframeColor(strategy.timeframe)}>
                      {strategy.timeframe}
                    </Badge>
                  </div>
                </div>

                {/* Rationale */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Strategic Rationale
                  </h4>
                  <p className="text-sm text-gray-700">{strategy.rationale}</p>
                </div>

                {/* Resources, Metrics, and Risks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Required Resources
                    </h4>
                    <ul className="space-y-1">
                      {strategy.resources.map((resource, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 flex items-start"
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Success Metrics
                    </h4>
                    <ul className="space-y-1">
                      {strategy.metrics.map((metric, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 flex items-start"
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Key Risks
                    </h4>
                    <ul className="space-y-1">
                      {strategy.risks.map((risk, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 flex items-start"
                        >
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t">
                  <Button variant="outline" className="flex-1">
                    <Clock className="w-3 h-3 mr-1" />
                    Schedule Review
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Target className="w-3 h-3 mr-1" />
                    Implement Strategy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Summary Dashboard */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">
            Competitive Strategy Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">
                {
                  competitiveAdvantages.filter(
                    (a) => a.strategicImportance === "critical",
                  ).length
                }
              </div>
              <div className="text-sm text-blue-700">Critical Advantages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">
                {Math.round(
                  competitiveAdvantages.reduce(
                    (acc, a) => acc + a.timeToReplicate,
                    0,
                  ) / competitiveAdvantages.length,
                )}
              </div>
              <div className="text-sm text-blue-700">
                Avg Months to Replicate
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">
                {
                  strategyRecommendations.filter(
                    (s) => s.timeframe === "immediate",
                  ).length
                }
              </div>
              <div className="text-sm text-blue-700">Immediate Actions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">
                {
                  strategyRecommendations.filter(
                    (s) => s.expectedImpact === "high",
                  ).length
                }
              </div>
              <div className="text-sm text-blue-700">
                High Impact Strategies
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
