from django.urls import path
from . import views

urlpatterns = [
    path('', views.consultas, name="consulta"),
    path('/coleta_marcas', views.coleta_marcas, name="coleta_marcas"),
    path('/coleta_modelos', views.coleta_modelos, name="coleta_modelos"),
    path('/coleta_modelos_info', views.coleta_modelos_info, name="coleta_modelos_info"),
]