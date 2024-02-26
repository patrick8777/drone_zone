from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, GenericAPIView, ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Forum
from .permissions import IsOwner, IsSuperuser
from .serializers import ForumSerializer

User = get_user_model()


class AllForums(ListCreateAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumSerializer
    permission_classes = [AllowAny]


class CreateForum(ListCreateAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumSerializer

    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RetrieveUpdateDeleteForum(GenericAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsOwner | IsSuperuser]

        return super().get_permissions()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MostActive(ListAPIView):
    serializer_class = ForumSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Forum.objects.order_by('-reply_count')[:5]


class Latest(ListAPIView):
    serializer_class = ForumSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Forum.objects.order_by('-date_created')[:5]


class UserInterest(ListAPIView):
    serializer_class = ForumSerializer
    permission_classes = [IsOwner | IsSuperuser]

    def get_queryset(self):
        search_query = self.request.query_params.get('search', None)

        if not search_query:
            return Forum.objects.none()

        queryset = Forum.objects.filter(
            Q(category__icontains=search_query) |
            Q(question__icontains=search_query) |
            Q(text_description__icontains=search_query)
        ).distinct()

        return queryset
