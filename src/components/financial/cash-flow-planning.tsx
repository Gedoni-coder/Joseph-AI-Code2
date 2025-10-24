import React, { useState } from "react";
import {
  CashFlowProjection,
  LiquidityMetric,
} from "../../lib/financial-advisory-data";
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
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  Calendar,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
} from "lucide-react";

interface CashFlowPlanningProps {
  cashFlowProjections: CashFlowProjection[];
  liquidityMetrics: LiquidityMetric[];
  onAddProjection: (projection: Omit<CashFlowProjection, "id">) => void;
}

export function CashFlowPlanning({
  cashFlowProjections,
  liquidityMetrics,
  onAddProjection,
}: CashFlowPlanningProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("weekly");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600 bg-green-100";
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "critical":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <span className="h-4 w-4 text-gray-400">—</span>;
    }
  };

  const totalInflows = cashFlowProjections.reduce(
    (sum, proj) =>
      sum +
      proj.inflows.operatingCash +
      proj.inflows.accountsReceivable +
      proj.inflows.otherIncome,
    0,
  );

  const totalOutflows = cashFlowProjections.reduce(
    (sum, proj) =>
      sum +
      proj.outflows.operatingExpenses +
      proj.outflows.accountsPayable +
      proj.outflows.capitalExpenditure +
      proj.outflows.debtService,
    0,
  );

  const averageLiquidity =
    cashFlowProjections.reduce((sum, proj) => sum + proj.liquidityRatio, 0) /
    cashFlowProjections.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Cash Flow Planning & Liquidity Management
          </h2>
          <p className="text-gray-600">
            Near-term cash forecasts and liquidity monitoring
          </p>
        </div>
        <Button>Create Projection</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Cash Inflows
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalInflows)}
                </p>
              </div>
              <ArrowUpCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Cash Outflows
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalOutflows)}
                </p>
              </div>
              <ArrowDownCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Liquidity Ratio
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {averageLiquidity.toFixed(1)}
                </p>
              </div>
              <Wallet className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Cash Reserves
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(cashFlowProjections[0]?.daysOfCash || 0)} days
                </p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liquidity Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Liquidity Health Metrics</CardTitle>
          <CardDescription>
            Key liquidity ratios and cash reserve monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liquidityMetrics.map((metric, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">
                    {metric.metric}
                  </span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(metric.trend)}
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current: {metric.current.toFixed(2)}</span>
                    <span>Target: {metric.target.toFixed(2)}</span>
                  </div>
                  <Progress
                    value={Math.min(
                      100,
                      (metric.current / metric.target) * 100,
                    )}
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow Projections */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Projections</CardTitle>
          <CardDescription>
            Weekly and daily cash flow forecasts with liquidity analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Date
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Opening Balance
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Total Inflows
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Total Outflows
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Net Cash Flow
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    Closing Balance
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Liquidity Ratio
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Days of Cash
                  </th>
                </tr>
              </thead>
              <tbody>
                {cashFlowProjections.map((projection) => {
                  const totalInflow =
                    projection.inflows.operatingCash +
                    projection.inflows.accountsReceivable +
                    projection.inflows.otherIncome;
                  const totalOutflow =
                    projection.outflows.operatingExpenses +
                    projection.outflows.accountsPayable +
                    projection.outflows.capitalExpenditure +
                    projection.outflows.debtService;

                  return (
                    <tr
                      key={projection.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">
                            {new Date(projection.date).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 font-medium">
                        {formatCurrency(projection.openingBalance)}
                      </td>
                      <td className="text-right py-3 px-4 font-medium text-green-600">
                        {formatCurrency(totalInflow)}
                      </td>
                      <td className="text-right py-3 px-4 font-medium text-red-600">
                        {formatCurrency(totalOutflow)}
                      </td>
                      <td className="text-right py-3 px-4 font-medium">
                        <span
                          className={
                            projection.netCashFlow >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {formatCurrency(projection.netCashFlow)}
                        </span>
                      </td>
                      <td className="text-right py-3 px-4 font-bold">
                        {formatCurrency(projection.closingBalance)}
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge
                          className={
                            projection.liquidityRatio >= 2.5
                              ? "bg-green-100 text-green-800"
                              : projection.liquidityRatio >= 1.5
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {projection.liquidityRatio.toFixed(1)}
                        </Badge>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-medium">
                            {projection.daysOfCash}
                          </span>
                          {projection.daysOfCash < 30 && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
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

      {/* Cash Flow Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cash Inflows Breakdown</CardTitle>
            <CardDescription>Sources of cash generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cashFlowProjections.slice(0, 3).map((projection) => (
                <div key={projection.id} className="space-y-3">
                  <h4 className="font-medium text-gray-900">
                    {projection.date
                      ? new Date(projection.date).toLocaleDateString()
                      : "N/A"}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Operating Cash
                      </span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(projection.inflows.operatingCash)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Accounts Receivable
                      </span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(projection.inflows.accountsReceivable)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Other Income
                      </span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(projection.inflows.otherIncome)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cash Outflows Breakdown</CardTitle>
            <CardDescription>Cash utilization and commitments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cashFlowProjections.slice(0, 3).map((projection) => (
                <div key={projection.id} className="space-y-3">
                  <h4 className="font-medium text-gray-900">
                    {projection.date
                      ? new Date(projection.date).toLocaleDateString()
                      : "N/A"}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Operating Expenses
                      </span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(projection.outflows.operatingExpenses)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Accounts Payable
                      </span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(projection.outflows.accountsPayable)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Capital Expenditure
                      </span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(projection.outflows.capitalExpenditure)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Debt Service
                      </span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(projection.outflows.debtService)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
