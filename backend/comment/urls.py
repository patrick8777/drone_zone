from django.urls import path

from .views import CreateReplyComment, AllReplyComments, CreateReviewComment, AllReviewComments, \
    RetrieveUpdateDeleteComment, AllUserComments, UserActivity, LikeDislikeComment

urlpatterns = [
    path('user/', AllUserComments.as_view(), name='user_comments_list'),
    path('user/activity/', UserActivity.as_view(), name='user_activity'),
    # path('user/replies/comments/', AllUserReplyComments.as_view(), name='user_reply_comments_list'),
    # path('user/reviews/comments/', AllUserReviewComments.as_view(), name='user_reply_comments_list'),
    path('new/reply/<int:reply_id>/', CreateReplyComment.as_view(), name='reply_comment_create'),
    path('reply/<int:reply_id>/', AllReplyComments.as_view(), name='get_all_reply_comments'),
    path('new/review/<int:review_id>/', CreateReviewComment.as_view(), name='review_comment_create'),
    path('review/<int:review_id>/', AllReviewComments.as_view(), name='get_all_review_comments'),
    path('<int:pk>/', RetrieveUpdateDeleteComment.as_view(), name='single_comment'),
    path('<int:pk>/like-dislike/', LikeDislikeComment.as_view(), name='like_dislike_comment'),
]
