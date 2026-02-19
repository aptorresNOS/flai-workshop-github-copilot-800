from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'team', 'created_at']
    search_fields = ['name', 'email']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'created_at']
    search_fields = ['name']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['user_email', 'activity_type', 'duration', 'distance', 'calories', 'date']
    search_fields = ['user_email', 'activity_type']
    list_filter = ['activity_type']


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['user_name', 'user_email', 'team', 'total_activities', 'total_duration', 'total_distance', 'total_calories', 'rank']
    search_fields = ['user_name', 'user_email', 'team']
    ordering = ['rank']


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['name', 'difficulty', 'duration', 'category']
    search_fields = ['name', 'category']
    list_filter = ['difficulty', 'category']
