from rest_framework import serializers
from .models import ChatMessage, ModuleContext, EconomicTool, ModuleConversation, ModuleConversationMessage

class ModuleConversationMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuleConversationMessage
        fields = ['id', 'type', 'content', 'timestamp']
        read_only_fields = ['id', 'timestamp']

class ModuleConversationSerializer(serializers.ModelSerializer):
    messages = ModuleConversationMessageSerializer(many=True, read_only=True)

    class Meta:
        model = ModuleConversation
        fields = ['id', 'module', 'title', 'created_at', 'updated_at', 'messages']
        read_only_fields = ['id', 'created_at', 'updated_at']

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'

class ModuleContextSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuleContext
        fields = '__all__'

class EconomicToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = EconomicTool
        fields = '__all__'
