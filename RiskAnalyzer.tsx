'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield, TrendingDown, Activity, Target, BarChart3 } from 'lucide-react';

export default function RiskAnalyzer() {
  const [riskMetrics, setRiskMetrics] = useState(null);

  useEffect(() => {
    // Simulate risk analysis data
    setRiskMetrics({
      overallRisk: 68,
      riskLevel: 'Medium-High',
      valueAtRisk: {
        oneDay: 2.3,
        oneWeek: 5.8,
        oneMonth: 12.4,
      },
      stressTests: [
        { scenario: 'Market Crash (-20%)', portfolioImpact: -18.5, probability: 5 },
        { scenario: 'Interest Rate Spike', portfolioImpact: -12.3, probability: 15 },
        { scenario: 'Sector Rotation', portfolioImpact: -8.7, probability: 25 },
        { scenario: 'Inflation Surge', portfolioImpact: -6.2, probability: 20 },
      ],
      correlationRisks: [
        { asset1: 'AAPL', asset2: 'MSFT', correlation: 0.78, risk: 'High' },
        { asset1: 'TSLA', asset2: 'NVDA', correlation: 0.65, risk: 'Medium' },
        { asset1: 'GOOGL', asset2: 'AMZN', correlation: 0.72, risk: 'High' },
      ],
      riskFactors: [
        {
          factor: 'Concentration Risk',
          score: 75,
          description: 'Portfolio concentrated in tech sector',
        },
        { factor: 'Volatility Risk', score: 68, description: 'High individual stock volatilities' },
        { factor: 'Market Risk', score: 55, description: 'Exposure to market downturns' },
        { factor: 'Liquidity Risk', score: 25, description: 'All holdings are highly liquid' },
        { factor: 'Currency Risk', score: 15, description: 'Minimal foreign exposure' },
      ],
      hedgingStrategies: [
        {
          strategy: 'Put Options on QQQ',
          cost: '1.2% of portfolio',
          protection: '15-20% downside',
          effectiveness: 85,
        },
        {
          strategy: 'VIX Calls',
          cost: '0.8% of portfolio',
          protection: 'Volatility spikes',
          effectiveness: 70,
        },
        {
          strategy: 'Treasury Bonds',
          cost: 'Opportunity cost',
          protection: 'Market correlation',
          effectiveness: 60,
        },
      ],
    });
  }, []);

  const getRiskColor = score => {
    if (score >= 70) return 'text-red-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRiskBadgeVariant = level => {
    switch (level) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'default';
      default:
        return 'outline';
    }
  };

  if (!riskMetrics) {
    return (
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-orange-400 mx-auto mb-4 animate-pulse" />
          <p className="text-white">Analyzing portfolio risks...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-black/20 border-red-500/30 backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-3xl font-bold text-red-400 mb-2">{riskMetrics.overallRisk}</p>
            <p className="text-gray-300">Overall Risk Score</p>
            <Badge variant="destructive" className="mt-2">
              {riskMetrics.riskLevel}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-yellow-500/30 backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <TrendingDown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-3xl font-bold text-yellow-400 mb-2">
              {riskMetrics.valueAtRisk.oneDay}%
            </p>
            <p className="text-gray-300">1-Day VaR (95%)</p>
            <p className="text-xs text-gray-400 mt-2">Maximum expected loss</p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-blue-500/30 backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <p className="text-3xl font-bold text-blue-400 mb-2">3</p>
            <p className="text-gray-300">Hedge Strategies</p>
            <p className="text-xs text-gray-400 mt-2">Available options</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Value at Risk */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-orange-400" />
              Value at Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">1 Day (95% confidence)</span>
                <span className="text-red-400 font-bold">{riskMetrics.valueAtRisk.oneDay}%</span>
              </div>
              <Progress value={riskMetrics.valueAtRisk.oneDay * 4} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="text-gray-300">1 Week (95% confidence)</span>
                <span className="text-red-400 font-bold">{riskMetrics.valueAtRisk.oneWeek}%</span>
              </div>
              <Progress value={riskMetrics.valueAtRisk.oneWeek * 2} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="text-gray-300">1 Month (95% confidence)</span>
                <span className="text-red-400 font-bold">{riskMetrics.valueAtRisk.oneMonth}%</span>
              </div>
              <Progress value={riskMetrics.valueAtRisk.oneMonth} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Risk Factors */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="h-5 w-5 mr-2 text-purple-400" />
              Risk Factor Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskMetrics.riskFactors.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{factor.factor}</span>
                  <span className={`font-bold ${getRiskColor(factor.score)}`}>{factor.score}</span>
                </div>
                <Progress value={factor.score} className="h-2" />
                <p className="text-xs text-gray-400">{factor.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stress Tests */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-red-400" />
              Stress Test Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {riskMetrics.stressTests.map((test, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{test.scenario}</span>
                  <Badge variant="outline" className="text-xs">
                    {test.probability}% chance
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-400 font-bold">{test.portfolioImpact}%</span>
                  <Progress value={Math.abs(test.portfolioImpact) * 2} className="w-24 h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Hedging Strategies */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-400" />
              Recommended Hedges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {riskMetrics.hedgingStrategies.map((hedge, index) => (
              <div
                key={index}
                className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/30"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{hedge.strategy}</span>
                  <Badge variant="default" className="bg-green-500">
                    {hedge.effectiveness}% effective
                  </Badge>
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Cost: {hedge.cost}</p>
                  <p>Protection: {hedge.protection}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Correlation Matrix */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Asset Correlation Risks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {riskMetrics.correlationRisks.map((corr, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">
                    {corr.asset1} - {corr.asset2}
                  </span>
                  <Badge variant={getRiskBadgeVariant(corr.risk)}>{corr.risk}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300 text-sm">Correlation:</span>
                  <span className="text-white font-bold">{corr.correlation}</span>
                  <Progress value={corr.correlation * 100} className="flex-1 h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
