from fastapi import APIRouter
from langchain.chat_models import ChatOpenAI
from langchain.agents import initialize_agent, Tool
from dotenv import load_dotenv
import os
from .tools.supabase_tool import supabase_query_tool
from .tools.yfinance_tool import yfinance_tool

load_dotenv()
llm = ChatOpenAI(temperature=0, model="gpt-4")

tools = [
    Tool(
        name="supabase",
        func=supabase_query_tool,
        description="Consulta histórico de ações monitoradas no Supabase"
    ),
    Tool(
        name="yfinance",
        func=yfinance_tool,
        description="Consulta dados de ações diretamente do yfinance"
    )
]

agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=False)
router = APIRouter()

@router.post("/chat")
async def chat(query: dict):
    prompt = query.get("message", "")
    resp = agent.run(prompt)
    return {"response": resp}