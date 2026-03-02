from django.contrib import admin
from myapp.models import *

# Register your models here.
admin.site.register(user)
admin.site.register(Client)
admin.site.register(Advocate)