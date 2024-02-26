from django.urls import path

from .views import AllForums, CreateForum, RetrieveUpdateDeleteForum, MostActive, Latest, UserInterest

urlpatterns = [
    path('', AllForums.as_view(), name='get_all_forums'),
    path('new/', CreateForum.as_view(), name='create_forum'),
    path('<int:pk>/', RetrieveUpdateDeleteForum.as_view(), name='single_forum'),
    path('best/', MostActive.as_view(), name='forums_best'),
    path('latest/', Latest.as_view(), name='forums_latest'),
    path('interests/', UserInterest.as_view(), name='forums_latest'),
]
