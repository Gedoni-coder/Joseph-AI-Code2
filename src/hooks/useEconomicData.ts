import { useState, useEffect, useCallback } from "react";

interface EconomicMetric {
  id: number;
  context: string;
  name: string;
  value: number;
  change: number;
  unit: string;
  trend: string;
  category: string;
}

interface EconomicNews {
  id: number;
  context: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  impact: string;
  category: string;
}

interface EconomicForecast {
  id: number;
  context: string;
  indicator: string;
  period: string;
  forecast: number;
  confidence: number;
  range_low: number;
  range_high: number;
}

interface EconomicEvent {
  id: number;
  context: string;
  title: string;
  date: string;
  description: string;
  impact: string;
  category: string;
}

interface EconomicDataState {
  metrics: Record<string, EconomicMetric[]>;
  news: Record<string, EconomicNews[]>;
  forecasts: Record<string, EconomicForecast[]>;
  events: Record<string, EconomicEvent[]>;
  lastUpdated: Date | null;
  isLoading: boolean;
  error: string | null;
}

function groupByContext<T extends { context: string }>(items: T[]): Record<string, T[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.context]) {
      acc[item.context] = [];
    }
    acc[item.context].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export function useEconomicData() {
  const [metrics, setMetrics] = useState<Record<string, EconomicMetric[]>>({});
  const [news, setNews] = useState<Record<string, EconomicNews[]>>({});
  const [forecasts, setForecasts] = useState<Record<string, EconomicForecast[]>>({});
  const [events, setEvents] = useState<Record<string, EconomicEvent[]>>({});
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = "http://localhost:8000/api/economic";

  const fetchMetrics = useCallback(async (): Promise<Record<string, EconomicMetric[]>> => {
    const response = await fetch(API_BASE_URL + "/metrics/");
    if (!response.ok) throw new Error("Failed to fetch economic metrics");
    const data = await response.json();
    return groupByContext<EconomicMetric>(data);
  }, []);

  const fetchNews = useCallback(async (): Promise<Record<string, EconomicNews[]>> => {
    const response = await fetch(API_BASE_URL + "/news/");
    if (!response.ok) throw new Error("Failed to fetch economic news");
    const data = await response.json();
    return groupByContext<EconomicNews>(data);
  }, []);

  const fetchForecasts = useCallback(async (): Promise<Record<string, EconomicForecast[]>> => {
    const response = await fetch(API_BASE_URL + "/forecasts/");
    if (!response.ok) throw new Error("Failed to fetch economic forecasts");
    const data = await response.json();
    return groupByContext<EconomicForecast>(data);
  }, []);

  const fetchEvents = useCallback(async (): Promise<Record<string, EconomicEvent[]>> => {
    const response = await fetch(API_BASE_URL + "/events/");
    if (!response.ok) throw new Error("Failed to fetch economic events");
    const data = await response.json();
    return groupByContext<EconomicEvent>(data);
  }, []);

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [metricsData, newsData, forecastsData, eventsData] = await Promise.all([
        fetchMetrics(),
        fetchNews(),
        fetchForecasts(),
        fetchEvents(),
      ]);
      setMetrics(metricsData);
      setNews(newsData);
      setForecasts(forecastsData);
      setEvents(eventsData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [fetchMetrics, fetchNews, fetchForecasts, fetchEvents]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return {
    metrics,
    news,
    forecasts,
    events,
    lastUpdated,
    isLoading,
    error,
    refreshData: fetchAllData,
  };
}
