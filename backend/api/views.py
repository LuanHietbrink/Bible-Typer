from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,TypingTestSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import TypingTest



class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreateTypingTestView(generics.CreateAPIView):
    serializer_class = TypingTestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return TypingTest.objects.filter(user=user)
