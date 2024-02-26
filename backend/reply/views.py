from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from event.models import Event
from forum.models import Forum
from .models import Reply
from .permissions import IsOwner, IsSuperuser
from .serializers import ReplySerializer

User = get_user_model()


class AllForumReplies(ListAPIView):
    serializer_class = ReplySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        forum_id = self.kwargs.get('forum_id')
        return Reply.objects.filter(forum_id=forum_id)


class CreateForumReply(CreateAPIView):
    serializer_class = ReplySerializer

    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        forum_id = self.kwargs.get('forum_id')
        forum_instance = Forum.objects.get(pk=forum_id)

        reply = serializer.save(
            user=self.request.user,
            forum=forum_instance,
        )

        return reply


class RetrieveUpdateDeleteReply(GenericAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer

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


class AllEventReplies(ListAPIView):
    serializer_class = ReplySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        event_id = self.kwargs.get('event_id')
        return Reply.objects.filter(event_id=event_id)


class CreateEventReply(CreateAPIView):
    serializer_class = ReplySerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        event_id = self.kwargs.get('event_id')
        event_instance = Event.objects.get(pk=event_id)
        serializer.save(user=self.request.user, event=event_instance)


class LikeDislikeReply(GenericAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        reply = self.get_object()
        action = request.data.get('action')
        user = request.user

        if action not in ['like', 'dislike']:
            return Response({'error': 'Invalid action', 'request.data': request.data},
                            status=status.HTTP_400_BAD_REQUEST)

        # Check if the user has already liked or disliked this reply
        if user in reply.users_liked.all() and action == 'like':
            # If the user already liked the reply and is trying to like it again, remove the like
            reply.likes_count -= 1
            reply.users_liked.remove(user)
            reply.save()
            serializer = self.get_serializer(reply)
            return Response(serializer.data)
        elif user in reply.users_disliked.all() and action == 'dislike':
            # If the user already disliked the reply and is trying to dislike it again, remove the dislike
            reply.dislike_count -= 1
            reply.users_disliked.remove(user)
            reply.save()
            serializer = self.get_serializer(reply)
            return Response(serializer.data)
        elif user in reply.users_liked.all() and action == 'dislike':
            # If the user is switching from liking to disliking, decrement the like count by one
            # and increment the dislike count by one
            reply.likes_count -= 1
            reply.users_liked.remove(user)
            reply.dislike_count += 1
            reply.users_disliked.add(user)
            reply.save()
            serializer = self.get_serializer(reply)
            return Response(serializer.data)
        elif user in reply.users_disliked.all() and action == 'like':
            # If the user is switching from disliking to liking, decrement the dislike count by one
            # and increment the like count by one
            reply.dislike_count -= 1
            reply.users_disliked.remove(user)
            reply.likes_count += 1
            reply.users_liked.add(user)
            reply.save()
            serializer = self.get_serializer(reply)
            return Response(serializer.data)

        # Perform the like/dislike action
        if action == 'like':
            reply.likes_count += 1
            reply.users_liked.add(user)
        elif action == 'dislike':
            reply.dislike_count += 1
            reply.users_disliked.add(user)

        reply.save()
        serializer = self.get_serializer(reply)
        return Response(serializer.data)
