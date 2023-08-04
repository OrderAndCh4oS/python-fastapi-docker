from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


@app.get("/")
def health_check():
    return {"message": "ok"}
