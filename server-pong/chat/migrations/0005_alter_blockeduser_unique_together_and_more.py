# Generated by Django 5.1.3 on 2024-12-29 04:16

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_alter_friend_status'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='blockeduser',
            unique_together={('blocker', 'blocked')},
        ),
        migrations.AlterUniqueTogether(
            name='friend',
            unique_together={('user', 'friend')},
        ),
    ]
