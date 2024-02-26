from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Gallery
from image.models import Image

from image.serializers import ImageSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'avatar']
        ref_name = 'GalleryUser'


class GallerySerializer(serializers.ModelSerializer):
    images = serializers.ListField(child=serializers.FileField(), required=False)

    class Meta:
        model = Gallery
        fields = ['id', 'title', 'text_content', 'drone', 'private', 'favourite', 'user', 'images']
        read_only_fields = ['user']

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        gallery = super().create(validated_data)
        user = validated_data.get('user')

        for image_data in images_data:
            image = Image.objects.create(user=user, image=image_data)
            gallery.image.add(image)

        return gallery

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        response['images'] = ImageSerializer(instance.image.all(), many=True).data
        return response
