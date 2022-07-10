from django.urls import path
from . import views

app_name = 'app1'

urlpatterns = [
    path('', views.home_view, name = 'app1Home'),
    path('var/', views.variable_view, name = 'variable'),
]