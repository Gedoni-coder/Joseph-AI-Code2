from rest_framework import serializers
from .models import MarketSegment, Competitor, MarketTrend

class MarketSegmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketSegment
        fields = '__all__'

class CompetitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competitor
        fields = '__all__'

class MarketTrendSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketTrend
        fields = '__all__'
