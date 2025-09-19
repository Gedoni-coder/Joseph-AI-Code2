import React, { useState } from "react";
import { BudgetForecast } from "../../lib/financial-advisory-data";
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
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  BarChart3,
  DollarSign,
} from "lucide-react";

interface BudgetValidationProps {
  budgetForecasts: BudgetForecast[];
}

export function BudgetValidation({ budgetForecasts }: BudgetValidationProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  // Calculate validation metrics
  const validatedForecasts = budgetForecasts.filter(
    (f) => f.actualVsForecasted,
  );
  const totalVariance =
    validatedForecasts.reduce((sum, f) => sum + Math.abs(f.variance), 0) /
    validatedForecasts.length;
  const accuracyScore = Math.max(0, 100 - totalVariance * 10);

  const getVarianceStatus = (variance: number) => {
    if (Math.abs(variance) <= 2)
      return { status: "accurate", color: "text-green-600", icon: CheckCircle };
    if (Math.abs(variance) <= 5)
      return {
        status: "acceptable",
        color: "text-yellow-600",
        icon: AlertCircle,
      };
    return { status: "concerning", color: "text-red-600", icon: XCircle };
  };

  const getValidationScore = (forecast: BudgetForecast) => {
    if (!forecast.actualVsForecasted) return null;

    const revenueVariance = Math.abs(
      ((forecast.actualVsForecasted.actualRevenue! - forecast.revenue) /
        forecast.revenue) *
        100,
    );
    const expenseVariance = Math.abs(
      ((forecast.actualVsForecasted.actualExpenses! - forecast.expenses) /
        forecast.expenses) *
        100,
    );
    const netIncomeVariance = Math.abs(
      ((forecast.actualVsForecasted.actualNetIncome! - forecast.netIncome) /
        forecast.netIncome) *
        100,
    );

    const averageVariance =
      (revenueVariance + expenseVariance + netIncomeVariance) / 3;
    return Math.max(0, 100 - averageVariance * 2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Forecast-Driven Budget Validation
          </h2>
          <p className="text-gray-600">
            Align budgets with forecasts and track performance accuracy
          </p>
        </div>
        <Button>Generate Validation Report</Button>
      </div>

      {/* Validation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Accuracy Score
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {accuracyScore.toFixed(0)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Variance
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {totalVariance.toFixed(1)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Validated Forecasts
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {validatedForecasts.length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Budget Alignment
                </p>
                <p className="text-2xl font-bold text-orange-600">92%</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forecast vs Actual Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Forecast vs Actual Performance</CardTitle>
          <CardDescription>
            Detailed comparison of forecasted vs actual financial performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Period
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Validation Status
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Forecasted Revenue
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Actual Revenue
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Revenue Variance
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Forecasted Net Income
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Actual Net Income
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Accuracy Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {budgetForecasts.map((forecast) => {
                  const hasActuals = forecast.actualVsForecasted;
                  const revenueVariance = hasActuals
                    ? ((forecast.actualVsForecasted!.actualRevenue! -
                        forecast.revenue) /
                        forecast.revenue) *
                      100
                    : 0;
                  const varianceStatus = getVarianceStatus(revenueVariance);
                  const StatusIcon = varianceStatus.icon;
                  const accuracyScore = getValidationScore(forecast);

                  return (
                    <tr key={forecast.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{forecast.period}</span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        {hasActuals ? (
                          <div className="flex items-center justify-center gap-2">
                            <StatusIcon
                              className={`h-4 w-4 ${varianceStatus.color}`}
                            />
                            <Badge
                              className={
                                varianceStatus.status === "accurate"
                                  ? "bg-green-100 text-green-800"
                                  : varianceStatus.status === "acceptable"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {varianceStatus.status}
                            </Badge>
                          </div>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                      </td>
                      <td className="text-right py-3 px-4 font-medium">
                        {formatCurrency(forecast.revenue)}
                      </td>
                      <td className="text-right py-3 px-4 font-medium">
                        {hasActuals
                          ? formatCurrency(
                              forecast.actualVsForecasted!.actualRevenue!,
                            )
                          : "-"}
                      </td>
                      <td className="text-right py-3 px-4">
                        {hasActuals ? (
                          <span
                            className={
                              revenueVariance >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {formatPercent(revenueVariance)}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="text-right py-3 px-4 font-medium">
                        {formatCurrency(forecast.netIncome)}
                      </td>
                      <td className="text-right py-3 px-4 font-medium">
                        {hasActuals
                          ? formatCurrency(
                              forecast.actualVsForecasted!.actualNetIncome!,
                            )
                          : "-"}
                      </td>
                      <td className="text-center py-3 px-4">
                        {accuracyScore !== null ? (
                          <div className="flex items-center justify-center">
                            <div className="w-16">
                              <Progress value={accuracyScore} className="h-2" />
                            </div>
                            <span className="ml-2 text-sm font-medium">
                              {accuracyScore.toFixed(0)}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Validation Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Alignment Analysis</CardTitle>
            <CardDescription>
              How well budgets align with economic forecasts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Revenue Forecasting</span>
                <div className="flex items-center gap-2">
                  <Progress value={88} className="w-24 h-2" />
                  <span className="text-sm font-medium">88%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Expense Planning</span>
                <div className="flex items-center gap-2">
                  <Progress value={94} className="w-24 h-2" />
                  <span className="text-sm font-medium">94%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Cash Flow Prediction
                </span>
                <div className="flex items-center gap-2">
                  <Progress value={79} className="w-24 h-2" />
                  <span className="text-sm font-medium">79%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Market Condition Factors
                </span>
                <div className="flex items-center gap-2">
                  <Progress value={86} className="w-24 h-2" />
                  <span className="text-sm font-medium">86%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Continuous Improvement</CardTitle>
            <CardDescription>
              Areas for forecast accuracy enhancement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Revenue Forecasting
                    </h4>
                    <p className="text-sm text-gray-600">
                      Consistently outperforming forecasts by 3.2% on average
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Expense Volatility
                    </h4>
                    <p className="text-sm text-gray-600">
                      Higher variance in operating expenses requires adjustment
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <TrendingDown className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Seasonal Adjustments
                    </h4>
                    <p className="text-sm text-gray-600">
                      Incorporate stronger seasonal patterns in Q1 forecasts
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
