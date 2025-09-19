from rest_framework import viewsets
from .models import EconomicMetric, EconomicNews, EconomicForecast, EconomicEvent
from .serializers import (
    EconomicMetricSerializer,
    EconomicNewsSerializer,
    EconomicForecastSerializer,
    EconomicEventSerializer,
)

class EconomicMetricViewSet(viewsets.ModelViewSet):
    queryset = EconomicMetric.objects.all()
    serializer_class = EconomicMetricSerializer

class EconomicNewsViewSet(viewsets.ModelViewSet):
    queryset = EconomicNews.objects.all()
    serializer_class = EconomicNewsSerializer

class EconomicForecastViewSet(viewsets.ModelViewSet):
    queryset = EconomicForecast.objects.all()
    serializer_class = EconomicForecastSerializer

class EconomicEventViewSet(viewsets.ModelViewSet):
    queryset = EconomicEvent.objects.all()
    serializer_class = EconomicEventSerializer
