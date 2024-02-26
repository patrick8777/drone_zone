from django.urls import path

from .views import AllForumReplies, CreateForumReply, RetrieveUpdateDeleteReply, AllEventReplies, CreateEventReply, \
    LikeDislikeReply

urlpatterns = [
    path('forum/<int:forum_id>/', AllForumReplies.as_view(), name='get_all_forum_replies'),
    path('new/forum/<int:forum_id>/', CreateForumReply.as_view(), name='create_forum_reply'),
    path('<int:pk>/', RetrieveUpdateDeleteReply.as_view(), name='single_reply'),
    path('event/<int:event_id>/', AllEventReplies.as_view(), name='get_all_event_replies'),
    path('new/event/<int:event_id>/', CreateEventReply.as_view(), name='create_event_reply'),
    path('<int:pk>/like-dislike/', LikeDislikeReply.as_view(), name='like_dislike_reply'),
]
