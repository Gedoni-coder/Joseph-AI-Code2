from django.core.management.base import BaseCommand
from revenue_strategy.models import (
    RevenueStream,
    RevenueScenario,
    ChurnReason,
    ChurnAnalysis,
    UpsellOpportunity,
    RevenueMetric,
    DiscountAnalysis,
    ChannelPerformance,
)

class Command(BaseCommand):
    help = 'Populate initial revenue strategy data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        RevenueStream.objects.all().delete()
        RevenueScenario.objects.all().delete()
        ChurnReason.objects.all().delete()
        ChurnAnalysis.objects.all().delete()
        UpsellOpportunity.objects.all().delete()
        RevenueMetric.objects.all().delete()
        DiscountAnalysis.objects.all().delete()
        ChannelPerformance.objects.all().delete()

        # Populate RevenueStreams
        streams = [
            {
                "name": "SaaS Subscriptions",
                "type": "subscription",
                "current_revenue": 2840000,
                "forecast_revenue": 3420000,
                "growth": 20.4,
                "margin": 78.5,
                "customers": 1247,
                "avg_revenue_per_customer": 2278,
            },
            {
                "name": "Professional Services",
                "type": "one-time",
                "current_revenue": 920000,
                "forecast_revenue": 1150000,
                "growth": 25.0,
                "margin": 45.2,
                "customers": 186,
                "avg_revenue_per_customer": 4946,
            },
            {
                "name": "API Usage",
                "type": "usage-based",
                "current_revenue": 486000,
                "forecast_revenue": 683000,
                "growth": 40.5,
                "margin": 85.1,
                "customers": 2341,
                "avg_revenue_per_customer": 208,
            },
            {
                "name": "Marketplace Commission",
                "type": "commission",
                "current_revenue": 1560000,
                "forecast_revenue": 1950000,
                "growth": 25.0,
                "margin": 92.3,
                "customers": 856,
                "avg_revenue_per_customer": 1822,
            },
        ]
        for stream_data in streams:
            RevenueStream.objects.create(**stream_data)

        # Populate RevenueScenarios
        scenarios = [
            {
                "name": "Optimistic Growth",
                "description": "Strong market conditions with successful product launches",
                "probability": 25,
                "timeframe": "Next 12 months",
                "total_revenue": 8950000,
                "revenue_growth": 45.2,
                "key_assumptions": [
                    "New product launch succeeds",
                    "Market expansion in 3 regions",
                    "Competitor loses market share",
                ],
                "risks": ["Economic downturn", "Increased competition"],
            },
            {
                "name": "Base Case",
                "description": "Expected performance under normal market conditions",
                "probability": 50,
                "timeframe": "Next 12 months",
                "total_revenue": 7200000,
                "revenue_growth": 28.6,
                "key_assumptions": [
                    "Current growth rate maintained",
                    "No major market disruptions",
                    "Successful customer retention",
                ],
                "risks": ["Pricing pressure", "Customer churn increase"],
            },
            {
                "name": "Conservative",
                "description": "Cautious outlook considering market uncertainties",
                "probability": 25,
                "timeframe": "Next 12 months",
                "total_revenue": 5850000,
                "revenue_growth": 12.4,
                "key_assumptions": [
                    "Slower market growth",
                    "Increased competition",
                    "Economic headwinds",
                ],
                "risks": ["Recession impact", "Technology disruption"],
            },
        ]
        for scenario_data in scenarios:
            RevenueScenario.objects.create(**scenario_data)

        # Populate ChurnReasons and ChurnAnalysis
        churn_reasons_data = {
            "Enterprise": [
                {"reason": "Price sensitivity", "percentage": 35, "impact": "high"},
                {"reason": "Lack of features", "percentage": 28, "impact": "medium"},
                {"reason": "Poor support", "percentage": 22, "impact": "high"},
                {"reason": "Competitor switch", "percentage": 15, "impact": "medium"},
            ],
            "SMB": [
                {"reason": "Budget constraints", "percentage": 42, "impact": "high"},
                {"reason": "Complexity", "percentage": 25, "impact": "medium"},
                {"reason": "Limited usage", "percentage": 20, "impact": "low"},
                {"reason": "Better alternative", "percentage": 13, "impact": "medium"},
            ],
            "Startup": [
                {"reason": "Business closure", "percentage": 38, "impact": "high"},
                {"reason": "Cost optimization", "percentage": 32, "impact": "high"},
                {"reason": "Outgrown product", "percentage": 18, "impact": "low"},
                {"reason": "Technical issues", "percentage": 12, "impact": "medium"},
            ],
        }
        churn_analyses = [
            {
                "segment": "Enterprise",
                "churn_rate": 3.2,
                "customers": 147,
                "revenue_at_risk": 890000,
                "average_lifetime": 31.2,
                "retention_cost": 2400,
            },
            {
                "segment": "SMB",
                "churn_rate": 8.7,
                "customers": 823,
                "revenue_at_risk": 245000,
                "average_lifetime": 11.5,
                "retention_cost": 180,
            },
            {
                "segment": "Startup",
                "churn_rate": 12.4,
                "customers": 1456,
                "revenue_at_risk": 178000,
                "average_lifetime": 8.1,
                "retention_cost": 95,
            },
        ]
        for churn_data in churn_analyses:
            churn_analysis = ChurnAnalysis.objects.create(
                segment=churn_data["segment"],
                churn_rate=churn_data["churn_rate"],
                customers=churn_data["customers"],
                revenue_at_risk=churn_data["revenue_at_risk"],
                average_lifetime=churn_data["average_lifetime"],
                retention_cost=churn_data["retention_cost"],
            )
            reasons = churn_reasons_data[churn_data["segment"]]
            for reason_data in reasons:
                reason = ChurnReason.objects.create(**reason_data)
                churn_analysis.churn_reasons.add(reason)

        # Populate UpsellOpportunities
        upsells = [
            {
                "customer": "TechCorp Industries",
                "current_plan": "Professional",
                "suggested_plan": "Enterprise",
                "current_mrr": 2499,
                "potential_mrr": 4999,
                "probability_score": 87,
                "time_to_upgrade": 45,
                "triggers": ["High API usage", "Multiple team requests", "Growth indicators"],
            },
            {
                "customer": "StartupX Inc",
                "current_plan": "Basic",
                "suggested_plan": "Professional",
                "current_mrr": 99,
                "potential_mrr": 299,
                "probability_score": 72,
                "time_to_upgrade": 30,
                "triggers": ["User limit reached", "Advanced features requested"],
            },
            {
                "customer": "GlobalSoft Ltd",
                "current_plan": "Professional",
                "suggested_plan": "Enterprise",
                "current_mrr": 1899,
                "potential_mrr": 3499,
                "probability_score": 94,
                "time_to_upgrade": 15,
                "triggers": [
                    "Security compliance needs",
                    "Scale requirements",
                    "Support upgrade",
                ],
            },
        ]
        for upsell_data in upsells:
            UpsellOpportunity.objects.create(**upsell_data)

        # Populate RevenueMetrics
        metrics = [
            {
                "name": "Monthly Recurring Revenue",
                "value": 486750,
                "unit": "$",
                "change": 12.8,
                "trend": "up",
                "period": "This month",
                "benchmark": 450000,
            },
            {
                "name": "Annual Contract Value",
                "value": 28400,
                "unit": "$",
                "change": 8.4,
                "trend": "up",
                "period": "Q3 2024",
            },
            {
                "name": "Customer Lifetime Value",
                "value": 14250,
                "unit": "$",
                "change": -2.1,
                "trend": "down",
                "period": "Last 90 days",
            },
            {
                "name": "Revenue per Customer",
                "value": 2847,
                "unit": "$",
                "change": 15.6,
                "trend": "up",
                "period": "This quarter",
            },
            {
                "name": "Gross Revenue Retention",
                "value": 94.2,
                "unit": "%",
                "change": 1.8,
                "trend": "up",
                "period": "Last 12 months",
            },
            {
                "name": "Net Revenue Retention",
                "value": 118.5,
                "unit": "%",
                "change": 4.2,
                "trend": "up",
                "period": "Last 12 months",
            },
        ]
        for metric_data in metrics:
            RevenueMetric.objects.create(**metric_data)

        # Populate DiscountAnalysis
        discounts = [
            {
                "discount_type": "Early Bird",
                "discount_rate": 15,
                "usage": 23.4,
                "revenue_impact": -8.2,
                "conversion_lift": 34.6,
                "margin_impact": -12.1,
                "customer_segment": "New Customers",
            },
            {
                "discount_type": "Volume Discount",
                "discount_rate": 20,
                "usage": 12.7,
                "revenue_impact": 18.5,
                "conversion_lift": 67.8,
                "margin_impact": -15.3,
                "customer_segment": "Enterprise",
            },
            {
                "discount_type": "Loyalty Discount",
                "discount_rate": 10,
                "usage": 8.9,
                "revenue_impact": 2.4,
                "conversion_lift": 12.3,
                "margin_impact": -7.8,
                "customer_segment": "Existing Customers",
            },
        ]
        for discount_data in discounts:
            DiscountAnalysis.objects.create(**discount_data)

        # Populate ChannelPerformance
        channels = [
            {
                "channel": "Direct Sales",
                "revenue": 3240000,
                "customers": 456,
                "avg_order_value": 7105,
                "acquisition_cost": 840,
                "profitability": 68.5,
                "growth": 22.4,
            },
            {
                "channel": "Partner Network",
                "revenue": 1890000,
                "customers": 1247,
                "avg_order_value": 1516,
                "acquisition_cost": 245,
                "profitability": 45.2,
                "growth": 35.8,
            },
            {
                "channel": "Online Marketplace",
                "revenue": 920000,
                "customers": 2341,
                "avg_order_value": 393,
                "acquisition_cost": 48,
                "profitability": 38.7,
                "growth": 67.2,
            },
            {
                "channel": "Referral Program",
                "revenue": 485000,
                "customers": 823,
                "avg_order_value": 589,
                "acquisition_cost": 32,
                "profitability": 82.1,
                "growth": 45.6,
            },
        ]
        for channel_data in channels:
            ChannelPerformance.objects.create(**channel_data)

        self.stdout.write(self.style.SUCCESS('Successfully populated revenue strategy data'))
