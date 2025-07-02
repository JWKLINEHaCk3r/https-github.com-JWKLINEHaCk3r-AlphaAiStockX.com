import requests
import pandas as pd
import os

ALPACA_BASE_URL = "https://data.alpaca.markets/v2/stocks"
ALPACA_API_KEY = os.getenv("ALPACA_API_KEY")
ALPACA_SECRET_KEY = os.getenv("ALPACA_SECRET_KEY")

HEADERS = {
    "APCA-API-KEY-ID": ALPACA_API_KEY,
    "APCA-API-SECRET-KEY": ALPACA_SECRET_KEY,
}

def fetch_ohlcv(symbol="AAPL", timeframe="1Day", limit=500):
    url = f"{ALPACA_BASE_URL}/{symbol}/bars"
    params = {
        "timeframe": timeframe,
        "limit": limit
    }
    response = requests.get(url, headers=HEADERS, params=params)
    response.raise_for_status()
    bars = response.json()["bars"]
    df = pd.DataFrame(bars)
    df["t"] = pd.to_datetime(df["t"])
    df.rename(columns={"t": "time", "o": "open", "h": "high", "l": "low", "c": "close", "v": "volume"}, inplace=True)
    return df[["time", "open", "high", "low", "close", "volume"]]

if __name__ == "__main__":
    df = fetch_ohlcv("AAPL")
    print(df.tail())
