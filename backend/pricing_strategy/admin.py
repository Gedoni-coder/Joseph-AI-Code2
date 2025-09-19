from django.contrib import admin
from .models import PriceSetting, PricingRule, PriceForecast

@admin.register(PriceSetting)
class PriceSettingAdmin(admin.ModelAdmin):
    list_display = ['product_name', 'base_price', 'final_price', 'effective_date']
    list_filter = ['effective_date', 'expiration_date']
    search_fields = ['product_name']

@admin.register(PricingRule)
class PricingRuleAdmin(admin.ModelAdmin):
    list_display = ['rule_name', 'rule_type', 'active']
    list_filter = ['rule_type', 'active']
    search_fields = ['rule_name']

@admin.register(PriceForecast)
class PriceForecastAdmin(admin.ModelAdmin):
    list_display = ['product_name', 'forecast_date', 'predicted_price', 'confidence']
    list_filter = ['forecast_date', 'confidence']
    search_fields = ['product_name']
