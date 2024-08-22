from django.urls import path
from .views import RegisterView, TypingTestView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('typing-test/', TypingTestView.as_view(), name='typing-test'),
]
