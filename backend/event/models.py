import os

from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from rest_framework.exceptions import ValidationError

from image.models import Image

User = get_user_model()


class Event(models.Model):
    # IN_PERSON = False
    # VIRTUAL = True
    title = models.TextField(max_length=100)
    detail = models.CharField(max_length=255, blank=True)
    type = models.BooleanField(default=False, blank=True)
    category = models.CharField(max_length=20)
    link = models.TextField(blank=True)
    street = models.CharField(max_length=100, blank=True)
    zip = models.IntegerField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    event_date = models.DateTimeField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now_add=True)
    participants_count = models.PositiveIntegerField(default=0)
    participants = models.ManyToManyField(to=User, related_name='my_events', blank=True)
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    image = models.ManyToManyField(to=Image, blank=True, related_name='images')
    reply_count = models.PositiveIntegerField(default=0)

    def clean(self):
        super().clean()
        if ' ' in self.category.strip():
            raise ValidationError("Category should contain only one word.")

    def delete(self, *args, **kwargs):
        for image in self.image.all():
            file_path = os.path.join(settings.MEDIA_ROOT, str(image.image))
            if os.path.exists(file_path):
                os.remove(file_path)
            image.delete()

        for image in self.image.all():
            image.delete()

        for reply in self.replies.all():
            reply.delete()

        super().delete(*args, **kwargs)

    def __str__(self):
        return self.title
