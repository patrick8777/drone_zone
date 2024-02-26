from django.contrib.auth import get_user_model
from rest_framework import serializers

from reply.models import Reply
from .models import Event

from image.serializers import ImageSerializer

from comment.models import Comment

from image.models import Image

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'avatar']
        ref_name = 'EventUser'


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'text_description', 'likes_count', 'dislike_count', 'date_created', 'date_modified', 'user']
        ref_name = 'EventCommentSerializer'


class ReplySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    image = ImageSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True)

    class Meta:
        model = Reply
        fields = ['id', 'text_content', 'date_created', 'date_modified', 'likes_count', 'dislike_count', 'image',
                  'user', 'users_liked', 'users_disliked', 'comments_count', 'comments']
        ref_name = 'EventReply'


class EventSerializer(serializers.ModelSerializer):
    replies = ReplySerializer(many=True, read_only=True)
    author = UserSerializer(read_only=True)
    images = serializers.ListField(child=serializers.FileField(), required=False)

    class Meta:
        model = Event
        fields = ['id', 'title', 'detail', 'type', 'category', 'link', 'street', 'zip', 'city', 'country', 'event_date',
                  'date_created', 'date_modified', 'participants_count', 'participants', 'author', 'images',
                  'reply_count', 'replies']
        read_only_fields = ['author', 'participants']

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        event = super().create(validated_data)
        author = validated_data.get('author')

        # event = Event.objects.create(author=author, **validated_data)

        for image_data in images_data:
            image = Image.objects.create(user=author, image=image_data)
            event.image.add(image)

        return event

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', [])
        event = super().update(instance, validated_data)

        for image_data in images_data:
            image = Image.objects.create(user=event.author, image=image_data)
            event.image.add(image)

        return event

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['author'] = UserSerializer(instance.author).data
        response['images'] = ImageSerializer(instance.image.all(), many=True).data
        return response
