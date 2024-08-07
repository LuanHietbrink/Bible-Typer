from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

#takes a python object and converts it to json data to be used for frontend communication and vice versa

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password": {"write_only": True}} #tells django that we want to accept a password, but not return it i.e. nobody can read plaintext password

    #calls function to create new user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id","title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": "True"}}