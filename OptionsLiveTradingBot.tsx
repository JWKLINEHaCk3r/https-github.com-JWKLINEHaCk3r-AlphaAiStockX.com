'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Play,
  Pause,
  Square,
  Zap,
  TrendingUp,
  Activity,
  Target,
  Brain,
  Wallet,
  Calendar,
  DollarSign,
} from 'lucide-react';

export default function OptionsLiveTradingBot() {
  const [botStatus, setBotStatus] = useState('stopped');
  const [accountBalance, setAccountBalance] = useState(50000);
  const [totalPnL, setTotalPnL] = useState(0);
  const [dailyPnL, setDailyPnL] = useState(0);
  const [activeOptionsTrades, setActiveOptionsTrades] = useState([]);
  const [optionsHistory, setOptionsHistory] = useState([]);
  const [optionsChain, setOptionsChain] = useState([]);
  const [botSettings, setBotSettings] = useState({
    maxPositionSize: 5000,
    maxDailyLoss: 1000,
    maxConcurrentTrades: 5,
    riskPerTrade: 2.0,
    aiConfidenceThreshold: 80,
    optionsStrategy: 'momentum',
    dteRange: [7, 45], // Days to expiration
    deltaRange: [0.3, 0.7],
    ivThreshold: 30,
  });

  const optionsStrategies = [
    { id: 'momentum', name: 'Momentum Plays', description: 'High probability directional moves' },
    { id: 'earnings', name: 'Earnings Straddles', description: 'Volatility expansion plays' },
    { id: 'iron-condor', name: 'Iron Condors', description: 'Range-bound strategies' },
    { id: 'credit-spreads', name: 'Credit Spreads', description: 'High probability income' },
    { id: 'gamma-scalping', name: 'Gamma Scalping', description: 'Delta-neutral strategies' },
    { id: 'volatility', name: 'Volatility Arbitrage', description: 'IV vs RV plays' },
  ];

  useEffect(() => {
    generateOptionsChain();
    const interval = setInterval(() => {
      updateOptionsData();
      if (botStatus === 'running') {
        executeOptionsTradeLogic();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [botStatus, botSettings]);

  const generateOptionsChain = () => {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'SPY', 'QQQ', 'META'];
    const chain = [];

    symbols.forEach(symbol => {
      const stockPrice = 100 + Math.random() * 400;
      const expirations = ['2024-01-19', '2024-01-26', '2024-02-02', '2024-02-16', '2024-03-15'];

      expirations.forEach(expiry => {
        for (let i = -5; i <= 5; i++) {
          const strike = Math.round((stockPrice + i * 10) / 5) * 5;
          const dte = Math.floor(Math.random() * 45) + 1;

          // Call option
          chain.push({
            symbol,
            type: 'CALL',
            strike,
            expiry,
            dte,
            bid: Math.random() * 10 + 0.5,
            ask: Math.random() * 10 + 1.0,
            last: Math.random() * 10 + 0.75,
            volume: Math.floor(Math.random() * 1000),
            openInterest: Math.floor(Math.random() * 5000),
            iv: 20 + Math.random() * 60,
            delta: 0.1 + Math.random() * 0.8,
            gamma: Math.random() * 0.1,
            theta: -Math.random() * 0.5,
            vega: Math.random() * 0.3,
            stockPrice,
          });

          // Put option
          chain.push({
            symbol,
            type: 'PUT',
            strike,
            expiry,
            dte,
            bid: Math.random() * 10 + 0.5,
            ask: Math.random() * 10 + 1.0,
            last: Math.random() * 10 + 0.75,
            volume: Math.floor(Math.random() * 1000),
            openInterest: Math.floor(Math.random() * 5000),
            iv: 20 + Math.random() * 60,
            delta: -(0.1 + Math.random() * 0.8),
            gamma: Math.random() * 0.1,
            theta: -Math.random() * 0.5,
            vega: Math.random() * 0.3,
            stockPrice,
          });
        }
      });
    });

    setOptionsChain(chain);
  };

  const executeOptionsTradeLogic = () => {
    const strategy = botSettings.optionsStrategy;
    const aiConfidence = 70 + Math.random() * 30;

    if (
      aiConfidence >= botSettings.aiConfidenceThreshold &&
      activeOptionsTrades.length < botSettings.maxConcurrentTrades
    ) {
      const shouldTrade = Math.random() > 0.92; // 8% chance per cycle

      if (shouldTrade) {
        executeOptionsStrategy(strategy, aiConfidence);
      }
    }

    // Manage existing trades
    activeOptionsTrades.forEach(trade => {
      const shouldClose = Math.random() > 0.97; // 3% chance to close per cycle
      if (shouldClose || trade.dte <= 1) {
        closeOptionsTrade(trade.id);
      }
    });
  };

  const executeOptionsStrategy = (strategy, confidence) => {
    const availableOptions = optionsChain.filter(
      opt => opt.dte >= botSettings.dteRange[0] && opt.dte <= botSettings.dteRange[1]
    );

    if (availableOptions.length === 0) return;

    const selectedOption = availableOptions[Math.floor(Math.random() * availableOptions.length)];
    const contracts = Math.floor(botSettings.maxPositionSize / (selectedOption.ask * 100));

    let tradeType, legs;

    switch (strategy) {
      case 'momentum':
        tradeType = Math.random() > 0.5 ? 'LONG_CALL' : 'LONG_PUT';
        legs = [
          {
            ...selectedOption,
            action: 'BUY',
            quantity: contracts,
            price: selectedOption.ask,
          },
        ];
        break;

      case 'earnings':
        tradeType = 'LONG_STRADDLE';
        legs = [
          {
            ...selectedOption,
            type: 'CALL',
            action: 'BUY',
            quantity: contracts,
            price: selectedOption.ask,
          },
          {
            ...selectedOption,
            type: 'PUT',
            action: 'BUY',
            quantity: contracts,
            price: selectedOption.ask,
          },
        ];
        break;

      case 'credit-spreads':
        tradeType = Math.random() > 0.5 ? 'BULL_PUT_SPREAD' : 'BEAR_CALL_SPREAD';
        legs = [
          {
            ...selectedOption,
            action: 'SELL',
            quantity: contracts,
            price: selectedOption.bid,
          },
          {
            ...selectedOption,
            strike: selectedOption.strike + (tradeType === 'BULL_PUT_SPREAD' ? -10 : 10),
            action: 'BUY',
            quantity: contracts,
            price: selectedOption.ask * 0.7,
          },
        ];
        break;

      default:
        tradeType = 'LONG_CALL';
        legs = [
          {
            ...selectedOption,
            action: 'BUY',
            quantity: contracts,
            price: selectedOption.ask,
          },
        ];
    }

    const newTrade = {
      id: Date.now(),
      symbol: selectedOption.symbol,
      strategy: tradeType,
      legs,
      confidence,
      timestamp: new Date(),
      pnl: 0,
      status: 'open',
      dte: selectedOption.dte,
      maxProfit: calculateMaxProfit(tradeType, legs),
      maxLoss: calculateMaxLoss(tradeType, legs),
      breakeven: calculateBreakeven(tradeType, legs),
    };

    setActiveOptionsTrades(prev => [...prev, newTrade]);
  };

  const calculateMaxProfit = (strategy, legs) => {
    // Simplified calculation
    const totalCredit = legs
      .filter(leg => leg.action === 'SELL')
      .reduce((sum, leg) => sum + leg.price * leg.quantity, 0);
    const totalDebit = legs
      .filter(leg => leg.action === 'BUY')
      .reduce((sum, leg) => sum + leg.price * leg.quantity, 0);

    if (strategy.includes('SPREAD')) {
      return Math.max(totalCredit - totalDebit, 0) * 100;
    }
    return strategy.includes('LONG') ? 'Unlimited' : totalCredit * 100;
  };

  const calculateMaxLoss = (strategy, legs) => {
    const totalDebit = legs
      .filter(leg => leg.action === 'BUY')
      .reduce((sum, leg) => sum + leg.price * leg.quantity, 0);
    return totalDebit * 100;
  };

  const calculateBreakeven = (strategy, legs) => {
    const mainLeg = legs[0];
    const netDebit = legs.reduce(
      (sum, leg) => sum + (leg.action === 'BUY' ? leg.price : -leg.price),
      0
    );

    if (mainLeg.type === 'CALL') {
      return mainLeg.strike + netDebit;
    } else {
      return mainLeg.strike - netDebit;
    }
  };

  const closeOptionsTrade = tradeId => {
    const trade = activeOptionsTrades.find(t => t.id === tradeId);
    if (!trade) return;

    // Simulate P&L calculation
    const pnl = (Math.random() - 0.3) * 1000; // Slight positive bias

    const closedTrade = {
      ...trade,
      pnl,
      status: 'closed',
      exitTime: new Date(),
    };

    setActiveOptionsTrades(prev => prev.filter(t => t.id !== tradeId));
    setOptionsHistory(prev => [closedTrade, ...prev.slice(0, 49)]);

    setAccountBalance(prev => prev + pnl);
    setTotalPnL(prev => prev + pnl);
    setDailyPnL(prev => prev + pnl);
  };

  const updateOptionsData = () => {
    // Update options prices and Greeks
    setOptionsChain(prev =>
      prev.map(option => ({
        ...option,
        bid: Math.max(option.bid + (Math.random() - 0.5) * 0.5, 0.01),
        ask: Math.max(option.ask + (Math.random() - 0.5) * 0.5, 0.02),
        last: Math.max(option.last + (Math.random() - 0.5) * 0.5, 0.01),
        iv: Math.max(option.iv + (Math.random() - 0.5) * 5, 5),
        dte: Math.max(option.dte - 0.1, 0),
      }))
    );

    // Update active trades P&L
    setActiveOptionsTrades(prev =>
      prev.map(trade => {
        const pnlChange = (Math.random() - 0.5) * 200;
        return {
          ...trade,
          pnl: trade.pnl + pnlChange,
          dte: Math.max(trade.dte - 0.1, 0),
        };
      })
    );
  };

  const startBot = () => setBotStatus('running');
  const pauseBot = () => setBotStatus('paused');
  const stopBot = () => {
    setBotStatus('stopped');
    activeOptionsTrades.forEach(trade => closeOptionsTrade(trade.id));
  };

  return (
    <div className="space-y-6">
      {/* Options Bot Control Panel */}
      <Card className="bg-gray-900/90 border-cyan-500/30 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-100 flex items-center">
              <Target className="h-6 w-6 mr-2 text-cyan-400" />
              Live Options Trading Bot
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
                  ? '🔴 LIVE OPTIONS'
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
                  START OPTIONS BOT
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
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Strategy Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-gray-200 text-sm font-medium">Options Strategy</label>
              <Select
                value={botSettings.optionsStrategy}
                onValueChange={value =>
                  setBotSettings(prev => ({ ...prev, optionsStrategy: value }))
                }
              >
                <SelectTrigger className="bg-gray-800/30 border-cyan-500/30 text-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {optionsStrategies.map(strategy => (
                    <SelectItem key={strategy.id} value={strategy.id}>
                      <div>
                        <div className="font-medium">{strategy.name}</div>
                        <div className="text-xs text-gray-400">{strategy.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-gray-200 text-sm font-medium">DTE Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={botSettings.dteRange[0]}
                  onChange={e =>
                    setBotSettings(prev => ({
                      ...prev,
                      dteRange: [Number.parseInt(e.target.value), prev.dteRange[1]],
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-800/30 border border-cyan-500/30 rounded text-gray-200"
                  placeholder="Min DTE"
                />
                <input
                  type="number"
                  value={botSettings.dteRange[1]}
                  onChange={e =>
                    setBotSettings(prev => ({
                      ...prev,
                      dteRange: [prev.dteRange[0], Number.parseInt(e.target.value)],
                    }))
                  }
                  className="w-full px-3 py-2 bg-gray-800/30 border border-cyan-500/30 rounded text-gray-200"
                  placeholder="Max DTE"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-200 text-sm font-medium">IV Threshold</label>
              <input
                type="number"
                value={botSettings.ivThreshold}
                onChange={e =>
                  setBotSettings(prev => ({
                    ...prev,
                    ivThreshold: Number.parseFloat(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 bg-gray-800/30 border border-cyan-500/30 rounded text-gray-200"
                placeholder="IV %"
              />
            </div>
          </div>

          {/* Options Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <Wallet className="h-6 w-6 text-green-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Account Balance</p>
              <p className="text-lg font-bold text-green-400">${accountBalance.toLocaleString()}</p>
            </div>

            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <TrendingUp className="h-6 w-6 text-cyan-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Options P&L</p>
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
              <p className="text-sm text-gray-400">Active Positions</p>
              <p className="text-lg font-bold text-gray-100">{activeOptionsTrades.length}</p>
            </div>

            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <Calendar className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Avg DTE</p>
              <p className="text-lg font-bold text-gray-100">
                {activeOptionsTrades.length > 0
                  ? (
                      activeOptionsTrades.reduce((sum, t) => sum + t.dte, 0) /
                      activeOptionsTrades.length
                    ).toFixed(0)
                  : 0}
              </p>
            </div>

            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <Brain className="h-6 w-6 text-pink-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Strategy</p>
              <p className="text-sm font-bold text-gray-100">
                {botSettings.optionsStrategy.toUpperCase()}
              </p>
            </div>

            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <Zap className="h-6 w-6 text-orange-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Win Rate</p>
              <p className="text-lg font-bold text-gray-100">
                {optionsHistory.length > 0
                  ? (
                      (optionsHistory.filter(t => t.pnl > 0).length / optionsHistory.length) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </p>
            </div>

            <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20">
              <DollarSign className="h-6 w-6 text-indigo-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Avg Trade</p>
              <p className="text-lg font-bold text-gray-100">
                $
                {optionsHistory.length > 0
                  ? (
                      optionsHistory.reduce((sum, t) => sum + t.pnl, 0) / optionsHistory.length
                    ).toFixed(0)
                  : 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Options Positions */}
      <Card className="bg-gray-900/90 border-cyan-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center">
            <Activity className="h-6 w-6 mr-2 text-green-400" />
            Active Options Positions ({activeOptionsTrades.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeOptionsTrades.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">
                No active options positions. Bot is scanning for opportunities...
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeOptionsTrades.map(trade => (
                <div
                  key={trade.id}
                  className="p-4 bg-gray-800/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-100 font-bold text-lg">{trade.symbol}</span>
                          <Badge className="bg-purple-500">{trade.strategy}</Badge>
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                            {trade.dte.toFixed(0)} DTE
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">{trade.legs.length} leg(s)</p>
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
                        <p className="text-gray-400 text-sm">Max Profit</p>
                        <p className="text-green-400 font-semibold">
                          {typeof trade.maxProfit === 'string'
                            ? trade.maxProfit
                            : `$${trade.maxProfit.toFixed(0)}`}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Max Loss</p>
                        <p className="text-red-400 font-semibold">${trade.maxLoss.toFixed(0)}</p>
                      </div>

                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Breakeven</p>
                        <p className="text-gray-100 font-semibold">${trade.breakeven.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        {trade.timestamp.toLocaleTimeString()}
                      </p>
                      <Badge className="bg-cyan-500 mt-1">
                        {trade.confidence.toFixed(0)}% Confidence
                      </Badge>
                    </div>
                  </div>

                  {/* Legs Details */}
                  <div className="mt-3 pt-3 border-t border-gray-700/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                      {trade.legs.map((leg, index) => (
                        <div key={index} className="text-xs bg-gray-700/30 p-2 rounded">
                          <span
                            className={leg.action === 'BUY' ? 'text-green-400' : 'text-red-400'}
                          >
                            {leg.action}
                          </span>{' '}
                          <span className="text-gray-300">
                            {leg.quantity} {leg.type} ${leg.strike}
                          </span>
                          <br />
                          <span className="text-gray-400">@ ${leg.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
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
