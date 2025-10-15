import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  Globe,
  TrendingUp,
  BarChart3,
  Target,
  DollarSign,
  CreditCard,
  Package,
  Calculator,
  AlertTriangle,
  Shield,
  Navigation,
} from "lucide-react";

const ModuleNavigation = () => {
  const location = useLocation();

  const modules = [
    {
      name: "Economic Forecasting",
      link: "/economic-indicators",
      icon: <Globe className="h-4 w-4" />,
      description: "Economic modeling and forecasting"
    },
    {
      name: "Business Forecasting", 
      link: "/business-forecast",
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Revenue and growth projections"
    },
    {
      name: "Market Analysis",
      link: "/market-competitive-analysis", 
      icon: <BarChart3 className="h-4 w-4" />,
      description: "Competitive intelligence and trends"
    },
    {
      name: "Pricing Strategy",
      link: "/pricing-strategies",
      icon: <Target className="h-4 w-4" />,
      description: "Dynamic pricing optimization"
    },
    {
      name: "Revenue Strategy",
      link: "/revenue-forecasting",
      icon: <DollarSign className="h-4 w-4" />,
      description: "Revenue optimization strategies"
    },
    {
      name: "Loan and Funding",
      link: "/loan-research",
      icon: <CreditCard className="h-4 w-4" />,
      description: "Funding and capital strategy"
    },
    {
      name: "Inventory and Supply Chain",
      link: "/supply-chain-analytics",
      icon: <Package className="h-4 w-4" />,
      description: "Supply chain optimization"
    },
    {
      name: "Financial Advisory",
      link: "/financial-advisory",
      icon: <Calculator className="h-4 w-4" />,
      description: "Strategic financial guidance"
    },
    {
      name: "Policy and Economic Impact",
      link: "/impact-calculator",
      icon: <AlertTriangle className="h-4 w-4" />,
      description: "Policy impact assessment"
    },
    {
      name: "Business Feasibility",
      link: "/business-feasibility",
      icon: <CheckCircle className="h-4 w-4" />,
      description: "Decide if a business idea is viable"
    },
    {
      name: "Tax and Compliance",
      link: "/tax-compliance",
      icon: <Shield className="h-4 w-4" />,
      description: "Tax optimization and compliance"
    },
  ];

  const currentModule = modules.find(module => module.link === location.pathname);
  const currentModuleName = currentModule ? currentModule.name : "Select Module";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full md:w-auto bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-blue-300 transition-all"
        >
          <Navigation className="h-4 w-4 mr-2" />
          {currentModuleName}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-white/95 backdrop-blur-sm border-gray-200" align="start">
        <DropdownMenuLabel className="flex items-center gap-2 text-blue-800 font-semibold">
          <Navigation className="h-4 w-4" />
          Joseph AI Modules
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="max-h-96 overflow-y-auto">
          {modules.map((module, index) => {
            const isCurrentPage = module.link === location.pathname;
            
            return (
              <DropdownMenuItem key={index} asChild>
                <Link 
                  to={module.link}
                  className={`flex items-start gap-3 p-3 cursor-pointer transition-all hover:bg-blue-50 ${
                    isCurrentPage ? "bg-blue-100 border-l-4 border-blue-500" : ""
                  }`}
                >
                  <div className={`p-1.5 rounded ${isCurrentPage ? "bg-blue-200 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                    {module.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium text-sm ${isCurrentPage ? "text-blue-800" : "text-gray-900"}`}>
                        {module.name}
                      </span>
                      {isCurrentPage && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 leading-tight">
                      {module.description}
                    </p>
                  </div>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link 
            to="/"
            className="flex items-center gap-2 p-3 cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            <Navigation className="h-4 w-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModuleNavigation;
