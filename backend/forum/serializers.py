from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Forum
from reply.models import Reply

from comment.models import Comment

from image.serializers import ImageSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'avatar']
        ref_name = 'ForumUser'


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'text_description', 'likes_count', 'dislike_count', 'date_created', 'date_modified', 'user']
        ref_name = 'ForumCommentSerializer'


class ReplySerializer(serializers.ModelSerializer):
    user = UserSerializer()
    comments = CommentSerializer(many=True)
    image = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Reply
        fields = ['id', 'text_content', 'date_created', 'date_modified', 'likes_count', 'dislike_count', 'image',
                  'user', 'users_liked', 'users_disliked', 'comments_count', 'comments']
        ref_name = 'ForumReplySerializer'


class ForumSerializer(serializers.ModelSerializer):
    replies = ReplySerializer(many=True, read_only=True)

    class Meta:
        model = Forum
        fields = ['id', 'category', 'question', 'text_description', 'likes_count', 'dislike_count',
                  'date_created', 'date_modified', 'reply_count', 'user', 'replies']
        read_only_fields = ['user']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        # response['replies'] = ReplySerializer(instance.replies).data
        return response
