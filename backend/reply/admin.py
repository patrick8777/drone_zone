from django.contrib import admin

from .models import Reply


class ReplyAdmin(admin.ModelAdmin):
    list_display = ['id', 'text_content']


admin.site.register(Reply, ReplyAdmin)
