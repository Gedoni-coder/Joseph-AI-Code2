import google.generativeai as genai
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from .models import ChatMessage, ModuleContext, EconomicTool, ModuleConversation, ModuleConversationMessage
from .serializers import (
    ChatMessageSerializer,
    ModuleContextSerializer,
    EconomicToolSerializer,
    ModuleConversationSerializer,
    ModuleConversationMessageSerializer,
)
from .agent import agent

# Configure Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

class ModuleConversationViewSet(viewsets.ModelViewSet):
    queryset = ModuleConversation.objects.all()
    serializer_class = ModuleConversationSerializer

    def get_queryset(self):
        module = self.request.query_params.get('module')
        queryset = ModuleConversation.objects.all()
        if module:
            queryset = queryset.filter(module=module)
        return queryset

    def create(self, request, *args, **kwargs):
        module = request.data.get('module')
        title = request.data.get('title')

        conversation = ModuleConversation.objects.create(
            module=module,
            title=title,
            user=request.user if request.user.is_authenticated else None
        )

        serializer = self.get_serializer(conversation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ModuleConversationMessageViewSet(viewsets.ModelViewSet):
    queryset = ModuleConversationMessage.objects.all()
    serializer_class = ModuleConversationMessageSerializer

    def get_queryset(self):
        conversation_id = self.request.query_params.get('conversation')
        queryset = ModuleConversationMessage.objects.all()
        if conversation_id:
            queryset = queryset.filter(conversation_id=conversation_id)
        return queryset

    def create(self, request, *args, **kwargs):
        conversation_id = request.data.get('conversation')
        message_type = request.data.get('type')
        content = request.data.get('content')

        try:
            conversation = ModuleConversation.objects.get(id=conversation_id)
        except ModuleConversation.DoesNotExist:
            return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)

        message = ModuleConversationMessage.objects.create(
            conversation=conversation,
            type=message_type,
            content=content
        )

        conversation.title = conversation.title or f"{conversation.module} Chat"
        conversation.save()

        serializer = self.get_serializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def module_chat(request):
    """Handle chat messages for module-specific conversations"""
    conversation_id = request.data.get('conversation')
    content = request.data.get('content')
    module = request.data.get('module')

    if not all([conversation_id, content, module]):
        return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        conversation = ModuleConversation.objects.get(id=conversation_id)
    except ModuleConversation.DoesNotExist:
        return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)

    user_message = ModuleConversationMessage.objects.create(
        conversation=conversation,
        type='user',
        content=content
    )

    try:
        history = list(conversation.messages.all().exclude(id=user_message.id).values_list('type', 'content'))
        system_prompt = get_module_system_prompt(module)

        try:
            response = model.generate_content(
                f"{system_prompt}\n\nUser message: {content}",
                generation_config=genai.types.GenerationConfig(temperature=0.7)
            )
            assistant_content = response.text if response else "Unable to generate response"
        except Exception:
            assistant_content = f"I'm a {module.replace('_', ' ')} assistant. How can I help you today?"

        assistant_message = ModuleConversationMessage.objects.create(
            conversation=conversation,
            type='assistant',
            content=assistant_content
        )

        return Response({
            'user_message': ModuleConversationMessageSerializer(user_message).data,
            'assistant_message': ModuleConversationMessageSerializer(assistant_message).data,
        })
    except Exception as e:
        assistant_message = ModuleConversationMessage.objects.create(
            conversation=conversation,
            type='assistant',
            content=f"I'm a {module.replace('_', ' ')} assistant. I'm here to help with your questions about {module.replace('_', ' ').lower()}."
        )
        return Response({
            'user_message': ModuleConversationMessageSerializer(user_message).data,
            'assistant_message': ModuleConversationMessageSerializer(assistant_message).data,
        })

def get_module_system_prompt(module):
    prompts = {
        'market_analysis': 'You are a market analysis expert. Provide insights about market trends, competitive landscape, and market opportunities.',
        'pricing_strategy': 'You are a pricing strategy expert. Help with pricing models, competitor analysis, and price optimization strategies.',
        'revenue_strategy': 'You are a revenue strategy expert. Provide guidance on revenue optimization, growth strategies, and business metrics.',
    }
    return prompts.get(module, 'You are a business assistant.')

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
