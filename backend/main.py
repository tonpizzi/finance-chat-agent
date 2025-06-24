from fastapi import FastAPI
from agent.router import router

app = FastAPI()
app.include_router(router)

@app.get("/")
def root():
    return {"message": "Finance Chat Agent is running"}