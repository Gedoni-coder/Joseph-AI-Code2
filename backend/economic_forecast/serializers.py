from rest_framework import serializers
from .models import EconomicMetric, EconomicNews, EconomicForecast, EconomicEvent

class EconomicMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = EconomicMetric
        fields = '__all__'

class EconomicNewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EconomicNews
        fields = '__all__'

class EconomicForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = EconomicForecast
        fields = '__all__'

class EconomicEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = EconomicEvent
        fields = '__all__'
