from django.urls import path

from .views import EventCreate, EventRetrieveUpdateDestroy, EventList, PopularEventList, UserParticipatedEventList, \
    ToggleEventParticipation, EventSearch

urlpatterns = [
    path('', EventList.as_view(), name='event-list'),
    path('create/', EventCreate.as_view(), name='event-create'),
    path('<int:pk>/', EventRetrieveUpdateDestroy.as_view(), name='event-byid-edit-delete'),
    path('popular/', PopularEventList.as_view(), name='popular-event-list'),
    path('participated/', UserParticipatedEventList.as_view(), name='user-participated-event-list'),
    path('<int:event_id>/toggle-participation/', ToggleEventParticipation.as_view(), name='toggle-event-participation'),
    path('search/', EventSearch.as_view(), name='event-search'),
]
