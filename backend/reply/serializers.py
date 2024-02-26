from django.contrib.auth import get_user_model
from rest_framework import serializers

from comment.models import Comment
from image.models import Image
from image.serializers import ImageSerializer
from .models import Reply

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'avatar']
        ref_name = 'ReplyUserSerializer'


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ['text_description', 'likes_count', 'dislike_count', 'date_created', 'date_modified', 'user']


class ReplySerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    images = serializers.ListField(child=serializers.FileField(), required=False)

    class Meta:
        model = Reply
        fields = ['id', 'text_content', 'date_created', 'date_modified', 'likes_count', 'dislike_count', 'user',
                  'users_liked', 'users_disliked', 'comments_count', 'comments', 'images']
        read_only_fields = ['user']
        ref_name = 'ReplySerializer'

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        reply = super().create(validated_data)
        user = validated_data.get('user')

        for image_data in images_data:
            image = Image.objects.create(user=user, image=image_data)
            reply.image.add(image)

        return reply

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', [])
        reply = super().update(instance, validated_data)

        for image_data in images_data:
            image = Image.objects.create(user=reply.user, image=image_data)
            reply.image.add(image)

        return reply

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        response['images'] = ImageSerializer(instance.image.all(), many=True).data
        return response


class ReplyActionSerializer(serializers.Serializer):
    action = serializers.CharField()
