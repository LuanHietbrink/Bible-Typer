from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, User

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title

class Testament(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    testament = models.ForeignKey(Testament, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    order_in_testament = models.IntegerField()

    def __str__(self):
        return self.name


class Chapter(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    chapter_number = models.IntegerField()

    def __str__(self):
        return f'{self.book.name} {self.chapter_number}'


class Verse(models.Model):
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    verse_number = models.IntegerField()
    text = models.TextField()

    def __str__(self):
        return f'{self.chapter.book.name} {self.chapter.chapter_number}:{self.verse_number}'


# class User(models.Model):
#     username = models.CharField(max_length=50, unique=True)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=255)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.username


class TypingTest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_verse = models.ForeignKey(Verse, related_name='start_verse', on_delete=models.CASCADE)
    end_verse = models.ForeignKey(Verse, related_name='end_verse', on_delete=models.CASCADE)
    wpm = models.IntegerField()
    accuracy = models.DecimalField(max_digits=5, decimal_places=2)
    duration = models.IntegerField()
    attempt_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} {self.start_verse} - {self.end_verse}'    