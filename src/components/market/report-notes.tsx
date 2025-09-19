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
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Share,
  Calendar,
  User,
} from "lucide-react";
import { type ReportNote } from "@/lib/market-data";

interface ReportNotesProps {
  reportNotes: ReportNote[];
}

export function ReportNotes({ reportNotes }: ReportNotesProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case "stable":
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      case "stable":
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Market Analysis Reports
          </h2>
          <p className="text-gray-600">
            Comprehensive insights, metrics, and strategic recommendations
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="space-y-6">
        {reportNotes.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{report.title}</CardTitle>
                  <CardDescription className="text-base">
                    {report.summary}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Badge variant="outline">
                    {report.confidence}% confidence
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-3 h-3 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 pt-2">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(report.dateGenerated)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{report.author}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Key Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Key Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {report.keyMetrics.map((metric, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg text-center"
                    >
                      <div className="text-sm text-gray-600 mb-1">
                        {metric.label}
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                          {metric.value}
                        </span>
                        {getTrendIcon(metric.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confidence Level */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Report Confidence Level</span>
                  <span className="font-medium">{report.confidence}%</span>
                </div>
                <Progress value={report.confidence} className="h-2" />
              </div>

              {/* Insights */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Key Insights
                </h3>
                <ul className="space-y-2">
                  {report.insights.map((insight, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-gray-700"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Strategic Recommendations
                </h3>
                <ul className="space-y-2">
                  {report.recommendations.map((recommendation, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-gray-700"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Steps */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Next Steps
                </h3>
                <ul className="space-y-2">
                  {report.nextSteps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-gray-700"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button variant="outline" className="flex-1">
                  View Full Report
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Create Action Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Summary Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">
            Market Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">
                {reportNotes.length}
              </div>
              <div className="text-sm text-blue-700">Reports Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">
                {Math.round(
                  reportNotes.reduce((acc, r) => acc + r.confidence, 0) /
                    reportNotes.length,
                )}
                %
              </div>
              <div className="text-sm text-blue-700">Avg Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">
                {reportNotes.reduce((acc, r) => acc + r.insights.length, 0)}
              </div>
              <div className="text-sm text-blue-700">Total Insights</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
