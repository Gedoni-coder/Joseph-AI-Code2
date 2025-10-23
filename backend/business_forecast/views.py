from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CustomerProfile, RevenueProjection, CostStructure, CashFlowForecast, KPI, ScenarioPlanning, Document
from .serializers import (
    CustomerProfileSerializer,
    RevenueProjectionSerializer,
    CostStructureSerializer,
    CashFlowForecastSerializer,
    KPISerializer,
    ScenarioPlanningSerializer,
    DocumentSerializer,
)

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def create(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        document = Document.objects.create(
            name=file.name,
            file=file,
            file_type=file.content_type,
            file_size=file.size,
            description=request.data.get('description', '')
        )

        serializer = self.get_serializer(document)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def list_documents(self, request):
        documents = Document.objects.all()
        serializer = self.get_serializer(documents, many=True)
        return Response(serializer.data)

class CustomerProfileViewSet(viewsets.ModelViewSet):
    queryset = CustomerProfile.objects.all()
    serializer_class = CustomerProfileSerializer

class RevenueProjectionViewSet(viewsets.ModelViewSet):
    queryset = RevenueProjection.objects.all()
    serializer_class = RevenueProjectionSerializer

class CostStructureViewSet(viewsets.ModelViewSet):
    queryset = CostStructure.objects.all()
    serializer_class = CostStructureSerializer

class CashFlowForecastViewSet(viewsets.ModelViewSet):
    queryset = CashFlowForecast.objects.all()
    serializer_class = CashFlowForecastSerializer

class KPIViewSet(viewsets.ModelViewSet):
    queryset = KPI.objects.all()
    serializer_class = KPISerializer

class ScenarioPlanningViewSet(viewsets.ModelViewSet):
    queryset = ScenarioPlanning.objects.all()
    serializer_class = ScenarioPlanningSerializer
