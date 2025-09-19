from rest_framework import serializers
from .models import ChatMessage, ModuleContext, EconomicTool

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
