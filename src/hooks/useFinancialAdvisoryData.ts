import { useState, useEffect } from "react";
import {
  BudgetForecast,
  CashFlowProjection,
  ScenarioTest,
  RiskAssessment,
  PerformanceDriver,
  AdvisoryInsight,
  BudgetAssumption,
  LiquidityMetric,
  mockBudgetForecasts,
  mockCashFlowProjections,
  mockScenarioTests,
  mockRiskAssessments,
  mockPerformanceDrivers,
  mockAdvisoryInsights,
  mockBudgetAssumptions,
  mockLiquidityMetrics,
} from "../lib/financial-advisory-data";

export function useFinancialAdvisoryData() {
  const [budgetForecasts, setBudgetForecasts] =
    useState<BudgetForecast[]>(mockBudgetForecasts);
  const [cashFlowProjections, setCashFlowProjections] = useState<
    CashFlowProjection[]
  >(mockCashFlowProjections);
  const [scenarioTests, setScenarioTests] =
    useState<ScenarioTest[]>(mockScenarioTests);
  const [riskAssessments, setRiskAssessments] =
    useState<RiskAssessment[]>(mockRiskAssessments);
  const [performanceDrivers, setPerformanceDrivers] = useState<
    PerformanceDriver[]
  >(mockPerformanceDrivers);
  const [advisoryInsights, setAdvisoryInsights] =
    useState<AdvisoryInsight[]>(mockAdvisoryInsights);
  const [budgetAssumptions, setBudgetAssumptions] = useState<
    BudgetAssumption[]
  >(mockBudgetAssumptions);
  const [liquidityMetrics, setLiquidityMetrics] =
    useState<LiquidityMetric[]>(mockLiquidityMetrics);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLastUpdated(now);

      // Update budget forecasts with new variance data
      setBudgetForecasts((prev) =>
        prev.map((forecast) => ({
          ...forecast,
          variance: forecast.variance + (Math.random() - 0.5) * 0.5,
          confidence: Math.max(
            60,
            Math.min(95, forecast.confidence + (Math.random() - 0.5) * 2),
          ),
          lastUpdated: now.toISOString(),
        })),
      );

      // Update cash flow projections
      setCashFlowProjections((prev) =>
        prev.map((projection) => ({
          ...projection,
          liquidityRatio: Math.max(
            1.5,
            projection.liquidityRatio + (Math.random() - 0.5) * 0.1,
          ),
          daysOfCash: Math.max(
            30,
            projection.daysOfCash + Math.floor((Math.random() - 0.5) * 3),
          ),
        })),
      );

      // Update performance drivers
      setPerformanceDrivers((prev) =>
        prev.map((driver) => ({
          ...driver,
          currentValue: Math.max(
            0,
            driver.currentValue + (Math.random() - 0.5) * 0.5,
          ),
          kpiHistory: [
            ...driver.kpiHistory.slice(-6),
            {
              date: new Date().toISOString().split("T")[0],
              value: Math.max(
                0,
                driver.currentValue + (Math.random() - 0.5) * 1,
              ),
            },
          ],
        })),
      );

      // Update liquidity metrics
      setLiquidityMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          current: Math.max(0, metric.current + (Math.random() - 0.5) * 0.05),
        })),
      );
    }, 5000);

    // Initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const createBudgetForecast = (
    forecast: Omit<BudgetForecast, "id" | "lastUpdated">,
  ) => {
    const newForecast: BudgetForecast = {
      ...forecast,
      id: `forecast-${Date.now()}`,
      lastUpdated: new Date().toISOString(),
    };
    setBudgetForecasts((prev) => [newForecast, ...prev]);
    return newForecast;
  };

  const updateBudgetAssumption = (
    id: string,
    updates: Partial<BudgetAssumption>,
  ) => {
    setBudgetAssumptions((prev) =>
      prev.map((assumption) =>
        assumption.id === id
          ? {
              ...assumption,
              ...updates,
              lastValidated: new Date().toISOString(),
            }
          : assumption,
      ),
    );
  };

  const runScenarioTest = (
    scenario: Omit<ScenarioTest, "id" | "createdAt">,
  ) => {
    const newScenario: ScenarioTest = {
      ...scenario,
      id: `scenario-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setScenarioTests((prev) => [newScenario, ...prev]);
    return newScenario;
  };

  const updateRiskStatus = (id: string, status: RiskAssessment["status"]) => {
    setRiskAssessments((prev) =>
      prev.map((risk) =>
        risk.id === id
          ? { ...risk, status, lastReviewed: new Date().toISOString() }
          : risk,
      ),
    );
  };

  const updateInsightStatus = (
    id: string,
    status: AdvisoryInsight["status"],
  ) => {
    setAdvisoryInsights((prev) =>
      prev.map((insight) =>
        insight.id === id ? { ...insight, status } : insight,
      ),
    );
  };

  const addCashFlowProjection = (
    projection: Omit<CashFlowProjection, "id">,
  ) => {
    const newProjection: CashFlowProjection = {
      ...projection,
      id: `cf-${Date.now()}`,
    };
    setCashFlowProjections((prev) => [newProjection, ...prev]);
    return newProjection;
  };

  return {
    // Data
    budgetForecasts,
    cashFlowProjections,
    scenarioTests,
    riskAssessments,
    performanceDrivers,
    advisoryInsights,
    budgetAssumptions,
    liquidityMetrics,

    // State
    isLoading,
    error,
    lastUpdated,

    // Actions
    createBudgetForecast,
    updateBudgetAssumption,
    runScenarioTest,
    updateRiskStatus,
    updateInsightStatus,
    addCashFlowProjection,
  };
}
