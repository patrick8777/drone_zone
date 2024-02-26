from django.contrib.auth import get_user_model
from django.db import models
from rest_framework.exceptions import ValidationError

User = get_user_model()


class Forum(models.Model):
    category = models.CharField(max_length=100)
    question = models.CharField(max_length=100)
    text_description = models.TextField()
    likes_count = models.PositiveIntegerField(default=0)
    dislike_count = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now_add=True)
    reply_count = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)

    def clean(self):
        super().clean()
        if ' ' in self.category.strip():
            raise ValidationError("Category should contain only one word.")

    def delete(self, *args, **kwargs):
        for reply in self.replies.all():
            reply.delete()
        super().delete(*args, **kwargs)
