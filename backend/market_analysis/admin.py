from django.contrib import admin
from .models import MarketSegment, Competitor, MarketTrend

@admin.register(MarketSegment)
class MarketSegmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'market_size', 'growth_rate', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('created_at', 'updated_at')

@admin.register(Competitor)
class CompetitorAdmin(admin.ModelAdmin):
    list_display = ('name', 'market_segment', 'market_share', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('market_segment', 'created_at', 'updated_at')

@admin.register(MarketTrend)
class MarketTrendAdmin(admin.ModelAdmin):
    list_display = ('title', 'impact', 'start_date', 'end_date', 'created_at', 'updated_at')
    search_fields = ('title',)
    list_filter = ('start_date', 'end_date', 'created_at', 'updated_at')
