from fastapi import FastAPI,HTTPException
from contextlib import asynccontextmanager
from src.db.session import Base,engine
import uvicorn
def createTable():
    Base.metadata.create_all(bind=engine)
@asynccontextmanager
async def lifespan(app: FastAPI):

    print("Server is started")
    yield
    print("Server got disconnected")


def start_application():
    new_app = FastAPI(lifespan=lifespan)
    createTable()
    
    return new_app

app = start_application()

@app.get('/')
def home():
    return {'data': 'You are on home page'}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000)