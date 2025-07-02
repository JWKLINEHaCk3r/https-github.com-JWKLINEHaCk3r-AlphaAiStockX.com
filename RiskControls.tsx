'use client';

import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Shield, AlertTriangle, TrendingDown, Activity, Target } from 'lucide-react';

export default function RiskControls({ botSettings, setBotSettings, botStats }) {
  const riskMetrics = {
    currentDrawdown: (Math.abs(botStats.dailyPnL) / botStats.accountBalance) * 100,
    dailyLossUsed: Math.abs(Math.min(0, botStats.dailyPnL)),
    positionSizeUsed: botStats.activeTrades * 5000, // Assuming avg position size
    leverageRatio: 1.2,
    varDaily: 2.3,
    stressTestResults: [
      { scenario: 'Market Crash (-10%)', impact: -8500, probability: 5 },
      { scenario: 'Volatility Spike', impact: -3200, probability: 15 },
      { scenario: 'Sector Rotation', impact: -1800, probability: 25 },
    ],
  };

  const updateSetting = (key, value) => {
    setBotSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/20 border-red-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <TrendingDown className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-400">
              {riskMetrics.currentDrawdown.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-400">Current Drawdown</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-yellow-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-400">{riskMetrics.varDaily}%</p>
            <p className="text-sm text-gray-400">Daily VaR (95%)</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-blue-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-400">{riskMetrics.leverageRatio}x</p>
            <p className="text-sm text-gray-400">Leverage Ratio</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-green-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-400">
              {botSettings.emergencyStop ? 'ON' : 'OFF'}
            </p>
            <p className="text-sm text-gray-400">Emergency Stop</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Limits */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-400" />
              Risk Limits & Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Daily Loss Limit */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-white font-medium">Max Daily Loss</label>
                <Badge
                  variant={
                    riskMetrics.dailyLossUsed > botSettings.maxDailyLoss * 0.8
                      ? 'destructive'
                      : 'default'
                  }
                >
                  ${riskMetrics.dailyLossUsed.toFixed(0)} / ${botSettings.maxDailyLoss}
                </Badge>
              </div>
              <Input
                type="number"
                value={botSettings.maxDailyLoss}
                onChange={e => updateSetting('maxDailyLoss', Number(e.target.value))}
                className="bg-black/20 border-purple-500/30 text-white"
              />
              <Progress
                value={(riskMetrics.dailyLossUsed / botSettings.maxDailyLoss) * 100}
                className="h-2"
              />
            </div>

            {/* Position Size Limit */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-white font-medium">Max Position Size</label>
                <Badge
                  variant={
                    riskMetrics.positionSizeUsed > botSettings.maxPositionSize * 0.8
                      ? 'destructive'
                      : 'default'
                  }
                >
                  ${riskMetrics.positionSizeUsed.toLocaleString()} / $
                  {botSettings.maxPositionSize.toLocaleString()}
                </Badge>
              </div>
              <Input
                type="number"
                value={botSettings.maxPositionSize}
                onChange={e => updateSetting('maxPositionSize', Number(e.target.value))}
                className="bg-black/20 border-purple-500/30 text-white"
              />
              <Progress
                value={(riskMetrics.positionSizeUsed / botSettings.maxPositionSize) * 100}
                className="h-2"
              />
            </div>

            {/* Concurrent Trades */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-white font-medium">Max Concurrent Trades</label>
                <Badge
                  variant={
                    botStats.activeTrades > botSettings.maxConcurrentTrades * 0.8
                      ? 'destructive'
                      : 'default'
                  }
                >
                  {botStats.activeTrades} / {botSettings.maxConcurrentTrades}
                </Badge>
              </div>
              <Input
                type="number"
                value={botSettings.maxConcurrentTrades}
                onChange={e => updateSetting('maxConcurrentTrades', Number(e.target.value))}
                className="bg-black/20 border-purple-500/30 text-white"
              />
              <Progress
                value={(botStats.activeTrades / botSettings.maxConcurrentTrades) * 100}
                className="h-2"
              />
            </div>

            {/* Risk Per Trade */}
            <div className="space-y-3">
              <label className="text-white font-medium">Risk Per Trade (%)</label>
              <Input
                type="number"
                step="0.1"
                value={botSettings.riskPerTrade}
                onChange={e => updateSetting('riskPerTrade', Number(e.target.value))}
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>

            {/* Emergency Controls */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">Emergency Stop</p>
                  <p className="text-sm text-gray-400">Auto-stop on major losses</p>
                </div>
                <Switch
                  checked={botSettings.emergencyStop}
                  onCheckedChange={checked => updateSetting('emergencyStop', checked)}
                />
              </div>

              <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Force Close All Positions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stress Testing */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="h-5 w-5 mr-2 text-orange-400" />
              Stress Test Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskMetrics.stressTestResults.map((test, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{test.scenario}</span>
                  <Badge variant="outline" className="text-xs">
                    {test.probability}% chance
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-400 font-bold">${test.impact.toLocaleString()}</span>
                  <Progress value={(Math.abs(test.impact) / 10000) * 100} className="w-24 h-2" />
                </div>
              </div>
            ))}

            {/* Risk Monitoring */}
            <div className="mt-6 space-y-3">
              <h4 className="text-white font-semibold">Real-time Monitoring</h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white/5 rounded text-center">
                  <p className="text-green-400 font-bold">98.5%</p>
                  <p className="text-xs text-gray-400">System Uptime</p>
                </div>
                <div className="p-3 bg-white/5 rounded text-center">
                  <p className="text-blue-400 font-bold">45ms</p>
                  <p className="text-xs text-gray-400">Avg Latency</p>
                </div>
                <div className="p-3 bg-white/5 rounded text-center">
                  <p className="text-purple-400 font-bold">99.9%</p>
                  <p className="text-xs text-gray-400">Order Fill Rate</p>
                </div>
                <div className="p-3 bg-white/5 rounded text-center">
                  <p className="text-yellow-400 font-bold">0.02%</p>
                  <p className="text-xs text-gray-400">Slippage</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
