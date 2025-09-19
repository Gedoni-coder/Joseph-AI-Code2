from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import TaxRecord, ComplianceReport
from .serializers import TaxRecordSerializer, ComplianceReportSerializer

@api_view(['GET'])
def tax_home(request):
    """
    Tax compliance API root view.
    """
    endpoints = {
        "tax_records": "/api/tax/tax-records/",
        "compliance_reports": "/api/tax/compliance-reports/",
    }
    return Response({
        "message": "Tax Compliance API",
        "endpoints": endpoints
    })

class TaxRecordViewSet(viewsets.ModelViewSet):
    queryset = TaxRecord.objects.all()
    serializer_class = TaxRecordSerializer

class ComplianceReportViewSet(viewsets.ModelViewSet):
    queryset = ComplianceReport.objects.all()
    serializer_class = ComplianceReportSerializer
