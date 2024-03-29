# Generated by Django 5.0.1 on 2024-02-17 14:40

import business.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Business',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('company_name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('services', models.CharField(choices=[('Operator', 'Operator'), ('Repair', 'Repair'), ('Instructor', 'Instructor')], max_length=255)),
                ('type', models.CharField(choices=[('Individual', 'Individual'), ('Company', 'Company')], max_length=100)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('street', models.CharField(blank=True, max_length=100)),
                ('zip', models.IntegerField(blank=True, null=True)),
                ('city', models.CharField(blank=True, max_length=100)),
                ('country', models.CharField(blank=True, max_length=100)),
                ('website', models.CharField(blank=True, max_length=100)),
                ('phone', models.CharField(blank=True, max_length=100)),
                ('background_image', models.ImageField(blank=True, null=True, upload_to=business.models.avatar_path)),
                ('average_rating', models.IntegerField(blank=True, null=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to=business.models.avatar_path)),
                ('reviews_count', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]
