from django.contrib.auth import get_user_model
from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError

User = get_user_model()


def avatar_path(instance, filename):
    return f"media-files/users/{instance.username}/avatar.{filename}"


class RegistrationProfile(models.Model):
    code = models.CharField(max_length=6, default='', blank=True)
    email = models.EmailField(unique=True, blank=True)


class RegistrationValidation(models.Model):

    def validate_phone_number(value):
        try:
            int(value)
        except ValueError:
            raise ValidationError('Value must be an integer')

    email = models.EmailField(unique=True, blank=True)
    code = models.CharField(max_length=6, default='', blank=True)
    username = models.CharField(max_length=100, blank=True, default='')
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    street = models.CharField(max_length=100, blank=True)
    zip = models.IntegerField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    password = models.CharField(max_length=100, blank=True)
    password_repeat = models.CharField(max_length=100, blank=True)
    avatar = models.ImageField(upload_to=avatar_path, blank=True, null=True)
    about = models.CharField(max_length=255, blank=True)
    my_drones = models.TextField(blank=True, default='[]')
    interests = models.TextField(blank=True, default='[]')
    phone = models.CharField(max_length=20,
                             validators=[RegexValidator(regex=r'^\+?[0-9]*$', message='Enter a valid phone number.')],
                             blank=True)
    is_professional = models.BooleanField(default=False)
    profile = models.OneToOneField(to=RegistrationProfile, on_delete=models.CASCADE, related_name='validation',
                                   blank=True)


class PasswordReset(models.Model):
    email = models.EmailField(unique=True, blank=True)
    reset_code = models.CharField(max_length=6, default='', blank=True)


class PasswordResetValidation(models.Model):
    email = models.EmailField(unique=True)
    reset_code = models.CharField(max_length=6, default='', blank=True)
    new_password = models.CharField(max_length=100, blank=True)
    password_repeat = models.CharField(max_length=100, blank=True)
