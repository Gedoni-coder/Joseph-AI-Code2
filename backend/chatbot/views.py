import google.generativeai as genai
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from .models import ChatMessage, ModuleContext, EconomicTool
from .serializers import (
    ChatMessageSerializer,
    ModuleContextSerializer,
    EconomicToolSerializer,
)
from .agent import agent

# Configure Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

class ModuleContextViewSet(viewsets.ModelViewSet):
    queryset = ModuleContext.objects.all()
    serializer_class = ModuleContextSerializer

class EconomicToolViewSet(viewsets.ModelViewSet):
    queryset = EconomicTool.objects.all()
    serializer_class = EconomicToolSerializer

@api_view(['POST'])
def generate_response(request):
    """Generate a contextual response based on conversation history and context using Gemini AI"""
    messages = request.data.get('messages', [])
    context = request.data.get('context', '')
    current_data = request.data.get('currentData', {})

    # Context descriptions for the AI
    context_descriptions = {
        "economic-forecasting": "Economic indicators, forecasts, and market analysis",
        "business-forecast": "Business performance predictions and scenarios",
        "tax-compliance": "Tax obligations and regulatory compliance",
        "pricing-strategy": "Pricing models and competitive analysis",
        "revenue-strategy": "Revenue optimization and growth strategies",
        "market-analysis": "Market research and competitive intelligence",
        "loan-funding": "Financing options and investment analysis",
        "inventory-supply": "Supply chain optimization and inventory management",
        "financial-advisory": "Financial planning and strategic budgeting",
        "policy-economic": "Policy analysis and economic impact assessment",
    }

    context_description = context_descriptions.get(context, "General business and economic analysis")

    # System prompt
    system_prompt = f"""You are Joseph AI, an expert economic and business intelligence assistant.

Current Context: {context_description}

{("Current Data: " + str(current_data)) if current_data else ""}

Please provide helpful, accurate, and contextual responses as Joseph AI. Be professional, insightful, and focus on the specific context. If relevant data is provided, analyze it and provide actionable insights. Maintain conversation context and build upon previous messages."""

    # Prepare contents for Gemini
    contents = [{"role": "user", "parts": [system_prompt]}]  # System message as first user message

    for msg in messages:
        role = "user" if msg.get('type') == 'user' else "model"
        content = msg.get('content', '')
        contents.append({"role": role, "parts": [content]})

    try:
        # Generate response using Gemini with conversation history
        response = model.generate_content(contents)
        response_content = response.text.strip()

        # Fallback if response is empty
        if not response_content:
            response_content = f"As Joseph AI, I'm here to help with {context_description}."

    except Exception as e:
        # Fallback to simple response if API fails
        response_content = f"As Joseph AI, I'm here to help with {context_description}."

    from django.utils import timezone
    return Response({
        'response': response_content,
        'timestamp': timezone.now().isoformat()
    })

@api_view(['POST'])
def agent_start(request):
    """Start the autonomous agent."""
    if not agent.is_running:
        agent.start()
        return Response({'status': 'Agent started'})
    else:
        return Response({'status': 'Agent already running'})

@api_view(['POST'])
def agent_stop(request):
    """Stop the autonomous agent."""
    if agent.is_running:
        agent.stop()
        return Response({'status': 'Agent stopped'})
    else:
        return Response({'status': 'Agent not running'})

@api_view(['GET'])
def agent_status(request):
    """Get the current status of the autonomous agent."""
    status = agent.get_status()
    return Response(status)
