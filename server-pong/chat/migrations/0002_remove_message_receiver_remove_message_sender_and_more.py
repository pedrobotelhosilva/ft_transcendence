# Generated by Django 5.1.3 on 2024-12-28 03:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='receiver',
        ),
        migrations.RemoveField(
            model_name='message',
            name='sender',
        ),
        migrations.DeleteModel(
            name='Friend',
        ),
        migrations.DeleteModel(
            name='Message',
        ),
    ]
