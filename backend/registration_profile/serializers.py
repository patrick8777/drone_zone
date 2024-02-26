from rest_framework import serializers

from .models import (RegistrationProfile, RegistrationValidation, PasswordReset,
                     PasswordResetValidation)


class RegistrationSerializer(serializers.ModelSerializer):
    code = serializers.CharField(max_length=6, write_only=True, required=False)

    class Meta:
        model = RegistrationProfile
        fields = ['id', 'email', 'code']


class RegistrationValidationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationValidation
        fields = ['id', 'email', 'code', 'username', 'street', 'zip', 'city', 'country', 'first_name',
                  'last_name', 'password', 'is_professional', 'profile', 'avatar', 'phone', 'about', 'interests', 'my_drones']


class PasswordResetSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordReset
        fields = ['id', 'email', 'reset_code']


class PasswordResetValidationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetValidation
        fields = ['email', 'reset_code', 'new_password', 'password_repeat']
