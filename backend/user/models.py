import json

from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.db import models


def avatar_path(instance, filename):
    return f"media-files/users/{instance.username}/avatar.{filename}"


# Create your models here.
class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def validate_phone_number(value):
        try:
            int(value)
        except ValueError:
            raise ValidationError('Value must be an integer')

    username = models.CharField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20,
                             validators=[RegexValidator(regex=r'^\+?[0-9]*$', message='Enter a valid phone number.')],
                             blank=True)
    street = models.CharField(max_length=100, blank=True)
    zip = models.IntegerField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    joined_date = models.DateTimeField(auto_now_add=True)
    avatar = models.ImageField(upload_to=avatar_path, blank=True, null=True)
    about = models.CharField(max_length=255, blank=True)
    my_drones = models.TextField(blank=True)
    interests = models.TextField(blank=True)
    is_professional = models.BooleanField(default=False)

    def set_my_drones(self, drones):
        self.my_drones = json.dumps(drones)

    def get_my_drones(self):
        return json.loads(self.my_drones)

    def set_interests(self, interests):
        self.interests = json.dumps(interests)

    def get_interests(self):
        return json.loads(self.interests)

    def __str__(self):
        return self.username
