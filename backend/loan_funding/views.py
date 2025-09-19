from rest_framework import viewsets
from .models import (
    LoanEligibility,
    FundingOption,
    LoanFee,
    LoanComparison,
    ApplicationDocument,
    BusinessPlanSection,
    BusinessPlan,
    FundingTimeline,
    EquityImpact,
    DebtImpact,
    FundingStrategy,
    RecentInvestment,
    ContactInfo,
    InvestorPreferences,
    InvestorMatch,
    LoanUpdate,
    Watchlist,
)
from .serializers import (
    LoanEligibilitySerializer,
    FundingOptionSerializer,
    LoanFeeSerializer,
    LoanComparisonSerializer,
    ApplicationDocumentSerializer,
    BusinessPlanSectionSerializer,
    BusinessPlanSerializer,
    FundingTimelineSerializer,
    EquityImpactSerializer,
    DebtImpactSerializer,
    FundingStrategySerializer,
    RecentInvestmentSerializer,
    ContactInfoSerializer,
    InvestorPreferencesSerializer,
    InvestorMatchSerializer,
    LoanUpdateSerializer,
    WatchlistSerializer,
)

class LoanEligibilityViewSet(viewsets.ModelViewSet):
    queryset = LoanEligibility.objects.all()
    serializer_class = LoanEligibilitySerializer

class FundingOptionViewSet(viewsets.ModelViewSet):
    queryset = FundingOption.objects.all()
    serializer_class = FundingOptionSerializer

class LoanFeeViewSet(viewsets.ModelViewSet):
    queryset = LoanFee.objects.all()
    serializer_class = LoanFeeSerializer

class LoanComparisonViewSet(viewsets.ModelViewSet):
    queryset = LoanComparison.objects.all()
    serializer_class = LoanComparisonSerializer

class ApplicationDocumentViewSet(viewsets.ModelViewSet):
    queryset = ApplicationDocument.objects.all()
    serializer_class = ApplicationDocumentSerializer

class BusinessPlanSectionViewSet(viewsets.ModelViewSet):
    queryset = BusinessPlanSection.objects.all()
    serializer_class = BusinessPlanSectionSerializer

class BusinessPlanViewSet(viewsets.ModelViewSet):
    queryset = BusinessPlan.objects.all()
    serializer_class = BusinessPlanSerializer

class FundingTimelineViewSet(viewsets.ModelViewSet):
    queryset = FundingTimeline.objects.all()
    serializer_class = FundingTimelineSerializer

class EquityImpactViewSet(viewsets.ModelViewSet):
    queryset = EquityImpact.objects.all()
    serializer_class = EquityImpactSerializer

class DebtImpactViewSet(viewsets.ModelViewSet):
    queryset = DebtImpact.objects.all()
    serializer_class = DebtImpactSerializer

class FundingStrategyViewSet(viewsets.ModelViewSet):
    queryset = FundingStrategy.objects.all()
    serializer_class = FundingStrategySerializer

class RecentInvestmentViewSet(viewsets.ModelViewSet):
    queryset = RecentInvestment.objects.all()
    serializer_class = RecentInvestmentSerializer

class ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer

class InvestorPreferencesViewSet(viewsets.ModelViewSet):
    queryset = InvestorPreferences.objects.all()
    serializer_class = InvestorPreferencesSerializer

class InvestorMatchViewSet(viewsets.ModelViewSet):
    queryset = InvestorMatch.objects.all()
    serializer_class = InvestorMatchSerializer

class LoanUpdateViewSet(viewsets.ModelViewSet):
    queryset = LoanUpdate.objects.all()
    serializer_class = LoanUpdateSerializer

class WatchlistViewSet(viewsets.ModelViewSet):
    queryset = Watchlist.objects.all()
    serializer_class = WatchlistSerializer
