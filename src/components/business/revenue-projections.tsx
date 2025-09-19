import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RevenueProjection } from "@/lib/business-forecast-data";
import { TrendingUp, Target, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RevenueProjectionsProps {
  projections: RevenueProjection[];
  title?: string;
}

export function RevenueProjections({
  projections,
  title = "Revenue Projections",
}: RevenueProjectionsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getVarianceColor = (actual?: number, projected?: number) => {
    if (!actual || !projected) return "text-muted-foreground";
    const variance = ((actual - projected) / projected) * 100;
    if (variance > 5) return "text-economic-positive";
    if (variance < -5) return "text-economic-negative";
    return "text-economic-neutral";
  };

  const getVariancePercentage = (actual?: number, projected?: number) => {
    if (!actual || !projected) return null;
    return ((actual - projected) / projected) * 100;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-economic-positive";
    if (confidence >= 60) return "text-economic-warning";
    return "text-economic-negative";
  };

  const totalProjectedRevenue = projections.reduce(
    (sum, p) => sum + p.projected,
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Total: {formatCurrency(totalProjectedRevenue)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projections.map((projection) => {
          const variance = getVariancePercentage(
            projection.actualToDate,
            projection.projected,
          );

          return (
            <Card
              key={projection.id}
              className={cn(
                "hover:shadow-md transition-shadow",
                projection.actualToDate && "ring-1 ring-primary/20",
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {projection.period}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    {projection.actualToDate ? (
                      <CheckCircle className="h-4 w-4 text-economic-positive" />
                    ) : (
                      <Target className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs",
                        getConfidenceColor(projection.confidence),
                      )}
                    >
                      {projection.confidence}%
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">
                      Projected
                    </div>
                    <div className="text-xl font-bold">
                      {formatCurrency(projection.projected)}
                    </div>
                  </div>

                  {projection.actualToDate && (
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          Actual to Date
                        </span>
                        <span
                          className={cn(
                            "font-medium",
                            getVarianceColor(
                              projection.actualToDate,
                              projection.projected,
                            ),
                          )}
                        >
                          {variance !== null && (
                            <>
                              {variance > 0 ? "+" : ""}
                              {variance.toFixed(1)}%
                            </>
                          )}
                        </span>
                      </div>
                      <div className="text-lg font-semibold">
                        {formatCurrency(projection.actualToDate)}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Scenario Range
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-economic-negative">
                        {formatCurrency(projection.conservative)}
                      </span>
                      <span className="text-economic-positive">
                        {formatCurrency(projection.optimistic)}
                      </span>
                    </div>
                    <div className="relative">
                      <Progress
                        value={
                          ((projection.projected - projection.conservative) /
                            (projection.optimistic - projection.conservative)) *
                          100
                        }
                        className="h-2"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1 h-4 bg-primary rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Confidence</span>
                      <span
                        className={getConfidenceColor(projection.confidence)}
                      >
                        {projection.confidence >= 80
                          ? "High"
                          : projection.confidence >= 60
                            ? "Medium"
                            : "Low"}
                      </span>
                    </div>
                    <Progress
                      value={projection.confidence}
                      className="h-1 mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-economic-positive/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-economic-positive" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  Total Revenue Target
                </div>
                <div className="text-lg font-bold">
                  {formatCurrency(totalProjectedRevenue)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  Avg Confidence
                </div>
                <div className="text-lg font-bold">
                  {(
                    projections.reduce((sum, p) => sum + p.confidence, 0) /
                    projections.length
                  ).toFixed(0)}
                  %
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-economic-warning/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-economic-warning" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  Potential Upside
                </div>
                <div className="text-lg font-bold">
                  {formatCurrency(
                    projections.reduce((sum, p) => sum + p.optimistic, 0) -
                      totalProjectedRevenue,
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
