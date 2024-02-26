from django.contrib import admin

from .models import Gallery


class GalleryAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']


admin.site.register(Gallery, GalleryAdmin)
