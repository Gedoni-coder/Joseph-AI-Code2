import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LoadingOverlay,
  MetricCardSkeleton,
} from "@/components/ui/loading-spinner";
import {
  ConnectionStatus,
  DataFreshness,
} from "@/components/ui/connection-status";
import ModuleHeader from "@/components/ui/module-header";
import { ContextSwitcher } from "@/components/economic/context-switcher";
import { MetricsDashboard } from "@/components/economic/metrics-dashboard";
import { EconomicTable } from "@/components/economic/economic-table";
import { ForecastPanel } from "@/components/economic/forecast-panel";
import { UpcomingEvents } from "@/components/economic/upcoming-events";
import { useEconomicData } from "@/hooks/useEconomicData";
import { EconomicContext } from "@/lib/economic-data";
import { cn } from "@/lib/utils";
import {
  Activity,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Calendar,
  BarChart3,
  Calculator,
  Wifi,
  Globe,
  Bell,
  Lightbulb,
  X,
} from "lucide-react";

const Index = () => {
  const [activeContext, setActiveContext] =
    useState<EconomicContext>("national");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [ideasOpen, setIdeasOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(true);
  const [lastDataUpdate, setLastDataUpdate] = useState(new Date());
  const [activeUpdates, setActiveUpdates] = useState<string[]>([]);

  const {
    metrics,
    news,
    forecasts,
    events,
    lastUpdated,
    isLoading,
    error,
    isConnected,
    refreshData,
    reconnect,
  } = useEconomicData();

  const currentMetrics = metrics[activeContext];
  const currentNews = news[activeContext];
  const currentForecasts = forecasts[activeContext];
  const currentEvents = events[activeContext];

  const handleRefresh = async () => {
    await refreshData(activeContext);
    // Show user feedback
    setTimeout(() => {
      alert(
        "Economic data refreshed successfully!\n\nUpdated:\n- All economic indicators\n- Market forecasts\n- Regional data\n- International trends",
      );
    }, 500);
  };

  // Real-time data streaming simulation
  useEffect(() => {
    if (!isStreaming) return;

    const streamInterval = setInterval(() => {
      // Simulate random data updates
      const updateTypes = ['metrics', 'news', 'forecasts'];
      const randomUpdate = updateTypes[Math.floor(Math.random() * updateTypes.length)];

      setActiveUpdates(prev => [...prev, randomUpdate]);
      setLastDataUpdate(new Date());

      // Clear update indicator after 3 seconds
      setTimeout(() => {
        setActiveUpdates(prev => prev.filter(update => update !== randomUpdate));
      }, 3000);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(streamInterval);
  }, [isStreaming]);

  const handleContextChange = async (newContext: EconomicContext) => {
    setActiveContext(newContext);
    // Fetch fresh data for the new context
    await refreshData(newContext);
    setLastDataUpdate(new Date());
  };

  const getContextTitle = (context: EconomicContext) => {
    const titles = {
      local: "Local Economic Dashboard",
      state: "State Economic Overview",
      national: "National Economic Indicators",
      international: "Global Economic Monitor",
    };
    return titles[context];
  };

  const getContextDescription = (context: EconomicContext) => {
    const descriptions = {
      local: "Real-time economic data and forecasts for your local area",
      state: "Comprehensive state-level economic analysis and trends",
      national: "Key national economic indicators and market insights",
      international: "Global economic trends and international market data",
    };
    return descriptions[context];
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <ModuleHeader
          icon={<Activity className="h-6 w-6" />}
          title={getContextTitle(activeContext)}
          description={getContextDescription(activeContext)}
          isConnected={isConnected}
          lastUpdated={lastUpdated}
          onReconnect={reconnect}
          error={error}
          connectionLabel={isStreaming ? "Live Streaming" : "Live"}
        />

        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Context Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <ContextSwitcher
              activeContext={activeContext}
              onContextChange={handleContextChange}
              isLoading={isLoading}
            />

            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant={isConnected ? "default" : "destructive"}
                className={cn(
                  "flex items-center gap-1 transition-all",
                  isStreaming && "animate-pulse"
                )}
              >
                {isConnected ? (
                  <Wifi className={cn("h-3 w-3", isStreaming && "animate-bounce")} />
                ) : (
                  <Activity className="h-3 w-3" />
                )}
                {isConnected ? "Live Streaming" : "Offline Mode"}
              </Badge>

              <Badge
                variant="outline"
                className={cn(
                  "flex items-center gap-1 transition-all",
                  activeUpdates.includes('metrics') && "bg-green-100 border-green-300 animate-pulse"
                )}
              >
                <TrendingUp className="h-3 w-3" />
                {currentMetrics.filter((m) => m.trend === "up").length} Trending Up
              </Badge>

              <Badge
                variant="secondary"
                className={cn(
                  "flex items-center gap-1",
                  activeUpdates.length > 0 && "animate-pulse bg-blue-100"
                )}
              >
                <Activity className="h-3 w-3" />
                {activeUpdates.length} Active Updates
              </Badge>

              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Updated {lastDataUpdate.toLocaleTimeString()}
              </Badge>

              {error && (
                <Badge
                  variant="destructive"
                  className="flex items-center gap-1 animate-pulse"
                >
                  <AlertTriangle className="h-3 w-3" />
                  Connection Issue
                </Badge>
              )}

              <button
                onClick={() => setIsStreaming(!isStreaming)}
                className={cn(
                  "text-xs px-2 py-1 rounded-md transition-all hover:scale-105",
                  isStreaming
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {isStreaming ? "🟢 Streaming" : "⏸️ Paused"}
              </button>
            </div>
          </div>

          {/* Key Metrics Dashboard - First */}
          <section>
            <LoadingOverlay
              isLoading={isLoading}
              loadingText="Updating metrics..."
            >
              <MetricsDashboard metrics={currentMetrics} />
            </LoadingOverlay>
          </section>

          {/* Economic News Table - Second */}
          <section>
            <LoadingOverlay
              isLoading={isLoading}
              loadingText="Fetching latest news..."
            >
              <EconomicTable news={currentNews} />
            </LoadingOverlay>
          </section>

          {/* Economic Forecasts - Third */}
          <section>
            <LoadingOverlay
              isLoading={isLoading}
              loadingText="Calculating forecasts..."
            >
              <ForecastPanel forecasts={currentForecasts} />
            </LoadingOverlay>
          </section>

          {/* Economic Alerts - Fourth */}
          <section>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-economic-warning" />
                  Market Alerts & Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-economic-positive/20 bg-economic-positive/5">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-economic-positive" />
                      <span className="text-sm font-medium text-economic-positive">
                        Positive Signal
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Manufacturing sector shows strong growth momentum with
                      increasing orders.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-economic-warning/20 bg-economic-warning/5">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-economic-warning" />
                      <span className="text-sm font-medium text-economic-warning">
                        Watch Signal
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Inflation indicators showing mixed signals requiring close
                      monitoring.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        Market Update
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Central bank maintains current monetary policy stance as
                      expected.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Additional Economic Insights - Fifth */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Economic Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Key Takeaways</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-economic-positive mt-2 flex-shrink-0" />
                        Economic growth maintains moderate pace with positive
                        employment trends
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-economic-warning mt-2 flex-shrink-0" />
                        Inflation pressures showing signs of moderation but
                        remain elevated
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        Market volatility expected to continue amid policy
                        uncertainty
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Outlook</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The economic landscape shows resilience despite global
                      headwinds. Continued monitoring of key indicators will be
                      essential for policy makers and market participants as we
                      navigate through changing economic conditions.
                    </p>
                    <div className="flex gap-2 pt-2">
                      <Badge variant="outline" className="text-xs">
                        Risk Assessment: Moderate
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Confidence: High
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Upcoming Economic Events - Sixth */}
          <section>
            <UpcomingEvents events={currentEvents} />
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/30 mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>© 2024 Economic Forecasting Platform</span>
                <span>•</span>
                <span>Data updated every 15 minutes</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  Sources: Federal Reserve, BLS, BEA, International
                  Organizations
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default Index;
