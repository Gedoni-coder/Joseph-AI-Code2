from django.contrib import admin
from .models import ChatMessage, ModuleContext, EconomicTool

admin.site.register(ChatMessage)
admin.site.register(ModuleContext)
admin.site.register(EconomicTool)
