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
  isConnected: boolean;
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
  const [isConnected, setIsConnected] = useState(false);

  const RAW_API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() || "";
  const RAW_ECON_ENDPOINT = (import.meta.env.VITE_ECONOMIC_API_ENDPOINT as string | undefined)?.trim() || "";
  const API_BASE_URL = RAW_API_BASE && RAW_ECON_ENDPOINT ? `${RAW_API_BASE.replace(/\/$/, "")}${RAW_ECON_ENDPOINT.startsWith("/") ? RAW_ECON_ENDPOINT : `/${RAW_ECON_ENDPOINT}`}` : "";
  const HAS_VALID_API = /^https?:\/\//i.test(API_BASE_URL);
  const ECON_ENABLED = (import.meta.env.VITE_ECONOMIC_API_ENABLED as string | undefined)?.toLowerCase() === 'true';

  const fetchMetrics = useCallback(async (context?: string): Promise<Record<string, EconomicMetric[]>> => {
    try {
      if (!HAS_VALID_API) throw new Error("No economic API configured");
      const url = context
        ? `${API_BASE_URL}/metrics/?context=${encodeURIComponent(context)}`
        : `${API_BASE_URL}/metrics/`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch economic metrics");
      const data = await response.json();
      return groupByContext<EconomicMetric>(data);
    } catch {
      return getMockMetricsData();
    }
  }, []);

  const fetchNews = useCallback(async (context?: string): Promise<Record<string, EconomicNews[]>> => {
    try {
      if (!HAS_VALID_API) throw new Error("No economic API configured");
      const url = context
        ? `${API_BASE_URL}/news/?context=${encodeURIComponent(context)}`
        : `${API_BASE_URL}/news/`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch economic news");
      const data = await response.json();
      return groupByContext<EconomicNews>(data);
    } catch {
      return getMockNewsData();
    }
  }, []);

  const fetchForecasts = useCallback(async (context?: string): Promise<Record<string, EconomicForecast[]>> => {
    try {
      if (!HAS_VALID_API) throw new Error("No economic API configured");
      const url = context
        ? `${API_BASE_URL}/forecasts/?context=${encodeURIComponent(context)}`
        : `${API_BASE_URL}/forecasts/`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch economic forecasts");
      const data = await response.json();
      return groupByContext<EconomicForecast>(data);
    } catch {
      return getMockForecastsData();
    }
  }, []);

  const fetchEvents = useCallback(async (context?: string): Promise<Record<string, EconomicEvent[]>> => {
    try {
      if (!HAS_VALID_API) throw new Error("No economic API configured");
      const url = context
        ? `${API_BASE_URL}/events/?context=${encodeURIComponent(context)}`
        : `${API_BASE_URL}/events/`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch economic events");
      const data = await response.json();
      return groupByContext<EconomicEvent>(data);
    } catch {
      return getMockEventsData();
    }
  }, []);

  const fetchAllData = useCallback(async (context?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const [metricsData, newsData, forecastsData, eventsData] = await Promise.all([
        fetchMetrics(context),
        fetchNews(context),
        fetchForecasts(context),
        fetchEvents(context),
      ]);
      setMetrics(metricsData);
      setNews(newsData);
      setForecasts(forecastsData);
      setEvents(eventsData);
      setLastUpdated(new Date());
      setIsConnected(HAS_VALID_API);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [fetchMetrics, fetchNews, fetchForecasts, fetchEvents]);

  const reconnect = useCallback(async () => {
    setIsConnected(false);
    await fetchAllData();
  }, [fetchAllData]);

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
    isConnected,
    refreshData: fetchAllData,
    reconnect,
  };
}

// Mock data functions for fallback
function getMockMetricsData(): Record<string, EconomicMetric[]> {
  return {
    national: [
      {
        id: 1,
        context: 'national',
        name: 'GDP Growth',
        value: 2.3,
        change: 0.1,
        unit: '%',
        trend: 'up',
        category: 'Growth'
      },
      {
        id: 2,
        context: 'national',
        name: 'Inflation Rate',
        value: 3.1,
        change: -0.2,
        unit: '%',
        trend: 'down',
        category: 'Prices'
      },
      {
        id: 3,
        context: 'national',
        name: 'Unemployment Rate',
        value: 4.2,
        change: -0.3,
        unit: '%',
        trend: 'down',
        category: 'Employment'
      }
    ],
    international: [
      {
        id: 4,
        context: 'international',
        name: 'USD/EUR Exchange Rate',
        value: 1.085,
        change: -0.005,
        unit: 'USD/EUR',
        trend: 'down',
        category: 'Currency'
      },
      {
        id: 5,
        context: 'international',
        name: 'Global PMI',
        value: 52.3,
        change: 1.2,
        unit: 'Index',
        trend: 'up',
        category: 'Manufacturing'
      }
    ]
  };
}

function getMockNewsData(): Record<string, EconomicNews[]> {
  return {
    national: [
      {
        id: 1,
        context: 'national',
        title: 'Federal Reserve Maintains Interest Rates',
        summary: 'The Federal Reserve decided to keep interest rates unchanged at 5.25-5.50% following December FOMC meeting.',
        source: 'Federal Reserve',
        timestamp: new Date().toISOString(),
        impact: 'neutral',
        category: 'Monetary Policy'
      },
      {
        id: 2,
        context: 'national',
        title: 'GDP Growth Exceeds Expectations',
        summary: 'Third quarter economic growth outpaces forecasts, driven by consumer spending and business investment.',
        source: 'Bureau of Economic Analysis',
        timestamp: new Date().toISOString(),
        impact: 'positive',
        category: 'Economic Growth'
      }
    ]
  };
}

function getMockForecastsData(): Record<string, EconomicForecast[]> {
  return {
    national: [
      {
        id: 1,
        context: 'national',
        indicator: 'GDP Growth Q4 2024',
        period: 'Q4 2024',
        forecast: 2.1,
        confidence: 75,
        range_low: 1.8,
        range_high: 2.4
      }
    ]
  };
}

function getMockEventsData(): Record<string, EconomicEvent[]> {
  return {
    national: [
      {
        id: 1,
        context: 'national',
        title: 'Federal Reserve FOMC Meeting',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Federal Open Market Committee meeting to decide on monetary policy.',
        impact: 'high',
        category: 'Monetary Policy'
      }
    ]
  };
}
