from rest_framework import serializers
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

class RevenueStreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = RevenueStream
        fields = '__all__'

class RevenueScenarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = RevenueScenario
        fields = '__all__'

class ChurnReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChurnReason
        fields = '__all__'

class ChurnAnalysisSerializer(serializers.ModelSerializer):
    churn_reasons = ChurnReasonSerializer(many=True, read_only=True)

    class Meta:
        model = ChurnAnalysis
        fields = '__all__'

class UpsellOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UpsellOpportunity
        fields = '__all__'

class RevenueMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = RevenueMetric
        fields = '__all__'

class DiscountAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountAnalysis
        fields = '__all__'

class ChannelPerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelPerformance
        fields = '__all__'
