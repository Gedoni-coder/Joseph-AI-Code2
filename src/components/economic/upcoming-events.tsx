import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EconomicEvent } from "@/lib/economic-events";
import {
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  ExternalLink,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UpcomingEventsProps {
  events: EconomicEvent[];
  title?: string;
}

export function UpcomingEvents({
  events,
  title = "Upcoming Economic Events",
}: UpcomingEventsProps) {
  const getImportanceColor = (importance: EconomicEvent["importance"]) => {
    switch (importance) {
      case "high":
        return "bg-economic-negative text-economic-negative-foreground";
      case "medium":
        return "bg-economic-warning text-economic-warning-foreground";
      default:
        return "bg-economic-neutral text-economic-neutral-foreground";
    }
  };

  const getImpactIcon = (impact: EconomicEvent["impact"]) => {
    switch (impact) {
      case "bullish":
        return <TrendingUp className="h-4 w-4 text-economic-positive" />;
      case "bearish":
        return <TrendingDown className="h-4 w-4 text-economic-negative" />;
      default:
        return <Minus className="h-4 w-4 text-economic-neutral" />;
    }
  };

  const getTimeUntilEvent = (eventDate: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 0) {
      return "Past event";
    } else if (diffInHours < 24) {
      return `In ${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `In ${diffInDays}d`;
    }
  };

  const formatEventDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const isUpcoming = (date: Date) => {
    return date.getTime() > new Date().getTime();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const upcomingEvents = events.filter((event) => isUpcoming(event.date));
  const sortedEvents = upcomingEvents.sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {sortedEvents.length} upcoming
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            Set Alerts
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedEvents.slice(0, 6).map((event) => (
          <Card
            key={event.id}
            className={cn(
              "hover:shadow-md transition-all duration-200",
              isToday(event.date) && "ring-2 ring-primary ring-opacity-50",
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium leading-tight">
                    {event.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatEventDate(event.date)}</span>
                    {event.time && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getImpactIcon(event.impact)}
                  <Badge
                    size="sm"
                    className={cn(
                      "text-xs",
                      getImportanceColor(event.importance),
                    )}
                  >
                    {event.importance}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs">
                  <Badge variant="secondary" className="text-xs">
                    {event.category}
                  </Badge>
                  <span className="text-muted-foreground">
                    {getTimeUntilEvent(event.date)}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>

              {(event.previous || event.forecast || event.actual) && (
                <div className="border-t pt-3">
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    {event.previous && (
                      <div>
                        <p className="text-muted-foreground">Previous</p>
                        <p className="font-medium">{event.previous}</p>
                      </div>
                    )}
                    {event.forecast && (
                      <div>
                        <p className="text-muted-foreground">Forecast</p>
                        <p className="font-medium">{event.forecast}</p>
                      </div>
                    )}
                    {event.actual && (
                      <div>
                        <p className="text-muted-foreground">Actual</p>
                        <p className="font-medium">{event.actual}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-2">
                <span>Source: {event.source}</span>
                {isToday(event.date) && (
                  <div className="flex items-center gap-1 text-primary">
                    <AlertCircle className="h-3 w-3" />
                    <span>Today</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedEvents.length > 6 && (
        <div className="text-center pt-4">
          <Button variant="outline" className="w-full sm:w-auto">
            View All {sortedEvents.length} Upcoming Events
          </Button>
        </div>
      )}

      {sortedEvents.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium mb-2">No Upcoming Events</h4>
            <p className="text-sm text-muted-foreground max-w-md">
              There are currently no scheduled economic events for this context.
              Check back later for updates.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
