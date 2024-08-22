from django.contrib import admin
from .models import Testament, Book, Chapter, Verse, TypingTest

admin.site.register(Testament)
admin.site.register(Book)
admin.site.register(Chapter)
admin.site.register(Verse)
admin.site.register(TypingTest)
