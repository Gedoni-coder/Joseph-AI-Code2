import React, { useState } from "react";
import { PerformanceDriver } from "../../lib/financial-advisory-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  DollarSign,
  Zap,
  Activity,
  Minus,
} from "lucide-react";

interface PerformanceDriversProps {
  performanceDrivers: PerformanceDriver[];
}

export function PerformanceDrivers({
  performanceDrivers,
}: PerformanceDriversProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImpact, setSelectedImpact] = useState("all");

  const filteredDrivers = performanceDrivers.filter((driver) => {
    if (selectedCategory !== "all" && driver.category !== selectedCategory)
      return false;
    if (selectedImpact !== "all" && driver.impact !== selectedImpact)
      return false;
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "revenue":
        return <DollarSign className="h-4 w-4" />;
      case "cost":
        return <BarChart3 className="h-4 w-4" />;
      case "efficiency":
        return <Zap className="h-4 w-4" />;
      case "growth":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600 bg-green-100";
      case "declining":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "revenue":
        return "bg-blue-100 text-blue-800";
      case "cost":
        return "bg-orange-100 text-orange-800";
      case "efficiency":
        return "bg-purple-100 text-purple-800";
      case "growth":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPerformancePercent = (current: number, target: number) => {
    return Math.min(100, (current / target) * 100);
  };

  const getPerformanceStatus = (current: number, target: number) => {
    const percent = (current / target) * 100;
    if (percent >= 95) return { status: "excellent", color: "text-green-600" };
    if (percent >= 80) return { status: "good", color: "text-blue-600" };
    if (percent >= 60) return { status: "fair", color: "text-yellow-600" };
    return { status: "needs improvement", color: "text-red-600" };
  };

  const categoryStats = performanceDrivers.reduce(
    (acc, driver) => {
      if (!acc[driver.category]) {
        acc[driver.category] = { total: 0, onTarget: 0 };
      }
      acc[driver.category].total++;
      if (driver.currentValue >= driver.targetValue * 0.95) {
        acc[driver.category].onTarget++;
      }
      return acc;
    },
    {} as Record<string, { total: number; onTarget: number }>,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Performance-Driver Alignment
          </h2>
          <p className="text-gray-600">
            Connect budgets to value drivers and monitor KPI performance
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="cost">Cost</SelectItem>
              <SelectItem value="efficiency">Efficiency</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedImpact} onValueChange={setSelectedImpact}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Impact" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Impact</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button>Add KPI</Button>
        </div>
      </div>

      {/* Category Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(categoryStats).map(([category, stats]) => (
          <Card key={category}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 capitalize">
                    {category} KPIs
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.onTarget}/{stats.total}
                  </p>
                  <p className="text-xs text-gray-500">On target</p>
                </div>
                {getCategoryIcon(category)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Drivers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Drivers Dashboard</CardTitle>
          <CardDescription>
            Key performance indicators linked to budget items and value drivers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    KPI Name
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Category
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Current Value
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Target Value
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Progress
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Trend
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Impact
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Linked Budget Items
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((driver) => {
                  const performancePercent = getPerformancePercent(
                    driver.currentValue,
                    driver.targetValue,
                  );
                  const status = getPerformanceStatus(
                    driver.currentValue,
                    driver.targetValue,
                  );

                  return (
                    <tr key={driver.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {driver.name}
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          {getCategoryIcon(driver.category)}
                          <Badge className={getCategoryColor(driver.category)}>
                            {driver.category}
                          </Badge>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 font-medium">
                        {driver.currentValue.toLocaleString()}
                        {driver.unit}
                      </td>
                      <td className="text-right py-3 px-4 font-medium">
                        {driver.targetValue.toLocaleString()}
                        {driver.unit}
                      </td>
                      <td className="text-center py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16">
                            <Progress
                              value={performancePercent}
                              className="h-2"
                            />
                          </div>
                          <span
                            className={`text-sm font-medium ${status.color}`}
                          >
                            {performancePercent.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          {getTrendIcon(driver.trend)}
                          <Badge className={getTrendColor(driver.trend)}>
                            {driver.trend}
                          </Badge>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge className={getImpactColor(driver.impact)}>
                          {driver.impact}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="max-w-xs">
                          {driver.linkedBudgetItems
                            .slice(0, 2)
                            .map((item, index) => (
                              <div
                                key={index}
                                className="text-sm text-gray-600"
                              >
                                • {item}
                              </div>
                            ))}
                          {driver.linkedBudgetItems.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{driver.linkedBudgetItems.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* KPI History and Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>KPI Performance Trends</CardTitle>
            <CardDescription>
              Historical performance of key drivers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredDrivers.slice(0, 3).map((driver) => (
                <div key={driver.id} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">{driver.name}</h4>
                    <Badge className={getCategoryColor(driver.category)}>
                      {driver.category}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        Current: {driver.currentValue.toLocaleString()}
                        {driver.unit}
                      </span>
                      <span>
                        Target: {driver.targetValue.toLocaleString()}
                        {driver.unit}
                      </span>
                    </div>
                    <Progress
                      value={getPerformancePercent(
                        driver.currentValue,
                        driver.targetValue,
                      )}
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {driver.kpiHistory.slice(-4).map((point, index) => (
                      <div key={index} className="text-center">
                        <div className="text-gray-500">
                          {new Date(point.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="font-medium">
                          {point.value.toFixed(1)}
                          {driver.unit}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Key insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Strong Revenue Performance
                    </h4>
                    <p className="text-sm text-gray-600">
                      Revenue KPIs are outperforming targets by an average of
                      12%
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Cost Efficiency Gains
                    </h4>
                    <p className="text-sm text-gray-600">
                      Customer acquisition cost down 13% while maintaining
                      quality
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Operational Excellence
                    </h4>
                    <p className="text-sm text-gray-600">
                      Focus on efficiency metrics showing consistent improvement
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Budget Alignment
                    </h4>
                    <p className="text-sm text-gray-600">
                      92% of KPIs are aligned with budget assumptions and
                      forecasts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
