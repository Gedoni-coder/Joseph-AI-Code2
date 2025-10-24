import React, { useState } from "react";
import { RiskAssessment } from "../../lib/financial-advisory-data";
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
  AlertTriangle,
  Shield,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
  DollarSign,
  CreditCard,
  BarChart3,
  Settings,
  FileText,
} from "lucide-react";

interface RiskAssessmentProps {
  riskAssessments: RiskAssessment[];
  onUpdateRiskStatus: (id: string, status: RiskAssessment["status"]) => void;
}

export function RiskAssessmentComponent({
  riskAssessments,
  onUpdateRiskStatus,
}: RiskAssessmentProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredRisks = riskAssessments.filter((risk) => {
    if (selectedCategory !== "all" && risk.category !== selectedCategory)
      return false;
    if (selectedStatus !== "all" && risk.status !== selectedStatus)
      return false;
    return true;
  });

  const getRiskScoreColor = (score: number) => {
    if (score >= 70) return "text-red-600 bg-red-100";
    if (score >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "identified":
        return "bg-blue-100 text-blue-800";
      case "monitoring":
        return "bg-yellow-100 text-yellow-800";
      case "mitigating":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "liquidity":
        return <DollarSign className="h-4 w-4" />;
      case "credit":
        return <CreditCard className="h-4 w-4" />;
      case "market":
        return <BarChart3 className="h-4 w-4" />;
      case "operational":
        return <Settings className="h-4 w-4" />;
      case "regulatory":
        return <FileText className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "identified":
        return <AlertTriangle className="h-4 w-4" />;
      case "monitoring":
        return <Eye className="h-4 w-4" />;
      case "mitigating":
        return <Shield className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <XCircle className="h-4 w-4" />;
    }
  };

  const riskDistribution = riskAssessments.reduce(
    (acc, risk) => {
      acc[risk.category] = (acc[risk.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const averageRiskScore =
    riskAssessments.reduce((sum, risk) => sum + risk.riskScore, 0) /
    riskAssessments.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Risk Assessment & Management
          </h2>
          <p className="text-gray-600">
            Identify, monitor, and mitigate financial risks
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="liquidity">Liquidity</SelectItem>
              <SelectItem value="credit">Credit</SelectItem>
              <SelectItem value="market">Market</SelectItem>
              <SelectItem value="operational">Operational</SelectItem>
              <SelectItem value="regulatory">Regulatory</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="identified">Identified</SelectItem>
              <SelectItem value="monitoring">Monitoring</SelectItem>
              <SelectItem value="mitigating">Mitigating</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Button>Add Risk</Button>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Risks</p>
                <p className="text-2xl font-bold text-blue-600">
                  {filteredRisks.length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  High Risk Items
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {filteredRisks.filter((r) => r.riskScore >= 70).length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Risk Score
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {averageRiskScore.toFixed(0)}
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
                  Resolved Risks
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    riskAssessments.filter((r) => r.status === "resolved")
                      .length
                  }
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment Table */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Register</CardTitle>
          <CardDescription>
            Comprehensive risk tracking with mitigation strategies and status
            monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Risk
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Category
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Probability
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Impact
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Risk Score
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Current Mitigation
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRisks.map((risk) => (
                  <tr key={risk.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-medium text-gray-900">
                          {risk.riskName}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          {risk.description}
                        </p>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {getCategoryIcon(risk.category)}
                        <Badge variant="secondary">{risk.category}</Badge>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex flex-col items-center">
                        <span className="font-medium">{risk.probability}%</span>
                        <Progress
                          value={risk.probability}
                          className="w-12 h-1 mt-1"
                        />
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex flex-col items-center">
                        <span className="font-medium">{risk.impact}</span>
                        <Progress
                          value={risk.impact}
                          className="w-12 h-1 mt-1"
                        />
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Badge className={getRiskScoreColor(risk.riskScore)}>
                        {risk.riskScore}
                      </Badge>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(risk.status)}
                        <Badge className={getStatusColor(risk.status)}>
                          {risk.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs">
                        {risk.currentMitigation
                          .slice(0, 2)
                          .map((mitigation, index) => (
                            <div
                              key={index}
                              className="text-sm text-gray-600 mb-1"
                            >
                              • {mitigation}
                            </div>
                          ))}
                        {risk.currentMitigation.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{risk.currentMitigation.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Select
                        value={risk.status}
                        onValueChange={(status) =>
                          onUpdateRiskStatus(
                            risk.id,
                            status as RiskAssessment["status"],
                          )
                        }
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="identified">Identified</SelectItem>
                          <SelectItem value="monitoring">Monitoring</SelectItem>
                          <SelectItem value="mitigating">Mitigating</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Risk Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Category Distribution</CardTitle>
            <CardDescription>Breakdown of risks by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(riskDistribution).map(([category, count]) => (
                <div
                  key={category}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    <span className="capitalize font-medium">{category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24">
                      <Progress
                        value={(count / riskAssessments.length) * 100}
                        className="h-2"
                      />
                    </div>
                    <span className="font-medium w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Mitigation Strategies</CardTitle>
            <CardDescription>
              Recommended actions for high-priority risks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRisks
                .filter((risk) => risk.riskScore >= 40)
                .slice(0, 4)
                .map((risk) => (
                  <div key={risk.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {risk.riskName}
                      </h4>
                      <Badge className={getRiskScoreColor(risk.riskScore)}>
                        {risk.riskScore}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Recommended Actions:
                      </p>
                      {risk.recommendedActions
                        .slice(0, 2)
                        .map((action, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-600 pl-2"
                          >
                            • {action}
                          </div>
                        ))}
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Last reviewed:{" "}
                      {risk.lastReviewed
                        ? new Date(risk.lastReviewed).toLocaleDateString()
                        : "N/A"}
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
