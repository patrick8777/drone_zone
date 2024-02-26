from django.urls import path

from .views import AllBusinessReviews, CreateBusinessReview, RetrieveUpdateDeleteReview, LikeReview

urlpatterns = [
    path('business/<int:business_id>/', AllBusinessReviews.as_view(), name='get_all_reviews'),
    path('new/<int:business_id>/', CreateBusinessReview.as_view(), name='create_review'),
    path('<int:pk>/', RetrieveUpdateDeleteReview.as_view(), name='single_review'),
    path('<int:pk>/like/', LikeReview.as_view(), name='like_review'),
    # path('event/<int:event_id>/', AllEventReplies.as_view(), name='get_all_event_replies'),
    # path('new/event/<int:event_id>/', CreateEventReply.as_view(), name='create_event_reply'),
]
