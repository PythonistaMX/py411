from django.test import TestCase
from .models import Alumno
from . import endpoint_views
from django.http import HttpRequest, HttpResponseNotFound
import requests
import json

# Create your tests here.
'''
Inicio de pruebas unitarias.
'''
class testAlumno(TestCase):
    def setUp(self):
        Alumno.objects.create(numero_de_cuenta=1221, nombre="Juan",
            primer_apellido="Pérez", semestre="3", 
            carrera="Medicina", al_corriente=True, promedio=7.5)


    def testCuentaAlumnos(self):
        self.assertGreater(len(Alumno.objects.all()), 0)

    def testAlumnoGuardadoCorrectamente(self):
        self.assertGreater(len(Alumno.objects.filter(primer_apellido = "Pérez")), 0)

class testApiVista(TestCase):
    def setUp(self):
        print('iniciando...')
        Alumno.objects.create(numero_de_cuenta=1221, nombre="Juan",
            primer_apellido="Pérez", semestre="3", 
            carrera="Medicina", al_corriente=True, promedio=7.5)
    
    
    def testClaveInexistente(self):
        peticion = HttpRequest()
        peticion.method = "GET"
        respuesta = endpoint_views.clave(peticion, '2000')
        self.assertIsInstance(respuesta, HttpResponseNotFound)

    def testClaveExistente(self):
            peticion = HttpRequest()
            peticion.method = "GET"
            respuesta = endpoint_views.clave(peticion, 1221)
            self.assertEqual(respuesta.status_code, 200)


'''
Inicio de pruebas funcionales.
'''            
class testFuncionalidadClave(TestCase):

    def testEndPointConGet(self):
         with requests.get("http://localhost:8000/api/1221") as respuesta:
             self.assertEqual(respuesta.status_code, 200)
             datos = json.loads(str(respuesta.content, encoding='utf-8'))
             self.assertIn(datos["carrera"], endpoint_views.carreras)