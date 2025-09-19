export interface BudgetForecast {
  id: string;
  period: string;
  type: "weekly" | "monthly" | "quarterly";
  revenue: number;
  expenses: number;
  netIncome: number;
  confidence: number;
  assumptions: string[];
  lastUpdated: string;
  variance: number;
  actualVsForecasted?: {
    actualRevenue?: number;
    actualExpenses?: number;
    actualNetIncome?: number;
  };
}

export interface CashFlowProjection {
  id: string;
  date: string;
  openingBalance: number;
  inflows: {
    operatingCash: number;
    accountsReceivable: number;
    otherIncome: number;
  };
  outflows: {
    operatingExpenses: number;
    accountsPayable: number;
    capitalExpenditure: number;
    debtService: number;
  };
  netCashFlow: number;
  closingBalance: number;
  liquidityRatio: number;
  daysOfCash: number;
}

export interface ScenarioTest {
  id: string;
  name: string;
  description: string;
  type: "stress" | "sensitivity" | "monte_carlo";
  parameters: {
    variable: string;
    baseValue: number;
    testValue: number;
    changePercent: number;
  }[];
  results: {
    revenue: number;
    expenses: number;
    netIncome: number;
    cashFlow: number;
    impactSeverity: "low" | "medium" | "high" | "critical";
  };
  probability: number;
  createdAt: string;
}

export interface RiskAssessment {
  id: string;
  category: "liquidity" | "credit" | "market" | "operational" | "regulatory";
  riskName: string;
  description: string;
  probability: number;
  impact: number;
  riskScore: number;
  currentMitigation: string[];
  recommendedActions: string[];
  status: "identified" | "monitoring" | "mitigating" | "resolved";
  lastReviewed: string;
}

export interface PerformanceDriver {
  id: string;
  name: string;
  category: "revenue" | "cost" | "efficiency" | "growth";
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: "improving" | "stable" | "declining";
  impact: "high" | "medium" | "low";
  linkedBudgetItems: string[];
  kpiHistory: {
    date: string;
    value: number;
  }[];
}

export interface AdvisoryInsight {
  id: string;
  type: "recommendation" | "alert" | "opportunity" | "risk";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category:
    | "investment"
    | "cost_optimization"
    | "revenue_growth"
    | "risk_management";
  financialImpact: {
    estimated: number;
    timeframe: string;
    confidence: number;
  };
  actionItems: string[];
  relatedMetrics: string[];
  createdAt: string;
  status: "new" | "reviewed" | "implemented" | "dismissed";
}

export interface BudgetAssumption {
  id: string;
  category: string;
  assumption: string;
  value: number;
  unit: string;
  confidence: number;
  source: string;
  impact: "high" | "medium" | "low";
  lastValidated: string;
}

export interface LiquidityMetric {
  metric: string;
  current: number;
  target: number;
  status: "healthy" | "warning" | "critical";
  trend: "improving" | "stable" | "declining";
}

// Mock data
export const mockBudgetForecasts: BudgetForecast[] = [
  {
    id: "forecast-1",
    period: "2024-Q1",
    type: "quarterly",
    revenue: 2500000,
    expenses: 1800000,
    netIncome: 700000,
    confidence: 85,
    assumptions: [
      "5% market growth",
      "3% price increase",
      "Stable customer base",
    ],
    lastUpdated: "2024-01-15T10:30:00Z",
    variance: 2.3,
    actualVsForecasted: {
      actualRevenue: 2580000,
      actualExpenses: 1750000,
      actualNetIncome: 830000,
    },
  },
  {
    id: "forecast-2",
    period: "2024-W03",
    type: "weekly",
    revenue: 192000,
    expenses: 138000,
    netIncome: 54000,
    confidence: 92,
    assumptions: ["Normal seasonal patterns", "No major disruptions"],
    lastUpdated: "2024-01-20T09:15:00Z",
    variance: -1.2,
  },
  {
    id: "forecast-3",
    period: "2024-02",
    type: "monthly",
    revenue: 820000,
    expenses: 590000,
    netIncome: 230000,
    confidence: 78,
    assumptions: ["Marketing campaign impact", "Inflation at 2.5%"],
    lastUpdated: "2024-01-25T14:45:00Z",
    variance: 4.1,
  },
];

export const mockCashFlowProjections: CashFlowProjection[] = [
  {
    id: "cf-1",
    date: "2024-01-29",
    openingBalance: 850000,
    inflows: {
      operatingCash: 320000,
      accountsReceivable: 180000,
      otherIncome: 25000,
    },
    outflows: {
      operatingExpenses: 220000,
      accountsPayable: 150000,
      capitalExpenditure: 80000,
      debtService: 45000,
    },
    netCashFlow: 30000,
    closingBalance: 880000,
    liquidityRatio: 2.8,
    daysOfCash: 67,
  },
  {
    id: "cf-2",
    date: "2024-02-05",
    openingBalance: 880000,
    inflows: {
      operatingCash: 295000,
      accountsReceivable: 165000,
      otherIncome: 15000,
    },
    outflows: {
      operatingExpenses: 235000,
      accountsPayable: 140000,
      capitalExpenditure: 0,
      debtService: 0,
    },
    netCashFlow: 100000,
    closingBalance: 980000,
    liquidityRatio: 3.2,
    daysOfCash: 74,
  },
];

export const mockScenarioTests: ScenarioTest[] = [
  {
    id: "scenario-1",
    name: "Revenue Drop Stress Test",
    description: "30% revenue decline scenario",
    type: "stress",
    parameters: [
      {
        variable: "Revenue",
        baseValue: 2500000,
        testValue: 1750000,
        changePercent: -30,
      },
    ],
    results: {
      revenue: 1750000,
      expenses: 1800000,
      netIncome: -50000,
      cashFlow: -320000,
      impactSeverity: "critical",
    },
    probability: 15,
    createdAt: "2024-01-20T11:00:00Z",
  },
  {
    id: "scenario-2",
    name: "Cost Inflation Impact",
    description: "15% increase in operating costs",
    type: "sensitivity",
    parameters: [
      {
        variable: "Operating Costs",
        baseValue: 1500000,
        testValue: 1725000,
        changePercent: 15,
      },
    ],
    results: {
      revenue: 2500000,
      expenses: 2025000,
      netIncome: 475000,
      cashFlow: 180000,
      impactSeverity: "medium",
    },
    probability: 35,
    createdAt: "2024-01-22T14:30:00Z",
  },
];

export const mockRiskAssessments: RiskAssessment[] = [
  {
    id: "risk-1",
    category: "liquidity",
    riskName: "Cash Flow Shortfall",
    description: "Potential cash flow gap during Q2 due to seasonal variations",
    probability: 65,
    impact: 80,
    riskScore: 52,
    currentMitigation: ["Line of credit established", "Daily cash monitoring"],
    recommendedActions: [
      "Increase credit facility",
      "Accelerate receivables collection",
    ],
    status: "monitoring",
    lastReviewed: "2024-01-25T16:00:00Z",
  },
  {
    id: "risk-2",
    category: "market",
    riskName: "Interest Rate Volatility",
    description: "Rising interest rates affecting debt service costs",
    probability: 75,
    impact: 60,
    riskScore: 45,
    currentMitigation: ["Fixed-rate debt portions", "Rate hedging instruments"],
    recommendedActions: [
      "Consider additional hedging",
      "Refinance variable debt",
    ],
    status: "mitigating",
    lastReviewed: "2024-01-23T10:15:00Z",
  },
];

export const mockPerformanceDrivers: PerformanceDriver[] = [
  {
    id: "driver-1",
    name: "Gross Margin",
    category: "revenue",
    currentValue: 28,
    targetValue: 32,
    unit: "%",
    trend: "improving",
    impact: "high",
    linkedBudgetItems: ["Revenue", "Cost of Goods Sold"],
    kpiHistory: [
      { date: "2024-01-01", value: 26.5 },
      { date: "2024-01-08", value: 27.2 },
      { date: "2024-01-15", value: 27.8 },
      { date: "2024-01-22", value: 28.0 },
    ],
  },
  {
    id: "driver-2",
    name: "Customer Acquisition Cost",
    category: "cost",
    currentValue: 145,
    targetValue: 120,
    unit: "$",
    trend: "declining",
    impact: "medium",
    linkedBudgetItems: ["Marketing Expenses", "Sales Expenses"],
    kpiHistory: [
      { date: "2024-01-01", value: 165 },
      { date: "2024-01-08", value: 158 },
      { date: "2024-01-15", value: 152 },
      { date: "2024-01-22", value: 145 },
    ],
  },
];

export const mockAdvisoryInsights: AdvisoryInsight[] = [
  {
    id: "insight-1",
    type: "recommendation",
    title: "Optimize Working Capital Management",
    description:
      "Reducing days sales outstanding by 5 days could improve cash flow by $280K",
    priority: "high",
    category: "cost_optimization",
    financialImpact: {
      estimated: 280000,
      timeframe: "90 days",
      confidence: 85,
    },
    actionItems: [
      "Implement automated invoicing system",
      "Offer early payment discounts",
      "Strengthen collection processes",
    ],
    relatedMetrics: ["Days Sales Outstanding", "Cash Flow"],
    createdAt: "2024-01-25T09:30:00Z",
    status: "new",
  },
  {
    id: "insight-2",
    type: "opportunity",
    title: "Strategic Investment in Automation",
    description: "ROI analysis shows 22% IRR for proposed automation project",
    priority: "medium",
    category: "investment",
    financialImpact: {
      estimated: 450000,
      timeframe: "24 months",
      confidence: 78,
    },
    actionItems: [
      "Conduct detailed feasibility study",
      "Secure capital allocation approval",
      "Develop implementation timeline",
    ],
    relatedMetrics: ["ROI", "Operational Efficiency"],
    createdAt: "2024-01-24T15:20:00Z",
    status: "reviewed",
  },
];

export const mockBudgetAssumptions: BudgetAssumption[] = [
  {
    id: "assumption-1",
    category: "Revenue",
    assumption: "Market growth rate",
    value: 5.2,
    unit: "%",
    confidence: 78,
    source: "Industry analysis & historical trends",
    impact: "high",
    lastValidated: "2024-01-20T12:00:00Z",
  },
  {
    id: "assumption-2",
    category: "Costs",
    assumption: "Inflation rate",
    value: 2.8,
    unit: "%",
    confidence: 85,
    source: "Federal Reserve projections",
    impact: "medium",
    lastValidated: "2024-01-22T14:30:00Z",
  },
];

export const mockLiquidityMetrics: LiquidityMetric[] = [
  {
    metric: "Current Ratio",
    current: 2.8,
    target: 2.5,
    status: "healthy",
    trend: "stable",
  },
  {
    metric: "Quick Ratio",
    current: 1.9,
    target: 1.5,
    status: "healthy",
    trend: "improving",
  },
  {
    metric: "Cash Reserves (Months)",
    current: 4.2,
    target: 3.0,
    status: "healthy",
    trend: "stable",
  },
  {
    metric: "Debt Service Coverage",
    current: 1.8,
    target: 1.25,
    status: "healthy",
    trend: "improving",
  },
];
