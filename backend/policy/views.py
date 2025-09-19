from rest_framework import viewsets
from .models import (
    ExternalPolicy,
    InternalPolicy,
    PolicyReport,
    EconomicIndicator,
    InternalImpact,
    StrategyRecommendation,
)
from .serializers import (
    ExternalPolicySerializer,
    InternalPolicySerializer,
    PolicyReportSerializer,
    EconomicIndicatorSerializer,
    InternalImpactSerializer,
    StrategyRecommendationSerializer,
)

class ExternalPolicyViewSet(viewsets.ModelViewSet):
    queryset = ExternalPolicy.objects.all()
    serializer_class = ExternalPolicySerializer

class InternalPolicyViewSet(viewsets.ModelViewSet):
    queryset = InternalPolicy.objects.all()
    serializer_class = InternalPolicySerializer

class PolicyReportViewSet(viewsets.ModelViewSet):
    queryset = PolicyReport.objects.all()
    serializer_class = PolicyReportSerializer

class EconomicIndicatorViewSet(viewsets.ModelViewSet):
    queryset = EconomicIndicator.objects.all()
    serializer_class = EconomicIndicatorSerializer

class InternalImpactViewSet(viewsets.ModelViewSet):
    queryset = InternalImpact.objects.all()
    serializer_class = InternalImpactSerializer

class StrategyRecommendationViewSet(viewsets.ModelViewSet):
    queryset = StrategyRecommendation.objects.all()
    serializer_class = StrategyRecommendationSerializer
