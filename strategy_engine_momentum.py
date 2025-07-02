import pandas as pd

class MomentumStrategy:
    def __init__(self, short_window=10, long_window=50):
        self.short_window = short_window
        self.long_window = long_window

    def generate_signals(self, df: pd.DataFrame) -> pd.Series:
        df = df.copy()
        df["short_ma"] = df["close"].rolling(window=self.short_window).mean()
        df["long_ma"] = df["close"].rolling(window=self.long_window).mean()
        df["signal"] = 0
        df["signal"][self.short_window:] = (
            df["short_ma"][self.short_window:] > df["long_ma"][self.short_window:]
        ).astype(int)
        df["position"] = df["signal"].diff()
        return df["position"]
