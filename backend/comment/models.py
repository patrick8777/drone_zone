from django.contrib.auth import get_user_model
from django.db import models

from reply.models import Reply
from review.models import Review

User = get_user_model()


class Comment(models.Model):
    text_description = models.TextField()
    likes_count = models.IntegerField(default=0)
    dislike_count = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    review = models.ForeignKey(to=Review, on_delete=models.CASCADE, blank=True, null=True, related_name='comments')
    reply = models.ForeignKey(to=Reply, on_delete=models.CASCADE, blank=True, null=True, related_name='comments')
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    users_liked = models.ManyToManyField(User, related_name='liked_comments', blank=True)
    users_disliked = models.ManyToManyField(User, related_name='disliked_comments', blank=True)

    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        if created:
            if self.reply:
                self.reply.comments_count += 1
                self.reply.save()
            elif self.review:
                self.review.comments_count += 1
                self.review.save()

    def delete(self, *args, **kwargs):
        if self.reply:
            self.reply.comments_count -= 1
            self.reply.save()
        elif self.review:
            self.review.comments_count -= 1
            self.review.save()

        super().delete(*args, **kwargs)
