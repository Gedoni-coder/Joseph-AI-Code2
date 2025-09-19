from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PriceSetting, PricingRule, PriceForecast
from .serializers import PriceSettingSerializer, PricingRuleSerializer, PriceForecastSerializer

class PriceSettingViewSet(viewsets.ModelViewSet):
    queryset = PriceSetting.objects.all()
    serializer_class = PriceSettingSerializer

class PricingRuleViewSet(viewsets.ModelViewSet):
    queryset = PricingRule.objects.all()
    serializer_class = PricingRuleSerializer

class PriceForecastViewSet(viewsets.ModelViewSet):
    queryset = PriceForecast.objects.all()
    serializer_class = PriceForecastSerializer

@api_view(['GET'])
def pricing_status(request):
    """
    Simple status endpoint to confirm pricing strategy backend is accessible
    """
    return Response({
        'status': 'Pricing Strategy Backend is Running',
        'endpoints': {
            'price_settings': '/api/pricing/price-settings/',
            'pricing_rules': '/api/pricing/pricing-rules/',
            'price_forecasts': '/api/pricing/price-forecasts/',
        },
        'models': {
            'PriceSetting': PriceSetting.objects.count(),
            'PricingRule': PricingRule.objects.count(),
            'PriceForecast': PriceForecast.objects.count(),
        }
    })
