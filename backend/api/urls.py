from django.urls import path
from .views import TypingTestView

urlpatterns = [
    path('typingtest/', TypingTestView.as_view(), name='typing-test'),
]
