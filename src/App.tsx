import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatbotContainer } from "@/components/chatbot/chatbot-container";
import "@/lib/demo-explainable-elements";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import BusinessForecast from "./pages/BusinessForecast";
import TaxCompliance from "./pages/TaxCompliance";
import PricingStrategy from "./pages/PricingStrategy";
import RevenueStrategy from "./pages/RevenueStrategy";
import MarketCompetitiveAnalysis from "./pages/MarketCompetitiveAnalysis";
import LoanFunding from "./pages/LoanFunding";
import InventorySupplyChain from "./pages/InventorySupplyChain";
import FinancialAdvisory from "./pages/FinancialAdvisory";
import PolicyEconomicAnalysis from "./pages/PolicyEconomicAnalysis";
import BusinessFeasibility from "./pages/BusinessFeasibility";
import ImpactCalculator from "./pages/ImpactCalculator";
import AiInsights from "./pages/AiInsights";
import DocumentManager from "./pages/DocumentManager";
import GrowthPlanning from "./pages/GrowthPlanning";
import AllReports from "./pages/AllReports";
import Notifications from "./pages/Notifications";
import PolicyAlerts from "./pages/PolicyAlerts";
import StrategyBuilder from "./pages/StrategyBuilder";
import RiskManagement from "./pages/RiskManagement";
import ComplianceReports from "./pages/ComplianceReports";
import AuditReports from "./pages/AuditReports";
import AuditTrail from "./pages/AuditTrail";
import DocumentUpload from "./pages/DocumentUpload";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ChatbotContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          
          {/* Main 10 Module Routes - matching landing page links */}
          <Route path="/economic-indicators" element={<Index />} />
          <Route path="/business-forecast" element={<BusinessForecast />} />
          <Route path="/market-competitive-analysis" element={<MarketCompetitiveAnalysis />} />
          <Route path="/pricing-strategies" element={<PricingStrategy />} />
          <Route path="/revenue-forecasting" element={<RevenueStrategy />} />
          <Route path="/loan-research" element={<LoanFunding />} />
          <Route path="/supply-chain-analytics" element={<InventorySupplyChain />} />
          <Route path="/financial-advisory" element={<FinancialAdvisory />} />
          <Route path="/impact-calculator" element={<ImpactCalculator />} />
          <Route path="/tax-compliance" element={<TaxCompliance />} />
          <Route path="/business-feasibility" element={<BusinessFeasibility />} />
          
          {/* Additional Feature Routes */}
          <Route path="/ai-insights" element={<AiInsights />} />
          <Route path="/document-manager" element={<DocumentManager />} />
          <Route path="/growth-planning" element={<GrowthPlanning />} />
          <Route path="/all-reports" element={<AllReports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/policy-alerts" element={<PolicyAlerts />} />
          <Route path="/strategy-builder" element={<StrategyBuilder />} />
          <Route path="/risk-management" element={<RiskManagement />} />
          <Route path="/compliance-reports" element={<ComplianceReports />} />
          <Route path="/audit-reports" element={<AuditReports />} />
          <Route path="/audit-trail" element={<AuditTrail />} />
          <Route path="/document-upload" element={<DocumentUpload />} />
          
          {/* Legacy routes for backward compatibility */}
          <Route path="/pricing-strategy" element={<PricingStrategy />} />
          <Route path="/revenue-strategy" element={<RevenueStrategy />} />
          <Route path="/loan-funding" element={<LoanFunding />} />
          <Route path="/inventory-supply-chain" element={<InventorySupplyChain />} />
          <Route path="/InventorySupplyChain" element={<InventorySupplyChain />} />
          <Route path="/policy-economic-analysis" element={<PolicyEconomicAnalysis />} />
          
          {/* Catch-all route - MUST be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
