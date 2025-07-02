'use client';

import { useState } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Brain, Activity, Plus, Settings, Play } from 'lucide-react';

export default function TradingStrategies({ activeStrategies, setActiveStrategies, botStatus }) {
  const [availableStrategies] = useState([
    {
      id: 1,
      name: 'AI Momentum',
      description: 'Uses machine learning to identify momentum patterns',
      winRate: 72.5,
      avgReturn: 2.3,
      maxDrawdown: 8.5,
      riskLevel: 'Medium',
      timeframe: '1-4 hours',
      allocation: 30,
      status: 'active',
    },
    {
      id: 2,
      name: 'Mean Reversion',
      description: 'Identifies oversold/overbought conditions for reversal trades',
      winRate: 68.2,
      avgReturn: 1.8,
      maxDrawdown: 5.2,
      riskLevel: 'Low',
      timeframe: '30min-2h',
      allocation: 25,
      status: 'active',
    },
    {
      id: 3,
      name: 'Breakout Scanner',
      description: 'Detects price breakouts from key support/resistance levels',
      winRate: 65.8,
      avgReturn: 3.1,
      maxDrawdown: 12.3,
      riskLevel: 'High',
      timeframe: '15min-1h',
      allocation: 20,
      status: 'active',
    },
    {
      id: 4,
      name: 'News Sentiment',
      description: 'Trades based on AI analysis of market news and sentiment',
      winRate: 58.9,
      avgReturn: 2.7,
      maxDrawdown: 15.8,
      riskLevel: 'High',
      timeframe: 'Immediate',
      allocation: 0,
      status: 'inactive',
    },
    {
      id: 5,
      name: 'Pairs Trading',
      description: 'Statistical arbitrage between correlated assets',
      winRate: 75.3,
      avgReturn: 1.2,
      maxDrawdown: 3.8,
      riskLevel: 'Low',
      timeframe: '1-8 hours',
      allocation: 0,
      status: 'inactive',
    },
    {
      id: 6,
      name: 'Options Flow',
      description: 'Follows unusual options activity for directional trades',
      winRate: 62.1,
      avgReturn: 4.2,
      maxDrawdown: 18.7,
      riskLevel: 'Very High',
      timeframe: 'Minutes-Hours',
      allocation: 0,
      status: 'inactive',
    },
  ]);

  const toggleStrategy = strategyId => {
    setActiveStrategies(prev => {
      const existing = prev.find(s => s.id === strategyId);
      if (existing) {
        return prev.filter(s => s.id !== strategyId);
      } else {
        const strategy = availableStrategies.find(s => s.id === strategyId);
        return [...prev, { ...strategy, status: 'active' }];
      }
    });
  };

  const updateAllocation = (strategyId, allocation) => {
    setActiveStrategies(prev => prev.map(s => (s.id === strategyId ? { ...s, allocation } : s)));
  };

  const getRiskColor = risk => {
    switch (risk) {
      case 'Low':
        return 'text-green-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'High':
        return 'text-orange-400';
      case 'Very High':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getRiskBadge = risk => {
    switch (risk) {
      case 'Low':
        return 'default';
      case 'Medium':
        return 'secondary';
      case 'High':
        return 'destructive';
      case 'Very High':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Strategies Overview */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-5 w-5 mr-2 text-green-400" />
            Active Strategies ({activeStrategies.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeStrategies.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">
                No active strategies. Select strategies below to start trading.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeStrategies.map(strategy => (
                <div
                  key={strategy.id}
                  className="p-4 bg-white/5 rounded-lg border border-green-500/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-white font-semibold">{strategy.name}</h3>
                      <Badge variant="default" className="bg-green-500">
                        <Play className="h-3 w-3 mr-1" />
                        Running
                      </Badge>
                      <Badge variant={getRiskBadge(strategy.riskLevel)}>
                        {strategy.riskLevel} Risk
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{strategy.allocation}%</p>
                      <p className="text-xs text-gray-400">Allocation</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-green-400 font-bold">{strategy.winRate}%</p>
                      <p className="text-xs text-gray-400">Win Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-blue-400 font-bold">{strategy.avgReturn}%</p>
                      <p className="text-xs text-gray-400">Avg Return</p>
                    </div>
                    <div className="text-center">
                      <p className="text-red-400 font-bold">{strategy.maxDrawdown}%</p>
                      <p className="text-xs text-gray-400">Max DD</p>
                    </div>
                    <div className="text-center">
                      <p className="text-purple-400 font-bold">{strategy.timeframe}</p>
                      <p className="text-xs text-gray-400">Timeframe</p>
                    </div>
                  </div>

                  <Progress value={strategy.allocation} className="h-2 mb-2" />
                  <p className="text-sm text-gray-300">{strategy.description}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Strategies */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-400" />
            Available Trading Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {availableStrategies.map(strategy => {
              const isActive = activeStrategies.some(s => s.id === strategy.id);

              return (
                <div
                  key={strategy.id}
                  className={`p-4 rounded-lg border transition-all ${
                    isActive
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-white font-semibold">{strategy.name}</h3>
                      <Badge variant={getRiskBadge(strategy.riskLevel)} className="text-xs">
                        {strategy.riskLevel}
                      </Badge>
                    </div>
                    <Switch
                      checked={isActive}
                      onCheckedChange={() => toggleStrategy(strategy.id)}
                      disabled={botStatus === 'running'}
                    />
                  </div>

                  <p className="text-sm text-gray-300 mb-3">{strategy.description}</p>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center p-2 bg-white/5 rounded">
                      <p className="text-green-400 font-bold text-sm">{strategy.winRate}%</p>
                      <p className="text-xs text-gray-400">Win Rate</p>
                    </div>
                    <div className="text-center p-2 bg-white/5 rounded">
                      <p className="text-blue-400 font-bold text-sm">{strategy.avgReturn}%</p>
                      <p className="text-xs text-gray-400">Avg Return</p>
                    </div>
                    <div className="text-center p-2 bg-white/5 rounded">
                      <p className="text-red-400 font-bold text-sm">{strategy.maxDrawdown}%</p>
                      <p className="text-xs text-gray-400">Max DD</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Timeframe: {strategy.timeframe}</span>
                    {isActive && <span className="text-green-400">● Active</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Strategy Builder */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Plus className="h-5 w-5 mr-2 text-blue-400" />
            Custom Strategy Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">
              Build your own custom trading strategies with our AI-powered strategy builder.
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Plus className="h-4 w-4 mr-2" />
              Create Custom Strategy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
