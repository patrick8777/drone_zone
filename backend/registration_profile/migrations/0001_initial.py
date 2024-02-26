# Generated by Django 5.0.1 on 2024-02-17 14:40

import django.core.validators
import django.db.models.deletion
import registration_profile.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PasswordReset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(blank=True, max_length=254, unique=True)),
                ('reset_code', models.CharField(blank=True, default='', max_length=6)),
            ],
        ),
        migrations.CreateModel(
            name='PasswordResetValidation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('reset_code', models.CharField(blank=True, default='', max_length=6)),
                ('new_password', models.CharField(blank=True, max_length=100)),
                ('password_repeat', models.CharField(blank=True, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='RegistrationProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, default='', max_length=6)),
                ('email', models.EmailField(blank=True, max_length=254, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='RegistrationValidation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(blank=True, max_length=254, unique=True)),
                ('code', models.CharField(blank=True, default='', max_length=6)),
                ('username', models.CharField(blank=True, default='', max_length=100)),
                ('first_name', models.CharField(blank=True, max_length=100)),
                ('last_name', models.CharField(blank=True, max_length=100)),
                ('street', models.CharField(blank=True, max_length=100)),
                ('zip', models.IntegerField(blank=True, null=True)),
                ('city', models.CharField(blank=True, max_length=100)),
                ('country', models.CharField(blank=True, max_length=100)),
                ('password', models.CharField(blank=True, max_length=100)),
                ('password_repeat', models.CharField(blank=True, max_length=100)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to=registration_profile.models.avatar_path)),
                ('about', models.CharField(blank=True, max_length=255)),
                ('my_drones', models.TextField(blank=True, default='[]')),
                ('interests', models.TextField(blank=True, default='[]')),
                ('phone', models.CharField(blank=True, max_length=20, validators=[django.core.validators.RegexValidator(message='Enter a valid phone number.', regex='^\\+?[0-9]*$')])),
                ('is_professional', models.BooleanField(default=False)),
                ('profile', models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='validation', to='registration_profile.registrationprofile')),
            ],
        ),
    ]
