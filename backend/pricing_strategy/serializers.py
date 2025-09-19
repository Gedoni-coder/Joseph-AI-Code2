from rest_framework import serializers
from .models import PriceSetting, PricingRule, PriceForecast

class PriceSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceSetting
        fields = '__all__'

class PricingRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingRule
        fields = '__all__'

class PriceForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceForecast
        fields = '__all__'
