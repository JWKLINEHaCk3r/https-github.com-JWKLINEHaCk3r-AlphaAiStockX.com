# Alpaca Broker Integration Stub
# Replace with real Alpaca API logic and secure key management

import os
import requests

ALPACA_API_KEY = os.getenv("ALPACA_API_KEY", "demo")
ALPACA_SECRET_KEY = os.getenv("ALPACA_SECRET_KEY", "demo")
BASE_URL = "https://paper-api.alpaca.markets"


def place_order(symbol, qty, side, type="market", time_in_force="gtc"):
    # TODO: Use real API keys and error handling
    url = f"{BASE_URL}/v2/orders"
    headers = {
        "APCA-API-KEY-ID": ALPACA_API_KEY,
        "APCA-API-SECRET-KEY": ALPACA_SECRET_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "symbol": symbol,
        "qty": qty,
        "side": side,
        "type": type,
        "time_in_force": time_in_force
    }
    # For now, just print
    print(f"[Alpaca] Placing order: {data}")
    # Uncomment to actually send order
    # response = requests.post(url, json=data, headers=headers)
    # return response.json()
    return {"status": "stub", "order": data}
