from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

SERVICES = (
    ('Operator', 'Operator'),
    ('Repair', 'Repair'),
    ('Instructor', 'Instructor'),
)

TYPE = (
    ('Individual', 'Individual'),
    ('Company', 'Company'),
)


def avatar_path(instance, filename):
    return f"media-files/business/{instance.company_name}/avatar.{filename}"


class Business(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    services = models.CharField(max_length=255, choices=SERVICES)
    type = models.CharField(max_length=100, choices=TYPE)
    email = models.EmailField(blank=True)
    street = models.CharField(max_length=100, blank=True)
    zip = models.IntegerField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    website = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=100, blank=True)
    background_image = models.ImageField(upload_to=avatar_path, blank=True, null=True)
    average_rating = models.IntegerField(blank=True, null=True)
    avatar = models.ImageField(upload_to=avatar_path, blank=True, null=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    reviews_count = models.PositiveIntegerField(default=0)

    def get_services_list(self):
        return self.services.split(",") if self.services else []

    def set_services_list(self, services_list):
        self.services = ",".join(services_list)

    def calculate_average_rating(self):
        reviews = self.reviews.filter(rating__isnull=False)
        if reviews.exists():
            total_rating = sum(review.rating for review in reviews)
            return total_rating / reviews.count()
        return 0
