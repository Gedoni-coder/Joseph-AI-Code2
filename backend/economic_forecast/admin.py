from django.contrib import admin
from .models import EconomicMetric, EconomicNews, EconomicForecast, EconomicEvent

admin.site.register(EconomicMetric)
admin.site.register(EconomicNews)
admin.site.register(EconomicForecast)
admin.site.register(EconomicEvent)
