from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from forum.models import Forum
from forum.serializers import ForumSerializer
from reply.models import Reply
from reply.serializers import ReplySerializer
from review.models import Review
from .models import Comment
from .permissions import IsOwner, IsSuperuser
from .serializers import CommentSerializer


class AllReplyComments(ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        reply_id = self.kwargs.get('reply_id')
        return Comment.objects.filter(reply_id=reply_id)


class CreateReplyComment(CreateAPIView):
    serializer_class = CommentSerializer

    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        reply_id = self.kwargs.get('reply_id')
        reply_instance = Reply.objects.get(pk=reply_id)
        serializer.save(user=self.request.user, reply=reply_instance)


class AllReviewComments(ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        review_id = self.kwargs.get('review_id')
        return Comment.objects.filter(review_id=review_id)


class CreateReviewComment(CreateAPIView):
    serializer_class = CommentSerializer

    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        review_id = self.kwargs.get('review_id')
        review_instance = Review.objects.get(pk=review_id)
        serializer.save(user=self.request.user, review=review_instance)


class RetrieveUpdateDeleteComment(GenericAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

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


class AllUserComments(ListAPIView):
    serializer_class = CommentSerializer

    # permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Comment.objects.filter(user=self.request.user)


class UserActivity(APIView):
    permission_classes = [IsOwner | IsSuperuser]

    def get(self, request, *args, **kwargs):
        user = self.request.user

        user_comments = Comment.objects.filter(user=user)
        user_replies = Reply.objects.filter(user=user)
        user_forums = Forum.objects.filter(user=user)

        comment_serializer = CommentSerializer(user_comments, many=True)
        reply_serializer = ReplySerializer(user_replies, many=True)
        forum_serializer = ForumSerializer(user_forums, many=True)

        return Response({
            'user_comments': comment_serializer.data,
            'user_replies': reply_serializer.data,
            'user_forums': forum_serializer.data
        })


class LikeDislikeComment(GenericAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        comment = self.get_object()
        action = request.data.get('action')
        user = request.user

        if action not in ['like', 'dislike']:
            return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user has already liked or disliked this comment
        if user in comment.users_liked.all() and action == 'like':
            # If the user already liked the comment and is trying to like it again, remove the like
            comment.likes_count -= 1
            comment.users_liked.remove(user)
        elif user in comment.users_disliked.all() and action == 'dislike':
            # If the user already disliked the comment and is trying to dislike it again, remove the dislike
            comment.dislike_count -= 1
            comment.users_disliked.remove(user)
        elif user in comment.users_liked.all() and action == 'dislike':
            # If the user is switching from liking to disliking, decrement the like count by one
            comment.likes_count -= 1
            comment.users_liked.remove(user)
            comment.dislike_count += 1
            comment.users_disliked.add(user)
            comment.save()
            serializer = self.get_serializer(comment)
            return Response(serializer.data)
        elif user in comment.users_disliked.all() and action == 'like':
            # If the user is switching from disliking to liking, increment the like count by one
            comment.dislike_count -= 1
            comment.users_disliked.remove(user)
            comment.likes_count += 1
            comment.users_liked.add(user)
            comment.save()
            serializer = self.get_serializer(comment)
            return Response(serializer.data)

        # Perform the like/dislike action
        if action == 'like':
            comment.likes_count += 1
            comment.users_liked.add(user)
        elif action == 'dislike':
            comment.dislike_count += 1
            comment.users_disliked.add(user)

        comment.save()
        serializer = self.get_serializer(comment)
        return Response(serializer.data)
