#! /usr/bin/env python3
'''Script que demuestra el uso de las anotaciones de tipo'''
from typing import List


def promedio(poblacion: List[float]) -> float:
    '''Función que calcula el promedio de una población
    ingresada como argumento.'''
    return sum(poblacion) / len(poblacion)


if __name__ == '__main__':
    # La siguiente línea es correcta
    print(promedio([1, 2, 3, 4]))
    # La siguiente línea es incorrecta y generará una excepción TypeError
    print(promedio(1, 2, 3, 4))
