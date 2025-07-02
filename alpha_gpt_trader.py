# Requirements: pip install torch scikit-learn pandas numpy

import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import torch
import torch.nn as nn

class LSTMTrader(nn.Module):
    def __init__(self, input_size=5, hidden_size=128, num_layers=2, output_size=1):
        super(LSTMTrader, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        h0 = torch.zeros(2, x.size(0), 128).to(x.device)
        c0 = torch.zeros(2, x.size(0), 128).to(x.device)
        out, _ = self.lstm(x, (h0, c0))
        return self.fc(out[:, -1, :])

class AlphaGPTTrader:
    def __init__(self, model=None):
        self.scaler = MinMaxScaler()
        self.model = model or LSTMTrader()
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)

    def preprocess(self, df):
        scaled = self.scaler.fit_transform(df)
        sequences = []
        for i in range(len(scaled) - 60):
            seq = scaled[i:i+60]
            sequences.append(seq)
        return np.array(sequences)

    def predict(self, df):
        self.model.eval()
        data = self.preprocess(df)
        tensor_data = torch.FloatTensor(data).to(self.device)
        output = self.model(tensor_data)
        preds = output.detach().cpu().numpy()
        return preds[-1]  # return last predicted value

# Example usage
if __name__ == '__main__':
    df = pd.read_csv('data/prices.csv')[['Open', 'High', 'Low', 'Close', 'Volume']]
    trader = AlphaGPTTrader()
    signal = trader.predict(df)
    print('Signal:', 'BUY' if signal > 0.5 else 'SELL')
