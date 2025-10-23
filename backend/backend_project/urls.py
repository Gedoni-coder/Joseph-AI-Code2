"""
URL configuration for backend_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/business/', include('business_forecast.urls')),
    path('api/economic/', include('economic_forecast.urls')),
    path('chatbot/', include('chatbot.urls')),
    path('api/loan/', include('loan_funding.urls')),
    path('api/revenue/', include('revenue_strategy.urls')),
    path('api/financial/', include('financial_advisory.urls')),
    path('api/tax/', include('tax_compliance.urls')),
    path('api/pricing/', include('pricing_strategy.urls')),
    path('api/market/', include('market_analysis.urls')),
    path('api/policy/', include('policy.urls')),
    path('api/inventory/', include('inventory_supply_chain.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
