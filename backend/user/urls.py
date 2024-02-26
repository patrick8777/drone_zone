from django.urls import path

from user.views import UserListCreate, UserRetrieveUpdateDestroy, LoggedInUserRetrieve, UserFilter

urlpatterns = [
    path('list/', UserListCreate.as_view(), name='user-list-create'),
    path('<int:pk>/', UserRetrieveUpdateDestroy.as_view(), name='user-retrieve-update-destroy'),
    path('me/', LoggedInUserRetrieve.as_view(), name='logged-in-user-retrieve'),
    path('', UserFilter.as_view(), name='search-user'),
]
