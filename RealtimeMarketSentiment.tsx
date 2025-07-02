'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Twitter,
  Globe,
  Brain,
  Activity,
  Zap,
  BarChart3,
  Eye,
  Heart,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
} from 'lucide-react';

export default function RealtimeMarketSentiment() {
  const [sentimentData, setSentimentData] = useState({});
  const [socialMedia, setSocialMedia] = useState([]);
  const [newsAnalysis, setNewsAnalysis] = useState([]);
  const [influencerSentiment, setInfluencerSentiment] = useState([]);
  const [marketMood, setMarketMood] = useState({});

  useEffect(() => {
    generateSentimentData();
    generateSocialMediaData();
    generateNewsAnalysis();
    generateInfluencerData();
    generateMarketMood();

    const interval = setInterval(() => {
      generateSentimentData();
      generateSocialMediaData();
      generateNewsAnalysis();
      generateMarketMood();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateSentimentData = () => {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'META', 'AMZN', 'SPY'];
    const data = {};

    symbols.forEach(symbol => {
      data[symbol] = {
        overall: 40 + Math.random() * 60,
        bullish: 30 + Math.random() * 50,
        bearish: 10 + Math.random() * 30,
        neutral: 20 + Math.random() * 40,
        volume: Math.floor(Math.random() * 10000) + 1000,
        change24h: (Math.random() - 0.5) * 20,
        momentum: Math.random() > 0.5 ? 'increasing' : 'decreasing',
        confidence: 70 + Math.random() * 30,
      };
    });

    setSentimentData(data);
  };

  const generateSocialMediaData = () => {
    const platforms = [
      { name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
      { name: 'Reddit', icon: MessageSquare, color: 'text-orange-400' },
      { name: 'Discord', icon: MessageSquare, color: 'text-purple-400' },
      { name: 'Telegram', icon: MessageSquare, color: 'text-cyan-400' },
    ];

    const data = platforms.map(platform => ({
      ...platform,
      mentions: Math.floor(Math.random() * 50000) + 5000,
      sentiment: 40 + Math.random() * 60,
      engagement: Math.floor(Math.random() * 100000) + 10000,
      trending: Math.random() > 0.7,
      change: (Math.random() - 0.5) * 50,
      topKeywords: ['bullish', 'moon', 'buy', 'hold', 'diamond hands'].slice(0, 3),
    }));

    setSocialMedia(data);
  };

  const generateNewsAnalysis = () => {
    const sources = ['Bloomberg', 'Reuters', 'CNBC', 'MarketWatch', 'Financial Times'];
    const sentiments = ['bullish', 'bearish', 'neutral'];

    const news = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      headline: [
        'Fed Signals Potential Rate Cuts Ahead',
        'Tech Stocks Rally on AI Optimism',
        'Market Volatility Expected to Continue',
        'Earnings Season Shows Mixed Results',
        'Crypto Market Sees Institutional Adoption',
        'Energy Sector Outperforms Expectations',
        'Consumer Spending Data Beats Estimates',
        'Geopolitical Tensions Impact Markets',
      ][i],
      source: sources[Math.floor(Math.random() * sources.length)],
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      impact: Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low',
      confidence: 70 + Math.random() * 30,
      timestamp: new Date(Date.now() - Math.random() * 3600000),
      relevance: 60 + Math.random() * 40,
    }));

    setNewsAnalysis(news);
  };

  const generateInfluencerData = () => {
    const influencers = [
      { name: 'Elon Musk', followers: '150M', platform: 'Twitter' },
      { name: 'Cathie Wood', followers: '1.2M', platform: 'Twitter' },
      { name: 'Jim Cramer', followers: '2.1M', platform: 'Twitter' },
      { name: 'Michael Saylor', followers: '3.5M', platform: 'Twitter' },
      { name: 'Ray Dalio', followers: '800K', platform: 'LinkedIn' },
    ];

    const data = influencers.map(influencer => ({
      ...influencer,
      sentiment: Math.random() > 0.5 ? 'bullish' : 'bearish',
      confidence: 70 + Math.random() * 30,
      lastPost: new Date(Date.now() - Math.random() * 86400000),
      engagement: Math.floor(Math.random() * 100000) + 10000,
      marketImpact: Math.random() > 0.6 ? 'high' : 'medium',
    }));

    setInfluencerSentiment(data);
  };

  const generateMarketMood = () => {
    const emotions = ['Fear', 'Greed', 'Optimism', 'Pessimism', 'Uncertainty', 'Confidence'];
    const dominant = emotions[Math.floor(Math.random() * emotions.length)];

    setMarketMood({
      dominant,
      fearGreedIndex: Math.floor(Math.random() * 100),
      volatilityIndex: 15 + Math.random() * 35,
      riskAppetite: Math.random() > 0.5 ? 'high' : 'low',
      marketPhase: ['Accumulation', 'Markup', 'Distribution', 'Markdown'][
        Math.floor(Math.random() * 4)
      ],
      crowdSentiment: 40 + Math.random() * 60,
      institutionalFlow: Math.random() > 0.5 ? 'inflow' : 'outflow',
    });
  };

  const getSentimentColor = sentiment => {
    if (sentiment >= 70) return 'text-green-400';
    if (sentiment >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getImpactColor = impact => {
    switch (impact) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Mood Overview */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-6 w-6 mr-2 text-purple-400" />
            Real-time Market Sentiment
            <Badge className="ml-3 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
              <Activity className="h-3 w-3 mr-1" />
              Live Analysis
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400 font-semibold">Market Mood</span>
                <Heart className="h-4 w-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">{marketMood.dominant}</p>
              <p className="text-sm text-gray-400">Phase: {marketMood.marketPhase}</p>
            </div>

            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-400 font-semibold">Fear & Greed</span>
                <AlertTriangle className="h-4 w-4 text-red-400" />
              </div>
              <p className="text-2xl font-bold text-white">{marketMood.fearGreedIndex}</p>
              <Progress value={marketMood.fearGreedIndex} className="h-2 mt-2" />
            </div>

            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-400 font-semibold">Volatility Index</span>
                <Activity className="h-4 w-4 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">
                {marketMood.volatilityIndex?.toFixed(1)}
              </p>
              <p className="text-sm text-gray-400">Risk: {marketMood.riskAppetite}</p>
            </div>

            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-semibold">Crowd Sentiment</span>
                <Eye className="h-4 w-4 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white">
                {marketMood.crowdSentiment?.toFixed(0)}%
              </p>
              <p className="text-sm text-gray-400">Flow: {marketMood.institutionalFlow}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Sentiment Analysis */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-blue-400" />
            Stock Sentiment Analysis
            <Badge className="ml-3 bg-gradient-to-r from-blue-500 to-cyan-500">
              <Zap className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(sentimentData).map(([symbol, data]) => (
              <div
                key={symbol}
                className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-lg">{symbol}</span>
                        <Badge
                          className={data.momentum === 'increasing' ? 'bg-green-500' : 'bg-red-500'}
                        >
                          {data.momentum === 'increasing' ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">
                        {data.volume.toLocaleString()} mentions
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Overall Sentiment</p>
                      <p className={`text-lg font-bold ${getSentimentColor(data.overall)}`}>
                        {data.overall.toFixed(0)}%
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Bullish</p>
                      <p className="text-green-400 font-bold">{data.bullish.toFixed(0)}%</p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Bearish</p>
                      <p className="text-red-400 font-bold">{data.bearish.toFixed(0)}%</p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">24h Change</p>
                      <p
                        className={`font-bold ${data.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {data.change24h >= 0 ? '+' : ''}
                        {data.change24h.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge className="bg-blue-500">{data.confidence.toFixed(0)}% Confidence</Badge>
                    <Progress value={data.overall} className="w-20 h-2 mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Media Sentiment */}
      <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="h-6 w-6 mr-2 text-orange-400" />
            Social Media Sentiment
            <Badge className="ml-3 bg-gradient-to-r from-orange-500 to-red-500">
              <Globe className="h-3 w-3 mr-1" />
              Multi-Platform
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialMedia.map((platform, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <platform.icon className={`h-5 w-5 ${platform.color}`} />
                    <span className="text-white font-bold">{platform.name}</span>
                    {platform.trending && (
                      <Badge className="bg-red-500 animate-pulse">TRENDING</Badge>
                    )}
                  </div>
                  <Badge className={getSentimentColor(platform.sentiment)}>
                    {platform.sentiment.toFixed(0)}%
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Mentions:</span>
                    <p className="text-white font-bold">{platform.mentions.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Engagement:</span>
                    <p className="text-white font-bold">{platform.engagement.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">24h Change:</span>
                    <p
                      className={`font-bold ${platform.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {platform.change >= 0 ? '+' : ''}
                      {platform.change.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Top Keywords:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {platform.topKeywords.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* News Sentiment Analysis */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="h-6 w-6 mr-2 text-green-400" />
            News Sentiment Analysis
            <Badge className="ml-3 bg-gradient-to-r from-green-500 to-emerald-500">
              <Brain className="h-3 w-3 mr-1" />
              NLP Analysis
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {newsAnalysis.map(news => (
              <div
                key={news.id}
                className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge
                        className={
                          news.sentiment === 'bullish'
                            ? 'bg-green-500'
                            : news.sentiment === 'bearish'
                              ? 'bg-red-500'
                              : 'bg-gray-500'
                        }
                      >
                        {news.sentiment === 'bullish' ? (
                          <ThumbsUp className="h-3 w-3 mr-1" />
                        ) : news.sentiment === 'bearish' ? (
                          <ThumbsDown className="h-3 w-3 mr-1" />
                        ) : null}
                        {news.sentiment.toUpperCase()}
                      </Badge>
                      <Badge className={`${getImpactColor(news.impact)}`}>
                        {news.impact.toUpperCase()} IMPACT
                      </Badge>
                    </div>

                    <h4 className="text-white font-semibold mb-1">{news.headline}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{news.source}</span>
                      <span>{news.timestamp.toLocaleTimeString()}</span>
                      <span>Relevance: {news.relevance.toFixed(0)}%</span>
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <Badge className="bg-green-500">{news.confidence.toFixed(0)}%</Badge>
                    <p className="text-xs text-gray-400 mt-1">Confidence</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Influencer Sentiment */}
      <Card className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border-indigo-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Eye className="h-6 w-6 mr-2 text-indigo-400" />
            Influencer Sentiment Tracking
            <Badge className="ml-3 bg-gradient-to-r from-indigo-500 to-purple-500">
              <Activity className="h-3 w-3 mr-1" />
              Key Voices
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {influencerSentiment.map((influencer, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-500/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold">{influencer.name}</span>
                        <Badge
                          className={
                            influencer.sentiment === 'bullish' ? 'bg-green-500' : 'bg-red-500'
                          }
                        >
                          {influencer.sentiment === 'bullish' ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                        </Badge>
                        <Badge
                          className={
                            influencer.marketImpact === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                          }
                        >
                          {influencer.marketImpact.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">
                        {influencer.followers} followers on {influencer.platform}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Sentiment</p>
                      <p
                        className={`font-bold ${influencer.sentiment === 'bullish' ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {influencer.sentiment.toUpperCase()}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Confidence</p>
                      <p className="text-indigo-400 font-bold">
                        {influencer.confidence.toFixed(0)}%
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Engagement</p>
                      <p className="text-purple-400 font-bold">
                        {influencer.engagement.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Last post: {influencer.lastPost.toLocaleDateString()}
                    </p>
                    <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 mt-1">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
