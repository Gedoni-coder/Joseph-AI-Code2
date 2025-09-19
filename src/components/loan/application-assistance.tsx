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
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Upload,
  Zap,
  Target,
  CreditCard,
} from "lucide-react";
import {
  type ApplicationDocument,
  type BusinessPlan,
  type LoanEligibility,
} from "@/lib/loan-data";

interface ApplicationAssistanceProps {
  applicationDocuments: ApplicationDocument[];
  businessPlan: BusinessPlan;
  eligibility: LoanEligibility;
  onUpdateDocumentStatus: (
    docId: string,
    status: ApplicationDocument["status"],
  ) => void;
}

export function ApplicationAssistance({
  applicationDocuments,
  businessPlan,
  eligibility,
  onUpdateDocumentStatus,
}: ApplicationAssistanceProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "uploaded":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "uploaded":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "rejected":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "pending":
        return <FileText className="w-4 h-4 text-gray-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "required":
        return "bg-red-100 text-red-800";
      case "optional":
        return "bg-blue-100 text-blue-800";
      case "conditional":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const completedDocuments = applicationDocuments.filter(
    (doc) => doc.status === "verified" || doc.status === "uploaded",
  ).length;

  const completionPercentage = Math.round(
    (completedDocuments / applicationDocuments.length) * 100,
  );

  const generateBusinessPlan = () => {
    // Simulate business plan generation
    console.log("Generating business plan...");
  };

  const checkCreditScore = () => {
    // Simulate credit score check
    console.log("Checking credit score...");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Automated Loan Application Assistance
          </h2>
          <p className="text-gray-600">
            Streamline your application with automated document generation and
            guidance
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {completionPercentage}% Complete
        </Badge>
      </div>

      {/* Application Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Application Progress</CardTitle>
          <CardDescription className="text-blue-700">
            Track your loan application completion status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">Overall Completion</span>
            <span className="font-semibold text-blue-900">
              {completedDocuments} of {applicationDocuments.length} documents
            </span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {
                  applicationDocuments.filter((d) => d.status === "verified")
                    .length
                }
              </div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {
                  applicationDocuments.filter((d) => d.status === "uploaded")
                    .length
                }
              </div>
              <div className="text-sm text-gray-600">Uploaded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {
                  applicationDocuments.filter((d) => d.status === "pending")
                    .length
                }
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Generation Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Zap className="w-5 h-5 mr-2 text-blue-600" />
              Business Plan Generator
            </CardTitle>
            <CardDescription>AI-powered business plan creation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completion</span>
              <span className="font-semibold">
                {businessPlan.completionPercentage}%
              </span>
            </div>
            <Progress
              value={businessPlan.completionPercentage}
              className="h-2"
            />

            <div className="space-y-2">
              {businessPlan.sections.slice(0, 3).map((section) => (
                <div
                  key={section.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-700">{section.title}</span>
                  {section.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={generateBusinessPlan}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Generate Plan
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              Financial Projections
            </CardTitle>
            <CardDescription>Automated financial forecasting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue Model</span>
                <Badge variant="outline">SaaS</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Growth Rate</span>
                <span className="font-semibold">18.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Break-even</span>
                <span className="font-semibold">Month 14</span>
              </div>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Target className="w-4 h-4 mr-2" />
              Generate Projections
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
              Credit Score Check
            </CardTitle>
            <CardDescription>Real-time credit monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {eligibility.creditScore}
              </div>
              <div className="text-sm text-gray-600">Current Score</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium">2 days ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Credit Utilization</span>
                <span className="font-medium">23%</span>
              </div>
            </div>

            <Button
              onClick={checkCreditScore}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Update Score
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Document Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Document Checklist & Submission
          </CardTitle>
          <CardDescription>
            Required and optional documents for your loan application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applicationDocuments.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(document.status)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">
                        {document.name}
                      </h3>
                      <Badge className={getTypeColor(document.type)}>
                        {document.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {document.description}
                    </p>
                    {document.template && (
                      <p className="text-sm text-blue-600 mt-1">
                        Template: {document.template}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(document.status)}>
                    {document.status}
                  </Badge>

                  <div className="flex space-x-1">
                    {document.template && (
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Template
                      </Button>
                    )}

                    {document.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          onUpdateDocumentStatus(document.id, "uploaded")
                        }
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Upload className="w-3 h-3 mr-1" />
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submission Guidance */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">Submission Guidance</CardTitle>
          <CardDescription className="text-green-700">
            Tips to improve your application success rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-900 mb-2">
                Before Submitting
              </h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Ensure all required documents are complete</li>
                <li>• Review financial projections for accuracy</li>
                <li>• Verify business information is current</li>
                <li>• Check credit report for errors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900 mb-2">
                Success Tips
              </h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Apply to multiple lenders simultaneously</li>
                <li>• Highlight your business strengths</li>
                <li>• Prepare for follow-up questions</li>
                <li>• Consider getting a co-signer if needed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
