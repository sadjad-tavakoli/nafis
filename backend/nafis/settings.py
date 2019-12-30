"""
Django settings for nafis project.

Generated by 'django-admin startproject' using Django 1.11.4.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'w3ugl)x3uz4bug(3=v$7wc+ds71&4zp3bn698t6qkys07nvwjm'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['194.5.175.63','localhost', '127.0.0.1']

CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'bill',
    'customer',
    'product',
    'staff',
    'branch',
    'supplier'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'nafis.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'nafis.wsgi.application'


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    )
}
# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'media')

BILL_STATUS = (
    ('done', 'done'),
    ('active', 'active'),
    ('remained', 'remained'))

SUPPLIER_BILL_STATUS = (
    ('done', 'done'),
    ('active', 'active'))

STAFF_JOB_CHOICES = (
    ("salesperson", "salesperson"),
    ("accountant", "accountant"),
    ("storekeeper", "storekeeper"),
    ("cashier", "cashier"),
    ("admin", "admin"))

CUSTOMER_TYPE = ["مزون دار", "عادی", "غیره", "جدید"]

PAYMENT_TYPES = (
    ('cheque', 'cheque'),
    ('cash', 'cash'),
    ('card', 'card'))

FTYPE = ["مجلسی", "مانتویی", "اسپورت"]

PRODUCT_DESIGN_CHOICES = [
    "ساده", "چروک"
    , "هندی", "ابر و باد", "پلنگی", "گل ریز", "پولکی", "چهارخونه", "پوست ماری", "هولوگرامی"
    , "سوزن دوزی", "بته جقه", "ریش ریش", "گل برجسته", "راه راه", "هرمس (زنجیری)", "طرح عروسکی (teen)"
    , "پرنس دوگال", "جناقی (7ی 8ی)", "پلیسه", "هاوایی", "خالدار ریز", "خامه دوزی", "پیچازی", "لمه دار"
    , "برگ", "هندسی", "طرح سنتی", "گل درشت"]
POINT_PERCENTAGE = 0
