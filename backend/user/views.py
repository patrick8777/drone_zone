# from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status
# Create your views here.
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .permissions import IsOwner, IsSuperuser
from .serializers import UserSerializer
from registration_profile.models import RegistrationProfile, RegistrationValidation

User = get_user_model()


class UserListCreate(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()


class UserFilter(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        search_string = self.request.query_params.get('search')
        if search_string is None:
            return User.objects.none()

        # username__icontains allows case insensitive search. Using Q, we can express logical OR when filtering
        return User.objects.filter(Q(first_name__icontains=search_string) | Q(last_name__icontains=search_string))


class UserRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsOwner | IsSuperuser]

        return super().get_permissions()

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        user_email = instance.email

        try:
            registration_profile = RegistrationProfile.objects.get(email=user_email)
            registration_profile.delete()
        except RegistrationProfile.DoesNotExist:
            pass

        try:
            registration_validation = RegistrationValidation.objects.get(email=user_email)
            registration_validation.delete()
        except RegistrationValidation.DoesNotExist:
            pass

        # Continue with user deletion
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class LoggedInUserRetrieve(RetrieveAPIView):
    serializer_class = UserSerializer

    # permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
