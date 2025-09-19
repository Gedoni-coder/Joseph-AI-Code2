import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
} from "lucide-react";
import { type RevenueStream } from "@/lib/revenue-data";

interface RevenueStreamsProps {
  streams: RevenueStream[];
}

const typeColors = {
  subscription: "bg-blue-100 text-blue-800",
  "one-time": "bg-green-100 text-green-800",
  "usage-based": "bg-purple-100 text-purple-800",
  commission: "bg-orange-100 text-orange-800",
  advertising: "bg-red-100 text-red-800",
};

export function RevenueStreams({ streams }: RevenueStreamsProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const totalCurrentRevenue = streams.reduce(
    (acc, stream) => acc + stream.currentRevenue,
    0,
  );
  const totalForecastRevenue = streams.reduce(
    (acc, stream) => acc + stream.forecastRevenue,
    0,
  );
  const overallGrowth =
    ((totalForecastRevenue - totalCurrentRevenue) / totalCurrentRevenue) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Revenue Streams</h2>
          <p className="text-gray-600">
            Track and analyze revenue performance across all channels
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Target className="w-4 h-4 mr-2" />
          Add Stream
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm text-blue-700">
                  Total Current Revenue
                </div>
                <div className="text-xl font-bold text-blue-900">
                  {formatCurrency(totalCurrentRevenue)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-sm text-green-700">Forecast Revenue</div>
                <div className="text-xl font-bold text-green-900">
                  {formatCurrency(totalForecastRevenue)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-sm text-purple-700">Expected Growth</div>
                <div className="text-xl font-bold text-purple-900">
                  {overallGrowth.toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-600" />
              <div>
                <div className="text-sm text-orange-700">Total Customers</div>
                <div className="text-xl font-bold text-orange-900">
                  {streams
                    .reduce((acc, s) => acc + s.customers, 0)
                    .toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {streams.map((stream) => (
          <Card key={stream.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{stream.name}</CardTitle>
                <Badge className={typeColors[stream.type]}>
                  {stream.type.replace("-", " ")}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Current Revenue</div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(stream.currentRevenue)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Forecast</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xl font-bold text-blue-600">
                      {formatCurrency(stream.forecastRevenue)}
                    </div>
                    {stream.growth > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Growth Target</span>
                  <span className="font-medium">{stream.growth}%</span>
                </div>
                <Progress
                  value={Math.min(100, stream.growth)}
                  className="h-2"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t">
                <div className="text-center">
                  <div className="text-xs text-gray-500">Customers</div>
                  <div className="font-semibold">
                    {stream.customers.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">ARPC</div>
                  <div className="font-semibold">
                    ${stream.avgRevenuePerCustomer.toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">Margin</div>
                  <div className="font-semibold">{stream.margin}%</div>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Optimize
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
