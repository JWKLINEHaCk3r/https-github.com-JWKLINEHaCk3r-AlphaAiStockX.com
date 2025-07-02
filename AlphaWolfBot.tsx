'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ArrowUp, ArrowDown, AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface StockData {
  time: string;
  price: number;
}

interface AlphaWolfBotProps {
  stockSymbol: string;
}

const AlphaWolfBot: React.FC<AlphaWolfBotProps> = ({ stockSymbol }) => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<'buy' | 'sell' | 'hold' | null>(null);
  const [recommendationConfidence, setRecommendationConfidence] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/trading/analyze?symbol=${stockSymbol}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data && data.stockData && Array.isArray(data.stockData)) {
          setStockData(data.stockData);
        } else {
          console.error('Invalid stock data format:', data);
          setError('Invalid stock data format received.');
          setStockData([]);
        }

        if (data && data.recommendation) {
          setRecommendation(data.recommendation.action);
          setRecommendationConfidence(data.recommendation.confidence);
        } else {
          setRecommendation(null);
          setRecommendationConfidence(null);
        }
      } catch (e: any) {
        console.error('Could not fetch stock data:', e);
        setError(e.message || 'Could not fetch stock data.');
        setStockData([]);
        setRecommendation(null);
        setRecommendationConfidence(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every 60 seconds
    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [stockSymbol]);

  const latestPrice = stockData.length > 0 ? stockData[stockData.length - 1].price : 0;

  let recommendationIcon = null;
  let recommendationText = 'Analyzing...';

  if (loading) {
    recommendationIcon = <Loader2 size={20} className="animate-spin text-blue-500" />;
    recommendationText = 'Analyzing...';
  } else if (error) {
    recommendationIcon = <AlertTriangle size={20} className="text-red-500" />;
    recommendationText = `Error: ${error}`;
  } else if (recommendation === 'buy') {
    recommendationIcon = <ArrowUp size={20} className="text-green-500" />;
    recommendationText = `Buy (Confidence: ${recommendationConfidence?.toFixed(2)}%)`;
  } else if (recommendation === 'sell') {
    recommendationIcon = <ArrowDown size={20} className="text-red-500" />;
    recommendationText = `Sell (Confidence: ${recommendationConfidence?.toFixed(2)}%)`;
  } else if (recommendation === 'hold') {
    recommendationIcon = <CheckCircle size={20} className="text-yellow-500" />;
    recommendationText = `Hold (Confidence: ${recommendationConfidence?.toFixed(2)}%)`;
  } else {
    recommendationIcon = <XCircle size={20} className="text-gray-500" />;
    recommendationText = 'No recommendation';
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        AlphaWolf Bot Analysis for {stockSymbol}
      </h3>
      <div className="flex items-center mb-2">
        {recommendationIcon}
        <span className="ml-2 text-gray-700">{recommendationText}</span>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 size={32} className="animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stockData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" name="Stock Price" />
          </LineChart>
        </ResponsiveContainer>
      )}
      <div className="mt-4 text-sm text-gray-600">Latest Price: ${latestPrice.toFixed(2)}</div>
    </div>
  );
};

export default AlphaWolfBot;
