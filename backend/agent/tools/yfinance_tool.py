import re
import yfinance as yf

async def query_yfinance(question: str) -> str:
    symbol_match = re.search(r"\b[A-Z]{1,5}\b", question.upper())
    if not symbol_match:
        return "Por favor, informe o símbolo da ação (ex: AAPL)."

    symbol = symbol_match.group(0)

    ticker = yf.Ticker(symbol)
    info = ticker.info

    if 'regularMarketPrice' not in info:
        return f"Não consegui obter dados para a ação '{symbol}' via yfinance."

    price = info['regularMarketPrice']
    change = info.get('regularMarketChangePercent', 'N/A')

    return (
        f"Preço atual da ação {symbol} via yfinance:\n"
        f"Preço: {price}\n"
        f"Variação percentual: {change}%"
    )
