from django.urls import path
from .views import ImageUploadView, ImageGetDeleteView, AllEventImages
from .views import AllReplyImages

urlpatterns = [
    path('upload/', ImageUploadView.as_view(), name='image-upload'),
    path('<int:image_id>/', ImageGetDeleteView.as_view(), name='image-delete'),
    path('reply/<int:reply_id>/', AllReplyImages.as_view(), name='get_all_reply_images'),
    path('event/<int:event_id>/', AllEventImages.as_view(), name='get_all_event_images'),

]
