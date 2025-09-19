from django.contrib import admin
from .models import TaxRecord, ComplianceReport

admin.site.register(TaxRecord)
admin.site.register(ComplianceReport)
