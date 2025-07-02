import type React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Trade {
  ticker: string;
  direction: 'up' | 'down';
  percentage: number;
}

const AITop5Trades: React.FC = () => {
  const trades: Trade[] = [
    { ticker: 'AAPL', direction: 'up', percentage: 2.5 },
    { ticker: 'GOOG', direction: 'down', percentage: 1.8 },
    { ticker: 'MSFT', direction: 'up', percentage: 3.1 },
    { ticker: 'AMZN', direction: 'down', percentage: 0.9 },
    { ticker: 'TSLA', direction: 'up', percentage: 4.2 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">AI Top 5 Trades</h2>
      <ul>
        {trades.map((trade, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-2 border-b last:border-b-0"
          >
            <span className="font-medium">{trade.ticker}</span>
            <div className="flex items-center">
              {trade.direction === 'up' ? (
                <ArrowUp color="green" size={16} />
              ) : (
                <ArrowDown color="red" size={16} />
              )}
              <span
                className={`ml-1 ${trade.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}
              >
                {trade.percentage}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AITop5Trades;
