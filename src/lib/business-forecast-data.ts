export interface CustomerProfile {
  id: string;
  segment: string;
  demandAssumption: number;
  growthRate: number;
  retention: number;
  avgOrderValue: number;
  seasonality: number;
}

export interface RevenueProjection {
  id: string;
  period: string;
  projected: number;
  conservative: number;
  optimistic: number;
  actualToDate?: number;
  confidence: number;
}

export interface CostStructure {
  id: string;
  category: string;
  type: "COGS" | "Operating";
  amount: number;
  percentage: number;
  variability: "Fixed" | "Variable" | "Semi-Variable";
  trend: "up" | "down" | "stable";
}

export interface CashFlowForecast {
  id: string;
  month: string;
  cashInflow: number;
  cashOutflow: number;
  netCashFlow: number;
  cumulativeCash: number;
  workingCapital: number;
}

export interface KPI {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: "up" | "down" | "stable";
  category: string;
  frequency: string;
}

export interface ScenarioPlanning {
  id: string;
  scenario: "Best Case" | "Base Case" | "Worst Case";
  revenue: number;
  costs: number;
  profit: number;
  probability: number;
  keyAssumptions: string[];
}

// Mock Data
export const customerProfiles: CustomerProfile[] = [
  {
    id: "1",
    segment: "Enterprise",
    demandAssumption: 85,
    growthRate: 12.5,
    retention: 92,
    avgOrderValue: 25000,
    seasonality: 8,
  },
  {
    id: "2",
    segment: "SMB",
    demandAssumption: 280,
    growthRate: 25.6,
    retention: 78,
    avgOrderValue: 1200,
    seasonality: 22,
  },
];

export const revenueProjections: RevenueProjection[] = [
  {
    id: "1",
    period: "Q1 2025",
    projected: 2800000,
    conservative: 2520000,
    optimistic: 3220000,
    actualToDate: 2654000,
    confidence: 85,
  },
  {
    id: "2",
    period: "Q2 2025",
    projected: 3200000,
    conservative: 2880000,
    optimistic: 3680000,
    confidence: 78,
  },
];

export const kpis: KPI[] = [
  {
    id: "1",
    name: "Customer Acquisition Cost",
    current: 285,
    target: 250,
    unit: "USD",
    trend: "down",
    category: "Sales",
    frequency: "Monthly",
  },
  {
    id: "2",
    name: "Monthly Recurring Revenue",
    current: 185000,
    target: 220000,
    unit: "USD",
    trend: "up",
    category: "Revenue",
    frequency: "Monthly",
  },
];

export const scenarioPlanning: ScenarioPlanning[] = [
  {
    id: "1",
    scenario: "Best Case",
    revenue: 15200000,
    costs: 10640000,
    profit: 4560000,
    probability: 25,
    keyAssumptions: [
      "Market expansion accelerates",
      "New product launch succeeds",
    ],
  },
  {
    id: "2",
    scenario: "Base Case",
    revenue: 13700000,
    costs: 10275000,
    profit: 3425000,
    probability: 50,
    keyAssumptions: ["Steady market growth", "Current trends continue"],
  },
];

export const costStructure: CostStructure[] = [
  {
    id: "1",
    category: "Raw Materials",
    type: "COGS",
    amount: 850000,
    percentage: 32.5,
    variability: "Variable",
    trend: "up",
  },
  {
    id: "2",
    category: "Sales & Marketing",
    type: "Operating",
    amount: 480000,
    percentage: 18.3,
    variability: "Variable",
    trend: "up",
  },
];

export const cashFlowForecast: CashFlowForecast[] = [
  {
    id: "1",
    month: "Jan 2025",
    cashInflow: 2400000,
    cashOutflow: 2100000,
    netCashFlow: 300000,
    cumulativeCash: 1650000,
    workingCapital: 420000,
  },
  {
    id: "2",
    month: "Feb 2025",
    cashInflow: 2650000,
    cashOutflow: 2280000,
    netCashFlow: 370000,
    cumulativeCash: 2020000,
    workingCapital: 485000,
  },
];
