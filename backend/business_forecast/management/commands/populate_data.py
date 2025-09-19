from django.core.management.base import BaseCommand
from business_forecast.models import CustomerProfile, RevenueProjection, KPI, ScenarioPlanning, CostStructure, CashFlowForecast

class Command(BaseCommand):
    help = 'Populate database with initial mock data'

    def handle(self, *args, **options):
        # Customer Profiles
        CustomerProfile.objects.all().delete()
        CustomerProfile.objects.create(
            segment="Enterprise",
            demand_assumption=85,
            growth_rate=12.5,
            retention=92,
            avg_order_value=25000,
            seasonality=8,
        )
        CustomerProfile.objects.create(
            segment="SMB",
            demand_assumption=280,
            growth_rate=25.6,
            retention=78,
            avg_order_value=1200,
            seasonality=22,
        )

        # Revenue Projections
        RevenueProjection.objects.all().delete()
        RevenueProjection.objects.create(
            period="Q1 2025",
            projected=2800000,
            conservative=2520000,
            optimistic=3220000,
            actual_to_date=2654000,
            confidence=85,
        )
        RevenueProjection.objects.create(
            period="Q2 2025",
            projected=3200000,
            conservative=2880000,
            optimistic=3680000,
            confidence=78,
        )

        # KPIs
        KPI.objects.all().delete()
        KPI.objects.create(
            name="Customer Acquisition Cost",
            current=285,
            target=250,
            unit="USD",
            trend="down",
            category="Sales",
            frequency="Monthly",
        )
        KPI.objects.create(
            name="Monthly Recurring Revenue",
            current=185000,
            target=220000,
            unit="USD",
            trend="up",
            category="Revenue",
            frequency="Monthly",
        )

        # Scenario Planning
        ScenarioPlanning.objects.all().delete()
        ScenarioPlanning.objects.create(
            scenario="Best Case",
            revenue=15200000,
            costs=10640000,
            profit=4560000,
            probability=25,
            key_assumptions=["Market expansion accelerates", "New product launch succeeds"],
        )
        ScenarioPlanning.objects.create(
            scenario="Base Case",
            revenue=13700000,
            costs=10275000,
            profit=3425000,
            probability=50,
            key_assumptions=["Steady market growth", "Current trends continue"],
        )

        # Cost Structure
        CostStructure.objects.all().delete()
        CostStructure.objects.create(
            category="Raw Materials",
            type="COGS",
            amount=850000,
            percentage=32.5,
            variability="Variable",
            trend="up",
        )
        CostStructure.objects.create(
            category="Sales & Marketing",
            type="Operating",
            amount=480000,
            percentage=18.3,
            variability="Variable",
            trend="up",
        )

        # Cash Flow Forecast
        CashFlowForecast.objects.all().delete()
        CashFlowForecast.objects.create(
            month="Jan 2025",
            cash_inflow=2400000,
            cash_outflow=2100000,
            net_cash_flow=300000,
            cumulative_cash=1650000,
            working_capital=420000,
        )
        CashFlowForecast.objects.create(
            month="Feb 2025",
            cash_inflow=2650000,
            cash_outflow=2280000,
            net_cash_flow=370000,
            cumulative_cash=2020000,
            working_capital=485000,
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated database with mock data'))
