import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusinessMetric {
  id: string;
  category: string;
  metric: string;
  current: number;
  target: number;
  lastMonth: number;
  unit: string;
  trend: "up" | "down" | "stable";
  variance: number;
  status: "excellent" | "good" | "fair" | "poor";
}

const businessMetrics: BusinessMetric[] = [
  {
    id: "1",
    category: "Revenue",
    metric: "Monthly Recurring Revenue",
    current: 185000,
    target: 220000,
    lastMonth: 178000,
    unit: "USD",
    trend: "up",
    variance: 3.9,
    status: "good",
  },
  {
    id: "2",
    category: "Revenue",
    metric: "Average Order Value",
    current: 1250,
    target: 1400,
    lastMonth: 1180,
    unit: "USD",
    trend: "up",
    variance: 5.9,
    status: "fair",
  },
  {
    id: "3",
    category: "Sales",
    metric: "Customer Acquisition Cost",
    current: 285,
    target: 250,
    lastMonth: 295,
    unit: "USD",
    trend: "down",
    variance: -3.4,
    status: "fair",
  },
  {
    id: "4",
    category: "Sales",
    metric: "Conversion Rate",
    current: 3.2,
    target: 4.0,
    lastMonth: 2.9,
    unit: "%",
    trend: "up",
    variance: 10.3,
    status: "good",
  },
  {
    id: "5",
    category: "Customer",
    metric: "Customer Lifetime Value",
    current: 4200,
    target: 4800,
    lastMonth: 4050,
    unit: "USD",
    trend: "up",
    variance: 3.7,
    status: "good",
  },
  {
    id: "6",
    category: "Customer",
    metric: "Churn Rate",
    current: 2.1,
    target: 1.5,
    lastMonth: 2.3,
    unit: "%",
    trend: "down",
    variance: -8.7,
    status: "fair",
  },
  {
    id: "7",
    category: "Operations",
    metric: "Gross Margin",
    current: 68.5,
    target: 72.0,
    lastMonth: 67.2,
    unit: "%",
    trend: "up",
    variance: 1.9,
    status: "good",
  },
  {
    id: "8",
    category: "Operations",
    metric: "Operating Margin",
    current: 22.8,
    target: 25.0,
    lastMonth: 21.5,
    unit: "%",
    trend: "up",
    variance: 6.0,
    status: "fair",
  },
  {
    id: "9",
    category: "Finance",
    metric: "Cash Burn Rate",
    current: 125000,
    target: 100000,
    lastMonth: 135000,
    unit: "USD",
    trend: "down",
    variance: -7.4,
    status: "fair",
  },
  {
    id: "10",
    category: "Finance",
    metric: "Runway (Months)",
    current: 18,
    target: 24,
    lastMonth: 16,
    unit: "months",
    trend: "up",
    variance: 12.5,
    status: "good",
  },
  {
    id: "11",
    category: "Growth",
    metric: "Monthly Growth Rate",
    current: 12.5,
    target: 15.0,
    lastMonth: 11.8,
    unit: "%",
    trend: "up",
    variance: 5.9,
    status: "good",
  },
  {
    id: "12",
    category: "Growth",
    metric: "Market Share",
    current: 8.2,
    target: 12.0,
    lastMonth: 7.9,
    unit: "%",
    trend: "up",
    variance: 3.8,
    status: "fair",
  },
];

interface BusinessMetricsTableProps {
  title?: string;
}

export function BusinessMetricsTable({
  title = "Business Metrics & Performance Table",
}: BusinessMetricsTableProps) {
  const formatValue = (value: number, unit: string) => {
    if (unit === "USD") {
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}K`;
      }
      return `$${value.toLocaleString()}`;
    }
    if (unit === "%" || unit === "months") {
      return `${value}${unit === "%" ? "%" : " " + unit}`;
    }
    return `${value.toLocaleString()} ${unit}`;
  };

  const getTrendIcon = (trend: BusinessMetric["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-economic-positive" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-economic-negative" />;
      default:
        return <Minus className="h-4 w-4 text-economic-neutral" />;
    }
  };

  const getStatusColor = (status: BusinessMetric["status"]) => {
    switch (status) {
      case "excellent":
        return "bg-economic-positive text-economic-positive-foreground";
      case "good":
        return "bg-economic-positive/80 text-economic-positive-foreground";
      case "fair":
        return "bg-economic-warning text-economic-warning-foreground";
      default:
        return "bg-economic-negative text-economic-negative-foreground";
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 5) return "text-economic-positive";
    if (variance < -5) return "text-economic-negative";
    return "text-economic-neutral";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Revenue: "bg-blue-100 text-blue-800",
      Sales: "bg-green-100 text-green-800",
      Customer: "bg-purple-100 text-purple-800",
      Operations: "bg-orange-100 text-orange-800",
      Finance: "bg-red-100 text-red-800",
      Growth: "bg-indigo-100 text-indigo-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const groupedMetrics = businessMetrics.reduce(
    (acc, metric) => {
      if (!acc[metric.category]) {
        acc[metric.category] = [];
      }
      acc[metric.category].push(metric);
      return acc;
    },
    {} as Record<string, BusinessMetric[]>,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {title}
        </h3>
        <Badge variant="outline" className="text-xs">
          {businessMetrics.length} metrics
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Complete Business Metrics Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Metric</TableHead>
                  <TableHead className="font-semibold text-right">
                    Current
                  </TableHead>
                  <TableHead className="font-semibold text-right">
                    Target
                  </TableHead>
                  <TableHead className="font-semibold text-right">
                    Last Month
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Trend
                  </TableHead>
                  <TableHead className="font-semibold text-right">
                    Change
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businessMetrics.map((metric) => (
                  <TableRow
                    key={metric.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          getCategoryColor(metric.category),
                        )}
                      >
                        {metric.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {metric.metric}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatValue(metric.current, metric.unit)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatValue(metric.target, metric.unit)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatValue(metric.lastMonth, metric.unit)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getTrendIcon(metric.trend)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={cn(
                          "font-medium",
                          getVarianceColor(metric.variance),
                        )}
                      >
                        {metric.variance > 0 ? "+" : ""}
                        {metric.variance.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={cn("text-xs", getStatusColor(metric.status))}
                      >
                        {metric.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Category Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(groupedMetrics).map(([category, metrics]) => (
          <Card key={category}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={cn("text-xs", getCategoryColor(category))}
                >
                  {category}
                </Badge>
                <span className="text-muted-foreground">
                  ({metrics.length} metrics)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {metrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground truncate">
                      {metric.metric}
                    </span>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(metric.trend)}
                      <span className="font-medium">
                        {formatValue(metric.current, metric.unit)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
