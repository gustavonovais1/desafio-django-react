from rest_framework import viewsets
from django.shortcuts import render

from .models import Pessoa
from .serializers import PessoaSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets


class PessoaViewSet(viewsets.ModelViewSet):
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer

    @action(detail=True, methods=['get'])
    def calcular_peso_ideal(self, request, pk=None):
        pessoa = self.get_object()
        peso_ideal = pessoa.calcular_peso_ideal()
        return Response({'pesoIdeal': peso_ideal}, status=status.HTTP_200_OK)



def index(request):
    return render(request, 'pessoas/index.html')