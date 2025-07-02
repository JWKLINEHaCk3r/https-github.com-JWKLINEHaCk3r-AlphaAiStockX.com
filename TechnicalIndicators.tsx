'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';

export default function TechnicalIndicators({ selectedStock }) {
  const [indicators, setIndicators] = useState(null);

  useEffect(() => {
    // Simulate technical indicator data
    setIndicators({
      rsi: 65.4,
      macd: {
        value: 2.34,
        signal: 1.89,
        histogram: 0.45,
        trend: 'bullish',
      },
      movingAverages: {
        sma20: 172.45,
        sma50: 168.9,
        sma200: 155.3,
        currentPrice: 175.43,
      },
      bollinger: {
        upper: 185.2,
        middle: 175.4,
        lower: 165.6,
        position: 'middle',
      },
      stochastic: {
        k: 78.5,
        d: 75.2,
        signal: 'overbought',
      },
      volume: {
        current: 45200000,
        average: 38500000,
        trend: 'above_average',
      },
    });
  }, [selectedStock]);

  if (!indicators) {
    return (
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardContent className="p-8 text-center">
          <Activity className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-pulse" />
          <p className="text-white">Loading technical indicators...</p>
        </CardContent>
      </Card>
    );
  }

  const getRSIColor = rsi => {
    if (rsi > 70) return 'text-red-400';
    if (rsi < 30) return 'text-green-400';
    return 'text-yellow-400';
  };

  const getRSISignal = rsi => {
    if (rsi > 70) return 'Overbought';
    if (rsi < 30) return 'Oversold';
    return 'Neutral';
  };

  return (
    <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <BarChart3 className="h-6 w-6 mr-2 text-blue-400" />
          Technical Analysis - {selectedStock}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* RSI */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">RSI (14)</h4>
            <div className="text-center">
              <p className={`text-3xl font-bold ${getRSIColor(indicators.rsi)}`}>
                {indicators.rsi.toFixed(1)}
              </p>
              <Badge
                variant={
                  indicators.rsi > 70
                    ? 'destructive'
                    : indicators.rsi < 30
                      ? 'default'
                      : 'secondary'
                }
              >
                {getRSISignal(indicators.rsi)}
              </Badge>
            </div>
            <Progress value={indicators.rsi} className="h-3" />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Oversold (30)</span>
              <span>Overbought (70)</span>
            </div>
          </div>

          {/* MACD */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">MACD</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">MACD Line:</span>
                <span className="text-white font-bold">{indicators.macd.value}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Signal Line:</span>
                <span className="text-white font-bold">{indicators.macd.signal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Histogram:</span>
                <span
                  className={`font-bold ${indicators.macd.histogram > 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                  {indicators.macd.histogram}
                </span>
              </div>
            </div>
            <Badge variant={indicators.macd.trend === 'bullish' ? 'default' : 'destructive'}>
              {indicators.macd.trend === 'bullish' ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {indicators.macd.trend}
            </Badge>
          </div>

          {/* Moving Averages */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Moving Averages</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Current:</span>
                <span className="text-white font-bold">
                  ${indicators.movingAverages.currentPrice}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">SMA 20:</span>
                <span
                  className={`font-bold ${indicators.movingAverages.currentPrice > indicators.movingAverages.sma20 ? 'text-green-400' : 'text-red-400'}`}
                >
                  ${indicators.movingAverages.sma20}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">SMA 50:</span>
                <span
                  className={`font-bold ${indicators.movingAverages.currentPrice > indicators.movingAverages.sma50 ? 'text-green-400' : 'text-red-400'}`}
                >
                  ${indicators.movingAverages.sma50}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">SMA 200:</span>
                <span
                  className={`font-bold ${indicators.movingAverages.currentPrice > indicators.movingAverages.sma200 ? 'text-green-400' : 'text-red-400'}`}
                >
                  ${indicators.movingAverages.sma200}
                </span>
              </div>
            </div>
          </div>

          {/* Bollinger Bands */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Bollinger Bands</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Upper:</span>
                <span className="text-red-400 font-bold">${indicators.bollinger.upper}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Middle:</span>
                <span className="text-yellow-400 font-bold">${indicators.bollinger.middle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Lower:</span>
                <span className="text-green-400 font-bold">${indicators.bollinger.lower}</span>
              </div>
            </div>
            <Badge variant="secondary">Position: {indicators.bollinger.position}</Badge>
          </div>

          {/* Stochastic */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Stochastic</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">%K:</span>
                <span className="text-white font-bold">{indicators.stochastic.k}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">%D:</span>
                <span className="text-white font-bold">{indicators.stochastic.d}</span>
              </div>
            </div>
            <Badge
              variant={indicators.stochastic.signal === 'overbought' ? 'destructive' : 'default'}
            >
              {indicators.stochastic.signal}
            </Badge>
          </div>

          {/* Volume */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Volume Analysis</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Current:</span>
                <span className="text-white font-bold">
                  {(indicators.volume.current / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Average:</span>
                <span className="text-gray-400 font-bold">
                  {(indicators.volume.average / 1000000).toFixed(1)}M
                </span>
              </div>
            </div>
            <Badge variant={indicators.volume.trend === 'above_average' ? 'default' : 'secondary'}>
              {indicators.volume.trend === 'above_average' ? 'Above Average' : 'Below Average'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
