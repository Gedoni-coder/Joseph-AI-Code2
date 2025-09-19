from rest_framework import serializers
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

class LoanEligibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanEligibility
        fields = '__all__'

class FundingOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundingOption
        fields = '__all__'

class LoanFeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanFee
        fields = '__all__'

class LoanComparisonSerializer(serializers.ModelSerializer):
    fees = serializers.SerializerMethodField()

    class Meta:
        model = LoanComparison
        fields = '__all__'

    def get_fees(self, obj):
        fees = obj.fees.all()
        return LoanFeeSerializer(fees, many=True).data

class ApplicationDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationDocument
        fields = '__all__'

class BusinessPlanSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessPlanSection
        fields = '__all__'

class BusinessPlanSerializer(serializers.ModelSerializer):
    sections = serializers.SerializerMethodField()

    class Meta:
        model = BusinessPlan
        fields = '__all__'

    def get_sections(self, obj):
        sections = obj.sections.all()
        return BusinessPlanSectionSerializer(sections, many=True).data

class FundingTimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundingTimeline
        fields = '__all__'

class EquityImpactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquityImpact
        fields = '__all__'

class DebtImpactSerializer(serializers.ModelSerializer):
    class Meta:
        model = DebtImpact
        fields = '__all__'

class FundingStrategySerializer(serializers.ModelSerializer):
    timeline = serializers.SerializerMethodField()
    impact_analysis = serializers.SerializerMethodField()

    class Meta:
        model = FundingStrategy
        fields = '__all__'

    def get_timeline(self, obj):
        timeline = obj.timeline.all()
        return FundingTimelineSerializer(timeline, many=True).data

    def get_impact_analysis(self, obj):
        impact = obj.impact_analysis
        return {
            'equity': EquityImpactSerializer(impact['equity']).data if impact['equity'] else None,
            'debt': DebtImpactSerializer(impact['debt']).data if impact['debt'] else None,
        }

class RecentInvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecentInvestment
        fields = '__all__'

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'

class InvestorPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvestorPreferences
        fields = '__all__'

class InvestorMatchSerializer(serializers.ModelSerializer):
    investment_range = serializers.SerializerMethodField()
    recent_investments = serializers.SerializerMethodField()
    contact_info = serializers.SerializerMethodField()
    preferences = serializers.SerializerMethodField()

    class Meta:
        model = InvestorMatch
        fields = '__all__'

    def get_investment_range(self, obj):
        return obj.investment_range

    def get_recent_investments(self, obj):
        investments = obj.recent_investments.all()
        return RecentInvestmentSerializer(investments, many=True).data

    def get_contact_info(self, obj):
        contact = obj.contact_info
        return ContactInfoSerializer(contact).data if contact else None

    def get_preferences(self, obj):
        prefs = obj.preferences
        return InvestorPreferencesSerializer(prefs).data if prefs else None

class LoanUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanUpdate
        fields = '__all__'

class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = '__all__'
