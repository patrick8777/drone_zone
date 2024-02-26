from django.urls import path

from .views import (
    BusinessDetail,
    BusinessForCurrentUser,
    BusinessReviewed,
    BusinessFilter, BusinessList, BusinessCreate, BusinessSearch, BusinessBestRated,
    BusinessOperator, BusinessInstructor, BusinessRepair,
)

urlpatterns = [
    path('', BusinessList.as_view(), name='business-list'),
    path('create/', BusinessCreate.as_view(), name='business-create'),
    path('<int:pk>/', BusinessDetail.as_view(), name='business-detail'),
    path('current_user/', BusinessForCurrentUser.as_view(), name='business-for-current-user'),
    path('reviewed/', BusinessReviewed.as_view(), name='business-reviewed'),
    path('filter/', BusinessFilter.as_view(), name='business-filter'),
    path('search/', BusinessSearch.as_view(), name='business-search'),
    path('repair/', BusinessRepair.as_view(), name='business-repair'),
    path('instructor/', BusinessInstructor.as_view(), name='business-instructor'),
    path('operator/', BusinessOperator.as_view(), name='business-operator'),
    path('best/', BusinessBestRated.as_view(), name='business-by-service'),
]
