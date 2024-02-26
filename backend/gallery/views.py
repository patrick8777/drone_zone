from rest_framework import status
from rest_framework.generics import CreateAPIView, ListCreateAPIView, GenericAPIView, ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Gallery
from .permissions import IsOwner, IsSuperuser
from .serializers import GallerySerializer


class AllGalleries(ListCreateAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    permission_classes = [AllowAny]


class GalleryCreate(CreateAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RetrieveUpdateDeleteGallery(GenericAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        elif self.request.method == 'PATCH' and 'favourite' in self.request.data:
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

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GalleryFavouriteList(ListAPIView):
    serializer_class = GallerySerializer

    def get_queryset(self):
        return Gallery.objects.filter(favourite=True)


class GalleryPrivateList(ListAPIView):
    serializer_class = GallerySerializer
    permission_classes = [IsOwner | IsSuperuser]

    def get_queryset(self):
        return Gallery.objects.filter(private=True)
