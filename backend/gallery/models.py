import os

from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models

from image.models import Image

User = get_user_model()


class Gallery(models.Model):
    title = models.CharField(max_length=100, blank=True)
    text_content = models.TextField(blank=True)
    drone = models.CharField(max_length=100, blank=True)
    private = models.BooleanField(default=False, blank=True)
    favourite = models.BooleanField(default=False, blank=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='galleries')
    image = models.ManyToManyField(to=Image, related_name='galleries')

    def delete(self, *args, **kwargs):
        for image in self.image.all():
            file_path = os.path.join(settings.MEDIA_ROOT, str(image.image))
            if os.path.exists(file_path):
                os.remove(file_path)
            image.delete()

        for image in self.image.all():
            image.delete()
        super().delete(*args, **kwargs)
