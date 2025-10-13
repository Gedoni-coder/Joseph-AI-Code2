import React, { useState } from "react";
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
import { Bell, Lightbulb, X } from "lucide-react";

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
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [ideasOpen, setIdeasOpen] = useState(false);

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
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Notifications</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50 rounded text-sm">
                      <p className="font-medium text-blue-800">Data Updated</p>
                      <p className="text-blue-600">New market data available</p>
                    </div>
                    <div className="p-2 bg-yellow-50 rounded text-sm">
                      <p className="font-medium text-yellow-800">Alert</p>
                      <p className="text-yellow-600">
                        Review required for forecast variance
                      </p>
                    </div>
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
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">AI Insights</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIdeasOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-purple-50 rounded text-sm">
                      <p className="font-medium text-purple-800">
                        Optimization Opportunity
                      </p>
                      <p className="text-purple-600">
                        Consider adjusting pricing strategy based on market
                        trends
                      </p>
                    </div>
                    <div className="p-2 bg-green-50 rounded text-sm">
                      <p className="font-medium text-green-800">
                        Performance Insight
                      </p>
                      <p className="text-green-600">
                        Revenue forecast accuracy has improved by 15%
                      </p>
                    </div>
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
