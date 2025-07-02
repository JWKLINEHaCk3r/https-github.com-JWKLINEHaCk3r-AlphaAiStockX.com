# Simple SQLite DB stub for portfolio and trade logs
import sqlite3
from typing import List

DB_PATH = "alpha_trader.db"

def get_connection():
    return sqlite3.connect(DB_PATH)

def init_db():
    conn = get_connection()
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS trades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        symbol TEXT,
        side TEXT,
        qty REAL,
        price REAL,
        status TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS portfolio (
        symbol TEXT PRIMARY KEY,
        qty REAL
    )''')
    conn.commit()
    conn.close()

def log_trade(symbol, side, qty, price, status):
    conn = get_connection()
    c = conn.cursor()
    c.execute('INSERT INTO trades (symbol, side, qty, price, status) VALUES (?, ?, ?, ?, ?)',
              (symbol, side, qty, price, status))
    conn.commit()
    conn.close()

def get_portfolio() -> List[dict]:
    conn = get_connection()
    c = conn.cursor()
    c.execute('SELECT symbol, qty FROM portfolio')
    rows = c.fetchall()
    conn.close()
    return [{"symbol": r[0], "qty": r[1]} for r in rows]
