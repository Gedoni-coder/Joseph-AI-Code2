from rest_framework import viewsets
from .models import CustomerProfile, RevenueProjection, CostStructure, CashFlowForecast, KPI, ScenarioPlanning
from .serializers import (
    CustomerProfileSerializer,
    RevenueProjectionSerializer,
    CostStructureSerializer,
    CashFlowForecastSerializer,
    KPISerializer,
    ScenarioPlanningSerializer,
)

class CustomerProfileViewSet(viewsets.ModelViewSet):
    queryset = CustomerProfile.objects.all()
    serializer_class = CustomerProfileSerializer

class RevenueProjectionViewSet(viewsets.ModelViewSet):
    queryset = RevenueProjection.objects.all()
    serializer_class = RevenueProjectionSerializer

class CostStructureViewSet(viewsets.ModelViewSet):
    queryset = CostStructure.objects.all()
    serializer_class = CostStructureSerializer

class CashFlowForecastViewSet(viewsets.ModelViewSet):
    queryset = CashFlowForecast.objects.all()
    serializer_class = CashFlowForecastSerializer

class KPIViewSet(viewsets.ModelViewSet):
    queryset = KPI.objects.all()
    serializer_class = KPISerializer

class ScenarioPlanningViewSet(viewsets.ModelViewSet):
    queryset = ScenarioPlanning.objects.all()
    serializer_class = ScenarioPlanningSerializer
