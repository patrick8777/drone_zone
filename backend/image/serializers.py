from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Image

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'avatar']
        ref_name = 'ImageUser'


class ImageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Image
        fields = ('id', 'image', 'user')
