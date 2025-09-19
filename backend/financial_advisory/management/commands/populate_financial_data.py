from django.core.management.base import BaseCommand
from financial_advisory.models import (
    BudgetForecast, CashFlowProjection, ScenarioTest, RiskAssessment,
    PerformanceDriver, AdvisoryInsight, BudgetAssumption, LiquidityMetric
)
from datetime import date, datetime
import uuid

class Command(BaseCommand):
    help = 'Populate financial advisory data'

    def handle(self, *args, **options):
        self.stdout.write('Populating financial advisory data...')

        # Create Budget Forecasts
        BudgetForecast.objects.all().delete()
        budget_forecasts = [
            {
                'id': uuid.uuid4(),
                'period': '2024-Q1',
                'type': 'quarterly',
                'revenue': 2500000,
                'expenses': 1800000,
                'net_income': 700000,
                'confidence': 85,
                'assumptions': ['5% market growth', '3% price increase', 'Stable customer base'],
                'variance': 2.3,
                'actual_revenue': 2580000,
                'actual_expenses': 1750000,
                'actual_net_income': 830000,
            },
            {
                'id': uuid.uuid4(),
                'period': '2024-W03',
                'type': 'weekly',
                'revenue': 192000,
                'expenses': 138000,
                'net_income': 54000,
                'confidence': 92,
                'assumptions': ['Normal seasonal patterns', 'No major disruptions'],
                'variance': -1.2,
            },
        ]
        for bf in budget_forecasts:
            BudgetForecast.objects.create(**bf)

        # Create Cash Flow Projections
        CashFlowProjection.objects.all().delete()
        cash_projections = [
            {
                'id': uuid.uuid4(),
                'date': date(2024, 1, 29),
                'opening_balance': 850000,
                'operating_cash': 320000,
                'accounts_receivable': 180000,
                'other_income': 25000,
                'operating_expenses': 220000,
                'accounts_payable': 150000,
                'capital_expenditure': 80000,
                'debt_service': 45000,
                'net_cash_flow': 30000,
                'closing_balance': 880000,
                'liquidity_ratio': 2.8,
                'days_of_cash': 67,
            },
            {
                'id': uuid.uuid4(),
                'date': date(2024, 2, 5),
                'opening_balance': 880000,
                'operating_cash': 295000,
                'accounts_receivable': 165000,
                'other_income': 15000,
                'operating_expenses': 235000,
                'accounts_payable': 140000,
                'capital_expenditure': 0,
                'debt_service': 0,
                'net_cash_flow': 100000,
                'closing_balance': 980000,
                'liquidity_ratio': 3.2,
                'days_of_cash': 74,
            },
        ]
        for cp in cash_projections:
            CashFlowProjection.objects.create(**cp)

        # Create Scenario Tests
        ScenarioTest.objects.all().delete()
        scenario_tests = [
            {
                'id': uuid.uuid4(),
                'name': 'Revenue Drop Stress Test',
                'description': '30% revenue decline scenario',
                'type': 'stress',
                'parameters': {
                    'variable': 'Revenue',
                    'baseValue': 2500000,
                    'testValue': 1750000,
                    'changePercent': -30,
                },
                'revenue': 1750000,
                'expenses': 1800000,
                'net_income': -50000,
                'cash_flow': -320000,
                'impact_severity': 'critical',
                'probability': 15,
            },
            {
                'id': uuid.uuid4(),
                'name': 'Cost Inflation Impact',
                'description': '15% increase in operating costs',
                'type': 'sensitivity',
                'parameters': {
                    'variable': 'Operating Costs',
                    'baseValue': 1500000,
                    'testValue': 1725000,
                    'changePercent': 15,
                },
                'revenue': 2500000,
                'expenses': 2025000,
                'net_income': 475000,
                'cash_flow': 180000,
                'impact_severity': 'medium',
                'probability': 35,
            },
        ]
        for st in scenario_tests:
            ScenarioTest.objects.create(**st)

        # Create Risk Assessments
        RiskAssessment.objects.all().delete()
        risk_assessments = [
            {
                'id': uuid.uuid4(),
                'category': 'liquidity',
                'risk_name': 'Cash Flow Shortfall',
                'description': 'Potential cash flow gap during Q2 due to seasonal variations',
                'probability': 65,
                'impact': 80,
                'risk_score': 52,
                'current_mitigation': ['Line of credit established', 'Daily cash monitoring'],
                'recommended_actions': ['Increase credit facility', 'Accelerate receivables collection'],
                'status': 'monitoring',
            },
            {
                'id': uuid.uuid4(),
                'category': 'market',
                'risk_name': 'Interest Rate Volatility',
                'description': 'Rising interest rates affecting debt service costs',
                'probability': 75,
                'impact': 60,
                'risk_score': 45,
                'current_mitigation': ['Fixed-rate debt portions', 'Rate hedging instruments'],
                'recommended_actions': ['Consider additional hedging', 'Refinance variable debt'],
                'status': 'mitigating',
            },
        ]
        for ra in risk_assessments:
            RiskAssessment.objects.create(**ra)

        # Create Performance Drivers
        PerformanceDriver.objects.all().delete()
        performance_drivers = [
            {
                'id': uuid.uuid4(),
                'name': 'Gross Margin',
                'category': 'revenue',
                'current_value': 28,
                'target_value': 32,
                'unit': '%',
                'trend': 'improving',
                'impact': 'high',
                'linked_budget_items': ['Revenue', 'Cost of Goods Sold'],
                'kpi_history': [
                    {'date': '2024-01-01', 'value': 26.5},
                    {'date': '2024-01-08', 'value': 27.2},
                    {'date': '2024-01-15', 'value': 27.8},
                    {'date': '2024-01-22', 'value': 28.0},
                ],
            },
            {
                'id': uuid.uuid4(),
                'name': 'Customer Acquisition Cost',
                'category': 'cost',
                'current_value': 145,
                'target_value': 120,
                'unit': '$',
                'trend': 'declining',
                'impact': 'medium',
                'linked_budget_items': ['Marketing Expenses', 'Sales Expenses'],
                'kpi_history': [
                    {'date': '2024-01-01', 'value': 165},
                    {'date': '2024-01-08', 'value': 158},
                    {'date': '2024-01-15', 'value': 152},
                    {'date': '2024-01-22', 'value': 145},
                ],
            },
        ]
        for pd in performance_drivers:
            PerformanceDriver.objects.create(**pd)

        # Create Advisory Insights
        AdvisoryInsight.objects.all().delete()
        advisory_insights = [
            {
                'id': uuid.uuid4(),
                'type': 'recommendation',
                'title': 'Optimize Working Capital Management',
                'description': 'Reducing days sales outstanding by 5 days could improve cash flow by $280K',
                'priority': 'high',
                'category': 'cost_optimization',
                'estimated_impact': 280000,
                'timeframe': '90 days',
                'confidence': 85,
                'action_items': [
                    'Implement automated invoicing system',
                    'Offer early payment discounts',
                    'Strengthen collection processes',
                ],
                'related_metrics': ['Days Sales Outstanding', 'Cash Flow'],
                'status': 'new',
            },
            {
                'id': uuid.uuid4(),
                'type': 'opportunity',
                'title': 'Strategic Investment in Automation',
                'description': 'ROI analysis shows 22% IRR for proposed automation project',
                'priority': 'medium',
                'category': 'investment',
                'estimated_impact': 450000,
                'timeframe': '24 months',
                'confidence': 78,
                'action_items': [
                    'Conduct detailed feasibility study',
                    'Secure capital allocation approval',
                    'Develop implementation timeline',
                ],
                'related_metrics': ['ROI', 'Operational Efficiency'],
                'status': 'reviewed',
            },
        ]
        for ai in advisory_insights:
            AdvisoryInsight.objects.create(**ai)

        # Create Budget Assumptions
        BudgetAssumption.objects.all().delete()
        budget_assumptions = [
            {
                'id': uuid.uuid4(),
                'category': 'Revenue',
                'assumption': 'Market growth rate',
                'value': 5.2,
                'unit': '%',
                'confidence': 78,
                'source': 'Industry analysis & historical trends',
                'impact': 'high',
            },
            {
                'id': uuid.uuid4(),
                'category': 'Costs',
                'assumption': 'Inflation rate',
                'value': 2.8,
                'unit': '%',
                'confidence': 85,
                'source': 'Federal Reserve projections',
                'impact': 'medium',
            },
        ]
        for ba in budget_assumptions:
            BudgetAssumption.objects.create(**ba)

        # Create Liquidity Metrics
        LiquidityMetric.objects.all().delete()
        liquidity_metrics = [
            {
                'metric': 'Current Ratio',
                'current': 2.8,
                'target': 2.5,
                'status': 'healthy',
                'trend': 'stable',
            },
            {
                'metric': 'Quick Ratio',
                'current': 1.9,
                'target': 1.5,
                'status': 'healthy',
                'trend': 'improving',
            },
            {
                'metric': 'Cash Reserves (Months)',
                'current': 4.2,
                'target': 3.0,
                'status': 'healthy',
                'trend': 'stable',
            },
        ]
        for lm in liquidity_metrics:
            LiquidityMetric.objects.create(**lm)

        self.stdout.write(self.style.SUCCESS('Successfully populated financial advisory data'))
