
from pydantic import BaseModel, Field, PositiveInt
from typing import Optional
from enum import Enum


class Carreras(str, Enum):
    sistemas ='Sistemas'
    derecho = 'Derecho'
    actuaria = 'Actuaría'
    arquitectura = 'Arquitectura'
    admininstracion = 'Administración'


class Alumno(BaseModel):
    cuenta: int = Field(ge=1000000, le=9999999)
    nombre: str
    primer_apellido: str
    segundo_apellido: Optional[str] = ''
    carrera: Carreras
    semestre: PositiveInt
    promedio: float = Field(ge=0, le=10)
    al_corriente: bool

    class Config:
        orm_mode = True
 

class InAlumno(BaseModel):
    nombre: str
    primer_apellido: str
    segundo_apellido: Optional[str] = ''
    carrera: Carreras
    semestre: PositiveInt
    promedio: float = Field(ge=0, le=10)
    al_corriente: bool  

    class Config:
        orm_mode = True
