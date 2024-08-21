from django.contrib.auth.models import User
from rest_framework import serializers
from models import TypingTest, Testament, Chapter, Book, Verse



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email","password",]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class TypingTestSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TypingTest
        fields = ["user","start_verse","end_verse","wpm","accuracy","duration","attempt_date"]
    
    def create(self, validated_data):
        print(validated_data)
        test = TypingTest.objects.create(**validated_data)
        return test