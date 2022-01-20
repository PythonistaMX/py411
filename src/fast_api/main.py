from typing import List
from fastapi import FastAPI, Depends
from fastapi.exceptions import HTTPException, HTTPException
from sqlalchemy.orm import Session
import crud
import models
import schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/api/", response_model=List[schemas.Alumno])
def vuelca_base(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    alumnos = crud.get_alumnos(db, skip=skip, limit=limit)
    return alumnos

@app.post("/api/{cuenta}", response_model=schemas.Alumno)
def post_alumno(cuenta, candidato: schemas.InAlumno, db: Session = Depends(get_db)):
    alumno = crud.get_alumno(db=db, cuenta=cuenta)
    if alumno:
        raise HTTPException(status_code=400, detail="Recurso existente")
    return crud.post_alumno(db=db, cuenta=cuenta, candidato=candidato)

@app.get("/api/{cuenta}", response_model=schemas.Alumno)
def get_alumno(cuenta, db: Session = Depends(get_db)):
    alumno = crud.get_alumno(db=db, cuenta=cuenta)
    if alumno:
        return alumno
    else:
        raise HTTPException(status_code=404, detail="Recurso no encontrado")

@app.delete("/api/{cuenta}")
def get_alumno(cuenta, db: Session = Depends(get_db)):
    alumno = crud.get_alumno(db=db, cuenta=cuenta)
    if alumno:
        crud.delete_alumno(db=db, alumno=alumno)
        return {}
    else:
        raise HTTPException(status_code=404, detail="Recurso no encontrado")