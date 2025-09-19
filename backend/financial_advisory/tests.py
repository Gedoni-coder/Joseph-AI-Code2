from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import BudgetForecast, CashFlowProjection, ScenarioTest, RiskAssessment, PerformanceDriver, AdvisoryInsight, BudgetAssumption, LiquidityMetric
from django.urls import reverse
import uuid

class FinancialAdvisoryModelTests(TestCase):
    def setUp(self):
        self.budget_forecast = BudgetForecast.objects.create(
            id=uuid.uuid4(),
            period='2024-Q1',
            type='quarterly',
            revenue=2500000,
            expenses=1800000,
            net_income=700000,
            confidence=85,
            assumptions=['5% market growth', '3% price increase', 'Stable customer base'],
            variance=2.3,
            actual_revenue=2580000,
            actual_expenses=1750000,
            actual_net_income=830000,
        )

    def test_budget_forecast_creation(self):
        self.assertEqual(self.budget_forecast.period, '2024-Q1')
        self.assertEqual(self.budget_forecast.type, 'quarterly')
        self.assertEqual(self.budget_forecast.revenue, 2500000)

class FinancialAdvisoryAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.budget_forecast_data = {
            'id': str(uuid.uuid4()),
            'period': '2024-Q2',
            'type': 'quarterly',
            'revenue': 3000000,
            'expenses': 2000000,
            'net_income': 1000000,
            'confidence': 90,
            'assumptions': ['6% market growth', '4% price increase'],
            'variance': 1.5,
            'actual_revenue': 3100000,
            'actual_expenses': 1950000,
            'actual_net_income': 1150000,
        }
        self.budget_forecast_url = reverse('budgetforecast-list')

    def test_create_budget_forecast(self):
        response = self.client.post(self.budget_forecast_url, self.budget_forecast_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['period'], self.budget_forecast_data['period'])

    def test_get_budget_forecast_list(self):
        response = self.client.get(self.budget_forecast_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# Additional tests for other models and endpoints can be added similarly
