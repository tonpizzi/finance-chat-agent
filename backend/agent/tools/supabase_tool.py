import re
import os
from supabase import create_client
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

async def query_supabase(question: str) -> str:
    symbol_match = re.search(r"\b[A-Z]{1,5}\b", question.upper())
    if not symbol_match:
        return "Por favor, informe o símbolo da ação (ex: AAPL)."

    symbol = symbol_match.group(0)

    response = supabase.table("stock_current").select("*").eq("symbol", symbol).execute()
    data = response.data

    if not data:
        return f"Não encontrei dados para a ação '{symbol}' no Supabase."

    stock = data[0]
    return (
        f"Dados da ação {stock['symbol']}:\n"
        f"Nome: {stock.get('name', 'N/A')}\n"
        f"Preço: {stock.get('price', 'N/A')} {stock.get('currency', '')}\n"
        f"Variação: {stock.get('change_percent', 'N/A')}%\n"
        f"Última atualização: {stock.get('timestamp')}"
    )
