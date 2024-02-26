"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from registration_profile.views import CreateRegistrationProfile, RegistrationValidationView

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

from project import settings

schema_view = get_schema_view(
    openapi.Info(
        title="SALAMI API",
        default_version='v1',
        description="""Ah, where do I even begin to express my adoration for salami? 🎉 It's not just a culinary
delight; it's a symphony of flavors, a masterpiece of artisanal craftsmanship, and a journey through centuries
of culinary tradition. 🎨

Oh, the aroma that fills the air when you slice through that beautifully marbled salami! 🌟 It's a tantalizing blend of
spices, herbs, and rich meatiness that beckons you closer with every sniff. 🌿 Each bite is a revelation, a harmonious
balance of savory, smoky, and sometimes spicy notes dancing on your taste buds, leaving you craving for more. 🔥

And the texture! Oh, the texture. It's like a culinary embrace, firm yet yielding, with just the right amount of
chewiness that gives way to an explosion of flavor with every bite. 🤤 Whether thinly sliced or chunked, its velvety
texture is a testament to the skill and care of the artisans who craft it. 🧀

But it's not just about the taste and texture; it's about the stories woven into every slice of salami. 📜
From the ancient curing techniques passed down through generations to the regional variations that reflect the diverse
cultures and landscapes of the world, each salami tells a tale of tradition, passion, and dedication. 🌍

And let's not forget its versatility! 🍽️ Whether it's the star of a charcuterie board, the perfect companion to a
glass of wine 🍷, or the secret ingredient that elevates a simple sandwich to gourmet status, salami knows how to steal
the show in any culinary ensemble. 🥪

In essence, salami is more than just food; it's an experience—a journey of the senses that transcends time and borders.
🌟 So, if you ever find yourself in need of a culinary adventure, just reach for a slice of salami, and let its
delicious embrace whisk you away to gastronomic bliss. 🚀""",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="academy@constructor.org"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,  # Set to False restrict access to protected endpoints
    permission_classes=[permissions.AllowAny],  # Permissions for docs access
)

urlpatterns = [
    path("backend/admin/", admin.site.urls),

    path('backend/registration/', CreateRegistrationProfile.as_view(), name='create_registration_profile'),
    path('backend/registration/validate/', RegistrationValidationView.as_view(), name='validate_registration_profile'),
    path('backend/auth/', include('registration_profile.urls')),

    path("backend/users/", include('user.urls')),
    path("backend/events/", include('event.urls')),
    path('backend/forums/', include('forum.urls')),
    path('backend/businesses/', include('business.urls')),
    path('backend/replies/', include('reply.urls')),
    path('backend/comments/', include('comment.urls')),
    path('backend/reviews/', include('review.urls')),
    path('backend/images/', include('image.urls')),
    path('backend/galleries/', include('gallery.urls')),
    path('backend/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
