from django.urls import path
from myapp.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
        path('',reg,name='reg'),
        path('login_data',login_data,name='login_data'),
        path('home',home,name='home'),
        
        path('api/client/', client_api),
        path('api/client/<int:id>/', client_api),
        path('api/client/bulk_upload/', bulk_upload_clients, name='bulk_upload_clients'), 

        path('api/advocate/', advocate_list_create, name='advocate-list-create'),
        path('api/advocate/<int:pk>/', advocate_detail, name='advocate-detail'),
]

urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)