# Requirements: pip install fastapi uvicorn pydantic

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from strategy_engine_momentum import MomentumStrategy
from data_ingestion_market_data import fetch_ohlcv
from alpha_gpt_trader import AlphaGPTTrader

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TradeRequest(BaseModel):
    symbol: str
    qty: int

trader = AlphaGPTTrader()
strategy = MomentumStrategy()

@app.get("/signal/{symbol}")
def get_signal(symbol: str):
    df = fetch_ohlcv(symbol, limit=1000)
    signals = strategy.generate_signals(df)
    prediction = trader.predict(df[['open', 'high', 'low', 'close', 'volume']])
    last_signal = signals.iloc[-1]
    return {
        "momentum_signal": int(last_signal),
        "ai_prediction": float(prediction)
    }

@app.post("/trade")
def place_trade(trade: TradeRequest):
    # For demo, we just return success. Integrate real execution here.
    return {"status": "success", "symbol": trade.symbol, "qty": trade.qty}
