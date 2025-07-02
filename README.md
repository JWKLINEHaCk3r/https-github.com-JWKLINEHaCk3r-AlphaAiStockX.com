# AlphaAIStockX Backend

## Overview

This backend powers the AI stock trading engine, portfolio management, and broker integration for AlphaAIStockX.

## Main Features

- FastAPI REST API for trading, signals, portfolio, and webhooks
- AI/ML signal engine stub (replace with your own model)
- Broker integration stub (Alpaca, replace with your broker)
- SQLite database for trades and portfolio

## Running Locally

1. Install dependencies:

   ```sh
   pip install fastapi uvicorn pydantic requests
   ```

2. Start the API:

   ```sh
   python ai_trader/main.py
   ```

3. The API will be available at [http://localhost:8000](http://localhost:8000)

## Endpoints

- `POST /trade` — Execute a trade
- `POST /signal` — Get AI trading signal
- `GET /portfolio` — Get current portfolio
- `POST /webhook` — Receive broker events
- `GET /health` — Health check

## Next Steps

- Replace stubs with real AI/ML and broker logic
- Add authentication and user management
- Deploy backend to a secure server (e.g., Render, AWS, Azure)
