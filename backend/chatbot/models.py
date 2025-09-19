from django.db import models
from django.contrib.auth.models import User

class ChatMessage(models.Model):
    USER = "user"
    ASSISTANT = "assistant"
    MESSAGE_TYPES = [
        (USER, "User"),
        (ASSISTANT, "Assistant"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    type = models.CharField(max_length=10, choices=MESSAGE_TYPES)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    context = models.CharField(max_length=100, null=True, blank=True)
    tools = models.JSONField(null=True, blank=True)  # Array of tool IDs

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.type}: {self.content[:50]}..."

class ModuleContext(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)
    route = models.CharField(max_length=200)
    description = models.TextField()
    capabilities = models.JSONField()  # Array of strings
    sample_questions = models.JSONField()  # Array of strings

    def __str__(self):
        return self.name

class EconomicTool(models.Model):
    CALCULATOR = "calculator"
    ANALYZER = "analyzer"
    PLANNER = "planner"
    ADVISOR = "advisor"
    UTILITY = "utility"
    CATEGORIES = [
        (CALCULATOR, "Calculator"),
        (ANALYZER, "Analyzer"),
        (PLANNER, "Planner"),
        (ADVISOR, "Advisor"),
        (UTILITY, "Utility"),
    ]

    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORIES)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name
