import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ModuleNavigation from "@/components/ui/module-navigation";
import { ConnectionStatus } from "@/components/ui/connection-status";
import { Bell, Lightbulb, X, Radio, AlertCircle, Zap, Target } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface ModuleHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isConnected?: boolean;
  lastUpdated?: Date;
  onReconnect?: () => void;
  error?: string | null;
  connectionLabel?: string;
  showConnectionStatus?: boolean;
  onConversationalModeChange?: (enabled: boolean) => void;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  icon,
  title,
  description,
  isConnected = true,
  lastUpdated,
  onReconnect,
  error,
  connectionLabel = "Live",
  showConnectionStatus = true,
  onConversationalModeChange,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [ideasOpen, setIdeasOpen] = useState(false);
  const [conversationalMode, setConversationalMode] = useState(true);

  const handleConversationalModeChange = (enabled: boolean) => {
    setConversationalMode(enabled);
    onConversationalModeChange?.(enabled);
  };

  return (
    <header className="bg-white/60 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-4">
          {/* Main Title Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl text-white">
              {icon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                {title}
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                {description}
              </p>
            </div>
          </div>

          {/* Navigation and Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ModuleNavigation />

              {/* Conversational Mode Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 px-2 py-1 hover:bg-primary/10 rounded transition-all cursor-pointer">
                    <Radio className="h-4 w-4 text-primary" />
                    <Switch
                      checked={conversationalMode}
                      onCheckedChange={handleConversationalModeChange}
                      className="scale-75"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{conversationalMode ? "Conversational Mode ON" : "Conversational Mode OFF"}</p>
                </TooltipContent>
              </Tooltip>

              {showConnectionStatus && (
                <div className="flex items-center gap-2">
                  <Badge
                    variant={isConnected ? "default" : "destructive"}
                    className={
                      isConnected
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : ""
                    }
                  >
                    {isConnected ? connectionLabel : "Offline"}
                  </Badge>
                  {lastUpdated && (
                    <span className="text-xs text-gray-500">
                      Updated {lastUpdated.toLocaleTimeString()}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Popover
                open={notificationsOpen}
                onOpenChange={setNotificationsOpen}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 relative"
                      >
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">Notifications</span>
                        <Badge
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                        >
                          2
                        </Badge>
                      </Button>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View recent notifications and alerts</p>
                  </TooltipContent>
                </Tooltip>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Notifications</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border bg-card">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Data Updated</p>
                            <p className="text-xs text-muted-foreground">New analysis data available</p>
                            <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg border bg-card">
                        <div className="flex items-start gap-3">
                          <Zap className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Alert</p>
                            <p className="text-xs text-muted-foreground">Review required for analysis variance</p>
                            <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link to="/notifications">
                      <Button variant="outline" className="w-full" size="sm">
                        View All Notifications
                      </Button>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Ideas */}
              <Popover open={ideasOpen} onOpenChange={setIdeasOpen}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Lightbulb className="h-4 w-4" />
                        <span className="hidden sm:inline">Ideas</span>
                      </Button>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>AI-powered suggestions and insights</p>
                  </TooltipContent>
                </Tooltip>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">AI Insights</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIdeasOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border bg-card">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Optimization Opportunity</p>
                            <p className="text-xs text-muted-foreground">Consider refining your analysis parameters</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg border bg-card">
                        <div className="flex items-start gap-3">
                          <Target className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Performance Insight</p>
                            <p className="text-xs text-muted-foreground">Analysis accuracy has improved significantly</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link to="/ai-insights">
                      <Button variant="outline" className="w-full" size="sm">
                        Generate More Ideas
                      </Button>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ModuleHeader;
