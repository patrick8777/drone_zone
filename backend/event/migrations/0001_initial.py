# Generated by Django 5.0.1 on 2024-02-17 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(max_length=100)),
                ('detail', models.CharField(blank=True, max_length=255)),
                ('type', models.BooleanField(blank=True, default=False)),
                ('category', models.CharField(max_length=20)),
                ('link', models.TextField(blank=True)),
                ('street', models.CharField(blank=True, max_length=100)),
                ('zip', models.IntegerField(blank=True, null=True)),
                ('city', models.CharField(blank=True, max_length=100)),
                ('country', models.CharField(blank=True, max_length=100)),
                ('event_date', models.DateTimeField()),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_modified', models.DateTimeField(auto_now_add=True)),
                ('participants_count', models.PositiveIntegerField(default=0)),
                ('reply_count', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]
