from django.urls import path
from . import views

app_name = 'customerApp'

urlpatterns = [
    path('view/', views.view, name = 'view'),
    path('add/', views.add, name = 'add'),
    path('delete/', views.delete, name = 'delete'),
    # cont from 84 - 18mins, unable to grab values in request.POST
]
