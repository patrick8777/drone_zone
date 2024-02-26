from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

User = get_user_model()


class CustomUserAdmin(UserAdmin):
    # fields shown when creating a new instance
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2')}
         ),
    )
    # fields when reading / updating an instance
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'avatar')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Groups', {'fields': ('groups',)}),
        ('Extra info', {'fields': ('about', 'my_drones', 'interests', 'is_professional')}),
    )
    readonly_fields = ['date_joined']
    list_display = ['email', 'id', 'first_name', 'last_name', 'is_staff', 'is_superuser']
    ordering = ['email']


# Register your models here.
admin.site.register(User, CustomUserAdmin)
