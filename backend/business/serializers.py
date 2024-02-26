from django.contrib.auth import get_user_model
from rest_framework import serializers

from business.models import Business
from comment.models import Comment
from review.models import Review

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'avatar']
        ref_name = 'BusinessUserSerializer'


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['text_description', 'likes_count', 'dislike_count', 'date_created', 'date_modified', 'user']
        ref_name = 'BusinessCommentSerializer'


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'text_content', 'date_created', 'date_modified', 'likes_count',
                  'user', 'comments_count', 'comments', 'rating']
        read_only_fields = ['business']
        ref_name = 'BusinessReviewSerializer'


class BusinessSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    user = serializers.ReadOnlyField(source='user.username')
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Business
        fields = ['id', 'first_name', 'last_name', 'company_name', 'description', 'services', 'type', 'email', 'street',
                  'zip', 'city', 'country',
                  'website', 'phone', 'background_image', 'average_rating', 'avatar', 'user', 'reviews_count',
                  'reviews']

    def get_average_rating(self, instance):
        return instance.calculate_average_rating()
