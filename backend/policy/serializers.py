from rest_framework import serializers
from .models import (
    ExternalPolicy,
    InternalPolicy,
    PolicyReport,
    EconomicIndicator,
    InternalImpact,
    StrategyRecommendation,
)

class ExternalPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExternalPolicy
        fields = '__all__'

class InternalPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = InternalPolicy
        fields = '__all__'

class PolicyReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicyReport
        fields = '__all__'

class EconomicIndicatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = EconomicIndicator
        fields = '__all__'

class InternalImpactSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternalImpact
        fields = '__all__'

class StrategyRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StrategyRecommendation
        fields = '__all__'
