import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModuleHeader from "@/components/ui/module-header";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  Activity,
  BarChart3,
  Download,
  Save,
  RefreshCw,
  AlertTriangle,
  Target,
  Zap,
  Shield,
  Globe,
  Building,
  Factory,
  PieChart,
  ArrowUp,
  ArrowDown,
  Minus,
  Brain,
  FileText,
} from "lucide-react";

const ImpactCalculator = () => {
  const [calculationType, setCalculationType] = useState("policy");
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);

  // Policy Impact Inputs
  const [policyInputs, setPolicyInputs] = useState({
    complianceCost: 75000,
    implementationTime: 8,
    affectedEmployees: 150,
    trainingCost: 25000,
    systemUpgrades: 50000,
    consultingFees: 35000,
    ongoingMaintenance: 15000,
    riskReduction: 75,
    regulatoryFines: 250000,
    reputationalImpact: "Medium",
  });

  // Economic Impact Inputs
  const [economicInputs, setEconomicInputs] = useState({
    gdpChange: 2.5,
    inflationRate: 3.2,
    interestRates: 4.5,
    unemploymentRate: 3.8,
    marketVolatility: 15,
    consumerConfidence: 120,
    businessInvestment: 1500000,
    tradeBalance: -25000,
    currencyStrength: 105,
    sectorImpact: "Technology",
  });

  // Pre-defined scenarios
  const policyScenarios = [
    {
      name: "GDPR Compliance",
      description: "Full GDPR compliance implementation",
      inputs: {
        complianceCost: 85000,
        implementationTime: 6,
        affectedEmployees: 200,
        trainingCost: 30000,
        systemUpgrades: 65000,
        consultingFees: 45000,
        ongoingMaintenance: 20000,
        riskReduction: 85,
        regulatoryFines: 500000,
        reputationalImpact: "High",
      }
    },
    {
      name: "SOX Compliance Update",
      description: "Sarbanes-Oxley compliance enhancement",
      inputs: {
        complianceCost: 120000,
        implementationTime: 10,
        affectedEmployees: 100,
        trainingCost: 40000,
        systemUpgrades: 80000,
        consultingFees: 60000,
        ongoingMaintenance: 25000,
        riskReduction: 90,
        regulatoryFines: 1000000,
        reputationalImpact: "High",
      }
    },
    {
      name: "Tax Rate Change",
      description: "Corporate tax rate increase impact",
      inputs: {
        complianceCost: 35000,
        implementationTime: 4,
        affectedEmployees: 50,
        trainingCost: 15000,
        systemUpgrades: 25000,
        consultingFees: 20000,
        ongoingMaintenance: 8000,
        riskReduction: 60,
        regulatoryFines: 150000,
        reputationalImpact: "Low",
      }
    }
  ];

  const economicScenarios = [
    {
      name: "Economic Recession",
      description: "Moderate economic downturn scenario",
      inputs: {
        gdpChange: -1.5,
        inflationRate: 2.1,
        interestRates: 2.0,
        unemploymentRate: 6.5,
        marketVolatility: 35,
        consumerConfidence: 85,
        businessInvestment: 800000,
        tradeBalance: -45000,
        currencyStrength: 95,
        sectorImpact: "All Sectors",
      }
    },
    {
      name: "Economic Growth",
      description: "Strong economic expansion scenario",
      inputs: {
        gdpChange: 4.2,
        inflationRate: 2.8,
        interestRates: 5.5,
        unemploymentRate: 2.8,
        marketVolatility: 8,
        consumerConfidence: 140,
        businessInvestment: 2200000,
        tradeBalance: 15000,
        currencyStrength: 115,
        sectorImpact: "Technology",
      }
    },
    {
      name: "Market Volatility",
      description: "High market uncertainty scenario",
      inputs: {
        gdpChange: 1.1,
        inflationRate: 4.5,
        interestRates: 6.0,
        unemploymentRate: 4.2,
        marketVolatility: 45,
        consumerConfidence: 95,
        businessInvestment: 1000000,
        tradeBalance: -18000,
        currencyStrength: 98,
        sectorImpact: "Financial Services",
      }
    }
  ];

  const calculateImpact = async () => {
    setIsCalculating(true);
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    if (calculationType === "policy") {
      const totalDirectCost = policyInputs.complianceCost + policyInputs.systemUpgrades + policyInputs.consultingFees;
      const totalOngoingCost = policyInputs.trainingCost + (policyInputs.ongoingMaintenance * 12);
      const totalImplementationCost = totalDirectCost + totalOngoingCost;
      const riskMitigationValue = (policyInputs.regulatoryFines * (policyInputs.riskReduction / 100));
      const netBenefit = riskMitigationValue - totalImplementationCost;
      const paybackPeriod = totalImplementationCost / (riskMitigationValue / 12);
      const complianceScore = Math.min(100, 60 + (policyInputs.riskReduction * 0.4));
      
      setResults({
        type: "policy",
        totalDirectCost,
        totalOngoingCost,
        totalImplementationCost,
        riskMitigationValue,
        netBenefit,
        paybackPeriod,
        complianceScore,
        timeToImplement: policyInputs.implementationTime,
        affectedEmployees: policyInputs.affectedEmployees,
        reputationalImpact: policyInputs.reputationalImpact,
      });
    } else {
      const gdpImpact = economicInputs.businessInvestment * (economicInputs.gdpChange / 100);
      const inflationAdjustment = economicInputs.businessInvestment * (economicInputs.inflationRate / 100);
      const interestCostImpact = economicInputs.businessInvestment * (economicInputs.interestRates / 100);
      const volatilityRisk = economicInputs.businessInvestment * (economicInputs.marketVolatility / 100);
      const consumerDemandMultiplier = economicInputs.consumerConfidence / 100;
      const netEconomicImpact = gdpImpact - inflationAdjustment - volatilityRisk;
      const adjustedBusinessValue = economicInputs.businessInvestment * consumerDemandMultiplier;
      const currencyImpact = (economicInputs.currencyStrength - 100) / 100 * economicInputs.businessInvestment;
      
      setResults({
        type: "economic",
        gdpImpact,
        inflationAdjustment,
        interestCostImpact,
        volatilityRisk,
        netEconomicImpact,
        adjustedBusinessValue,
        currencyImpact,
        confidenceLevel: economicInputs.consumerConfidence,
        sectorRisk: economicInputs.sectorImpact,
        unemploymentEffect: economicInputs.unemploymentRate,
      });
    }
    
    setIsCalculating(false);
  };

  const loadScenario = (scenario) => {
    if (calculationType === "policy") {
      setPolicyInputs(scenario.inputs);
    } else {
      setEconomicInputs(scenario.inputs);
    }
    setResults(null);
  };

  const resetCalculation = () => {
    setResults(null);
    if (calculationType === "policy") {
      setPolicyInputs({
        complianceCost: 75000,
        implementationTime: 8,
        affectedEmployees: 150,
        trainingCost: 25000,
        systemUpgrades: 50000,
        consultingFees: 35000,
        ongoingMaintenance: 15000,
        riskReduction: 75,
        regulatoryFines: 250000,
        reputationalImpact: "Medium",
      });
    } else {
      setEconomicInputs({
        gdpChange: 2.5,
        inflationRate: 3.2,
        interestRates: 4.5,
        unemploymentRate: 3.8,
        marketVolatility: 15,
        consumerConfidence: 120,
        businessInvestment: 1500000,
        tradeBalance: -25000,
        currencyStrength: 105,
        sectorImpact: "Technology",
      });
    }
  };

  const getImpactIcon = (value) => {
    if (value > 0) return <ArrowUp className="h-4 w-4 text-green-600" />;
    if (value < 0) return <ArrowDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getReputationColor = (impact) => {
    switch (impact) {
      case "High": return "text-red-600";
      case "Medium": return "text-orange-600";
      default: return "text-green-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ModuleHeader
        icon={<AlertTriangle className="h-6 w-6" />}
        title="Policy and Economic Impact"
        description="Policy analysis, economic impact assessment, and regulatory compliance impact calculations"
        showConnectionStatus={false}
      />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Calculator Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Impact Calculator Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  calculationType === "policy" ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setCalculationType("policy")}
              >
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-red-100 rounded-lg w-fit mx-auto mb-4">
                    <Shield className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Policy Impact Calculator</h3>
                  <p className="text-sm text-muted-foreground">
                    Calculate the cost and impact of regulatory compliance, policy changes, risk mitigation, and legal requirements
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  calculationType === "economic" ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setCalculationType("economic")}
              >
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
                    <Globe className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Economic Impact Calculator</h3>
                  <p className="text-sm text-muted-foreground">
                    Analyze the impact of economic factors like GDP, inflation, interest rates, and market conditions on business
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Pre-defined Scenarios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Scenario Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(calculationType === "policy" ? policyScenarios : economicScenarios).map((scenario, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{scenario.name}</h4>
                          <p className="text-xs text-muted-foreground">{scenario.description}</p>
                        </div>
                        <Badge variant="outline">Template</Badge>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => loadScenario(scenario)}
                      >
                        Load Scenario
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Calculator Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                {calculationType === "policy" ? "Policy Compliance Inputs" : "Economic Factors Inputs"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {calculationType === "policy" ? (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Compliance Cost ($)</label>
                        <input
                          type="number"
                          value={policyInputs.complianceCost}
                          onChange={(e) => setPolicyInputs({...policyInputs, complianceCost: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Implementation Time (months)</label>
                        <input
                          type="number"
                          value={policyInputs.implementationTime}
                          onChange={(e) => setPolicyInputs({...policyInputs, implementationTime: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Affected Employees</label>
                        <input
                          type="number"
                          value={policyInputs.affectedEmployees}
                          onChange={(e) => setPolicyInputs({...policyInputs, affectedEmployees: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Training Cost ($)</label>
                        <input
                          type="number"
                          value={policyInputs.trainingCost}
                          onChange={(e) => setPolicyInputs({...policyInputs, trainingCost: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">System Upgrades ($)</label>
                        <input
                          type="number"
                          value={policyInputs.systemUpgrades}
                          onChange={(e) => setPolicyInputs({...policyInputs, systemUpgrades: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Consulting Fees ($)</label>
                        <input
                          type="number"
                          value={policyInputs.consultingFees}
                          onChange={(e) => setPolicyInputs({...policyInputs, consultingFees: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Monthly Maintenance ($)</label>
                        <input
                          type="number"
                          value={policyInputs.ongoingMaintenance}
                          onChange={(e) => setPolicyInputs({...policyInputs, ongoingMaintenance: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Risk Reduction (%)</label>
                        <input
                          type="number"
                          value={policyInputs.riskReduction}
                          onChange={(e) => setPolicyInputs({...policyInputs, riskReduction: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Potential Regulatory Fines ($)</label>
                        <input
                          type="number"
                          value={policyInputs.regulatoryFines}
                          onChange={(e) => setPolicyInputs({...policyInputs, regulatoryFines: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Reputational Impact</label>
                        <select
                          value={policyInputs.reputationalImpact}
                          onChange={(e) => setPolicyInputs({...policyInputs, reputationalImpact: e.target.value})}
                          className="w-full px-3 py-2 border rounded-md"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">GDP Change (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={economicInputs.gdpChange}
                          onChange={(e) => setEconomicInputs({...economicInputs, gdpChange: parseFloat(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Inflation Rate (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={economicInputs.inflationRate}
                          onChange={(e) => setEconomicInputs({...economicInputs, inflationRate: parseFloat(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Interest Rates (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={economicInputs.interestRates}
                          onChange={(e) => setEconomicInputs({...economicInputs, interestRates: parseFloat(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Unemployment Rate (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={economicInputs.unemploymentRate}
                          onChange={(e) => setEconomicInputs({...economicInputs, unemploymentRate: parseFloat(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Market Volatility (%)</label>
                        <input
                          type="number"
                          value={economicInputs.marketVolatility}
                          onChange={(e) => setEconomicInputs({...economicInputs, marketVolatility: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Consumer Confidence Index</label>
                        <input
                          type="number"
                          value={economicInputs.consumerConfidence}
                          onChange={(e) => setEconomicInputs({...economicInputs, consumerConfidence: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Business Investment ($)</label>
                        <input
                          type="number"
                          value={economicInputs.businessInvestment}
                          onChange={(e) => setEconomicInputs({...economicInputs, businessInvestment: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Trade Balance ($000)</label>
                        <input
                          type="number"
                          value={economicInputs.tradeBalance}
                          onChange={(e) => setEconomicInputs({...economicInputs, tradeBalance: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Currency Strength Index</label>
                        <input
                          type="number"
                          value={economicInputs.currencyStrength}
                          onChange={(e) => setEconomicInputs({...economicInputs, currencyStrength: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Primary Sector Impact</label>
                        <select
                          value={economicInputs.sectorImpact}
                          onChange={(e) => setEconomicInputs({...economicInputs, sectorImpact: e.target.value})}
                          className="w-full px-3 py-2 border rounded-md"
                        >
                          <option value="Technology">Technology</option>
                          <option value="Financial Services">Financial Services</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Retail">Retail</option>
                          <option value="All Sectors">All Sectors</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
                
                <Button 
                  onClick={calculateImpact} 
                  disabled={isCalculating}
                  className="w-full"
                >
                  {isCalculating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Calculating Impact...
                    </>
                  ) : (
                    <>
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate {calculationType === "policy" ? "Policy" : "Economic"} Impact
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Impact Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!results ? (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ready to Calculate</h3>
                  <p className="text-muted-foreground">
                    Enter your {calculationType === "policy" ? "policy compliance" : "economic"} parameters and click "Calculate Impact" to see detailed analysis results.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {results.type === "policy" ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 border rounded">
                          <div className="text-2xl font-bold text-red-600">
                            ${results.totalImplementationCost.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Total Implementation Cost</div>
                        </div>
                        <div className="text-center p-4 border rounded">
                          <div className="text-2xl font-bold text-green-600">
                            ${results.riskMitigationValue.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Risk Mitigation Value</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Direct Implementation Cost</span>
                          <span className="font-medium">${results.totalDirectCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Annual Ongoing Cost</span>
                          <span className="font-medium">${results.totalOngoingCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Net Benefit/Cost</span>
                          <span className={`font-medium ${results.netBenefit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {getImpactIcon(results.netBenefit)}
                            ${Math.abs(results.netBenefit).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Payback Period</span>
                          <span className="font-medium">{results.paybackPeriod.toFixed(1)} months</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Compliance Score</span>
                          <Badge className="bg-green-100 text-green-800">
                            {results.complianceScore.toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Implementation Time</span>
                          <span className="font-medium">{results.timeToImplement} months</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Affected Employees</span>
                          <span className="font-medium">{results.affectedEmployees}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Reputational Impact</span>
                          <span className={`font-medium ${getReputationColor(results.reputationalImpact)}`}>
                            {results.reputationalImpact}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 border rounded">
                          <div className={`text-2xl font-bold ${results.netEconomicImpact > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {getImpactIcon(results.netEconomicImpact)}
                            ${Math.abs(results.netEconomicImpact).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Net Economic Impact</div>
                        </div>
                        <div className="text-center p-4 border rounded">
                          <div className="text-2xl font-bold text-blue-600">
                            ${results.adjustedBusinessValue.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Adjusted Business Value</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">GDP Impact</span>
                          <span className={`font-medium ${results.gdpImpact > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {getImpactIcon(results.gdpImpact)}
                            ${Math.abs(results.gdpImpact).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Inflation Adjustment</span>
                          <span className="font-medium text-orange-600">
                            -${results.inflationAdjustment.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Interest Cost Impact</span>
                          <span className="font-medium text-red-600">
                            -${results.interestCostImpact.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Volatility Risk</span>
                          <span className="font-medium text-red-600">
                            -${results.volatilityRisk.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Currency Impact</span>
                          <span className={`font-medium ${results.currencyImpact > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {getImpactIcon(results.currencyImpact)}
                            ${Math.abs(results.currencyImpact).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Consumer Confidence</span>
                          <span className="font-medium">{results.confidenceLevel} pts</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Primary Sector</span>
                          <Badge variant="outline">{results.sectorRisk}</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <span className="text-sm">Unemployment Effect</span>
                          <span className="font-medium">{results.unemploymentEffect}%</span>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Export Analysis
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Save Scenario
                    </Button>
                    <Link to="/strategy-builder">
                      <Button size="sm" className="flex-1">
                        <Target className="h-4 w-4 mr-2" />
                        Build Strategy
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Related Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Related Analysis Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link to="/policy-alerts">
                <Button variant="outline" className="w-full">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Policy Alerts
                </Button>
              </Link>
              <Link to="/risk-management">
                <Button variant="outline" className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Risk Management
                </Button>
              </Link>
              <Link to="/compliance-reports">
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Compliance Reports
                </Button>
              </Link>
              <Link to="/growth-planning">
                <Button variant="outline" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Growth Planning
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ImpactCalculator;
