from django.db import models

class TaxRecord(models.Model):
    FILING_STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('FILED', 'Filed'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    TAX_TYPE_CHOICES = [
        ('INCOME', 'Income Tax'),
        ('SALES', 'Sales Tax'),
        ('PROPERTY', 'Property Tax'),
        ('PAYROLL', 'Payroll Tax'),
        ('VAT', 'VAT'),
    ]

    tax_type = models.CharField(max_length=20, choices=TAX_TYPE_CHOICES)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    due_date = models.DateField()
    filing_date = models.DateField(null=True, blank=True)
    filing_status = models.CharField(max_length=20, choices=FILING_STATUS_CHOICES, default='PENDING')
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.tax_type} - {self.amount} ({self.filing_status})"

class ComplianceReport(models.Model):
    COMPLIANCE_STATUS_CHOICES = [
        ('COMPLIANT', 'Compliant'),
        ('NON_COMPLIANT', 'Non-Compliant'),
        ('UNDER_REVIEW', 'Under Review'),
        ('PENDING', 'Pending'),
    ]

    REPORT_TYPE_CHOICES = [
        ('AUDIT', 'Audit Report'),
        ('REGULATORY', 'Regulatory Compliance'),
        ('INTERNAL', 'Internal Review'),
        ('FINANCIAL', 'Financial Compliance'),
    ]

    report_type = models.CharField(max_length=20, choices=REPORT_TYPE_CHOICES)
    title = models.CharField(max_length=200)
    description = models.TextField()
    compliance_status = models.CharField(max_length=20, choices=COMPLIANCE_STATUS_CHOICES, default='PENDING')
    report_date = models.DateField()
    next_review_date = models.DateField(null=True, blank=True)
    findings = models.JSONField(null=True, blank=True)
    recommendations = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.compliance_status}"
