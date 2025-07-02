'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Bot,
  Play,
  Pause,
  Square,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Shield,
  Zap,
  Target,
  AlertTriangle,
  BarChart3,
  Brain,
} from 'lucide-react';
import TradingStrategies from './TradingStrategies';
import TradeHistory from './TradeHistory';
import RiskControls from './RiskControls';
import PerformanceMetrics from './PerformanceMetrics';

export default function AutoTradeBot() {
  const [botStatus, setBotStatus] = useState('stopped'); // stopped, running, paused
  const [activeStrategies, setActiveStrategies] = useState([]);
  const [botStats, setBotStats] = useState({
    totalTrades: 0,
    winRate: 0,
    totalPnL: 0,
    dailyPnL: 0,
    sharpeRatio: 0,
    maxDrawdown: 0,
    activeTrades: 0,
    accountBalance: 100000,
  });
  const [recentTrades, setRecentTrades] = useState([]);
  const [botSettings, setBotSettings] = useState({
    maxPositionSize: 10000,
    maxDailyLoss: 2000,
    maxConcurrentTrades: 5,
    emergencyStop: true,
    riskPerTrade: 2,
  });

  // Simulate real-time bot activity
  useEffect(() => {
    if (botStatus === 'running') {
      const interval = setInterval(() => {
        // Simulate trading activity
        const shouldTrade = Math.random() > 0.95; // 5% chance per interval

        if (shouldTrade && botStats.activeTrades < botSettings.maxConcurrentTrades) {
          const newTrade = {
            id: Date.now(),
            symbol: ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA'][Math.floor(Math.random() * 5)],
            side: Math.random() > 0.5 ? 'BUY' : 'SELL',
            quantity: Math.floor(Math.random() * 100) + 10,
            price: 100 + Math.random() * 500,
            strategy:
              activeStrategies[Math.floor(Math.random() * activeStrategies.length)]?.name ||
              'AI Momentum',
            timestamp: new Date(),
            status: 'executed',
            pnl: (Math.random() - 0.4) * 1000, // Slight positive bias
          };

          setRecentTrades(prev => [newTrade, ...prev.slice(0, 19)]);

          setBotStats(prev => ({
            ...prev,
            totalTrades: prev.totalTrades + 1,
            activeTrades: prev.activeTrades + (Math.random() > 0.7 ? 1 : -1),
            totalPnL: prev.totalPnL + newTrade.pnl,
            dailyPnL: prev.dailyPnL + newTrade.pnl,
            winRate: Math.random() * 30 + 60, // 60-90% win rate
            accountBalance: prev.accountBalance + newTrade.pnl,
          }));
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [botStatus, activeStrategies, botStats.activeTrades, botSettings.maxConcurrentTrades]);

  const startBot = () => {
    setBotStatus('running');
    // Initialize with some strategies
    setActiveStrategies([
      { id: 1, name: 'AI Momentum', status: 'active', allocation: 30 },
      { id: 2, name: 'Mean Reversion', status: 'active', allocation: 25 },
      { id: 3, name: 'Breakout Scanner', status: 'active', allocation: 20 },
    ]);
  };

  const pauseBot = () => {
    setBotStatus('paused');
  };

  const stopBot = () => {
    setBotStatus('stopped');
    setActiveStrategies([]);
  };

  const emergencyStop = () => {
    setBotStatus('stopped');
    setActiveStrategies([]);
    // In real implementation, this would close all positions
    setBotStats(prev => ({ ...prev, activeTrades: 0 }));
  };

  return (
    <div className="space-y-6">
      {/* Bot Control Panel */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Bot className="h-6 w-6 mr-2 text-purple-400" />
              AutoTrade Bot Control Center
              <Badge
                className={`ml-3 ${
                  botStatus === 'running'
                    ? 'bg-green-500'
                    : botStatus === 'paused'
                      ? 'bg-yellow-500'
                      : 'bg-gray-500'
                }`}
              >
                {botStatus.toUpperCase()}
              </Badge>
            </CardTitle>

            <div className="flex items-center space-x-2">
              {botStatus === 'stopped' && (
                <Button onClick={startBot} className="bg-green-500 hover:bg-green-600">
                  <Play className="h-4 w-4 mr-2" />
                  Start Bot
                </Button>
              )}

              {botStatus === 'running' && (
                <>
                  <Button onClick={pauseBot} className="bg-yellow-500 hover:bg-yellow-600">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                  <Button onClick={stopBot} variant="outline" className="border-gray-500">
                    <Square className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                </>
              )}

              {botStatus === 'paused' && (
                <>
                  <Button
                    onClick={() => setBotStatus('running')}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </Button>
                  <Button onClick={stopBot} variant="outline" className="border-gray-500">
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
                Emergency Stop
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Real-time Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Account Balance</p>
              <p className="text-lg font-bold text-white">
                ${botStats.accountBalance.toLocaleString()}
              </p>
            </div>

            <div className="text-center p-3 bg-white/5 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Daily P&L</p>
              <p
                className={`text-lg font-bold ${botStats.dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}
              >
                ${botStats.dailyPnL.toFixed(2)}
              </p>
            </div>

            <div className="text-center p-3 bg-white/5 rounded-lg">
              <Target className="h-6 w-6 text-purple-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Win Rate</p>
              <p className="text-lg font-bold text-white">{botStats.winRate.toFixed(1)}%</p>
            </div>

            <div className="text-center p-3 bg-white/5 rounded-lg">
              <BarChart3 className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Total Trades</p>
              <p className="text-lg font-bold text-white">{botStats.totalTrades}</p>
            </div>

            <div className="text-center p-3 bg-white/5 rounded-lg">
              <Activity className="h-6 w-6 text-orange-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Active Trades</p>
              <p className="text-lg font-bold text-white">{botStats.activeTrades}</p>
            </div>

            <div className="text-center p-3 bg-white/5 rounded-lg">
              <Shield className="h-6 w-6 text-cyan-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Sharpe Ratio</p>
              <p className="text-lg font-bold text-white">{botStats.sharpeRatio.toFixed(2)}</p>
            </div>

            <div className="text-center p-3 bg-white/5 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Max Drawdown</p>
              <p className="text-lg font-bold text-red-400">{botStats.maxDrawdown.toFixed(1)}%</p>
            </div>

            <div className="text-center p-3 bg-white/5 rounded-lg">
              <Zap className="h-6 w-6 text-pink-400 mx-auto mb-1" />
              <p className="text-sm text-gray-400">Strategies</p>
              <p className="text-lg font-bold text-white">{activeStrategies.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Bot Interface */}
      <Tabs defaultValue="strategies" className="space-y-6">
        <TabsList className="bg-black/20 border-purple-500/30">
          <TabsTrigger value="strategies" className="data-[state=active]:bg-purple-500/20">
            <Brain className="h-4 w-4 mr-2" />
            Strategies
          </TabsTrigger>
          <TabsTrigger value="trades" className="data-[state=active]:bg-purple-500/20">
            <BarChart3 className="h-4 w-4 mr-2" />
            Trade History
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-purple-500/20">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="risk" className="data-[state=active]:bg-purple-500/20">
            <Shield className="h-4 w-4 mr-2" />
            Risk Controls
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-purple-500/20">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strategies">
          <TradingStrategies
            activeStrategies={activeStrategies}
            setActiveStrategies={setActiveStrategies}
            botStatus={botStatus}
          />
        </TabsContent>

        <TabsContent value="trades">
          <TradeHistory recentTrades={recentTrades} botStats={botStats} />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceMetrics botStats={botStats} recentTrades={recentTrades} />
        </TabsContent>

        <TabsContent value="risk">
          <RiskControls
            botSettings={botSettings}
            setBotSettings={setBotSettings}
            botStats={botStats}
          />
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Bot Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-medium">Max Position Size ($)</label>
                    <Input
                      type="number"
                      value={botSettings.maxPositionSize}
                      onChange={e =>
                        setBotSettings(prev => ({
                          ...prev,
                          maxPositionSize: Number(e.target.value),
                        }))
                      }
                      className="bg-black/20 border-purple-500/30 text-white mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium">Max Daily Loss ($)</label>
                    <Input
                      type="number"
                      value={botSettings.maxDailyLoss}
                      onChange={e =>
                        setBotSettings(prev => ({
                          ...prev,
                          maxDailyLoss: Number(e.target.value),
                        }))
                      }
                      className="bg-black/20 border-purple-500/30 text-white mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium">Max Concurrent Trades</label>
                    <Input
                      type="number"
                      value={botSettings.maxConcurrentTrades}
                      onChange={e =>
                        setBotSettings(prev => ({
                          ...prev,
                          maxConcurrentTrades: Number(e.target.value),
                        }))
                      }
                      className="bg-black/20 border-purple-500/30 text-white mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-medium">Risk Per Trade (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      value={botSettings.riskPerTrade}
                      onChange={e =>
                        setBotSettings(prev => ({
                          ...prev,
                          riskPerTrade: Number(e.target.value),
                        }))
                      }
                      className="bg-black/20 border-purple-500/30 text-white mt-1"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Emergency Stop Enabled</p>
                      <p className="text-sm text-gray-400">
                        Automatically stop bot on major losses
                      </p>
                    </div>
                    <Switch
                      checked={botSettings.emergencyStop}
                      onCheckedChange={checked =>
                        setBotSettings(prev => ({
                          ...prev,
                          emergencyStop: checked,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
