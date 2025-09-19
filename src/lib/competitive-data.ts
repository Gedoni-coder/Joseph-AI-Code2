export interface Competitor {
  id: string;
  name: string;
  type: "direct" | "indirect" | "substitute";
  marketShare: number;
  revenue: number;
  employees: number;
  founded: number;
  headquarters: string;
  website: string;
  description: string;
  keyProducts: string[];
  targetMarkets: string[];
  fundingStage: string;
  lastFunding?: number;
}

export interface SWOTAnalysis {
  id: string;
  competitor: string;
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
  overallScore: number;
  lastUpdated: Date;
}

export interface SWOTItem {
  factor: string;
  description: string;
  impact: "high" | "medium" | "low";
  confidence: number;
}

export interface ProductComparison {
  id: string;
  competitor: string;
  product: string;
  pricing: {
    model: string;
    startingPrice: number;
    enterprisePrice?: number;
    currency: string;
  };
  features: FeatureComparison[];
  strengths: string[];
  weaknesses: string[];
  marketPosition: "leader" | "challenger" | "niche" | "follower";
}

export interface FeatureComparison {
  feature: string;
  ourProduct: "excellent" | "good" | "basic" | "missing";
  competitor: "excellent" | "good" | "basic" | "missing";
  importance: "critical" | "important" | "nice-to-have";
  notes?: string;
}

export interface MarketPosition {
  id: string;
  competitor: string;
  position: {
    value: number; // 1-10 scale
    price: number; // 1-10 scale (1 = low price, 10 = high price)
    volume: number; // Market share percentage
  };
  quadrant: "leader" | "challenger" | "niche" | "follower";
  movement: "rising" | "stable" | "declining";
  keyDifferentiators: string[];
}

export interface CompetitiveAdvantage {
  id: string;
  type:
    | "technology"
    | "cost"
    | "service"
    | "brand"
    | "distribution"
    | "partnerships";
  advantage: string;
  description: string;
  sustainability: "high" | "medium" | "low";
  competitorResponse: string[];
  timeToReplicate: number; // months
  strategicImportance: "critical" | "important" | "moderate";
}

export interface StrategyRecommendation {
  id: string;
  category:
    | "positioning"
    | "product"
    | "pricing"
    | "marketing"
    | "partnerships";
  title: string;
  description: string;
  rationale: string;
  expectedImpact: "high" | "medium" | "low";
  implementationComplexity: "high" | "medium" | "low";
  timeframe: "immediate" | "short-term" | "long-term";
  resources: string[];
  metrics: string[];
  risks: string[];
}

// Mock data
export const competitors: Competitor[] = [
  {
    id: "1",
    name: "DataCorp Analytics",
    type: "direct",
    marketShare: 23.5,
    revenue: 1200000000,
    employees: 4500,
    founded: 2015,
    headquarters: "San Francisco, CA",
    website: "datacorp.com",
    description: "Leading enterprise analytics platform with AI capabilities",
    keyProducts: ["Enterprise Analytics", "AI Insights", "Data Visualization"],
    targetMarkets: ["Enterprise", "Fortune 500"],
    fundingStage: "Public",
    lastFunding: 250000000,
  },
  {
    id: "2",
    name: "CloudMetrics Pro",
    type: "direct",
    marketShare: 18.7,
    revenue: 890000000,
    employees: 3200,
    founded: 2017,
    headquarters: "Seattle, WA",
    website: "cloudmetrics.com",
    description: "Cloud-native analytics solution for modern businesses",
    keyProducts: ["Cloud Analytics", "Real-time Dashboards", "Mobile BI"],
    targetMarkets: ["Mid-market", "SMB", "Enterprise"],
    fundingStage: "Series D",
    lastFunding: 180000000,
  },
  {
    id: "3",
    name: "InsightFlow",
    type: "direct",
    marketShare: 12.3,
    revenue: 450000000,
    employees: 1800,
    founded: 2019,
    headquarters: "Austin, TX",
    website: "insightflow.com",
    description: "Self-service analytics platform for business users",
    keyProducts: ["Self-Service BI", "Automated Insights", "Data Preparation"],
    targetMarkets: ["SMB", "Mid-market"],
    fundingStage: "Series C",
    lastFunding: 125000000,
  },
  {
    id: "4",
    name: "TechGiant Analytics",
    type: "indirect",
    marketShare: 31.2,
    revenue: 2800000000,
    employees: 12000,
    founded: 2005,
    headquarters: "Mountain View, CA",
    website: "techgiant.com",
    description: "Part of larger tech ecosystem with analytics as one offering",
    keyProducts: ["Integrated Analytics", "Cloud Platform", "AI Services"],
    targetMarkets: ["Enterprise", "Government", "Global"],
    fundingStage: "Public",
  },
];

export const swotAnalyses: SWOTAnalysis[] = [
  {
    id: "1",
    competitor: "DataCorp Analytics",
    strengths: [
      {
        factor: "Market Leadership",
        description: "Dominant market position with strong brand recognition",
        impact: "high",
        confidence: 92,
      },
      {
        factor: "Enterprise Relationships",
        description: "Deep relationships with Fortune 500 companies",
        impact: "high",
        confidence: 88,
      },
      {
        factor: "Technical Capabilities",
        description: "Advanced AI and machine learning features",
        impact: "medium",
        confidence: 85,
      },
    ],
    weaknesses: [
      {
        factor: "Complex Implementation",
        description: "Long deployment cycles deterring mid-market customers",
        impact: "medium",
        confidence: 83,
      },
      {
        factor: "High Pricing",
        description: "Premium pricing limiting market penetration",
        impact: "medium",
        confidence: 90,
      },
    ],
    opportunities: [
      {
        factor: "Emerging Markets",
        description: "Untapped growth in developing regions",
        impact: "high",
        confidence: 75,
      },
      {
        factor: "AI Enhancement",
        description: "Expanding AI capabilities for competitive advantage",
        impact: "high",
        confidence: 88,
      },
    ],
    threats: [
      {
        factor: "New Entrants",
        description: "Agile startups with innovative approaches",
        impact: "medium",
        confidence: 82,
      },
      {
        factor: "Economic Downturn",
        description: "Reduced enterprise spending in recession",
        impact: "high",
        confidence: 70,
      },
    ],
    overallScore: 78,
    lastUpdated: new Date("2024-12-10T15:30:00"),
  },
];

export const productComparisons: ProductComparison[] = [
  {
    id: "1",
    competitor: "DataCorp Analytics",
    product: "Enterprise Analytics Platform",
    pricing: {
      model: "Per user/month + platform fee",
      startingPrice: 125,
      enterprisePrice: 250,
      currency: "USD",
    },
    features: [
      {
        feature: "Real-time Analytics",
        ourProduct: "excellent",
        competitor: "good",
        importance: "critical",
        notes: "Our real-time processing is 3x faster",
      },
      {
        feature: "AI/ML Capabilities",
        ourProduct: "good",
        competitor: "excellent",
        importance: "critical",
        notes: "They have more mature AI features",
      },
      {
        feature: "Data Visualization",
        ourProduct: "excellent",
        competitor: "good",
        importance: "important",
        notes: "Our charting library is more flexible",
      },
      {
        feature: "Mobile Access",
        ourProduct: "good",
        competitor: "basic",
        importance: "important",
      },
      {
        feature: "API Integration",
        ourProduct: "excellent",
        competitor: "good",
        importance: "critical",
      },
      {
        feature: "Custom Dashboards",
        ourProduct: "excellent",
        competitor: "excellent",
        importance: "critical",
      },
    ],
    strengths: [
      "Market leadership",
      "Enterprise features",
      "Brand recognition",
    ],
    weaknesses: [
      "High complexity",
      "Slow innovation",
      "Poor mobile experience",
    ],
    marketPosition: "leader",
  },
];

export const marketPositions: MarketPosition[] = [
  {
    id: "1",
    competitor: "DataCorp Analytics",
    position: { value: 8.2, price: 8.5, volume: 23.5 },
    quadrant: "leader",
    movement: "stable",
    keyDifferentiators: [
      "Enterprise-grade security",
      "Advanced AI capabilities",
      "Comprehensive feature set",
    ],
  },
  {
    id: "2",
    competitor: "CloudMetrics Pro",
    position: { value: 7.8, price: 6.2, volume: 18.7 },
    quadrant: "challenger",
    movement: "rising",
    keyDifferentiators: [
      "Cloud-native architecture",
      "Fast deployment",
      "Modern user interface",
    ],
  },
  {
    id: "3",
    competitor: "InsightFlow",
    position: { value: 6.8, price: 4.5, volume: 12.3 },
    quadrant: "niche",
    movement: "rising",
    keyDifferentiators: [
      "Self-service capabilities",
      "Affordable pricing",
      "Ease of use",
    ],
  },
  {
    id: "4",
    competitor: "Our Product",
    position: { value: 7.5, price: 5.8, volume: 8.2 },
    quadrant: "challenger",
    movement: "rising",
    keyDifferentiators: [
      "Real-time processing speed",
      "Flexible integrations",
      "Intuitive user experience",
    ],
  },
];

export const competitiveAdvantages: CompetitiveAdvantage[] = [
  {
    id: "1",
    type: "technology",
    advantage: "Real-time Processing Engine",
    description:
      "Proprietary technology delivering 3x faster real-time analytics processing than competitors",
    sustainability: "high",
    competitorResponse: [
      "Invest in infrastructure upgrades",
      "Acquire real-time technology companies",
    ],
    timeToReplicate: 18,
    strategicImportance: "critical",
  },
  {
    id: "2",
    type: "service",
    advantage: "Rapid Implementation Methodology",
    description:
      "Standardized deployment process reducing implementation time from 6 months to 6 weeks",
    sustainability: "medium",
    competitorResponse: [
      "Develop similar methodologies",
      "Increase implementation team size",
    ],
    timeToReplicate: 12,
    strategicImportance: "important",
  },
  {
    id: "3",
    type: "cost",
    advantage: "Efficient Cloud Architecture",
    description:
      "Optimized cloud infrastructure providing 40% cost savings compared to traditional architectures",
    sustainability: "medium",
    competitorResponse: [
      "Modernize infrastructure",
      "Renegotiate cloud contracts",
    ],
    timeToReplicate: 24,
    strategicImportance: "important",
  },
];

export const strategyRecommendations: StrategyRecommendation[] = [
  {
    id: "1",
    category: "positioning",
    title: "Emphasize Real-time Analytics Leadership",
    description:
      "Position ourselves as the real-time analytics leader, highlighting our 3x speed advantage",
    rationale:
      "Market research shows real-time capabilities are increasingly critical for competitive advantage",
    expectedImpact: "high",
    implementationComplexity: "low",
    timeframe: "immediate",
    resources: ["Marketing team", "Product marketing", "Sales enablement"],
    metrics: ["Brand awareness", "Win rate vs competitors", "Sales velocity"],
    risks: [
      "Competitors may challenge claims",
      "Need to maintain technical lead",
    ],
  },
  {
    id: "2",
    category: "product",
    title: "Accelerate AI Feature Development",
    description:
      "Fast-track AI/ML capabilities to close the gap with DataCorp Analytics",
    rationale:
      "AI is becoming table stakes; we risk losing deals without competitive AI features",
    expectedImpact: "high",
    implementationComplexity: "high",
    timeframe: "short-term",
    resources: ["Engineering team", "Data science team", "Product management"],
    metrics: [
      "Feature adoption",
      "Customer satisfaction",
      "Competitive win rate",
    ],
    risks: ["Resource constraints", "Technical complexity", "Time to market"],
  },
  {
    id: "3",
    category: "pricing",
    title: "Introduce Mid-market Pricing Tier",
    description:
      "Create a specialized pricing tier to better compete with InsightFlow in the mid-market",
    rationale:
      "Mid-market segment is growing fastest but we're losing deals to lower-priced competitors",
    expectedImpact: "medium",
    implementationComplexity: "medium",
    timeframe: "short-term",
    resources: ["Product team", "Sales team", "Finance"],
    metrics: ["Mid-market win rate", "Average deal size", "Market share"],
    risks: ["Cannibalization of enterprise deals", "Margin pressure"],
  },
];
