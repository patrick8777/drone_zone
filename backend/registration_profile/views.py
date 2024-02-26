import random

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import get_connection, send_mail
from rest_framework import serializers, status
from rest_framework.generics import CreateAPIView, GenericAPIView, get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import RegistrationProfile, RegistrationValidation, PasswordReset
from .serializers import (RegistrationSerializer, RegistrationValidationSerializer,
                          PasswordResetSerializer, PasswordResetValidationSerializer)

User = get_user_model()


class CreateRegistrationProfile(CreateAPIView):
    serializer_class = RegistrationSerializer
    queryset = RegistrationProfile.objects.all()
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        code = self.code_generator()
        serializer.save(code=code)
        self.send_email(serializer)

    def send_email(self, serializer):
        with get_connection(
                host=settings.EMAIL_HOST,
                port=settings.EMAIL_PORT,
                username=settings.EMAIL_HOST_USER,
                password=settings.EMAIL_HOST_PASSWORD,
                use_tls=settings.EMAIL_USE_TLS
        ):
            send_mail(
                'Dronet - Validation Code',
                f"Thanks for the registration! Your code: {serializer.instance.code}",
                'luna2conaca@gmail.com',
                [serializer.instance.email],
                fail_silently=False,
            )

    def code_generator(self):
        numbers = '0123456789'
        return ''.join(random.choice(numbers) for _ in range(6))


class RegistrationValidationView(GenericAPIView):
    serializer_class = RegistrationValidationSerializer
    permission_classes = [AllowAny]
    queryset = RegistrationValidation.objects.all()

    def patch(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        registration_profile = get_object_or_404(RegistrationProfile, email=request.data['email'])

        if not serializer.validated_data['code'] == registration_profile.code:
            raise serializers.ValidationError("Registration code is not correct")

        serializer.save(profile=registration_profile)

        user = User.objects.create(
            email=serializer.validated_data['email'],
            username=serializer.validated_data['username'],
            first_name=serializer.validated_data['first_name'],
            last_name=serializer.validated_data['last_name'],
            street=serializer.validated_data['street'],
            zip=serializer.validated_data['zip'],
            city=serializer.validated_data['city'],
            country=serializer.validated_data['country'],
            is_professional=serializer.validated_data['is_professional'],
            about=serializer.validated_data['about'],
            my_drones=serializer.validated_data['my_drones'],
            interests=serializer.validated_data['interests'],
            phone=serializer.validated_data['phone'],
            avatar=serializer.validated_data['avatar'],

        )
        user.set_password(serializer.validated_data['password'])
        user.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


# views.py
class PasswordResetRequestView(CreateAPIView):
    serializer_class = PasswordResetSerializer
    queryset = PasswordReset.objects.all()
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        code = self.code_generator()
        serializer.save(reset_code=code)
        self.send_reset_email(serializer)

    def send_reset_email(self, serializer):
        with get_connection(
                host=settings.EMAIL_HOST,
                port=settings.EMAIL_PORT,
                username=settings.EMAIL_HOST_USER,
                password=settings.EMAIL_HOST_PASSWORD,
                use_tls=settings.EMAIL_USE_TLS
        ):
            send_mail(
                'Dronet - Password Reset',
                f"Your password reset code is: {serializer.instance.reset_code}",
                'luna2conaca@gmail.com',
                [serializer.instance.email],
                fail_silently=False,
            )

    def code_generator(self):
        numbers = '0123456789'
        return ''.join(random.choice(numbers) for _ in range(6))


# views.py
class PasswordResetValidationView(GenericAPIView):
    serializer_class = PasswordResetValidationSerializer
    permission_classes = [AllowAny]

    def patch(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = User.objects.get(email=serializer.validated_data['email'])
        except ObjectDoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        if not serializer.validated_data['new_password'] == serializer.validated_data['password_repeat']:
            return Response({"detail": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        # Update user's password bla
        user.set_password(serializer.validated_data['new_password'])
        user.save()

        return Response({"detail": "Password reset successfully"}, status=status.HTTP_200_OK)
