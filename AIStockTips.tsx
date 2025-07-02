'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  Star,
  Zap,
  Eye,
  Clock,
  BarChart3,
  CheckCircle,
  Crown,
} from 'lucide-react';

export default function AIStockTips({ membershipLevel }) {
  const [topPicks, setTopPicks] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [marketInsights, setMarketInsights] = useState({});
  const [loading, setLoading] = useState(true);

  const membershipLimits = {
    free: { tips: 3, predictions: 1, insights: 1 },
    basic: { tips: 10, predictions: 5, insights: 3 },
    pro: { tips: 25, predictions: 15, insights: 10 },
    ultimate: { tips: 'unlimited', predictions: 'unlimited', insights: 'unlimited' },
  };

  const currentLimits = membershipLimits[membershipLevel] || membershipLimits.free;

  useEffect(() => {
    generateAITips();
    generatePredictions();
    generateMarketInsights();

    const interval = setInterval(() => {
      generateAITips();
      generatePredictions();
      generateMarketInsights();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [membershipLevel]);

  const generateAITips = () => {
    setLoading(true);

    const stocks = [
      'AAPL',
      'MSFT',
      'GOOGL',
      'TSLA',
      'NVDA',
      'META',
      'AMZN',
      'NFLX',
      'CRM',
      'PLTR',
      'COIN',
      'RBLX',
      'SNOW',
      'ZM',
      'SHOP',
      'SQ',
      'PYPL',
      'ROKU',
    ];

    const reasons = [
      'Strong earnings momentum',
      'Technical breakout pattern',
      'Institutional buying surge',
      'Positive analyst upgrades',
      'Market leadership position',
      'Innovation catalyst',
      'Undervalued fundamentals',
      'Sector rotation opportunity',
      'AI adoption tailwind',
      'Revenue growth acceleration',
    ];

    const tips = [];
    const maxTips = currentLimits.tips === 'unlimited' ? 15 : currentLimits.tips;

    for (let i = 0; i < maxTips; i++) {
      const symbol = stocks[Math.floor(Math.random() * stocks.length)];
      const direction = Math.random() > 0.3 ? 'bullish' : 'bearish'; // 70% bullish bias
      const confidence = 70 + Math.random() * 30;
      const targetPrice = 100 + Math.random() * 400;
      const currentPrice = targetPrice * (0.85 + Math.random() * 0.3);
      const timeframe = ['1 week', '2 weeks', '1 month', '3 months'][Math.floor(Math.random() * 4)];

      tips.push({
        id: i + 1,
        symbol,
        direction,
        confidence,
        currentPrice,
        targetPrice,
        potentialReturn: ((targetPrice - currentPrice) / currentPrice) * 100,
        timeframe,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        aiScore: 80 + Math.random() * 20,
        riskLevel: confidence > 85 ? 'Low' : confidence > 75 ? 'Medium' : 'High',
        timestamp: new Date(),
      });
    }

    setTopPicks(tips.sort((a, b) => b.confidence - a.confidence));
    setLoading(false);
  };

  const generatePredictions = () => {
    const predictions = [];
    const maxPredictions =
      currentLimits.predictions === 'unlimited' ? 10 : currentLimits.predictions;

    for (let i = 0; i < maxPredictions; i++) {
      predictions.push({
        id: i + 1,
        title: [
          'Market Rally Expected',
          'Tech Sector Rotation',
          'Energy Breakout Coming',
          'Healthcare Momentum',
          'Financial Strength',
          'Consumer Resilience',
          'AI Revolution Continues',
          'Green Energy Surge',
          'Biotech Innovation',
          'Crypto Integration',
        ][i % 10],
        prediction: [
          'S&P 500 likely to reach new highs within 2 weeks',
          'Technology stocks showing strong accumulation patterns',
          'Energy sector poised for 15%+ gains this quarter',
          'Healthcare names breaking out of consolidation',
          'Financial sector benefiting from rate environment',
          'Consumer discretionary showing resilience',
          'AI-related stocks continuing momentum',
          'Clean energy stocks forming base patterns',
          'Biotech sector due for rotation',
          'Crypto adoption driving fintech growth',
        ][i % 10],
        probability: 70 + Math.random() * 25,
        timeframe: ['1-2 weeks', '2-4 weeks', '1-2 months', '2-3 months'][
          Math.floor(Math.random() * 4)
        ],
        impact: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
        category: ['Market', 'Sector', 'Individual'][Math.floor(Math.random() * 3)],
      });
    }

    setPredictions(predictions);
  };

  const generateMarketInsights = () => {
    const insights = {
      marketSentiment: {
        score: 65 + Math.random() * 30,
        trend: Math.random() > 0.5 ? 'improving' : 'declining',
        drivers: ['Fed policy', 'Earnings season', 'Economic data', 'Geopolitical events'],
      },
      sectorRotation: {
        inflow: ['Technology', 'Healthcare', 'Energy'][Math.floor(Math.random() * 3)],
        outflow: ['Utilities', 'REITs', 'Consumer Staples'][Math.floor(Math.random() * 3)],
        strength: 70 + Math.random() * 30,
      },
      volatilityForecast: {
        level: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        direction: Math.random() > 0.5 ? 'increasing' : 'decreasing',
        timeframe: 'next 2 weeks',
      },
      keyLevels: {
        support: 4200 + Math.random() * 300,
        resistance: 4600 + Math.random() * 400,
        breakoutTarget: 5000 + Math.random() * 200,
      },
    };

    setMarketInsights(insights);
  };

  const getConfidenceColor = confidence => {
    if (confidence >= 85) return 'text-green-400';
    if (confidence >= 75) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getRiskColor = risk => {
    switch (risk) {
      case 'Low':
        return 'text-green-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'High':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Top Stock Picks */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Brain className="h-6 w-6 mr-2 text-purple-400" />
              AI Top Stock Picks
              <Badge className="ml-3 bg-gradient-to-r from-purple-500 to-pink-500">
                <Eye className="h-3 w-3 mr-1" />
                Live AI
              </Badge>
            </CardTitle>
            <Badge className="bg-cyan-500">
              {topPicks.length}/{currentLimits.tips === 'unlimited' ? '∞' : currentLimits.tips} Tips
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">AI is analyzing market conditions...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topPicks.map((tip, index) => (
                <div
                  key={tip.id}
                  className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-purple-500 text-white font-bold">#{index + 1}</Badge>
                      <span className="text-white font-bold text-lg">{tip.symbol}</span>
                      <Badge variant={tip.direction === 'bullish' ? 'default' : 'destructive'}>
                        {tip.direction === 'bullish' ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {tip.direction.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getConfidenceColor(tip.confidence)} bg-black/20`}>
                        {tip.confidence.toFixed(0)}% Confidence
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-gray-400 text-sm">Current Price</p>
                      <p className="text-white font-semibold">${tip.currentPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Target Price</p>
                      <p className="text-green-400 font-semibold">${tip.targetPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Potential Return</p>
                      <p
                        className={`font-semibold ${tip.potentialReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {tip.potentialReturn >= 0 ? '+' : ''}
                        {tip.potentialReturn.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Timeframe</p>
                      <p className="text-blue-400 font-semibold">{tip.timeframe}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold">
                          AI Score: {tip.aiScore.toFixed(0)}
                        </span>
                      </div>
                      <Badge className={getRiskColor(tip.riskLevel)}>{tip.riskLevel} Risk</Badge>
                    </div>
                    <p className="text-gray-300 text-sm">{tip.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Market Predictions */}
      <Card className="bg-black/20 border-cyan-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-6 w-6 mr-2 text-cyan-400" />
            AI Market Predictions
            <Badge className="ml-3 bg-gradient-to-r from-cyan-500 to-blue-500">
              <Clock className="h-3 w-3 mr-1" />
              Forecasting
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map(prediction => (
              <div
                key={prediction.id}
                className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-bold">{prediction.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-cyan-500">{prediction.probability.toFixed(0)}%</Badge>
                    <Badge
                      variant="outline"
                      className={`border-${prediction.impact === 'High' ? 'red' : prediction.impact === 'Medium' ? 'yellow' : 'green'}-500/30`}
                    >
                      {prediction.impact} Impact
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-300 mb-3">{prediction.prediction}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400">
                      Category: <span className="text-white">{prediction.category}</span>
                    </span>
                    <span className="text-gray-400">
                      Timeframe: <span className="text-blue-400">{prediction.timeframe}</span>
                    </span>
                  </div>
                  <Progress value={prediction.probability} className="w-24 h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 border-green-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-green-400" />
              Market Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {marketInsights.marketSentiment?.score.toFixed(0)}
              </div>
              <Progress value={marketInsights.marketSentiment?.score} className="h-3 mb-2" />
              <p className="text-sm text-gray-400">
                Sentiment is {marketInsights.marketSentiment?.trend}
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-2">Key Drivers</h5>
              <div className="space-y-1">
                {marketInsights.marketSentiment?.drivers.map((driver, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    <span className="text-gray-300 text-sm">{driver}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-orange-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="h-6 w-6 mr-2 text-orange-400" />
              Sector Rotation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-semibold">Inflow</span>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
                <p className="text-white font-bold">{marketInsights.sectorRotation?.inflow}</p>
              </div>
              <div className="p-3 bg-red-500/10 rounded border border-red-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-red-400 font-semibold">Outflow</span>
                  <TrendingDown className="h-4 w-4 text-red-400" />
                </div>
                <p className="text-white font-bold">{marketInsights.sectorRotation?.outflow}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Rotation Strength</p>
              <Progress value={marketInsights.sectorRotation?.strength} className="h-2 mt-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Prompt for Free Users */}
      {membershipLevel === 'free' && (
        <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-xl mb-2">Unlock Premium AI Insights</h3>
            <p className="text-gray-300 mb-4">
              Get unlimited AI stock tips, predictions, and market insights with our premium plans
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Star className="h-4 w-4 mr-2" />
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
