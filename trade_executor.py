import os
import requests

ALPACA_API_KEY = os.getenv("ALPACA_API_KEY")
ALPACA_SECRET_KEY = os.getenv("ALPACA_SECRET_KEY")
ALPACA_BASE_URL = "https://paper-api.alpaca.markets"

HEADERS = {
    "APCA-API-KEY-ID": ALPACA_API_KEY,
    "APCA-API-SECRET-KEY": ALPACA_SECRET_KEY,
}

def submit_order(symbol, qty, side, type="market", time_in_force="gtc"):
    url = f"{ALPACA_BASE_URL}/v2/orders"
    order_data = {
        "symbol": symbol,
        "qty": qty,
        "side": side,
        "type": type,
        "time_in_force": time_in_force
    }
    response = requests.post(url, headers=HEADERS, json=order_data)
    if response.status_code != 200:
        raise Exception(f"Order failed: {response.text}")
    return response.json()

if __name__ == "__main__":
    print(submit_order("AAPL", 1, "buy"))
