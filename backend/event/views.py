from django.db.models import Q
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status

from .models import Event
from .permissions import IsOwner, IsSuperuser
from .serializers import EventSerializer


class EventCreate(CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class EventRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsOwner | IsSuperuser]

        return super().get_permissions()


class EventList(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]


class PopularEventList(ListAPIView):
    queryset = Event.objects.order_by('-participants_count')[:6]
    serializer_class = EventSerializer
    permission_classes = [AllowAny]


class UserParticipatedEventList(ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsOwner | IsSuperuser]

    def get_queryset(self):
        user = self.request.user
        return Event.objects.filter(participants=user)


class ToggleEventParticipation(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request, event_id):

        try:
            event_instance = Event.objects.get(id=event_id)
            user = request.user
            if user in event_instance.participants.all():
                event_instance.participants.remove(user)
                event_instance.participants_count -= 1
                event_instance.save()
                message = 'User removed from event participation.'
            else:
                event_instance.participants.add(user)
                event_instance.participants_count += 1
                event_instance.save()
                message = 'User added to event participation.'
            return Response({'message': message, 'user_id': user.id}, status=status.HTTP_200_OK)
        except Event.DoesNotExist:
            return Response({'error': 'Event does not exist.'}, status=status.HTTP_404_NOT_FOUND)


class EventSearch(ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        search_query = self.request.query_params.get('search', None)

        if not search_query:
            return Event.objects.none()

        queryset = Event.objects.filter(
            Q(title__icontains=search_query) |
            Q(detail__icontains=search_query) |
            Q(type__icontains=search_query) |
            Q(category__icontains=search_query) |
            Q(city__icontains=search_query) |
            Q(country__icontains=search_query)
        ).distinct()

        return queryset
