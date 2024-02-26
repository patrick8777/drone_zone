from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView, GenericAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from business.models import Business
from .models import Review
from .permissions import IsOwner, IsSuperuser
from .serializers import ReviewSerializer


class AllBusinessReviews(ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        business_id = self.kwargs.get('business_id')
        return Review.objects.filter(business_id=business_id)


class CreateBusinessReview(CreateAPIView):
    serializer_class = ReviewSerializer

    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        business_id = self.kwargs.get('business_id')
        business_instance = Business.objects.get(pk=business_id)
        serializer.save(user=self.request.user, business=business_instance)


class RetrieveUpdateDeleteReview(RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

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

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LikeReview(GenericAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    # permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        review = self.get_object()
        user = request.user

        if user in review.users_liked.all():
            review.likes_count -= 1  # Remove the like
            review.users_liked.remove(user)
            review.save()
            serializer = self.get_serializer(review)
            return Response(serializer.data)
        else:
            review.likes_count += 1  # Add the like
            review.users_liked.add(user)
            review.save()
            serializer = self.get_serializer(review)
            return Response(serializer.data)
