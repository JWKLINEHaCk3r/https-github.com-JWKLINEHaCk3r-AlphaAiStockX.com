'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Bot,
  Play,
  Pause,
  Square,
  DollarSign,
  TrendingUp,
  Target,
  Shield,
  Rocket,
  Brain,
  Eye,
  Activity,
  Wallet,
  Crown,
  Star,
  CloudLightningIcon as Lightning,
  Atom,
} from 'lucide-react';

export default function AutomatedTradingSystem({ user, membershipLevel }) {
  const [systemStatus, setSystemStatus] = useState('stopped'); // stopped, running, paused
  const [tradingCapital, setTradingCapital] = useState(50000);
  const [moneyMarketBalance, setMoneyMarketBalance] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [dailyProfit, setDailyProfit] = useState(0);
  const [activeTrades, setActiveTrades] = useState([]);
  const [systemSettings, setSystemSettings] = useState({
    maxRiskPerTrade: 2.0,
    maxDailyRisk: 5.0,
    maxConcurrentTrades: 5,
    profitTarget: 10.0,
    stopLoss: 3.0,
    autoScalp: true,
    moneyMarketTransfer: true,
    minProfitForTransfer: 1000,
  });
  const [aiAnalysis, setAiAnalysis] = useState({});
  const [executionMetrics, setExecutionMetrics] = useState({
    totalTrades: 0,
    winRate: 0,
    avgWin: 0,
    avgLoss: 0,
    profitFactor: 0,
    sharpeRatio: 0,
    maxDrawdown: 0,
    executionSpeed: 0,
  });

  // Premium features check
  const isPremium = ['pro', 'ultimate', 'owner', 'investor'].includes(membershipLevel);

  useEffect(() => {
    if (systemStatus === 'running' && isPremium) {
      const tradingInterval = setInterval(() => {
        executeAutomatedTrading();
        updateAIAnalysis();
        updateExecutionMetrics();
      }, 2000);

      const profitInterval = setInterval(() => {
        calculateInterest();
      }, 10000); // Calculate interest every 10 seconds for demo

      return () => {
        clearInterval(tradingInterval);
        clearInterval(profitInterval);
      };
    }
  }, [systemStatus, isPremium, systemSettings]);

  const executeAutomatedTrading = () => {
    // AI Market Analysis
    const marketConditions = analyzeMarketConditions();

    // Only trade if conditions are favorable
    if (
      marketConditions.confidence > 75 &&
      activeTrades.length < systemSettings.maxConcurrentTrades
    ) {
      const shouldTrade = Math.random() > 0.92; // 8% chance per cycle for realistic trading

      if (shouldTrade) {
        executeTrade(marketConditions);
      }
    }

    // Manage existing trades
    manageActiveTrades();
  };

  const analyzeMarketConditions = () => {
    const symbols = [
      'AAPL',
      'MSFT',
      'GOOGL',
      'TSLA',
      'NVDA',
      'META',
      'AMZN',
      'SPY',
      'QQQ',
      'AMD',
      'CRM',
      'NFLX',
    ];
    const selectedSymbol = symbols[Math.floor(Math.random() * symbols.length)];

    return {
      symbol: selectedSymbol,
      confidence: 70 + Math.random() * 30,
      direction: Math.random() > 0.55 ? 'BUY' : 'SELL', // Slight bullish bias
      volatility: 10 + Math.random() * 30,
      volume: 80 + Math.random() * 40,
      momentum: 50 + Math.random() * 50,
      rsi: 30 + Math.random() * 40,
      macdSignal: Math.random() > 0.6 ? 'bullish' : 'bearish',
      supportResistance: {
        support: 100 + Math.random() * 200,
        resistance: 150 + Math.random() * 300,
      },
    };
  };

  const executeTrade = conditions => {
    const price = 100 + Math.random() * 400;
    const positionSize = Math.min(
      (tradingCapital * systemSettings.maxRiskPerTrade) / 100,
      tradingCapital * 0.1 // Max 10% of capital per trade
    );
    const quantity = Math.floor(positionSize / price);

    if (quantity > 0 && positionSize <= tradingCapital) {
      const newTrade = {
        id: Date.now(),
        symbol: conditions.symbol,
        side: conditions.direction,
        quantity,
        entryPrice: price,
        currentPrice: price,
        positionSize,
        entryTime: new Date(),
        stopLoss: conditions.direction === 'BUY' ? price * 0.97 : price * 1.03,
        takeProfit: conditions.direction === 'BUY' ? price * 1.1 : price * 0.9,
        confidence: conditions.confidence,
        strategy: 'AI Automated',
        pnl: 0,
        status: 'open',
      };

      setActiveTrades(prev => [...prev, newTrade]);
      setTradingCapital(prev => prev - positionSize);

      // Update metrics
      setExecutionMetrics(prev => ({
        ...prev,
        totalTrades: prev.totalTrades + 1,
        executionSpeed: 15 + Math.random() * 35, // 15-50ms execution
      }));
    }
  };

  const manageActiveTrades = () => {
    setActiveTrades(prevTrades => {
      const updatedTrades = prevTrades.map(trade => {
        // Update current price with realistic movement
        const priceChange = (Math.random() - 0.5) * trade.entryPrice * 0.02; // ±2% max movement
        const newPrice = Math.max(trade.currentPrice + priceChange, 1);

        // Calculate P&L
        const pnl =
          trade.side === 'BUY'
            ? (newPrice - trade.entryPrice) * trade.quantity
            : (trade.entryPrice - newPrice) * trade.quantity;

        const updatedTrade = { ...trade, currentPrice: newPrice, pnl };

        // Check exit conditions
        const shouldExit =
          newPrice <= updatedTrade.stopLoss ||
          newPrice >= updatedTrade.takeProfit ||
          Math.random() > 0.995; // Random exit for variety

        if (shouldExit) {
          closeTrade(updatedTrade);
          return null; // Will be filtered out
        }

        return updatedTrade;
      });

      return updatedTrades.filter(Boolean); // Remove null trades
    });
  };

  const closeTrade = trade => {
    const profit = trade.pnl;
    const isWin = profit > 0;

    // Update capital and profits
    setTradingCapital(prev => prev + trade.positionSize + profit);
    setTotalProfit(prev => prev + profit);
    setDailyProfit(prev => prev + profit);

    // Update win rate and metrics
    setExecutionMetrics(prev => {
      const totalTrades = prev.totalTrades;
      const currentWins = (prev.winRate / 100) * (totalTrades - 1);
      const newWins = currentWins + (isWin ? 1 : 0);
      const newWinRate = (newWins / totalTrades) * 100;

      return {
        ...prev,
        winRate: newWinRate,
        avgWin: isWin ? (prev.avgWin + profit) / 2 : prev.avgWin,
        avgLoss: !isWin ? (prev.avgLoss + Math.abs(profit)) / 2 : prev.avgLoss,
        profitFactor: prev.avgLoss > 0 ? prev.avgWin / prev.avgLoss : 0,
        sharpeRatio: 2.5 + Math.random() * 1.5, // Simulated Sharpe ratio
      };
    });

    // Auto-transfer profits to money market if enabled
    if (systemSettings.moneyMarketTransfer && profit >= systemSettings.minProfitForTransfer) {
      transferToMoneyMarket(profit * 0.8); // Transfer 80% of large profits
    }
  };

  const transferToMoneyMarket = amount => {
    setMoneyMarketBalance(prev => prev + amount);
    setTradingCapital(prev => prev - amount);
  };

  const calculateInterest = () => {
    if (moneyMarketBalance > 0) {
      const dailyRate = 1.5 / 365 / 100; // 1.5% annual rate
      const interest = moneyMarketBalance * dailyRate * (10 / 86400); // 10 seconds worth of interest
      setMoneyMarketBalance(prev => prev + interest);
      setTotalProfit(prev => prev + interest);
    }
  };

  const updateAIAnalysis = () => {
    setAiAnalysis({
      marketSentiment: 60 + Math.random() * 40,
      volatilityForecast: 15 + Math.random() * 25,
      trendStrength: 70 + Math.random() * 30,
      riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      opportunityScore: 75 + Math.random() * 25,
      nextTradeETA: Math.floor(Math.random() * 300) + 30, // 30-330 seconds
    });
  };

  const updateExecutionMetrics = () => {
    setExecutionMetrics(prev => ({
      ...prev,
      maxDrawdown: Math.max(prev.maxDrawdown, Math.random() * 5),
      executionSpeed: 10 + Math.random() * 40,
    }));
  };

  const startSystem = () => {
    if (!isPremium) {
      alert('Automated Trading System requires Premium Membership!');
      return;
    }
    setSystemStatus('running');
  };

  const pauseSystem = () => {
    setSystemStatus('paused');
  };

  const stopSystem = () => {
    setSystemStatus('stopped');
    // Close all active trades
    activeTrades.forEach(trade => closeTrade(trade));
    setActiveTrades([]);
  };

  const emergencyStop = () => {
    setSystemStatus('stopped');
    activeTrades.forEach(trade => closeTrade(trade));
    setActiveTrades([]);
  };

  if (!isPremium) {
    return (
      <Card className="bg-gradient-to-r from-gray-900/90 to-black/90 border-2 border-red-500/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Crown className="h-8 w-8 mr-3 text-yellow-400" />
            🔒 PREMIUM AUTOMATED TRADING SYSTEM
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Bot className="h-24 w-24 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">Upgrade to Premium</h3>
          <p className="text-gray-300 mb-6">
            Unlock the most advanced AI automated trading system with guaranteed profits and money
            market integration.
          </p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 text-lg">
            <Crown className="h-5 w-5 mr-2" />
            Upgrade Now
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* System Control Panel */}
      <Card className="bg-gradient-to-r from-gray-900/90 to-black/90 border-2 border-cyan-400/50 backdrop-blur-xl shadow-2xl shadow-cyan-500/25">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center text-2xl">
              <Bot className="h-8 w-8 mr-3 text-cyan-400 animate-pulse" />
              🤖 AI AUTOMATED TRADING SYSTEM
              <Badge
                className={`ml-4 text-lg px-4 py-2 animate-pulse ${
                  systemStatus === 'running'
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-black'
                    : systemStatus === 'paused'
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                      : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                }`}
              >
                {systemStatus === 'running'
                  ? '🟢 LIVE TRADING'
                  : systemStatus === 'paused'
                    ? '⏸️ PAUSED'
                    : '⏹️ STOPPED'}
              </Badge>
            </CardTitle>

            <div className="flex items-center space-x-3">
              {systemStatus === 'stopped' && (
                <Button
                  onClick={startSystem}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black font-bold px-6 py-3 text-lg shadow-lg shadow-green-500/50"
                >
                  <Play className="h-5 w-5 mr-2" />
                  START AI TRADING
                </Button>
              )}

              {systemStatus === 'running' && (
                <>
                  <Button
                    onClick={pauseSystem}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-4 py-2"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                  <Button
                    onClick={stopSystem}
                    variant="outline"
                    className="border-gray-500 text-gray-300 hover:bg-gray-800"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                </>
              )}

              {systemStatus === 'paused' && (
                <>
                  <Button
                    onClick={() => setSystemStatus('running')}
                    className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black font-bold px-4 py-2"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                  <Button
                    onClick={stopSystem}
                    variant="outline"
                    className="border-gray-500 text-gray-300 hover:bg-gray-800"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                </>
              )}

              <Button
                onClick={emergencyStop}
                variant="destructive"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/50"
              >
                <Shield className="h-4 w-4 mr-2" />
                EMERGENCY STOP
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Real-time Performance Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            <div className="text-center p-4 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-xl border-2 border-green-400/30 shadow-lg shadow-green-500/25">
              <Wallet className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Trading Capital</p>
              <p className="text-xl font-bold text-green-400">${tradingCapital.toLocaleString()}</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-xl border-2 border-blue-400/30 shadow-lg shadow-blue-500/25">
              <DollarSign className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Money Market</p>
              <p className="text-xl font-bold text-blue-400">
                ${moneyMarketBalance.toLocaleString()}
              </p>
              <p className="text-xs text-cyan-400">1.5% APY</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-xl border-2 border-purple-400/30 shadow-lg shadow-purple-500/25">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Total Profit</p>
              <p
                className={`text-xl font-bold ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}
              >
                ${totalProfit.toFixed(2)}
              </p>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl border-2 border-yellow-400/30 shadow-lg shadow-yellow-500/25">
              <Activity className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Daily Profit</p>
              <p
                className={`text-xl font-bold ${dailyProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}
              >
                ${dailyProfit.toFixed(2)}
              </p>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-xl border-2 border-cyan-400/30 shadow-lg shadow-cyan-500/25">
              <Target className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Win Rate</p>
              <p className="text-xl font-bold text-cyan-400">
                {executionMetrics.winRate.toFixed(1)}%
              </p>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-indigo-400/20 to-purple-500/20 rounded-xl border-2 border-indigo-400/30 shadow-lg shadow-indigo-500/25">
              <Eye className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Active Trades</p>
              <p className="text-xl font-bold text-indigo-400">{activeTrades.length}</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-pink-400/20 to-red-500/20 rounded-xl border-2 border-pink-400/30 shadow-lg shadow-pink-500/25">
              <Lightning className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Execution Speed</p>
              <p className="text-xl font-bold text-pink-400">
                {executionMetrics.executionSpeed.toFixed(0)}ms
              </p>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-teal-400/20 to-green-500/20 rounded-xl border-2 border-teal-400/30 shadow-lg shadow-teal-500/25">
              <Rocket className="h-8 w-8 text-teal-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Total Trades</p>
              <p className="text-xl font-bold text-teal-400">{executionMetrics.totalTrades}</p>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="h-6 w-6 mr-2 text-blue-400" />
                  AI Market Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Sentiment:</span>
                    <span className="text-blue-400 font-bold">
                      {aiAnalysis.marketSentiment?.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Opportunity Score:</span>
                    <span className="text-green-400 font-bold">
                      {aiAnalysis.opportunityScore?.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Risk Level:</span>
                    <Badge
                      className={
                        aiAnalysis.riskLevel === 'low'
                          ? 'bg-green-500'
                          : aiAnalysis.riskLevel === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      }
                    >
                      {aiAnalysis.riskLevel?.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Trade ETA:</span>
                    <span className="text-cyan-400 font-bold">{aiAnalysis.nextTradeETA}s</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Star className="h-6 w-6 mr-2 text-green-400" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Profit Factor:</span>
                    <span className="text-green-400 font-bold">
                      {executionMetrics.profitFactor.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sharpe Ratio:</span>
                    <span className="text-blue-400 font-bold">
                      {executionMetrics.sharpeRatio.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Drawdown:</span>
                    <span className="text-red-400 font-bold">
                      {executionMetrics.maxDrawdown.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Win:</span>
                    <span className="text-green-400 font-bold">
                      ${executionMetrics.avgWin.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Atom className="h-6 w-6 mr-2 text-purple-400" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Auto Scalping:</span>
                    <Switch
                      checked={systemSettings.autoScalp}
                      onCheckedChange={checked =>
                        setSystemSettings(prev => ({ ...prev, autoScalp: checked }))
                      }
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Money Market:</span>
                    <Switch
                      checked={systemSettings.moneyMarketTransfer}
                      onCheckedChange={checked =>
                        setSystemSettings(prev => ({ ...prev, moneyMarketTransfer: checked }))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Max Risk Per Trade (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={systemSettings.maxRiskPerTrade}
                      onChange={e =>
                        setSystemSettings(prev => ({
                          ...prev,
                          maxRiskPerTrade: Number(e.target.value),
                        }))
                      }
                      className="bg-black/20 border-purple-500/30 text-white mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Trades */}
          {activeTrades.length > 0 && (
            <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-2 border-cyan-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="h-6 w-6 mr-2 text-cyan-400" />
                  🔥 LIVE ACTIVE TRADES ({activeTrades.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeTrades.map(trade => (
                    <div
                      key={trade.id}
                      className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-cyan-400/30 hover:border-cyan-400/50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-bold text-lg">{trade.symbol}</span>
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
                            <p className="text-white font-semibold">
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
                            {trade.entryTime.toLocaleTimeString()}
                          </p>
                          <div className="mt-1 space-y-1">
                            <Badge
                              variant="outline"
                              className="border-green-500/30 text-green-400 text-xs"
                            >
                              TP: ${trade.takeProfit.toFixed(2)}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-red-500/30 text-red-400 text-xs"
                            >
                              SL: ${trade.stopLoss.toFixed(2)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
