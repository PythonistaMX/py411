#! /bin/env python

import pdb

def suma_uno_a_algo(algo):
    sin_uso = False
    pdb.set_trace()
    algo += 1
    pdb.set_trace()
    return algo
    
    
if __name__ == '__main__':
    suma_uno_a_algo(2)
    suma_uno_a_algo('Hola')