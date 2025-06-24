import yfinance as yf

def yfinance_tool(query: str) -> str:
    ticker = query.strip().split()[-1].upper()
    stock = yf.Ticker(ticker).info
    return f"{ticker}: preço atual {stock.get('regularMarketPrice')} {stock.get('currency')}"