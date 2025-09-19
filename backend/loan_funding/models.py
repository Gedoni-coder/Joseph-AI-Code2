from django.db import models
import json

class LoanEligibility(models.Model):
    BUSINESS_STAGE_CHOICES = [
        ('startup', 'Startup'),
        ('early', 'Early'),
        ('growth', 'Growth'),
        ('mature', 'Mature'),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    business_name = models.CharField(max_length=255, default='')
    business_stage = models.CharField(max_length=20, choices=BUSINESS_STAGE_CHOICES, default='startup')
    credit_score = models.IntegerField(default=0)
    monthly_revenue = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    yearly_revenue = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    collateral_value = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    industry = models.CharField(max_length=100, default='')
    time_in_business = models.IntegerField(default=0)  # months
    eligibility_score = models.IntegerField(default=0)
    qualified_programs = models.JSONField(default=list)  # Array of strings
    recommendations = models.JSONField(default=list)  # Array of strings

    def __str__(self):
        return f"{self.business_name} - Eligibility Score: {self.eligibility_score}"

class FundingOption(models.Model):
    FUNDING_TYPE_CHOICES = [
        ('bank-loan', 'Bank Loan'),
        ('government-grant', 'Government Grant'),
        ('microfinance', 'Microfinance'),
        ('angel-capital', 'Angel Capital'),
        ('venture-capital', 'Venture Capital'),
        ('crowdfunding', 'Crowdfunding'),
        ('cooperative', 'Cooperative'),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=255, default='')
    type = models.CharField(max_length=20, choices=FUNDING_TYPE_CHOICES, default='bank-loan')
    provider = models.CharField(max_length=255, default='')
    min_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    max_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    term_months = models.IntegerField(default=12)
    eligibility_criteria = models.JSONField(default=list)  # Array of strings
    application_deadline = models.DateTimeField(null=True, blank=True)
    processing_time = models.IntegerField(default=0)  # days
    collateral_required = models.BooleanField(default=False)
    personal_guarantee = models.BooleanField(default=False)
    description = models.TextField(default='')
    website = models.URLField(default='https://example.com')
    tags = models.JSONField(default=list)  # Array of strings

    def __str__(self):
        return self.name

class LoanFee(models.Model):
    type = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.TextField()

    def __str__(self):
        return f"{self.type}: ${self.amount}"

class LoanComparison(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    loan_name = models.CharField(max_length=255, default='')
    provider = models.CharField(max_length=255, default='')
    amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    term_months = models.IntegerField(default=12)
    monthly_payment = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    total_interest = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    conditions = models.JSONField(default=list)  # Array of strings
    processing_time = models.IntegerField(default=0)
    approval_odds = models.IntegerField(default=0)
    pros = models.JSONField(default=list)  # Array of strings
    cons = models.JSONField(default=list)  # Array of strings

    def __str__(self):
        return f"{self.loan_name} - {self.provider}"

    @property
    def fees(self):
        return LoanFee.objects.filter(loan_comparison=self)

class ApplicationDocument(models.Model):
    DOCUMENT_TYPE_CHOICES = [
        ('required', 'Required'),
        ('optional', 'Optional'),
        ('conditional', 'Conditional'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('uploaded', 'Uploaded'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=DOCUMENT_TYPE_CHOICES)
    description = models.TextField()
    template = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    last_updated = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name

class BusinessPlanSection(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    completed = models.BooleanField(default=False)
    word_count = models.IntegerField(default=0)
    recommendations = models.JSONField(default=list)  # Array of strings

    def __str__(self):
        return self.title

class BusinessPlan(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    completion_percentage = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)
    generated_content = models.BooleanField(default=False)

    def __str__(self):
        return f"Business Plan - {self.completion_percentage}% Complete"

    @property
    def sections(self):
        return BusinessPlanSection.objects.filter(business_plan=self)

class FundingTimeline(models.Model):
    phase = models.CharField(max_length=255)
    timeframe = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    type = models.CharField(max_length=100)
    milestones = models.JSONField(default=list)  # Array of strings

    def __str__(self):
        return f"{self.phase} - {self.timeframe}"

class EquityImpact(models.Model):
    dilution = models.DecimalField(max_digits=5, decimal_places=2)
    ownership_retained = models.DecimalField(max_digits=5, decimal_places=2)
    control_impact = models.TextField()
    future_rounds = models.JSONField(default=list)  # Array of strings

    def __str__(self):
        return f"Equity Impact - Dilution: {self.dilution}%"

class DebtImpact(models.Model):
    monthly_payment = models.DecimalField(max_digits=15, decimal_places=2)
    total_cost = models.DecimalField(max_digits=15, decimal_places=2)
    cash_flow_impact = models.DecimalField(max_digits=5, decimal_places=2)
    collateral_risk = models.TextField()

    def __str__(self):
        return f"Debt Impact - Monthly Payment: ${self.monthly_payment}"

class FundingStrategy(models.Model):
    FUNDING_TYPE_CHOICES = [
        ('equity', 'Equity'),
        ('debt', 'Debt'),
        ('hybrid', 'Hybrid'),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    business_stage = models.CharField(max_length=100)
    recommended_type = models.CharField(max_length=20, choices=FUNDING_TYPE_CHOICES)
    reasoning = models.TextField()
    readiness_score = models.IntegerField()
    recommendations = models.JSONField(default=list)  # Array of strings

    def __str__(self):
        return f"{self.business_stage} - {self.recommended_type}"

    @property
    def timeline(self):
        return FundingTimeline.objects.filter(funding_strategy=self)

    @property
    def impact_analysis(self):
        equity = EquityImpact.objects.filter(funding_strategy=self).first()
        debt = DebtImpact.objects.filter(funding_strategy=self).first()
        return {
            'equity': equity,
            'debt': debt
        }

class RecentInvestment(models.Model):
    company = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    date = models.DateField()
    industry = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.company} - ${self.amount}"

class ContactInfo(models.Model):
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    website = models.URLField()
    application_process = models.TextField()

    def __str__(self):
        return self.website

class InvestorPreferences(models.Model):
    business_model = models.JSONField(default=list)  # Array of strings
    growth_stage = models.JSONField(default=list)  # Array of strings
    revenue_requirement = models.DecimalField(max_digits=15, decimal_places=2)
    geographic_focus = models.JSONField(default=list)  # Array of strings
    time_to_decision = models.IntegerField()  # days

    def __str__(self):
        return f"Revenue Req: ${self.revenue_requirement}"

class InvestorMatch(models.Model):
    INVESTOR_TYPE_CHOICES = [
        ('angel', 'Angel'),
        ('vc', 'VC'),
        ('bank', 'Bank'),
        ('government', 'Government'),
        ('alternative', 'Alternative'),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=INVESTOR_TYPE_CHOICES)
    focus_industries = models.JSONField(default=list)  # Array of strings
    investment_range_min = models.DecimalField(max_digits=15, decimal_places=2)
    investment_range_max = models.DecimalField(max_digits=15, decimal_places=2)
    stage = models.JSONField(default=list)  # Array of strings
    location = models.CharField(max_length=255)
    match_score = models.IntegerField()
    trust_score = models.IntegerField()
    portfolio = models.JSONField(default=list)  # Array of strings

    def __str__(self):
        return f"{self.name} - Match Score: {self.match_score}"

    @property
    def investment_range(self):
        return {
            'min': self.investment_range_min,
            'max': self.investment_range_max
        }

    @property
    def recent_investments(self):
        return RecentInvestment.objects.filter(investor_match=self)

    @property
    def contact_info(self):
        return ContactInfo.objects.filter(investor_match=self).first()

    @property
    def preferences(self):
        return InvestorPreferences.objects.filter(investor_match=self).first()

class LoanUpdate(models.Model):
    UPDATE_TYPE_CHOICES = [
        ('new-program', 'New Program'),
        ('rate-change', 'Rate Change'),
        ('deadline', 'Deadline'),
        ('policy-update', 'Policy Update'),
    ]

    IMPACT_CHOICES = [
        ('positive', 'Positive'),
        ('negative', 'Negative'),
        ('neutral', 'Neutral'),
    ]

    URGENCY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]

    id = models.CharField(max_length=100, primary_key=True)
    type = models.CharField(max_length=20, choices=UPDATE_TYPE_CHOICES)
    title = models.CharField(max_length=255)
    description = models.TextField()
    impact = models.CharField(max_length=20, choices=IMPACT_CHOICES)
    urgency = models.CharField(max_length=20, choices=URGENCY_CHOICES)
    source = models.CharField(max_length=255)
    publish_date = models.DateTimeField()
    expiry_date = models.DateTimeField(null=True, blank=True)
    affected_programs = models.JSONField(default=list)  # Array of strings
    action_required = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title

class Watchlist(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    user_id = models.CharField(max_length=100)
    programs = models.JSONField(default=list)  # Array of strings
    alert_preferences = models.JSONField(default=dict)  # Object with boolean fields
    last_notified = models.DateTimeField()

    def __str__(self):
        return f"Watchlist for User {self.user_id}"
