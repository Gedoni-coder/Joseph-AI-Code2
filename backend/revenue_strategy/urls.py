from rest_framework.routers import DefaultRouter
from .views import (
    RevenueStreamViewSet,
    RevenueScenarioViewSet,
    ChurnReasonViewSet,
    ChurnAnalysisViewSet,
    UpsellOpportunityViewSet,
    RevenueMetricViewSet,
    DiscountAnalysisViewSet,
    ChannelPerformanceViewSet,
)

router = DefaultRouter()
router.register(r'revenue-streams', RevenueStreamViewSet)
router.register(r'revenue-scenarios', RevenueScenarioViewSet)
router.register(r'churn-reasons', ChurnReasonViewSet)
router.register(r'churn-analyses', ChurnAnalysisViewSet)
router.register(r'upsell-opportunities', UpsellOpportunityViewSet)
router.register(r'revenue-metrics', RevenueMetricViewSet)
router.register(r'discount-analyses', DiscountAnalysisViewSet)
router.register(r'channel-performances', ChannelPerformanceViewSet)

urlpatterns = router.urls
