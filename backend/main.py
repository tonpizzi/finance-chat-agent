from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from backend.agent.tools.supabase_tool import query_supabase
from backend.agent.tools.yfinance_tool import query_yfinance

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ajuste em produção
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str
    source: str  # 'supabase' ou 'yfinance'

@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    question = req.question
    source = req.source

    if source == "supabase":
        answer = await query_supabase(question)
    elif source == "yfinance":
        answer = await query_yfinance(question)
    else:
        answer = "Fonte inválida"

    return {"answer": answer}