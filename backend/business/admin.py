from django.contrib import admin

from .models import Business


class BusinessAdmin(admin.ModelAdmin):
    list_display = ['company_name']


admin.site.register(Business, BusinessAdmin)
