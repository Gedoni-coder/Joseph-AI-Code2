from django.core.management.base import BaseCommand
from tax_compliance.models import TaxRecord, ComplianceReport
from datetime import date

class Command(BaseCommand):
    help = 'Populate database with initial mock data for tax and compliance module'

    def handle(self, *args, **options):
        TaxRecord.objects.all().delete()
        ComplianceReport.objects.all().delete()

        TaxRecord.objects.create(
            tax_type='INCOME',
            amount=15000.00,
            due_date=date(2024, 4, 15),
            filing_date=None,
            filing_status='PENDING',
            description='Income tax for fiscal year 2023',
        )
        TaxRecord.objects.create(
            tax_type='SALES',
            amount=5000.00,
            due_date=date(2024, 3, 31),
            filing_date=date(2024, 3, 25),
            filing_status='FILED',
            description='Quarterly sales tax Q1 2024',
        )

        ComplianceReport.objects.create(
            report_type='AUDIT',
            title='Annual Financial Audit 2023',
            description='Audit of financial statements for fiscal year 2023',
            compliance_status='COMPLIANT',
            report_date=date(2024, 1, 15),
            next_review_date=date(2025, 1, 15),
            findings={"issues_found": 0},
            recommendations='No recommendations',
        )
        ComplianceReport.objects.create(
            report_type='REGULATORY',
            title='Regulatory Compliance Review Q1 2024',
            description='Review of compliance with regulatory requirements for Q1 2024',
            compliance_status='UNDER_REVIEW',
            report_date=date(2024, 3, 31),
            next_review_date=date(2024, 6, 30),
            findings={"issues_found": 2, "details": ["Late filings", "Missing documentation"]},
            recommendations='Address issues promptly',
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated tax and compliance mock data'))
