import os

from django.conf import settings
from rest_framework import status
from rest_framework.generics import get_object_or_404, ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Image
from .serializers import ImageSerializer
from reply.models import Reply

from event.models import Event


class ImageUploadView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        images_data = [{'image': image, 'user': user.pk} for image in request.FILES.getlist('image')]
        serializer = ImageSerializer(data=images_data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ImageGetDeleteView(APIView):

    def get(self, request, image_id, *args, **kwargs):
        image = get_object_or_404(Image, id=image_id)
        serializer = ImageSerializer(image)
        return Response(serializer.data)

    def delete(self, request, image_id, *args, **kwargs):
        try:
            image = Image.objects.get(id=image_id)
        except Image.DoesNotExist:
            return Response({'error': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)

        if image.user != request.user:
            return Response({'error': 'You are not authorized to delete this image'}, status=status.HTTP_403_FORBIDDEN)

        file_path = os.path.join(settings.MEDIA_ROOT, str(image.image))

        if os.path.exists(file_path):
            os.remove(file_path)

        image.delete()

        return Response({'message': 'Image deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class AllReplyImages(ListAPIView):
    serializer_class = ImageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        reply_id = self.kwargs.get('reply_id')
        try:
            reply = Reply.objects.get(pk=reply_id)
            return reply.image.all()
        except Reply.DoesNotExist:
            return Image.objects.none()


class AllEventImages(ListAPIView):
    serializer_class = ImageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        event_id = self.kwargs.get('event_id')
        try:
            event = Event.objects.get(pk=event_id)
            return event.image.all()
        except Event.DoesNotExist:
            return Event.objects.none()
