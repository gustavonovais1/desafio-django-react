from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PessoaViewSet, index

router = DefaultRouter()
router.register(r'pessoas', PessoaViewSet)

urlpatterns = [
    path('', index, name='index'),
    path('api/', include(router.urls)),
]