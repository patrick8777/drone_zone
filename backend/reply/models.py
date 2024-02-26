import os

from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models

from forum.models import Forum

from image.models import Image

from event.models import Event

User = get_user_model()


class Reply(models.Model):
    text_content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    likes_count = models.PositiveIntegerField(default=0)
    dislike_count = models.IntegerField(default=0)
    forum = models.ForeignKey(to=Forum, on_delete=models.CASCADE, blank=True, null=True, related_name='replies')
    image = models.ManyToManyField(to=Image, blank=True, related_name='replies')
    event = models.ForeignKey(to=Event, on_delete=models.CASCADE, blank=True, null=True, related_name='replies')
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    comments_count = models.IntegerField(default=0)
    users_liked = models.ManyToManyField(User, related_name='liked_replies', blank=True)
    users_disliked = models.ManyToManyField(User, related_name='disliked_replies', blank=True)

    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        if created:
            if self.event:
                self.event.reply_count += 1
                self.event.save()
            elif self.forum:
                self.forum.reply_count += 1
                self.forum.save()

    def delete(self, *args, **kwargs):
        for image in self.image.all():
            file_path = os.path.join(settings.MEDIA_ROOT, str(image.image))
            if os.path.exists(file_path):
                os.remove(file_path)
            image.delete()

        if self.event:
            self.event.reply_count -= 1
            self.event.save()
        elif self.forum:
            self.forum.reply_count -= 1
            self.forum.save()

        super().delete(*args, **kwargs)
