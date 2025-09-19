from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import (
    ChatMessageViewSet,
    ModuleContextViewSet,
    EconomicToolViewSet,
    generate_response,
    agent_start,
    agent_stop,
    agent_status,
)

router = DefaultRouter()
router.register(r'messages', ChatMessageViewSet)
router.register(r'module-contexts', ModuleContextViewSet)
router.register(r'economic-tools', EconomicToolViewSet)

urlpatterns = router.urls + [
    path('generate-response/', generate_response, name='generate_response'),
    path('agent/start/', agent_start, name='agent_start'),
    path('agent/stop/', agent_stop, name='agent_stop'),
    path('agent/status/', agent_status, name='agent_status'),
]
