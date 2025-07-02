'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, TrendingUp, TrendingDown, Clock, ExternalLink, Brain } from 'lucide-react';

export default function NewsAnalysis() {
  const [news, setNews] = useState([]);
  const [sentimentSummary, setSentimentSummary] = useState(null);

  useEffect(() => {
    // Mock news data with AI sentiment analysis
    const mockNews = [
      {
        id: 1,
        title: 'Apple Reports Record Q4 Earnings, Beats Expectations',
        summary:
          'Apple Inc. reported quarterly earnings that exceeded analyst expectations, driven by strong iPhone sales and services revenue.',
        sentiment: 'bullish',
        confidence: 92,
        impact: 'high',
        source: 'Reuters',
        time: '2 hours ago',
        relevantStocks: ['AAPL', 'MSFT', 'GOOGL'],
      },
      {
        id: 2,
        title: 'Federal Reserve Signals Potential Rate Cuts in 2024',
        summary:
          'Fed officials hint at possible interest rate reductions if inflation continues to decline, boosting market optimism.',
        sentiment: 'bullish',
        confidence: 87,
        impact: 'high',
        source: 'Bloomberg',
        time: '4 hours ago',
        relevantStocks: ['SPY', 'QQQ', 'IWM'],
      },
      {
        id: 3,
        title: 'Tesla Faces Production Challenges in China',
        summary:
          "Tesla's Shanghai factory reports temporary production slowdowns due to supply chain disruptions.",
        sentiment: 'bearish',
        confidence: 78,
        impact: 'medium',
        source: 'CNBC',
        time: '6 hours ago',
        relevantStocks: ['TSLA', 'NIO', 'XPEV'],
      },
      {
        id: 4,
        title: 'AI Chip Demand Continues to Surge',
        summary:
          'Semiconductor companies report unprecedented demand for AI processing chips, driving sector growth.',
        sentiment: 'bullish',
        confidence: 95,
        impact: 'high',
        source: 'TechCrunch',
        time: '8 hours ago',
        relevantStocks: ['NVDA', 'AMD', 'INTC'],
      },
      {
        id: 5,
        title: 'Oil Prices Decline on Oversupply Concerns',
        summary:
          'Crude oil futures drop as OPEC+ production increases raise concerns about market oversupply.',
        sentiment: 'bearish',
        confidence: 83,
        impact: 'medium',
        source: 'MarketWatch',
        time: '10 hours ago',
        relevantStocks: ['XOM', 'CVX', 'COP'],
      },
    ];

    setNews(mockNews);

    // Calculate sentiment summary
    const bullishCount = mockNews.filter(n => n.sentiment === 'bullish').length;
    const bearishCount = mockNews.filter(n => n.sentiment === 'bearish').length;
    const avgConfidence = mockNews.reduce((acc, n) => acc + n.confidence, 0) / mockNews.length;

    setSentimentSummary({
      bullish: bullishCount,
      bearish: bearishCount,
      neutral: mockNews.length - bullishCount - bearishCount,
      avgConfidence: avgConfidence,
    });
  }, []);

  const getSentimentColor = sentiment => {
    switch (sentiment) {
      case 'bullish':
        return 'text-green-400';
      case 'bearish':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getSentimentIcon = sentiment => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="h-4 w-4" />;
      case 'bearish':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Sentiment Summary */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-6 w-6 mr-2 text-purple-400" />
            AI News Sentiment Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">{sentimentSummary?.bullish}</p>
              <p className="text-sm text-gray-300">Bullish Stories</p>
            </div>
            <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <TrendingDown className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-400">{sentimentSummary?.bearish}</p>
              <p className="text-sm text-gray-300">Bearish Stories</p>
            </div>
            <div className="text-center p-4 bg-gray-500/10 rounded-lg border border-gray-500/30">
              <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-400">{sentimentSummary?.neutral}</p>
              <p className="text-sm text-gray-300">Neutral Stories</p>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <Brain className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-400">
                {sentimentSummary?.avgConfidence.toFixed(0)}%
              </p>
              <p className="text-sm text-gray-300">Avg Confidence</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Feed */}
      <Card className="bg-black/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="h-6 w-6 mr-2 text-blue-400" />
            Latest Market News
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {news.map(article => (
            <div
              key={article.id}
              className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">{article.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{article.summary}</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-4">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex items-center space-x-1 ${getSentimentColor(article.sentiment)}`}
                  >
                    {getSentimentIcon(article.sentiment)}
                    <span className="font-medium capitalize">{article.sentiment}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {article.confidence}% confidence
                  </Badge>
                  <Badge
                    variant={
                      article.impact === 'high'
                        ? 'destructive'
                        : article.impact === 'medium'
                          ? 'secondary'
                          : 'default'
                    }
                  >
                    {article.impact} impact
                  </Badge>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    {article.source} • {article.time}
                  </p>
                  <div className="flex space-x-1 mt-1">
                    {article.relevantStocks.slice(0, 3).map(stock => (
                      <Badge key={stock} variant="outline" className="text-xs">
                        {stock}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
