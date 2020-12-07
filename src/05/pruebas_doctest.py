#! /usr/bin/env python3
'''Script de pruebas de doctest'''

def suma(a, b):
    '''
    >>> suma(2, 3)
    5
    >>> suma('Hola', None)
    Traceback (most recent call last):
        ...
    TypeError: can only concatenate str (not "NoneType") to str
    
    '''
    return a + b