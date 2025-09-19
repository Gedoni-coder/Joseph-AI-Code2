from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LoanEligibilityViewSet,
    FundingOptionViewSet,
    LoanFeeViewSet,
    LoanComparisonViewSet,
    ApplicationDocumentViewSet,
    BusinessPlanSectionViewSet,
    BusinessPlanViewSet,
    FundingTimelineViewSet,
    EquityImpactViewSet,
    DebtImpactViewSet,
    FundingStrategyViewSet,
    RecentInvestmentViewSet,
    ContactInfoViewSet,
    InvestorPreferencesViewSet,
    InvestorMatchViewSet,
    LoanUpdateViewSet,
    WatchlistViewSet,
)

router = DefaultRouter()
router.register(r'loan-eligibility', LoanEligibilityViewSet)
router.register(r'funding-options', FundingOptionViewSet)
router.register(r'loan-fees', LoanFeeViewSet)
router.register(r'loan-comparisons', LoanComparisonViewSet)
router.register(r'application-documents', ApplicationDocumentViewSet)
router.register(r'business-plan-sections', BusinessPlanSectionViewSet)
router.register(r'business-plans', BusinessPlanViewSet)
router.register(r'funding-timeline', FundingTimelineViewSet)
router.register(r'equity-impact', EquityImpactViewSet)
router.register(r'debt-impact', DebtImpactViewSet)
router.register(r'funding-strategy', FundingStrategyViewSet)
router.register(r'recent-investments', RecentInvestmentViewSet)
router.register(r'contact-info', ContactInfoViewSet)
router.register(r'investor-preferences', InvestorPreferencesViewSet)
router.register(r'investor-matches', InvestorMatchViewSet)
router.register(r'loan-updates', LoanUpdateViewSet)
router.register(r'watchlists', WatchlistViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
