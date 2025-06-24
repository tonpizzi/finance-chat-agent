import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

def supabase_query_tool(query: str) -> str:
    data = supabase.table("stock_current").select("*").execute()
    return str(data.data)