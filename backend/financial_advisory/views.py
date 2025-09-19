from rest_framework import viewsets
from .models import (
    BudgetForecast, CashFlowProjection, ScenarioTest, RiskAssessment,
    PerformanceDriver, AdvisoryInsight, BudgetAssumption, LiquidityMetric
)
from .serializers import (
    BudgetForecastSerializer, CashFlowProjectionSerializer, ScenarioTestSerializer,
    RiskAssessmentSerializer, PerformanceDriverSerializer, AdvisoryInsightSerializer,
    BudgetAssumptionSerializer, LiquidityMetricSerializer
)

class BudgetForecastViewSet(viewsets.ModelViewSet):
    queryset = BudgetForecast.objects.all()
    serializer_class = BudgetForecastSerializer

class CashFlowProjectionViewSet(viewsets.ModelViewSet):
    queryset = CashFlowProjection.objects.all()
    serializer_class = CashFlowProjectionSerializer

class ScenarioTestViewSet(viewsets.ModelViewSet):
    queryset = ScenarioTest.objects.all()
    serializer_class = ScenarioTestSerializer

class RiskAssessmentViewSet(viewsets.ModelViewSet):
    queryset = RiskAssessment.objects.all()
    serializer_class = RiskAssessmentSerializer

class PerformanceDriverViewSet(viewsets.ModelViewSet):
    queryset = PerformanceDriver.objects.all()
    serializer_class = PerformanceDriverSerializer

class AdvisoryInsightViewSet(viewsets.ModelViewSet):
    queryset = AdvisoryInsight.objects.all()
    serializer_class = AdvisoryInsightSerializer

class BudgetAssumptionViewSet(viewsets.ModelViewSet):
    queryset = BudgetAssumption.objects.all()
    serializer_class = BudgetAssumptionSerializer

class LiquidityMetricViewSet(viewsets.ModelViewSet):
    queryset = LiquidityMetric.objects.all()
    serializer_class = LiquidityMetricSerializer
