import json
from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from urllib.request import urlopen, Request

TOKEN = "17461|cRL8nzwaOV3SVYcnrUK01RV9vY10MSfk"

def consultas(request):
    return render(request, "consulta.html")


def coleta_marcas(request):
    tipo_veiculo = request.POST.get("tipo_veiculo_id")
    url = f"https://api.invertexto.com/v1/fipe/brands/{tipo_veiculo}?token={TOKEN}"
    
    try:
        marcas = Request(url)
        with urlopen(marcas) as response:
            body = response.read().decode("utf-8")
            marcas = json.loads(body)

            return JsonResponse(marcas, safe=False)
            
    except Exception as e:
        return JsonResponse({"erro": f"Falha ao acessar API: {str(e)}"}, status=500)
    
def coleta_modelos(request):
    marca_selecionada = request.POST.get("marca_id")
    url = f"https://api.invertexto.com/v1/fipe/models/{marca_selecionada}?token={TOKEN}"
    
    try:
        modelos = Request(url)
        with urlopen(modelos) as response:
            body = response.read().decode("utf-8")
            modelos = json.loads(body)

            return JsonResponse(modelos, safe=False)
            
    except Exception as e:
        return JsonResponse({"erro": f"Falha ao acessar API: {str(e)}"}, status=500)


def coleta_modelos_info(request):
    modelo_selecionado = request.POST.get("fip_code")
    url = f"https://api.invertexto.com/v1/fipe/years/{modelo_selecionado}?token={TOKEN}"
    
    try:
        modelo_info = Request(url)
        with urlopen(modelo_info) as response:
            body = response.read().decode("utf-8")
            modelo_info = json.loads(body)
            return JsonResponse(modelo_info, safe=False)
            
    except Exception as e:
        return JsonResponse({"erro": f"Falha ao acessar API: {str(e)}"}, status=500)