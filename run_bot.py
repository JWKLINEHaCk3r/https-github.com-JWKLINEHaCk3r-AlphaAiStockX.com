import time
import pandas as pd
from data_ingestion_market_data import fetch_ohlcv
from strategy_engine_momentum import MomentumStrategy
from alpha_gpt_trader import AlphaGPTTrader
from trade_executor import submit_order

SYMBOL = "AAPL"
QTY = 1
SLEEP_SECONDS = 300  # 5 minutes

def main():
    trader = AlphaGPTTrader()
    strategy = MomentumStrategy()
    
    while True:
        print(f"Fetching market data for {SYMBOL}...")
        df = fetch_ohlcv(SYMBOL, limit=1000)
        
        print("Generating momentum signals...")
        signals = strategy.generate_signals(df)
        last_signal = signals.iloc[-1]
        
        print("Running AI prediction...")
        prediction = trader.predict(df[['open', 'high', 'low', 'close', 'volume']])
        
        print(f"Momentum signal: {last_signal}, AI prediction: {prediction}")
        
        if last_signal == 1 and prediction > 0.5:
            print("Placing buy order...")
            submit_order(SYMBOL, QTY, "buy")
        elif last_signal == -1 and prediction < 0.5:
            print("Placing sell order...")
            submit_order(SYMBOL, QTY, "sell")
        else:
            print("No trade signal.")
        
        time.sleep(SLEEP_SECONDS)

if __name__ == "__main__":
    main()
