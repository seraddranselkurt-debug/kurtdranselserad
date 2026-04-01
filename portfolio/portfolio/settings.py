import os

# Replace the existing ALLOWED_HOSTS line:
ALLOWED_HOSTS = [os.environ.get('RENDER_EXTERNAL_HOSTNAME', '*')]

# Add WhiteNoise to MIDDLEWARE (after SecurityMiddleware):
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # ← add this
    ...
]

# Add at the bottom:
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Use environment variable for SECRET_KEY in production:
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-change-me-in-production-use-env-var')

DEBUG = os.environ.get('DEBUG', 'True') == 'True'