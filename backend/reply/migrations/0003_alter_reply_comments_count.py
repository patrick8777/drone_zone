# Generated by Django 5.0.1 on 2024-02-16 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reply', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reply',
            name='comments_count',
            field=models.IntegerField(default=0),
        ),
    ]
