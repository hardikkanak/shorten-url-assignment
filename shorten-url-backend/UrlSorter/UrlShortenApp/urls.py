from django.urls import path
from .views import *

urlpatterns = [
    path('',index,name="index"),
    path('getAllGeneratedURL',getAllGeneratedURL,name="getAllGeneratedURL"),
    path('getLongURLFromGenerated/<str:shortener_link>',getLongURLFromGenerated,name="getLongURLFromGenerated"),
    path('generatNewURL',generatNewURL,name="generatNewURL")
]
