from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PriceSettingViewSet, PricingRuleViewSet, PriceForecastViewSet, pricing_status

router = DefaultRouter()
router.register(r'price-settings', PriceSettingViewSet)
router.register(r'pricing-rules', PricingRuleViewSet)
router.register(r'price-forecasts', PriceForecastViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('status/', pricing_status, name='pricing-status'),
]
