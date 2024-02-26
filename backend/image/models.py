from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


def image_path(instance, filename):
    username = instance.user.username
    return f"media-files/files/{username}/image.{filename}"


class Image(models.Model):
    image = models.FileField(upload_to=image_path)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='images')
