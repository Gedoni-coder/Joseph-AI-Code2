from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TaxRecordViewSet, ComplianceReportViewSet, tax_home

router = DefaultRouter()
router.register(r'tax-records', TaxRecordViewSet)
router.register(r'compliance-reports', ComplianceReportViewSet)

urlpatterns = [
    path('', tax_home, name='tax_home'),
] + router.urls
