from rest_framework import viewsets
from .models import (
    RevenueStream,
    RevenueScenario,
    ChurnReason,
    ChurnAnalysis,
    UpsellOpportunity,
    RevenueMetric,
    DiscountAnalysis,
    ChannelPerformance,
)
from .serializers import (
    RevenueStreamSerializer,
    RevenueScenarioSerializer,
    ChurnReasonSerializer,
    ChurnAnalysisSerializer,
    UpsellOpportunitySerializer,
    RevenueMetricSerializer,
    DiscountAnalysisSerializer,
    ChannelPerformanceSerializer,
)

class RevenueStreamViewSet(viewsets.ModelViewSet):
    queryset = RevenueStream.objects.all()
    serializer_class = RevenueStreamSerializer

class RevenueScenarioViewSet(viewsets.ModelViewSet):
    queryset = RevenueScenario.objects.all()
    serializer_class = RevenueScenarioSerializer

class ChurnReasonViewSet(viewsets.ModelViewSet):
    queryset = ChurnReason.objects.all()
    serializer_class = ChurnReasonSerializer

class ChurnAnalysisViewSet(viewsets.ModelViewSet):
    queryset = ChurnAnalysis.objects.all()
    serializer_class = ChurnAnalysisSerializer

class UpsellOpportunityViewSet(viewsets.ModelViewSet):
    queryset = UpsellOpportunity.objects.all()
    serializer_class = UpsellOpportunitySerializer

class RevenueMetricViewSet(viewsets.ModelViewSet):
    queryset = RevenueMetric.objects.all()
    serializer_class = RevenueMetricSerializer

class DiscountAnalysisViewSet(viewsets.ModelViewSet):
    queryset = DiscountAnalysis.objects.all()
    serializer_class = DiscountAnalysisSerializer

class ChannelPerformanceViewSet(viewsets.ModelViewSet):
    queryset = ChannelPerformance.objects.all()
    serializer_class = ChannelPerformanceSerializer
