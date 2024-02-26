from django.contrib import admin

from .models import Forum


class ForumAdmin(admin.ModelAdmin):
    list_display = ['category', 'question', 'reply_count']


admin.site.register(Forum, ForumAdmin)
