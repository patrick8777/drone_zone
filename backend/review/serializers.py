from django.contrib.auth import get_user_model
from rest_framework import serializers

from review.models import Review

from comment.models import Comment

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'avatar']
        ref_name = 'ReviewUserSerializer'


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'text_description', 'likes_count', 'dislike_count', 'date_created', 'date_modified', 'user']
        ref_name = 'ReviewCommentSerializer'


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'text_content', 'date_created', 'date_modified', 'likes_count',
                  'user', 'comments_count', 'comments', 'rating']
        read_only_fields = ['business']
