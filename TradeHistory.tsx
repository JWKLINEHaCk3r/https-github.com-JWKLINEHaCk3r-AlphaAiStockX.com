'use client';

import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, ExternalLink, Filter } from 'lucide-react';

export default function TradeHistory({ recentTrades, botStats }) {
  const formatTime = timestamp => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Trade Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/20 border-green-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-400">{botStats.totalTrades}</p>
            <p className="text-sm text-gray-400">Total Trades</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-blue-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-400">{botStats.winRate.toFixed(1)}%</p>
            <p className="text-sm text-gray-400">Win Rate</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <p
              className={`text-2xl font-bold ${botStats.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}
            >
              {formatCurrency(botStats.totalPnL)}
            </p>
            <p className="text-sm text-gray-400">Total P&L</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-yellow-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-400">{botStats.activeTrades}</p>
            <p className="text-sm text-gray-400">Active Trades</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trades */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
              Recent Trades
            </CardTitle>
            <Button variant="outline" size="sm" className="border-purple-500/30">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentTrades.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">
                No trades executed yet. Start the bot to begin trading.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTrades.map(trade => (
                <div
                  key={trade.id}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant={trade.side === 'BUY' ? 'default' : 'destructive'}>
                          {trade.side}
                        </Badge>
                        <span className="text-white font-semibold">{trade.symbol}</span>
                      </div>

                      <div className="text-sm text-gray-300">
                        <span>
                          {trade.quantity} shares @ {formatCurrency(trade.price)}
                        </span>
                      </div>

                      <Badge variant="outline" className="text-xs">
                        {trade.strategy}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p
                          className={`font-bold ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {trade.pnl >= 0 ? '+' : ''}
                          {formatCurrency(trade.pnl)}
                        </p>
                        <p className="text-xs text-gray-400">{formatTime(trade.timestamp)}</p>
                      </div>

                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
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
