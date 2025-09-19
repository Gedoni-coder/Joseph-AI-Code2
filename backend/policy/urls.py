from rest_framework.routers import DefaultRouter
from .views import (
    ExternalPolicyViewSet,
    InternalPolicyViewSet,
    PolicyReportViewSet,
    EconomicIndicatorViewSet,
    InternalImpactViewSet,
    StrategyRecommendationViewSet,
)

router = DefaultRouter()
router.register(r'external-policies', ExternalPolicyViewSet)
router.register(r'internal-policies', InternalPolicyViewSet)
router.register(r'policy-reports', PolicyReportViewSet)
router.register(r'economic-indicators', EconomicIndicatorViewSet)
router.register(r'internal-impacts', InternalImpactViewSet)
router.register(r'strategy-recommendations', StrategyRecommendationViewSet)

urlpatterns = router.urls
