'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Bot,
  Play,
  Pause,
  Square,
  Zap,
  TrendingUp,
  Activity,
  Target,
  Brain,
  AlertTriangle,
  BarChart3,
  Eye,
  Wallet,
  Timer,
} from 'lucide-react';

export default function LiveTradingBot() {
  const [botStatus, setBotStatus] = useState('stopped'); // stopped, running, paused
  const [accountBalance, setAccountBalance] = useState(50000);
  const [totalPnL, setTotalPnL] = useState(0);
  const [dailyPnL, setDailyPnL] = useState(0);
  const [activeTrades, setActiveTrades] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [botStats, setBotStats] = useState({
    totalTrades: 0,
    winRate: 0,
    avgWin: 0,
    avgLoss: 0,
    maxDrawdown: 0,
    sharpeRatio: 0,
    profitFactor: 0,
    tradingDays: 0,
  });
  const [marketAnalysis, setMarketAnalysis] = useState({});
  const [botSettings, setBotSettings] = useState({
    maxPositionSize: 5000,
    maxDailyLoss: 1000,
    maxConcurrentTrades: 3,
    riskPerTrade: 1.5,
    aiConfidenceThreshold: 75,
    tradingHours: true,
    emergencyStop: true,
  });

  // Real-time market data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      updateMarketAnalysis();
      if (botStatus === 'running') {
        executeTradeLogic();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [botStatus, botSettings]);

  // Live trading execution logic
  const executeTradeLogic = () => {
    // Simulate AI market analysis
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'META', 'AMZN', 'SPY', 'QQQ'];
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];

    // AI confidence score
    const aiConfidence = 60 + Math.random() * 40;

    // Only trade if AI confidence is above threshold
    if (
      aiConfidence >= botSettings.aiConfidenceThreshold &&
      activeTrades.length < botSettings.maxConcurrentTrades
    ) {
      const shouldTrade = Math.random() > 0.95; // 5% chance per cycle

      if (shouldTrade) {
        executeTrade(randomSymbol, aiConfidence);
      }
    }

    // Close existing trades based on AI analysis
    activeTrades.forEach(trade => {
      const shouldClose = Math.random() > 0.98; // 2% chance to close per cycle
      if (shouldClose) {
        closeTrade(trade.id);
      }
    });
  };

  const executeTrade = (symbol, confidence) => {
    const side = Math.random() > 0.5 ? 'BUY' : 'SELL';
    const price = 100 + Math.random() * 400;
    const quantity = Math.floor(botSettings.maxPositionSize / price);
    const strategy = ['AI Momentum', 'Mean Reversion', 'Breakout', 'News Sentiment'][
      Math.floor(Math.random() * 4)
    ];

    const newTrade = {
      id: Date.now(),
      symbol,
      side,
      quantity,
      entryPrice: price,
      currentPrice: price,
      strategy,
      confidence,
      timestamp: new Date(),
      pnl: 0,
      status: 'open',
      stopLoss: side === 'BUY' ? price * 0.98 : price * 1.02,
      takeProfit: side === 'BUY' ? price * 1.04 : price * 0.96,
    };

    setActiveTrades(prev => [...prev, newTrade]);
    setBotStats(prev => ({ ...prev, totalTrades: prev.totalTrades + 1 }));
  };

  const closeTrade = tradeId => {
    const trade = activeTrades.find(t => t.id === tradeId);
    if (!trade) return;

    const exitPrice = trade.currentPrice + (Math.random() - 0.5) * 10;
    const pnl =
      trade.side === 'BUY'
        ? (exitPrice - trade.entryPrice) * trade.quantity
        : (trade.entryPrice - exitPrice) * trade.quantity;

    const closedTrade = {
      ...trade,
      exitPrice,
      pnl,
      status: 'closed',
      exitTime: new Date(),
    };

    setActiveTrades(prev => prev.filter(t => t.id !== tradeId));
    setTradeHistory(prev => [closedTrade, ...prev.slice(0, 49)]); // Keep last 50 trades

    // Update account balance and P&L
    setAccountBalance(prev => prev + pnl);
    setTotalPnL(prev => prev + pnl);
    setDailyPnL(prev => prev + pnl);

    // Update stats
    setBotStats(prev => {
      const wins = tradeHistory.filter(t => t.pnl > 0).length + (pnl > 0 ? 1 : 0);
      const losses = tradeHistory.filter(t => t.pnl <= 0).length + (pnl <= 0 ? 1 : 0);
      const totalTrades = wins + losses;
      const winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;

      return {
        ...prev,
        winRate,
        avgWin:
          wins > 0
            ? tradeHistory.filter(t => t.pnl > 0).reduce((sum, t) => sum + t.pnl, 0) / wins
            : 0,
        avgLoss:
          losses > 0
            ? Math.abs(tradeHistory.filter(t => t.pnl <= 0).reduce((sum, t) => sum + t.pnl, 0)) /
              losses
            : 0,
      };
    });
  };

  const updateMarketAnalysis = () => {
    setMarketAnalysis({
      marketTrend: Math.random() > 0.5 ? 'bullish' : 'bearish',
      volatility: 10 + Math.random() * 30,
      volume: 80 + Math.random() * 40,
      sentiment: 40 + Math.random() * 60,
      opportunities: Math.floor(Math.random() * 10) + 1,
      riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
    });

    // Update current prices for active trades
    setActiveTrades(prev =>
      prev.map(trade => {
        const priceChange = (Math.random() - 0.5) * 5;
        const newPrice = Math.max(trade.currentPrice + priceChange, 1);
        const pnl =
          trade.side === 'BUY'
            ? (newPrice - trade.entryPrice) * trade.quantity
            : (trade.entryPrice - newPrice) * trade.quantity;

        return { ...trade, currentPrice: newPrice, pnl };
      })
    );
  };

  const startBot = () => {
    setBotStatus('running');
  };

  const pauseBot = () => {
    setBotStatus('paused');
  };

  const stopBot = () => {
    setBotStatus('stopped');
    // Close all active trades
    activeTrades.forEach(trade => closeTrade(trade.id));
  };

  const emergencyStop = () => {
    setBotStatus('stopped');
    activeTrades.forEach(trade => closeTrade(trade.id));
  };

  return (
    <div className="space-y-6">
      {/* Bot Control Panel */}
      <Card className="bg-gray-900/90 border-cyan-500/30 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-100 flex items-center">
              <Bot className="h-6 w-6 mr-2 text-cyan-400" />
              Live Trading Bot - AI Autopilot
              <Badge
                className={`ml-3 ${
                  botStatus === 'running'
                    ? 'bg-green-500 animate-pulse'
                    : botStatus === 'paused'
                      ? 'bg-yellow-500'
                      : 'bg-gray-500'
                }`}
              >
                {botStatus === 'running'
                  ? '🟢 LIVE TRADING'
                  : botStatus === 'paused'
                    ? '⏸️ PAUSED'
                    : '⏹️ STOPPED'}
              </Badge>
            </CardTitle>

            <div className="flex items-center space-x-2">
              {botStatus === 'stopped' && (
                <Button
                  onClick={startBot}
                  className="bg-green-500 hover:bg-green-600 text-black font-bold"
                >
                  <Play className="h-4 w-4 mr-2" />
                  START LIVE TRADING
                </Button>
              )}

              {botStatus === 'running' && (
                <>
                  <Button
                    onClick={pauseBot}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                  <Button
                    onClick={stopBot}
                    variant="outline"
                    className="border-gray-500 text-gray-300"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                </>
              )}

              {botStatus === 'paused' && (
                <>
                  <Button
                    onClick={() => setBotStatus('running')}
                    className="bg-green-500 hover:bg-green-600 text-black"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                  <Button
                    onClick={stopBot}
                    variant="outline"
                    className="border-gray-500 text-gray-300"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                </>
              )}

              <Button
                onClick={emergencyStop}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                EMERGENCY STOP
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Real-time Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <Wallet className="h-6 w-6 text-green-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Account Balance</p>
              <p className="text-lg font-bold text-green-400">${accountBalance.toLocaleString()}</p>
            </div>

            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <TrendingUp className="h-6 w-6 text-cyan-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Total P&L</p>
              <p
                className={`text-lg font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}
              >
                ${totalPnL.toFixed(2)}
              </p>
            </div>

            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <Activity className="h-6 w-6 text-blue-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Daily P&L</p>
              <p
                className={`text-lg font-bold ${dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}
              >
                ${dailyPnL.toFixed(2)}
              </p>
            </div>

            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <Target className="h-6 w-6 text-purple-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Win Rate</p>
              <p className="text-lg font-bold text-gray-100">{botStats.winRate.toFixed(1)}%</p>
            </div>

            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <BarChart3 className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Total Trades</p>
              <p className="text-lg font-bold text-gray-100">{botStats.totalTrades}</p>
            </div>

            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <Eye className="h-6 w-6 text-orange-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Active Trades</p>
              <p className="text-lg font-bold text-gray-100">{activeTrades.length}</p>
            </div>

            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <Brain className="h-6 w-6 text-pink-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">AI Confidence</p>
              <p className="text-lg font-bold text-gray-100">
                {marketAnalysis.sentiment?.toFixed(0) || 0}%
              </p>
            </div>

            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <Timer className="h-6 w-6 text-indigo-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Opportunities</p>
              <p className="text-lg font-bold text-gray-100">{marketAnalysis.opportunities || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Analysis */}
      <Card className="bg-gray-900/90 border-cyan-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center">
            <Brain className="h-6 w-6 mr-2 text-cyan-400" />
            Live Market Analysis
            <Badge className="ml-3 bg-gradient-to-r from-cyan-500 to-blue-600">
              <Zap className="h-3 w-3 mr-1" />
              Real-time AI
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30">
                <h4 className="text-gray-200 font-semibold mb-3">Market Conditions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Trend:</span>
                    <Badge
                      className={
                        marketAnalysis.marketTrend === 'bullish' ? 'bg-green-500' : 'bg-red-500'
                      }
                    >
                      {marketAnalysis.marketTrend}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volatility:</span>
                    <span className="text-gray-200">{marketAnalysis.volatility?.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume:</span>
                    <span className="text-gray-200">{marketAnalysis.volume?.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-lg border border-green-500/30">
                <h4 className="text-gray-200 font-semibold mb-3">AI Sentiment</h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {marketAnalysis.sentiment?.toFixed(0) || 0}%
                  </div>
                  <Progress value={marketAnalysis.sentiment || 0} className="h-3 mb-2" />
                  <p className="text-sm text-gray-400">Bullish Confidence</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30">
                <h4 className="text-gray-200 font-semibold mb-3">Risk Assessment</h4>
                <div className="text-center">
                  <Badge
                    className={`text-lg px-4 py-2 ${
                      marketAnalysis.riskLevel === 'high'
                        ? 'bg-red-500'
                        : marketAnalysis.riskLevel === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }`}
                  >
                    {marketAnalysis.riskLevel?.toUpperCase() || 'LOW'} RISK
                  </Badge>
                  <p className="text-sm text-gray-400 mt-2">Current Market Risk</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Trades */}
      <Card className="bg-gray-900/90 border-cyan-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center">
            <Activity className="h-6 w-6 mr-2 text-green-400" />
            Live Active Trades ({activeTrades.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTrades.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">
                No active trades. Bot is analyzing market for opportunities...
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeTrades.map(trade => (
                <div
                  key={trade.id}
                  className="p-4 bg-gray-800/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-100 font-bold text-lg">{trade.symbol}</span>
                          <Badge variant={trade.side === 'BUY' ? 'default' : 'destructive'}>
                            {trade.side}
                          </Badge>
                          <Badge className="bg-purple-500">{trade.strategy}</Badge>
                        </div>
                        <p className="text-sm text-gray-400">
                          {trade.quantity} shares @ ${trade.entryPrice.toFixed(2)}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Current Price</p>
                        <p className="text-gray-100 font-semibold">
                          ${trade.currentPrice.toFixed(2)}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-gray-400 text-sm">P&L</p>
                        <p
                          className={`font-bold text-lg ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          ${trade.pnl.toFixed(2)}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Confidence</p>
                        <p className="text-cyan-400 font-semibold">
                          {trade.confidence.toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        {trade.timestamp.toLocaleTimeString()}
                      </p>
                      <div className="mt-1">
                        <Badge
                          variant="outline"
                          className="border-green-500/30 text-green-400 text-xs"
                        >
                          SL: ${trade.stopLoss.toFixed(2)}
                        </Badge>
                      </div>
                      <div className="mt-1">
                        <Badge
                          variant="outline"
                          className="border-blue-500/30 text-blue-400 text-xs"
                        >
                          TP: ${trade.takeProfit.toFixed(2)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Trade History */}
      <Card className="bg-gray-900/90 border-cyan-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-blue-400" />
            Recent Trade History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tradeHistory.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">
                No completed trades yet. Start the bot to begin trading!
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {tradeHistory.slice(0, 10).map(trade => (
                <div
                  key={trade.id}
                  className="flex items-center justify-between p-3 bg-gray-800/30 rounded border border-gray-700/30"
                >
                  <div className="flex items-center space-x-3">
                    <Badge variant={trade.side === 'BUY' ? 'default' : 'destructive'}>
                      {trade.side}
                    </Badge>
                    <span className="text-gray-100 font-medium">{trade.symbol}</span>
                    <span className="text-gray-400 text-sm">
                      {trade.quantity} @ ${trade.entryPrice.toFixed(2)} → $
                      {trade.exitPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`font-bold ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      ${trade.pnl.toFixed(2)}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {trade.exitTime.toLocaleTimeString()}
                    </span>
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
