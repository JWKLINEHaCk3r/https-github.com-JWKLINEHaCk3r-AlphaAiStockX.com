'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Zap,
  Activity,
  Target,
  AlertTriangle,
  BarChart3,
  Eye,
  Flame,
  Crown,
  Sword,
  Timer,
  Repeat,
  DollarSign,
  Shield,
  Layers,
  ChevronDown,
  Maximize2,
  Minimize2,
  Brain,
} from 'lucide-react';

export default function SportsAlphaTrader() {
  const [activeEvents, setActiveEvents] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [activeTrades, setActiveTrades] = useState([]);
  const [profitStats, setProfitStats] = useState({
    totalProfit: 0,
    dailyProfit: 0,
    winRate: 0,
    avgSpread: 0,
    maxProfit: 0,
    riskRatio: 0,
  });
  const [isHunting, setIsHunting] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    realTime: false,
    adaptive: false,
    profit: false,
    risk: false,
    interface: false,
  });

  // Simulate sports events
  useEffect(() => {
    const sportsEvents = [
      {
        id: 1,
        type: 'NFL',
        teams: 'Chiefs vs. Ravens',
        time: 'Live - Q3',
        markets: ['Spread', 'Moneyline', 'Total Points'],
        volatility: 'High',
        opportunities: 3,
      },
      {
        id: 2,
        type: 'NBA',
        teams: 'Lakers vs. Celtics',
        time: 'Starting in 15m',
        markets: ['Spread', 'Player Props', 'Quarter Lines'],
        volatility: 'Medium',
        opportunities: 2,
      },
      {
        id: 3,
        type: 'MLB',
        teams: 'Yankees vs. Dodgers',
        time: 'Live - 6th Inning',
        markets: ['Run Line', 'Moneyline', 'Inning Props'],
        volatility: 'Medium',
        opportunities: 1,
      },
      {
        id: 4,
        type: 'UFC',
        teams: 'McGregor vs. Poirier',
        time: 'Starting in 2h',
        markets: ['Moneyline', 'Round Props', 'Method of Victory'],
        volatility: 'High',
        opportunities: 4,
      },
      {
        id: 5,
        type: 'Soccer',
        teams: 'Man City vs. Liverpool',
        time: "Live - 65'",
        markets: ['Asian Handicap', 'Goal Line', 'Corners'],
        volatility: 'Low',
        opportunities: 2,
      },
    ];

    setActiveEvents(sportsEvents);
    generateOpportunities(sportsEvents);

    const interval = setInterval(() => {
      if (isHunting) {
        generateOpportunities(sportsEvents);
        updateActiveTrades();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHunting]);

  const generateOpportunities = events => {
    const newOpportunities = [];

    events.forEach(event => {
      const marketTypes = ['Spread', 'Moneyline', 'Total', 'Prop', 'Futures', 'Live'];
      const numOpps = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < numOpps; i++) {
        const marketType = marketTypes[Math.floor(Math.random() * marketTypes.length)];
        const bookA = ['DraftKings', 'FanDuel', 'BetMGM', 'Caesars', 'PointsBet'][
          Math.floor(Math.random() * 5)
        ];
        const bookB = ['Pinnacle', 'Bet365', 'Bovada', 'Unibet', 'WynnBet'][
          Math.floor(Math.random() * 5)
        ];
        const oddsA = Math.floor(Math.random() * 40) + 100;
        const oddsB = oddsA + (Math.floor(Math.random() * 20) + 5);
        const spreadValue = (Math.random() * 10 - 5).toFixed(1);
        const confidence = Math.floor(Math.random() * 30) + 70;
        const expectedValue = (Math.random() * 8 + 2).toFixed(1);
        const timeWindow = ['Immediate', '5 minutes', '15 minutes', '30 minutes'][
          Math.floor(Math.random() * 4)
        ];

        newOpportunities.push({
          id: Date.now() + Math.random(),
          eventId: event.id,
          eventName: event.teams,
          sportType: event.type,
          marketType,
          bookA,
          bookB,
          oddsA: oddsA > 0 ? `+${oddsA}` : oddsA,
          oddsB: oddsB > 0 ? `+${oddsB}` : oddsB,
          spreadValue,
          confidence,
          expectedValue,
          timeWindow,
          timestamp: new Date(),
        });
      }
    });

    // Sort by confidence and expected value
    newOpportunities.sort((a, b) => {
      if (b.confidence === a.confidence) {
        return Number.parseFloat(b.expectedValue) - Number.parseFloat(a.expectedValue);
      }
      return b.confidence - a.confidence;
    });

    setOpportunities(newOpportunities.slice(0, 8));
  };

  const executeTrade = opportunity => {
    const newTrade = {
      id: Date.now(),
      eventName: opportunity.eventName,
      sportType: opportunity.sportType,
      marketType: opportunity.marketType,
      bookA: opportunity.bookA,
      bookB: opportunity.bookB,
      oddsA: opportunity.oddsA,
      oddsB: opportunity.oddsB,
      spreadValue: opportunity.spreadValue,
      entryTime: new Date(),
      status: 'active',
      stake: Math.floor(Math.random() * 500) + 100,
      currentPnL: 0,
      expectedPnL: Number.parseFloat(opportunity.expectedValue) * 10,
      confidence: opportunity.confidence,
    };

    setActiveTrades(prev => [...prev, newTrade]);
    setOpportunities(prev => prev.filter(op => op.id !== opportunity.id));
  };

  const updateActiveTrades = () => {
    setActiveTrades(prev =>
      prev.map(trade => {
        // Randomly update PnL
        const pnlChange = Math.random() * 20 - 5;
        const newPnL = trade.currentPnL + pnlChange;

        // Randomly close some trades
        const shouldClose = Math.random() > 0.95;

        if (shouldClose) {
          // Update profit stats
          setProfitStats(prev => ({
            ...prev,
            totalProfit: prev.totalProfit + newPnL,
            dailyProfit: prev.dailyProfit + newPnL,
            winRate: newPnL > 0 ? prev.winRate * 0.9 + 10 : prev.winRate * 0.9,
            avgSpread: (prev.avgSpread + Number.parseFloat(trade.spreadValue)) / 2,
            maxProfit: newPnL > prev.maxProfit ? newPnL : prev.maxProfit,
          }));

          return { ...trade, status: 'closed', currentPnL: newPnL };
        }

        return { ...trade, currentPnL: newPnL };
      })
    );

    // Remove closed trades after a delay
    setTimeout(() => {
      setActiveTrades(prev => prev.filter(trade => trade.status !== 'closed'));
    }, 5000);
  };

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Sports Alpha Trader Header */}
      <Card className="bg-gradient-to-r from-red-900/90 to-black/90 border-red-500/50 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/5"></div>
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-100 flex items-center">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Flame size={32} className="text-red-400 animate-pulse" />
                  <Zap
                    size={16}
                    className="text-yellow-400 absolute -top-1 -right-1 animate-bounce"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    SMART SP Alpha Sports Predator
                  </h2>
                  <p className="text-sm text-gray-400">
                    Hunt • Strike • Profit • Across All Sports Markets
                  </p>
                </div>
              </div>
              <Badge className={`ml-3 ${isHunting ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}>
                {isHunting ? '🎯 HUNTING SPREADS' : 'IDLE'}
              </Badge>
            </CardTitle>

            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setIsHunting(!isHunting)}
                className={
                  isHunting
                    ? 'border-red-500 text-red-300 hover:bg-red-500/20'
                    : 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700'
                }
                variant={isHunting ? 'outline' : 'default'}
              >
                {isHunting ? (
                  <>
                    <AlertTriangle size={16} className="mr-2" />
                    Stop Hunting
                  </>
                ) : (
                  <>
                    <Sword size={16} className="mr-2" />
                    Start Hunting
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative">
          {/* Sports Alpha Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-gradient-to-b from-red-800/30 to-black/30 rounded-lg border border-red-500/30">
              <DollarSign size={24} className="text-green-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Total Profit</p>
              <p className="text-lg font-bold text-green-400">
                ${profitStats.totalProfit.toFixed(2)}
              </p>
            </div>

            <div className="text-center p-3 bg-gradient-to-b from-orange-800/30 to-black/30 rounded-lg border border-orange-500/30">
              <Activity size={24} className="text-orange-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Daily Profit</p>
              <p className="text-lg font-bold text-orange-400">
                ${profitStats.dailyProfit.toFixed(2)}
              </p>
            </div>

            <div className="text-center p-3 bg-gradient-to-b from-yellow-800/30 to-black/30 rounded-lg border border-yellow-500/30">
              <Target size={24} className="text-yellow-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Win Rate</p>
              <p className="text-lg font-bold text-yellow-400">{profitStats.winRate.toFixed(1)}%</p>
            </div>

            <div className="text-center p-3 bg-gradient-to-b from-green-800/30 to-black/30 rounded-lg border border-green-500/30">
              <BarChart3 size={24} className="text-green-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Avg Spread</p>
              <p className="text-lg font-bold text-green-400">{profitStats.avgSpread.toFixed(1)}</p>
            </div>

            <div className="text-center p-3 bg-gradient-to-b from-blue-800/30 to-black/30 rounded-lg border border-blue-500/30">
              <Crown size={24} className="text-blue-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Max Profit</p>
              <p className="text-lg font-bold text-blue-400">${profitStats.maxProfit.toFixed(2)}</p>
            </div>

            <div className="text-center p-3 bg-gradient-to-b from-purple-800/30 to-black/30 rounded-lg border border-purple-500/30">
              <Shield size={24} className="text-purple-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Risk Ratio</p>
              <p className="text-lg font-bold text-purple-400">
                1:{(Math.random() * 2 + 1.5).toFixed(1)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMART SP Features */}
      <div className="grid grid-cols-1 gap-4">
        {/* Real-Time Analysis */}
        <Card className="bg-gradient-to-r from-red-900/90 to-black/90 border-red-500/50 backdrop-blur-xl">
          <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection('realTime')}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-100 flex items-center">
                <Timer size={20} className="mr-2 text-red-400" />
                Real-Time Analysis
                <Badge className="ml-2 bg-red-500/20 text-red-300 border border-red-500/30">
                  <Zap size={12} className="mr-1" />
                  Lightning-Fast
                </Badge>
              </CardTitle>
              {expandedSections.realTime ? (
                <Minimize2 size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </div>
          </CardHeader>
          {expandedSections.realTime && (
            <CardContent>
              <p className="text-gray-300 mb-4">
                SMART SP's lightning-fast algorithms enable instant analysis of sports event data,
                ensuring you never miss a time-sensitive market-spread opportunity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-black/30 rounded-lg border border-red-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap size={16} className="text-yellow-400" />
                    <p className="font-medium text-gray-100">Sub-Second Analysis</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Process millions of data points across multiple sportsbooks in milliseconds
                  </p>
                </div>
                <div className="p-3 bg-black/30 rounded-lg border border-red-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity size={16} className="text-green-400" />
                    <p className="font-medium text-gray-100">Live Event Tracking</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Continuously monitor in-game events and their impact on market spreads
                  </p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Adaptive Strategies */}
        <Card className="bg-gradient-to-r from-red-900/90 to-black/90 border-red-500/50 backdrop-blur-xl">
          <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection('adaptive')}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-100 flex items-center">
                <Repeat size={20} className="mr-2 text-orange-400" />
                Adaptive Strategies
                <Badge className="ml-2 bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  <Flame size={12} className="mr-1" />
                  Dynamic
                </Badge>
              </CardTitle>
              {expandedSections.adaptive ? (
                <Minimize2 size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </div>
          </CardHeader>
          {expandedSections.adaptive && (
            <CardContent>
              <p className="text-gray-300 mb-4">
                Stay ahead of market shifts with SMART SP's dynamic strategies that adjust to
                changing conditions, maximizing your trading outcomes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-black/30 rounded-lg border border-orange-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain size={16} className="text-purple-400" />
                    <p className="font-medium text-gray-100">Self-Learning Models</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    AI models that continuously improve based on market performance
                  </p>
                </div>
                <div className="p-3 bg-black/30 rounded-lg border border-orange-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Layers size={16} className="text-blue-400" />
                    <p className="font-medium text-gray-100">Multi-Factor Analysis</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Combines technical, statistical, and sentiment factors for optimal decisions
                  </p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Profit Maximization */}
        <Card className="bg-gradient-to-r from-red-900/90 to-black/90 border-red-500/50 backdrop-blur-xl">
          <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection('profit')}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-100 flex items-center">
                <Maximize2 size={20} className="mr-2 text-green-400" />
                Profit Maximization
                <Badge className="ml-2 bg-green-500/20 text-green-300 border border-green-500/30">
                  <DollarSign size={12} className="mr-1" />
                  Optimal
                </Badge>
              </CardTitle>
              {expandedSections.profit ? (
                <Minimize2 size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </div>
          </CardHeader>
          {expandedSections.profit && (
            <CardContent>
              <p className="text-gray-300 mb-4">
                SMART SP enables you to exploit price discrepancies and secure higher spreads by
                executing trades at precisely the right moment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-black/30 rounded-lg border border-green-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target size={16} className="text-red-400" />
                    <p className="font-medium text-gray-100">Optimal Entry/Exit</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Precision timing algorithms for maximum spread capture
                  </p>
                </div>
                <div className="p-3 bg-black/30 rounded-lg border border-green-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 size={16} className="text-yellow-400" />
                    <p className="font-medium text-gray-100">Spread Comparison</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Instantly compare odds across 20+ sportsbooks to find the best value
                  </p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Risk Mitigation */}
        <Card className="bg-gradient-to-r from-red-900/90 to-black/90 border-red-500/50 backdrop-blur-xl">
          <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection('risk')}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-100 flex items-center">
                <Shield size={20} className="mr-2 text-blue-400" />
                Risk Mitigation
                <Badge className="ml-2 bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <AlertTriangle size={12} className="mr-1" />
                  Protected
                </Badge>
              </CardTitle>
              {expandedSections.risk ? (
                <Minimize2 size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </div>
          </CardHeader>
          {expandedSections.risk && (
            <CardContent>
              <p className="text-gray-300 mb-4">
                Prioritize risk assessment with SMART SP's robust risk management protocols,
                safeguarding your trades against potential losses for enhanced stability.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-black/30 rounded-lg border border-blue-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield size={16} className="text-blue-400" />
                    <p className="font-medium text-gray-100">Automated Hedging</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Dynamic hedging strategies to protect positions during volatile events
                  </p>
                </div>
                <div className="p-3 bg-black/30 rounded-lg border border-blue-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity size={16} className="text-purple-400" />
                    <p className="font-medium text-gray-100">Volatility Controls</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Adaptive position sizing based on event volatility and market conditions
                  </p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* User-Friendly Interface */}
        <Card className="bg-gradient-to-r from-red-900/90 to-black/90 border-red-500/50 backdrop-blur-xl">
          <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection('interface')}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-100 flex items-center">
                <Layers size={20} className="mr-2 text-purple-400" />
                User-Friendly Interface
                <Badge className="ml-2 bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <Eye size={12} className="mr-1" />
                  Intuitive
                </Badge>
              </CardTitle>
              {expandedSections.interface ? (
                <Minimize2 size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </div>
          </CardHeader>
          {expandedSections.interface && (
            <CardContent>
              <p className="text-gray-300 mb-4">
                Seamlessly integrated into an intuitive platform, SMART SP is designed for traders
                of all levels, simplifying your sports market-spread trading journey.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-black/30 rounded-lg border border-purple-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap size={16} className="text-yellow-400" />
                    <p className="font-medium text-gray-100">One-Click Execution</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Execute complex arbitrage trades across multiple books with a single click
                  </p>
                </div>
                <div className="p-3 bg-black/30 rounded-lg border border-purple-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Crown size={16} className="text-orange-400" />
                    <p className="font-medium text-gray-100">Customizable Dashboard</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    Personalize your trading view with the metrics and sports that matter most
                  </p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Sports Events and Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Sports Events */}
        <Card className="bg-gradient-to-r from-red-900/90 to-black/90 border-red-500/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center">
              <Activity size={20} className="mr-2 text-orange-400" />
              Active Sports Events
              <Badge className="ml-2 bg-orange-500/20 text-orange-300 border border-orange-500/30">
                {activeEvents.length} Events
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeEvents.map(event => (
                <div
                  key={event.id}
                  className="p-3 bg-gradient-to-r from-red-800/20 to-orange-800/20 rounded-lg border border-red-500/30 hover:border-red-400/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={`${
                            event.type === 'NFL' || event.type === 'NBA'
                              ? 'bg-blue-500'
                              : event.type === 'MLB'
                                ? 'bg-red-500'
                                : event.type === 'UFC'
                                  ? 'bg-purple-500'
                                  : 'bg-green-500'
                          }`}
                        >
                          {event.type}
                        </Badge>
                        <span className="text-gray-100 font-bold">{event.teams}</span>
                        <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                          {event.time}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {event.markets.map((market, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-xs border-gray-500/30 text-gray-400"
                          >
                            {market}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${
                          event.volatility === 'High'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : event.volatility === 'Medium'
                              ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                              : 'bg-green-500/20 text-green-300 border border-green-500/30'
                        }`}
                      >
                        {event.volatility} Volatility
                      </Badge>
                      <p className="text-sm text-gray-400 mt-1">
                        {event.opportunities} opportunities
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spread Opportunities */}
        <Card className="bg-gradient-to-r from-red-900/90 to-black/90 border-red-500/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-gray-100 flex items-center">
              <Target size={20} className="mr-2 text-red-400 animate-pulse" />
              Spread Opportunities
              <Badge className="ml-2 bg-red-500 animate-pulse">
                <Zap size={12} className="mr-1" />
                Live Hunting
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {opportunities.length === 0 ? (
                <div className="text-center py-8">
                  <Target size={48} className="text-gray-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-400">Hunting for spread opportunities...</p>
                </div>
              ) : (
                opportunities.map(opportunity => (
                  <div
                    key={opportunity.id}
                    className="p-3 bg-gradient-to-r from-red-800/20 to-orange-800/20 rounded-lg border border-red-500/30 hover:border-red-400/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={`${
                              opportunity.sportType === 'NFL' || opportunity.sportType === 'NBA'
                                ? 'bg-blue-500'
                                : opportunity.sportType === 'MLB'
                                  ? 'bg-red-500'
                                  : opportunity.sportType === 'UFC'
                                    ? 'bg-purple-500'
                                    : 'bg-green-500'
                            }`}
                          >
                            {opportunity.sportType}
                          </Badge>
                          <span className="text-gray-100 font-bold">{opportunity.eventName}</span>
                        </div>
                        <div className="mt-1 grid grid-cols-2 gap-2">
                          <div className="text-sm">
                            <span className="text-gray-400">{opportunity.bookA}:</span>{' '}
                            <span className="text-gray-100">{opportunity.oddsA}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-400">{opportunity.bookB}:</span>{' '}
                            <span className="text-gray-100">{opportunity.oddsB}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex flex-col items-end">
                          <Badge className="bg-gradient-to-r from-red-500 to-orange-600 mb-1">
                            {opportunity.marketType}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <div className="text-center">
                              <p className="text-xs text-gray-400">Confidence</p>
                              <p className="text-sm font-bold text-red-400">
                                {opportunity.confidence}%
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-400">EV</p>
                              <p className="text-sm font-bold text-green-400">
                                +{opportunity.expectedValue}%
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="mt-1 border-yellow-500/30 text-yellow-400 text-xs"
                          >
                            <Timer size={12} className="mr-1" />
                            {opportunity.timeWindow}
                          </Badge>
                        </div>
                        <Button
                          onClick={() => executeTrade(opportunity)}
                          size="sm"
                          className="mt-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-xs"
                        >
                          <Sword size={12} className="mr-1" />
                          Execute Trade
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Trades */}
      <Card className="bg-gradient-to-r from-red-900/90 to-black/90 border-red-500/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center">
            <Sword size={20} className="mr-2 text-orange-400" />
            Active Spread Trades ({activeTrades.filter(t => t.status === 'active').length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTrades.filter(t => t.status === 'active').length === 0 ? (
            <div className="text-center py-8">
              <Sword size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">
                No active trades. The Alpha Wolf is stalking new opportunities...
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeTrades
                .filter(t => t.status === 'active')
                .map(trade => (
                  <div
                    key={trade.id}
                    className="p-3 bg-gradient-to-r from-red-800/30 to-orange-800/30 rounded-lg border border-red-500/30 hover:border-red-400/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={`${
                              trade.sportType === 'NFL' || trade.sportType === 'NBA'
                                ? 'bg-blue-500'
                                : trade.sportType === 'MLB'
                                  ? 'bg-red-500'
                                  : trade.sportType === 'UFC'
                                    ? 'bg-purple-500'
                                    : 'bg-green-500'
                            }`}
                          >
                            {trade.sportType}
                          </Badge>
                          <span className="text-gray-100 font-bold">{trade.eventName}</span>
                          <Badge className="bg-gradient-to-r from-red-500 to-orange-600">
                            {trade.marketType}
                          </Badge>
                        </div>
                        <div className="mt-1 grid grid-cols-2 gap-2">
                          <div className="text-sm">
                            <span className="text-gray-400">{trade.bookA}:</span>{' '}
                            <span className="text-gray-100">{trade.oddsA}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-400">{trade.bookB}:</span>{' '}
                            <span className="text-gray-100">{trade.oddsB}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-xs text-gray-400">Stake</p>
                            <p className="text-sm font-bold text-gray-100">${trade.stake}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400">Current P&L</p>
                            <p
                              className={`text-sm font-bold ${trade.currentPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}
                            >
                              {trade.currentPnL >= 0 ? '+' : ''}${trade.currentPnL.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400">Expected</p>
                            <p className="text-sm font-bold text-green-400">
                              +${trade.expectedPnL.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <Progress
                          value={(trade.currentPnL / trade.expectedPnL) * 100}
                          className="h-1 mt-2"
                        />
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
