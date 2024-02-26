from django.contrib import admin

from .models import Review


class ReviewAdmin(admin.ModelAdmin):
    list_display = ['text_content']


admin.site.register(Review, ReviewAdmin)
