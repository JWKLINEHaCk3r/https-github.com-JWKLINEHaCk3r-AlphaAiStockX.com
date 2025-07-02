'use client';

import { useState, useEffect, useRef } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Zap,
  Bot,
  Target,
  Activity,
  Clock,
  ArrowUp,
  ArrowDown,
  CloudLightningIcon as Lightning,
  Rocket,
  Brain,
  Eye,
  Timer,
} from 'lucide-react';

export default function UltraFastTradingEngine({ user, membershipLevel }) {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [orderType, setOrderType] = useState('market');
  const [quantity, setQuantity] = useState(100);
  const [price, setPrice] = useState(0);
  const [side, setSide] = useState('buy');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [recentTrades, setRecentTrades] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [aiSignals, setAiSignals] = useState([]);
  const [autoTradeEnabled, setAutoTradeEnabled] = useState(false);

  const executionTimeRef = useRef(0);
  const wsRef = useRef(null);

  // Premium features based on membership
  const premiumFeatures = {
    free: {
      maxTrades: 10,
      executionSpeed: 'standard',
      aiSignals: 3,
      autoTrade: false,
      advancedOrders: false,
      realTimeData: false,
    },
    basic: {
      maxTrades: 100,
      executionSpeed: 'fast',
      aiSignals: 10,
      autoTrade: false,
      advancedOrders: true,
      realTimeData: true,
    },
    pro: {
      maxTrades: 500,
      executionSpeed: 'ultra-fast',
      aiSignals: 25,
      autoTrade: true,
      advancedOrders: true,
      realTimeData: true,
    },
    ultimate: {
      maxTrades: 'unlimited',
      executionSpeed: 'lightning',
      aiSignals: 'unlimited',
      autoTrade: true,
      advancedOrders: true,
      realTimeData: true,
    },
  };

  const currentFeatures = premiumFeatures[membershipLevel] || premiumFeatures.free;

  useEffect(() => {
    // Simulate WebSocket connection for real-time data
    if (currentFeatures.realTimeData) {
      wsRef.current = setInterval(() => {
        updateMarketData();
        generateAISignals();
      }, 100); // Ultra-fast updates
    } else {
      wsRef.current = setInterval(() => {
        updateMarketData();
      }, 5000); // Standard updates
    }

    return () => {
      if (wsRef.current) clearInterval(wsRef.current);
    };
  }, [membershipLevel]);

  const updateMarketData = () => {
    const stocks = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'META', 'AMZN', 'SPY', 'QQQ'];
    const newData = {};

    stocks.forEach(symbol => {
      const basePrice = 100 + Math.random() * 400;
      const change = (Math.random() - 0.5) * 10;
      newData[symbol] = {
        price: basePrice,
        change: change,
        changePercent: (change / basePrice) * 100,
        volume: Math.floor(Math.random() * 10000000),
        bid: basePrice - 0.01,
        ask: basePrice + 0.01,
        lastUpdate: Date.now(),
      };
    });

    setMarketData(newData);
    if (selectedStock && newData[selectedStock]) {
      setPrice(newData[selectedStock].price);
    }
  };

  const generateAISignals = () => {
    if (aiSignals.length >= currentFeatures.aiSignals && currentFeatures.aiSignals !== 'unlimited')
      return;

    const stocks = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'META', 'AMZN', 'SPY', 'QQQ'];
    const signal = {
      id: Date.now(),
      symbol: stocks[Math.floor(Math.random() * stocks.length)],
      action: Math.random() > 0.5 ? 'BUY' : 'SELL',
      confidence: 75 + Math.random() * 25,
      targetPrice: 100 + Math.random() * 400,
      timeframe: ['1m', '5m', '15m', '1h'][Math.floor(Math.random() * 4)],
      reason: [
        'Bullish momentum detected',
        'Support level bounce',
        'Breakout pattern confirmed',
        'Volume surge detected',
        'AI pattern recognition',
        'Earnings catalyst',
      ][Math.floor(Math.random() * 6)],
      timestamp: new Date(),
    };

    setAiSignals(prev => [signal, ...prev.slice(0, 19)]);

    // Auto-execute if enabled and premium member
    if (autoTradeEnabled && currentFeatures.autoTrade && signal.confidence > 85) {
      executeAutoTrade(signal);
    }
  };

  const executeAutoTrade = async signal => {
    const autoTrade = {
      id: Date.now(),
      symbol: signal.symbol,
      side: signal.action.toLowerCase(),
      quantity: Math.floor(1000 / signal.targetPrice), // $1000 position
      price: signal.targetPrice,
      type: 'auto',
      executionTime: getExecutionTime(),
      timestamp: new Date(),
      aiConfidence: signal.confidence,
    };

    setRecentTrades(prev => [autoTrade, ...prev.slice(0, 49)]);
  };

  const getExecutionTime = () => {
    switch (currentFeatures.executionSpeed) {
      case 'lightning':
        return Math.random() * 10 + 5; // 5-15ms
      case 'ultra-fast':
        return Math.random() * 50 + 20; // 20-70ms
      case 'fast':
        return Math.random() * 100 + 50; // 50-150ms
      default:
        return Math.random() * 500 + 200; // 200-700ms
    }
  };

  const executeTrade = async () => {
    if (
      recentTrades.length >= currentFeatures.maxTrades &&
      currentFeatures.maxTrades !== 'unlimited'
    ) {
      alert(`Trade limit reached for ${membershipLevel} membership`);
      return;
    }

    setIsExecuting(true);
    executionTimeRef.current = Date.now();

    // Simulate ultra-fast execution
    const execTime = getExecutionTime();
    await new Promise(resolve => setTimeout(resolve, execTime));

    const trade = {
      id: Date.now(),
      symbol: selectedStock,
      side,
      quantity,
      price: orderType === 'market' ? marketData[selectedStock]?.price || price : price,
      type: orderType,
      executionTime: execTime,
      timestamp: new Date(),
      status: 'filled',
    };

    setRecentTrades(prev => [trade, ...prev.slice(0, 49)]);
    setExecutionTime(execTime);
    setIsExecuting(false);
  };

  const getSpeedBadge = () => {
    switch (currentFeatures.executionSpeed) {
      case 'lightning':
        return (
          <Badge className="bg-yellow-500 animate-pulse">
            <Lightning className="h-3 w-3 mr-1" />
            Lightning (5-15ms)
          </Badge>
        );
      case 'ultra-fast':
        return (
          <Badge className="bg-blue-500">
            <Rocket className="h-3 w-3 mr-1" />
            Ultra-Fast (20-70ms)
          </Badge>
        );
      case 'fast':
        return (
          <Badge className="bg-green-500">
            <Zap className="h-3 w-3 mr-1" />
            Fast (50-150ms)
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            Standard (200-700ms)
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Ultra-Fast Trading Interface */}
      <Card className="bg-black/20 border-cyan-500/30 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Lightning className="h-6 w-6 mr-2 text-cyan-400" />
              Ultra-Fast Trading Engine
              {getSpeedBadge()}
            </CardTitle>
            <div className="flex items-center space-x-2">
              {currentFeatures.autoTrade && (
                <Button
                  variant={autoTradeEnabled ? 'default' : 'outline'}
                  onClick={() => setAutoTradeEnabled(!autoTradeEnabled)}
                  className={autoTradeEnabled ? 'bg-green-500 hover:bg-green-600' : ''}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Auto-Trade {autoTradeEnabled ? 'ON' : 'OFF'}
                </Button>
              )}
              <Badge className="bg-purple-500">{membershipLevel.toUpperCase()}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Entry */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Symbol</label>
                  <Select value={selectedStock} onValueChange={setSelectedStock}>
                    <SelectTrigger className="bg-black/20 border-cyan-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(marketData).map(symbol => (
                        <SelectItem key={symbol} value={symbol}>
                          {symbol} - ${marketData[symbol]?.price?.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Side</label>
                  <Select value={side} onValueChange={setSide}>
                    <SelectTrigger className="bg-black/20 border-cyan-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">
                        <div className="flex items-center">
                          <ArrowUp className="h-4 w-4 text-green-400 mr-2" />
                          BUY
                        </div>
                      </SelectItem>
                      <SelectItem value="sell">
                        <div className="flex items-center">
                          <ArrowDown className="h-4 w-4 text-red-400 mr-2" />
                          SELL
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Order Type</label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger className="bg-black/20 border-cyan-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market</SelectItem>
                      {currentFeatures.advancedOrders && (
                        <>
                          <SelectItem value="limit">Limit</SelectItem>
                          <SelectItem value="stop">Stop Loss</SelectItem>
                          <SelectItem value="stop-limit">Stop Limit</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Quantity</label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    className="bg-black/20 border-cyan-500/30 text-white"
                  />
                </div>
              </div>

              {orderType !== 'market' && (
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Price</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="bg-black/20 border-cyan-500/30 text-white"
                  />
                </div>
              )}

              <Button
                onClick={executeTrade}
                disabled={isExecuting}
                className={`w-full text-lg font-bold ${
                  side === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {isExecuting ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Executing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Lightning className="h-5 w-5 mr-2" />
                    {side.toUpperCase()} {selectedStock}
                  </div>
                )}
              </Button>

              {executionTime > 0 && (
                <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                  <p className="text-green-400 font-bold">
                    <Timer className="h-4 w-4 inline mr-1" />
                    Executed in {executionTime.toFixed(1)}ms
                  </p>
                </div>
              )}
            </div>

            {/* Real-time Market Data */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Real-time Market Data</h4>
              {selectedStock && marketData[selectedStock] && (
                <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-bold text-xl">{selectedStock}</span>
                    <Badge
                      className={
                        currentFeatures.realTimeData ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                      }
                    >
                      {currentFeatures.realTimeData ? 'LIVE' : 'DELAYED'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Price</p>
                      <p className="text-white font-bold text-2xl">
                        ${marketData[selectedStock].price.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Change</p>
                      <p
                        className={`font-bold text-xl ${
                          marketData[selectedStock].change >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {marketData[selectedStock].change >= 0 ? '+' : ''}
                        {marketData[selectedStock].change.toFixed(2)}(
                        {marketData[selectedStock].changePercent.toFixed(2)}%)
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Bid</p>
                      <p className="text-blue-400 font-semibold">
                        ${marketData[selectedStock].bid.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Ask</p>
                      <p className="text-red-400 font-semibold">
                        ${marketData[selectedStock].ask.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Trade Limits */}
              <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                <h5 className="text-white font-medium mb-2">Trading Limits</h5>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Trades Today:</span>
                    <span className="text-white">
                      {recentTrades.length}/
                      {currentFeatures.maxTrades === 'unlimited' ? '∞' : currentFeatures.maxTrades}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Execution Speed:</span>
                    <span className="text-cyan-400">{currentFeatures.executionSpeed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">AI Signals:</span>
                    <span className="text-purple-400">
                      {aiSignals.length}/
                      {currentFeatures.aiSignals === 'unlimited' ? '∞' : currentFeatures.aiSignals}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Signals */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-6 w-6 mr-2 text-purple-400" />
            AI Trading Signals
            <Badge className="ml-3 bg-gradient-to-r from-purple-500 to-pink-500">
              <Eye className="h-3 w-3 mr-1" />
              Live AI
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {aiSignals.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">AI is analyzing market conditions...</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {aiSignals
                .slice(
                  0,
                  currentFeatures.aiSignals === 'unlimited'
                    ? aiSignals.length
                    : currentFeatures.aiSignals
                )
                .map(signal => (
                  <div
                    key={signal.id}
                    className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant={signal.action === 'BUY' ? 'default' : 'destructive'}>
                          {signal.action}
                        </Badge>
                        <span className="text-white font-bold">{signal.symbol}</span>
                        <span className="text-gray-300">${signal.targetPrice.toFixed(2)}</span>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-cyan-500">{signal.confidence.toFixed(0)}%</Badge>
                        <p className="text-xs text-gray-400 mt-1">{signal.timeframe}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">{signal.reason}</p>
                    <p className="text-xs text-gray-400">{signal.timestamp.toLocaleTimeString()}</p>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card className="bg-black/20 border-green-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-6 w-6 mr-2 text-green-400" />
            Recent Executions ({recentTrades.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentTrades.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No trades executed yet</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recentTrades.slice(0, 10).map(trade => (
                <div
                  key={trade.id}
                  className="flex items-center justify-between p-3 bg-gray-800/30 rounded border border-gray-700/30"
                >
                  <div className="flex items-center space-x-3">
                    <Badge variant={trade.side === 'buy' ? 'default' : 'destructive'}>
                      {trade.side.toUpperCase()}
                    </Badge>
                    <span className="text-white font-medium">{trade.symbol}</span>
                    <span className="text-gray-400 text-sm">
                      {trade.quantity} @ ${trade.price.toFixed(2)}
                    </span>
                    {trade.type === 'auto' && (
                      <Badge className="bg-purple-500 text-xs">
                        <Bot className="h-3 w-3 mr-1" />
                        AUTO
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-cyan-400 text-sm font-bold">
                      {trade.executionTime.toFixed(1)}ms
                    </span>
                    <p className="text-xs text-gray-400">{trade.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
