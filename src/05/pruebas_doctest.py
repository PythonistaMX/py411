#! /usr/bin/env python3
'''Script de pruebas de doctest'''

def suma(a, b):
    '''
    >>> suma(2, 3)
    5
    >>> suma('Hola', None)
    'Hola None'
    
    >>> 2 + suma(5 + 5j, 7.8j)
    (7+12.8j)
    '''
    return a + b