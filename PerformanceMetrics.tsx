'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, BarChart3, Activity, DollarSign } from 'lucide-react';

interface Trade {
  pnl: number;
  side: string;
  symbol: string;
  quantity: number;
  price: number;
  strategy: string;
}
interface PerformanceData {
  dailyReturns: { date: Date; return: number; cumulative: number }[];
  monthlyReturns: any[];
  drawdownPeriods: any[];
  bestTrade: Trade | null;
  worstTrade: Trade | null;
  avgHoldTime: string;
  profitFactor: number;
  calmarRatio: number;
  sortinoRatio: number;
}

interface BotStats {
  sharpeRatio: number;
  maxDrawdown: number;
}
interface PerformanceMetricsProps {
  botStats: BotStats;
  recentTrades: Trade[];
}

export default function PerformanceMetrics({ botStats, recentTrades }: PerformanceMetricsProps) {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    dailyReturns: [],
    monthlyReturns: [],
    drawdownPeriods: [],
    bestTrade: null,
    worstTrade: null,
    avgHoldTime: '2.5 hours',
    profitFactor: 1.85,
    calmarRatio: 2.3,
    sortinoRatio: 1.92,
  });

  useEffect(() => {
    if (recentTrades.length > 0) {
      const sortedTrades = [...recentTrades].sort((a, b) => b.pnl - a.pnl);
      const bestTrade = sortedTrades[0];
      const worstTrade = sortedTrades[sortedTrades.length - 1];
      const dailyReturns = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
        return: (Math.random() - 0.4) * 5,
        cumulative: 0,
      }));
      let cumulative = 0;
      dailyReturns.forEach(day => {
        cumulative += day.return;
        day.cumulative = cumulative;
      });
      setPerformanceData((prev: PerformanceData) => ({
        ...prev,
        dailyReturns,
        bestTrade,
        worstTrade,
      }));
    }
  }, [recentTrades]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    // Render your component's UI here
    <div>
      {/* Your UI goes here */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Badge>Sharpe Ratio: {botStats.sharpeRatio}</Badge>
            <Badge>Max Drawdown: {botStats.maxDrawdown}%</Badge>
            <Badge>Profit Factor: {performanceData.profitFactor}</Badge>
            <Badge>Calmar Ratio: {performanceData.calmarRatio}</Badge>
            <Badge>Sortino Ratio: {performanceData.sortinoRatio}</Badge>
            <Badge>Avg Hold Time: {performanceData.avgHoldTime}</Badge>
          </div>
          <div>
            <h4>Best Trade</h4>
            {performanceData.bestTrade ? (
              <div>
                <span>{performanceData.bestTrade.symbol}</span>
                <span>{formatCurrency(performanceData.bestTrade.pnl)}</span>
              </div>
            ) : (
              <span>No trades yet</span>
            )}
          </div>
          <div>
            <h4>Worst Trade</h4>
            {performanceData.worstTrade ? (
              <div>
                <span>{performanceData.worstTrade.symbol}</span>
                <span>{formatCurrency(performanceData.worstTrade.pnl)}</span>
              </div>
            ) : (
              <span>No trades yet</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
