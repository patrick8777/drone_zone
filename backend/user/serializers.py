from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'street', 'zip', 'city', 'country',
                  'joined_date', 'avatar', 'about', 'my_drones', 'interests', 'is_professional']
