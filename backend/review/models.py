from django.contrib.auth import get_user_model
from django.db import models

from business.models import Business

User = get_user_model()


class Review(models.Model):
    text_content = models.TextField()
    rating = models.IntegerField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now_add=True)
    likes_count = models.IntegerField(default=0)
    business = models.ForeignKey(to=Business, on_delete=models.CASCADE, related_name='reviews')
    comments_count = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='reviews')
    users_liked = models.ManyToManyField(to=User, related_name='users_liked')

    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        if created and self.business:
            self.business.reviews_count += 1
            self.business.save()

    def delete(self, *args, **kwargs):
        if self.business:
            if self.business.reviews_count > 0:
                self.business.reviews_count -= 1
                self.business.save()
        super().delete(*args, **kwargs)
