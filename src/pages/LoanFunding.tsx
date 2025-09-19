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
import { ConnectionStatus } from "@/components/ui/connection-status";
import ModuleHeader from "@/components/ui/module-header";
import { useLoanData } from "@/hooks/useLoanData";
import { LoanEligibilityAssessment } from "@/components/loan/loan-eligibility";
import { FundingOptionsExplorer } from "@/components/loan/funding-options";
import { SmartLoanComparison } from "@/components/loan/loan-comparison";
import { ApplicationAssistance } from "@/components/loan/application-assistance";
import { FundingStrategyAnalysis } from "@/components/loan/funding-strategy";
import { InvestorMatchingEngine } from "@/components/loan/investor-matching";
import { LoanResearchUpdates } from "@/components/loan/loan-research";
import {
  DollarSign,
  TrendingUp,
  Users,
  FileText,
  Target,
  Search,
  Bell,
  Home,
  Briefcase,
  Calculator,
  BarChart3,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LoanFunding() {
  const {
    eligibility,
    fundingOptions,
    loanComparisons,
    applicationDocuments,
    businessPlan,
    fundingStrategy,
    investorMatches,
    loanUpdates,
    isLoading,
    isConnected,
    lastUpdated,
    error,
    refreshData,
    updateEligibility,
    updateDocumentStatus,
  } = useLoanData();

  const [activeTab, setActiveTab] = useState("overview");

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Connection Error</CardTitle>
            <CardDescription>
              Unable to load loan and funding data. Please check your connection
              and try again.
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

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LoadingSpinner isVisible={isLoading} />

      <ModuleHeader
        icon={<DollarSign className="h-6 w-6" />}
        title="Loan & Funding Hub"
        description="Complete financing solutions and funding opportunities for your business"
        isConnected={isConnected}
        lastUpdated={lastUpdated}
        onReconnect={refreshData}
        error={error}
        connectionLabel="Live"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-7 bg-white border text-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="eligibility"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Eligibility
            </TabsTrigger>
            <TabsTrigger
              value="options"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Options
            </TabsTrigger>
            <TabsTrigger
              value="comparison"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Compare
            </TabsTrigger>
            <TabsTrigger
              value="application"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Application
            </TabsTrigger>
            <TabsTrigger
              value="strategy"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Strategy
            </TabsTrigger>
            <TabsTrigger
              value="research"
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              Research
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">
                        Eligibility Score
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {eligibility.eligibilityScore}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Search className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">
                        Funding Options
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {fundingOptions.length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">
                        Investor Matches
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {investorMatches.length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-orange-600" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">New Updates</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {loanUpdates.filter((u) => u.urgency === "high").length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Eligibility Quick Check
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Business:</span>
                    <span className="font-medium">
                      {eligibility.businessName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Credit Score:</span>
                    <span className="font-bold text-blue-600">
                      {eligibility.creditScore}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Monthly Revenue:</span>
                    <span className="font-medium">
                      {formatCurrency(eligibility.monthlyRevenue)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Qualified Programs:</span>
                    <Badge variant="outline">
                      {eligibility.qualifiedPrograms.length}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => setActiveTab("eligibility")}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    View Full Assessment
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Top Funding Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {fundingOptions.slice(0, 3).map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm text-gray-600">
                          {option.provider}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          {option.interestRate === 0
                            ? "Equity"
                            : `${option.interestRate}%`}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatCurrency(option.maxAmount)} max
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={() => setActiveTab("options")}
                    variant="outline"
                    className="w-full"
                  >
                    Explore All Options
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-purple-600" />
                    Application Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Documents:</span>
                    <span className="font-medium">
                      {
                        applicationDocuments.filter(
                          (d) =>
                            d.status === "verified" || d.status === "uploaded",
                        ).length
                      }{" "}
                      of {applicationDocuments.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Business Plan:</span>
                    <span className="font-medium">
                      {businessPlan.completionPercentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Readiness Score:</span>
                    <span className="font-bold text-purple-600">
                      {fundingStrategy.readinessScore}%
                    </span>
                  </div>
                  <Button
                    onClick={() => setActiveTab("application")}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Continue Application
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-orange-600" />
                    Recent Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {loanUpdates.slice(0, 3).map((update) => (
                    <div key={update.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-sm">{update.title}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {update.source} •{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                        }).format(update.publishDate)}
                      </div>
                      <Badge
                        className={
                          update.urgency === "high"
                            ? "bg-red-100 text-red-800"
                            : update.urgency === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {update.urgency}
                      </Badge>
                    </div>
                  ))}
                  <Button
                    onClick={() => setActiveTab("research")}
                    variant="outline"
                    className="w-full"
                  >
                    View All Updates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="eligibility">
            <LoanEligibilityAssessment
              eligibility={eligibility}
              onUpdateEligibility={updateEligibility}
            />
          </TabsContent>

          <TabsContent value="options">
            <FundingOptionsExplorer fundingOptions={fundingOptions} />
          </TabsContent>

          <TabsContent value="comparison">
            <SmartLoanComparison loanComparisons={loanComparisons} />
          </TabsContent>

          <TabsContent value="application">
            <ApplicationAssistance
              applicationDocuments={applicationDocuments}
              businessPlan={businessPlan}
              eligibility={eligibility}
              onUpdateDocumentStatus={updateDocumentStatus}
            />
          </TabsContent>

          <TabsContent value="strategy">
            <div className="space-y-8">
              <FundingStrategyAnalysis fundingStrategy={fundingStrategy} />
              <InvestorMatchingEngine investorMatches={investorMatches} />
            </div>
          </TabsContent>

          <TabsContent value="research">
            <LoanResearchUpdates loanUpdates={loanUpdates} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
