from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view),
    path('<int:pageNum>', views.parse_view_viaNum),
    path('<topic>/', views.parse_view, name = 'topic-page'),
    path('sum/<int:num1>/<int:num2>', views.arithmetricSum, name = 'math'),

]