'use client';

import { useState, useEffect } from 'react';
import { ntent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Activity,
  Zap,
  Search,
  ArrowUp,
  ArrowDown,
  Minus,
  Eye,
  Calendar,
  DollarSign,
  Volume2,
} from 'lucide-react';

import { advancedStockAnalysisService } from '../../services/advanced-stock-analysis-service';
import { legalComplianceService } from '../../services/legal-compliance-service';

interface AITradingAdvisorProps {
  className?: string;
}

export default function AITradingAdvisor({ className = '' }: AITradingAdvisorProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [stockAnalysis, setStockAnalysis] = useState(null);
  const [allStocks, setAllStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  useEffect(() => {
    initializeServices();
    loadStockData();
  }, []);

  useEffect(() => {
    if (selectedStock) {
      loadStockAnalysis(selectedStock);
    }
  }, [selectedStock]);

  const initializeServices = async () => {
    await advancedStockAnalysisService.initialize();
    await legalComplianceService.initialize();
  };

  const loadStockData = async () => {
    try {
      const stocks = await advancedStockAnalysisService.getAllStocksWithScores();
      setAllStocks(stocks);
    } catch (error) {
      console.error('Error loading stock data:', error);
    }
  };

  const loadStockAnalysis = async (symbol: string) => {
    setLoading(true);
    try {
      const analysis = await advancedStockAnalysisService.getComprehensiveStockAnalysis(symbol);
      setStockAnalysis(analysis);
    } catch (error) {
      console.error('Error loading stock analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 65) return 'text-blue-400';
    if (score >= 45) return 'text-yellow-400';
    if (score >= 30) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 65) return 'bg-blue-600';
    if (score >= 45) return 'bg-yellow-600';
    if (score >= 30) return 'bg-orange-600';
    return 'bg-red-600';
  };

  const getMarketIcon = (classification: string) => {
    if (classification.includes('BULL')) return <TrendingUp className="h-5 w-5 text-green-400" />;
    if (classification.includes('BEAR')) return <TrendingDown className="h-5 w-5 text-red-400" />;
    return <Minus className="h-5 w-5 text-yellow-400" />;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  // Show disclaimer first
  if (!disclaimerAccepted) {
    const disclaimers = legalComplianceService.getRequiredDisclaimer('ai_analysis');

    return (
      <div className={`space-y-6 ${className}`}>
        <Card className="bg-slate-800/50 backdrop-blur-sm border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
              Important Disclaimers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {disclaimers.map((disclaimer, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-white font-semibold">{disclaimer.title}</h3>
                <div className="text-slate-300 text-sm whitespace-pre-line bg-slate-700/30 p-4 rounded-lg">
                  {disclaimer.content}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-4 pt-4 border-t border-slate-600">
              <Button
                onClick={() => setDisclaimerAccepted(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />I Understand and Accept
              </Button>
              <p className="text-slate-400 text-sm">
                You must accept these disclaimers to continue
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3 text-2xl">
            <Brain className="h-8 w-8 text-blue-400" />
            AI Trading Advisor
            <Badge className="bg-gradient-to-r from-green-500 to-blue-500">
              <Zap className="h-3 w-3 mr-1" />
              Live Analysis
            </Badge>
          </CardTitle>
          <CardDescription className="text-blue-200">
            Advanced AI-powered stock analysis with real-time scoring and market classification
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 backdrop-blur-sm">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Stock Analysis
          </TabsTrigger>
          <TabsTrigger value="signals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Trading Signals
          </TabsTrigger>
          <TabsTrigger value="scanner" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Stock Scanner
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Top Stocks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Top AI Buy Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allStocks.slice(0, 5).map((stock, index) => (
                    <div
                      key={stock.symbol}
                      className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                      onClick={() => setSelectedStock(stock.symbol)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-white font-semibold">{index + 1}</div>
                        <div>
                          <div className="text-white font-medium">{stock.symbol}</div>
                          <div className="text-slate-400 text-sm">{stock.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${getScoreColor(stock.buyScore.overall)}`}
                        >
                          {stock.buyScore.overall}
                        </div>
                        <Badge className={getScoreBadgeColor(stock.buyScore.overall)}>
                          {stock.buyScore.rating}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-400" />
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allStocks.slice(0, 5).map(stock => (
                    <div
                      key={stock.symbol}
                      className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getMarketIcon(stock.marketClassification.classification)}
                        <div>
                          <div className="text-white font-medium">{stock.symbol}</div>
                          <div className="text-slate-400 text-sm">
                            {stock.marketClassification.classification}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">
                          {formatCurrency(stock.currentPrice)}
                        </div>
                        <div
                          className={`text-sm ${stock.performance?.day > 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {stock.performance?.day > 0 ? '+' : ''}
                          {stock.performance?.day?.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-400">
                  {allStocks.filter(s => s.buyScore.overall >= 70).length}
                </div>
                <div className="text-slate-400">Strong Buys</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-400">
                  {
                    allStocks.filter(s => s.buyScore.overall >= 50 && s.buyScore.overall < 70)
                      .length
                  }
                </div>
                <div className="text-slate-400">Moderate Buys</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-yellow-500/20">
              <CardContent className="p-6 text-center">
                <Minus className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-yellow-400">
                  {
                    allStocks.filter(s => s.buyScore.overall >= 40 && s.buyScore.overall < 50)
                      .length
                  }
                </div>
                <div className="text-slate-400">Holds</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-red-500/20">
              <CardContent className="p-6 text-center">
                <TrendingDown className="h-12 w-12 text-red-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-red-400">
                  {allStocks.filter(s => s.buyScore.overall < 40).length}
                </div>
                <div className="text-slate-400">Sells</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Stock Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          {/* Stock Selector */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search stocks..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-700/30 border-blue-500/30 text-white"
                  />
                </div>
                <div className="flex gap-2">
                  {['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA'].map(symbol => (
                    <Button
                      key={symbol}
                      variant={selectedStock === symbol ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedStock(symbol)}
                    >
                      {symbol}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
              <CardContent className="p-8 text-center">
                <Brain className="h-16 w-16 text-blue-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold text-white mb-2">AI Analysis in Progress</h3>
                <p className="text-slate-400">
                  Analyzing {selectedStock} with advanced AI algorithms...
                </p>
              </CardContent>
            </Card>
          ) : stockAnalysis ? (
            <div className="space-y-6">
              {/* Stock Header */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {stockAnalysis.stock.symbol}
                      </h2>
                      <p className="text-slate-400">{stockAnalysis.stock.name}</p>
                      <Badge className="mt-2">{stockAnalysis.stock.sector}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">
                        {formatCurrency(stockAnalysis.currentPrice)}
                      </div>
                      <div
                        className={`text-lg ${stockAnalysis.metrics.performance?.day > 0 ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {stockAnalysis.metrics.performance?.day > 0 ? '+' : ''}
                        {stockAnalysis.metrics.performance?.day?.toFixed(2)}% Today
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-slate-400 text-sm">Volume</div>
                      <div className="text-white font-semibold">
                        {formatVolume(stockAnalysis.volumeAnalysis?.currentVolume || 0)}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-slate-400 text-sm">52W High</div>
                      <div className="text-white font-semibold">
                        {formatCurrency(stockAnalysis.metrics.levels?.year52High || 0)}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-slate-400 text-sm">52W Low</div>
                      <div className="text-white font-semibold">
                        {formatCurrency(stockAnalysis.metrics.levels?.year52Low || 0)}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-slate-400 text-sm">Market Cap</div>
                      <div className="text-white font-semibold">
                        ${(stockAnalysis.stock.marketCap / 1000000000).toFixed(1)}B
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Buy Score */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="h-6 w-6 text-green-400" />
                    AI Buy Score Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div
                        className={`text-6xl font-bold mb-2 ${getScoreColor(stockAnalysis.buyScore.overall)}`}
                      >
                        {stockAnalysis.buyScore.overall}
                      </div>
                      <Badge
                        className={`text-lg px-4 py-2 ${getScoreBadgeColor(stockAnalysis.buyScore.overall)}`}
                      >
                        {stockAnalysis.buyScore.rating}
                      </Badge>
                      <div className="mt-4">
                        <Progress value={stockAnalysis.buyScore.overall} className="h-3" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">Score Components:</h4>
                      {Object.entries(stockAnalysis.buyScore.components).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-slate-300 capitalize">{key.replace('_', ' ')}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={(value / 30) * 100} className="w-20 h-2" />
                            <span className="text-white font-medium w-8">{Math.round(value)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Classification */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    {getMarketIcon(stockAnalysis.marketClassification.classification)}
                    Market Classification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-white mb-2">
                          {stockAnalysis.marketClassification.classification}
                        </div>
                        <div className="text-slate-400">
                          Confidence:{' '}
                          {(stockAnalysis.marketClassification.confidence * 100).toFixed(0)}%
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Bullish Factors:</span>
                          <span className="text-green-400">
                            {stockAnalysis.marketClassification.bullishFactors}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Bearish Factors:</span>
                          <span className="text-red-400">
                            {stockAnalysis.marketClassification.bearishFactors}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-3">Trend Analysis:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Short Term:</span>
                          <div className="flex items-center gap-2">
                            {stockAnalysis.marketClassification.trends.short === 'UP' ? (
                              <ArrowUp className="h-4 w-4 text-green-400" />
                            ) : (
                              <ArrowDown className="h-4 w-4 text-red-400" />
                            )}
                            <span
                              className={
                                stockAnalysis.marketClassification.trends.short === 'UP'
                                  ? 'text-green-400'
                                  : 'text-red-400'
                              }
                            >
                              {stockAnalysis.marketClassification.trends.short}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Medium Term:</span>
                          <div className="flex items-center gap-2">
                            {stockAnalysis.marketClassification.trends.medium === 'UP' ? (
                              <ArrowUp className="h-4 w-4 text-green-400" />
                            ) : (
                              <ArrowDown className="h-4 w-4 text-red-400" />
                            )}
                            <span
                              className={
                                stockAnalysis.marketClassification.trends.medium === 'UP'
                                  ? 'text-green-400'
                                  : 'text-red-400'
                              }
                            >
                              {stockAnalysis.marketClassification.trends.medium}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Long Term:</span>
                          <div className="flex items-center gap-2">
                            {stockAnalysis.marketClassification.trends.long === 'UP' ? (
                              <ArrowUp className="h-4 w-4 text-green-400" />
                            ) : (
                              <ArrowDown className="h-4 w-4 text-red-400" />
                            )}
                            <span
                              className={
                                stockAnalysis.marketClassification.trends.long === 'UP'
                                  ? 'text-green-400'
                                  : 'text-red-400'
                              }
                            >
                              {stockAnalysis.marketClassification.trends.long}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-slate-700/30 rounded-lg">
                    <p className="text-slate-300 text-sm">
                      {stockAnalysis.marketClassification.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendation */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="h-6 w-6 text-blue-400" />
                    AI Trading Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        {stockAnalysis.recommendation.action}
                      </div>
                      <div className="text-slate-400 mb-4">
                        Confidence: {(stockAnalysis.recommendation.confidence * 100).toFixed(0)}%
                      </div>
                      <Progress
                        value={stockAnalysis.recommendation.confidence * 100}
                        className="mb-4"
                      />

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Position Size:</span>
                          <span className="text-white">
                            {stockAnalysis.recommendation.positionSize}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Stop Loss:</span>
                          <span className="text-red-400">
                            {formatCurrency(stockAnalysis.recommendation.stopLoss)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Take Profit:</span>
                          <span className="text-green-400">
                            {formatCurrency(stockAnalysis.recommendation.takeProfit)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Timeframe:</span>
                          <span className="text-white">
                            {stockAnalysis.recommendation.timeframe}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-3">Key Factors:</h4>
                      <div className="space-y-2">
                        {stockAnalysis.recommendation.keyFactors.map((factor, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300 text-sm">{factor}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          <span className="text-white font-medium">Risk Level</span>
                        </div>
                        <Badge
                          className={
                            stockAnalysis.recommendation.riskLevel === 'HIGH'
                              ? 'bg-red-600'
                              : stockAnalysis.recommendation.riskLevel === 'MEDIUM'
                                ? 'bg-yellow-600'
                                : 'bg-green-600'
                          }
                        >
                          {stockAnalysis.recommendation.riskLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Since IPO */}
              {stockAnalysis.performanceSinceIPO && (
                <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calendar className="h-6 w-6 text-green-400" />
                      Performance Since IPO
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                        <div className="text-slate-400 text-sm">IPO Date</div>
                        <div className="text-white font-semibold">
                          {stockAnalysis.stock.ipoDate}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                        <div className="text-slate-400 text-sm">IPO Price</div>
                        <div className="text-white font-semibold">
                          {formatCurrency(stockAnalysis.performanceSinceIPO.ipoPrice)}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                        <div className="text-slate-400 text-sm">Total Return</div>
                        <div className="text-green-400 font-semibold">
                          +{stockAnalysis.performanceSinceIPO.totalReturn.toFixed(0)}%
                        </div>
                      </div>
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                        <div className="text-slate-400 text-sm">Annualized Return</div>
                        <div className="text-green-400 font-semibold">
                          +{stockAnalysis.performanceSinceIPO.annualizedReturn.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : null}
        </TabsContent>

        {/* Trading Signals Tab */}
        <TabsContent value="signals" className="space-y-6">
          {stockAnalysis && (
            <div className="space-y-6">
              {/* Active Signals */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="h-6 w-6 text-blue-400" />
                    Active Trading Signals for {selectedStock}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stockAnalysis.tradingSignals.map((signal, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-l-4 ${
                          signal.type === 'BUY'
                            ? 'bg-green-900/20 border-green-500'
                            : 'bg-red-900/20 border-red-500'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {signal.type === 'BUY' ? (
                              <TrendingUp className="h-5 w-5 text-green-400" />
                            ) : (
                              <TrendingDown className="h-5 w-5 text-red-400" />
                            )}
                            <span
                              className={`font-semibold ${signal.type === 'BUY' ? 'text-green-400' : 'text-red-400'}`}
                            >
                              {signal.type} SIGNAL
                            </span>
                          </div>
                          <Badge
                            className={
                              signal.strength === 'STRONG' ? 'bg-red-600' : 'bg-yellow-600'
                            }
                          >
                            {signal.strength}
                          </Badge>
                        </div>
                        <div className="text-white font-medium mb-1">{signal.indicator}</div>
                        <div className="text-slate-300 text-sm mb-2">{signal.description}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-sm">Confidence:</span>
                          <Progress value={signal.confidence * 100} className="w-24 h-2" />
                          <span className="text-white text-sm">
                            {(signal.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Entry/Exit Points */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Eye className="h-6 w-6 text-purple-400" />
                    Entry & Exit Points
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <ArrowDown className="h-4 w-4 text-green-400" />
                        Entry Points
                      </h4>
                      <div className="space-y-3">
                        {stockAnalysis.entryExitPoints.entry.map((point, index) => (
                          <div
                            key={index}
                            className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white font-medium">{point.type}</span>
                              <span className="text-green-400 font-semibold">
                                {formatCurrency(point.price)}
                              </span>
                            </div>
                            <div className="text-slate-300 text-sm mb-2">{point.description}</div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 text-xs">Confidence:</span>
                              <Progress value={point.confidence * 100} className="w-16 h-1" />
                              <span className="text-white text-xs">
                                {(point.confidence * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <ArrowUp className="h-4 w-4 text-red-400" />
                        Exit Points
                      </h4>
                      <div className="space-y-3">
                        {stockAnalysis.entryExitPoints.exit.map((point, index) => (
                          <div
                            key={index}
                            className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white font-medium">{point.type}</span>
                              <span className="text-red-400 font-semibold">
                                {formatCurrency(point.price)}
                              </span>
                            </div>
                            <div className="text-slate-300 text-sm mb-2">{point.description}</div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 text-xs">Confidence:</span>
                              <Progress value={point.confidence * 100} className="w-16 h-1" />
                              <span className="text-white text-xs">
                                {(point.confidence * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">AI Recommendation:</h4>
                    <p className="text-slate-300 text-sm">
                      {stockAnalysis.entryExitPoints.recommendation}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Price Targets */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-yellow-400" />
                    AI Price Targets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                      <div className="text-slate-400 text-sm">Conservative</div>
                      <div className="text-white font-semibold text-lg">
                        {formatCurrency(stockAnalysis.priceTargets.conservative)}
                      </div>
                      <div className="text-green-400 text-sm">
                        +
                        {(
                          ((stockAnalysis.priceTargets.conservative - stockAnalysis.currentPrice) /
                            stockAnalysis.currentPrice) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </div>
                    <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                      <div className="text-slate-400 text-sm">Moderate</div>
                      <div className="text-white font-semibold text-lg">
                        {formatCurrency(stockAnalysis.priceTargets.moderate)}
                      </div>
                      <div className="text-green-400 text-sm">
                        +
                        {(
                          ((stockAnalysis.priceTargets.moderate - stockAnalysis.currentPrice) /
                            stockAnalysis.currentPrice) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </div>
                    <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                      <div className="text-slate-400 text-sm">Aggressive</div>
                      <div className="text-white font-semibold text-lg">
                        {formatCurrency(stockAnalysis.priceTargets.aggressive)}
                      </div>
                      <div className="text-green-400 text-sm">
                        +
                        {(
                          ((stockAnalysis.priceTargets.aggressive - stockAnalysis.currentPrice) /
                            stockAnalysis.currentPrice) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </div>
                    <div className="text-center p-4 bg-red-900/20 rounded-lg">
                      <div className="text-slate-400 text-sm">Stop Loss</div>
                      <div className="text-red-400 font-semibold text-lg">
                        {formatCurrency(stockAnalysis.priceTargets.stopLoss)}
                      </div>
                      <div className="text-red-400 text-sm">
                        {(
                          ((stockAnalysis.priceTargets.stopLoss - stockAnalysis.currentPrice) /
                            stockAnalysis.currentPrice) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <div className="text-slate-400 text-sm">
                      Timeframe: {stockAnalysis.priceTargets.timeframe}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Stock Scanner Tab */}
        <TabsContent value="scanner" className="space-y-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="h-6 w-6 text-blue-400" />
                AI Stock Scanner
              </CardTitle>
              <CardDescription className="text-slate-400">
                Real-time stock screening with AI-powered analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allStocks.map(stock => (
                  <div
                    key={stock.symbol}
                    className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedStock(stock.symbol);
                      setActiveTab('analysis');
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-white font-semibold text-lg">{stock.symbol}</div>
                          <div className="text-slate-400 text-sm">{stock.name}</div>
                          <Badge className="mt-1 text-xs">{stock.sector}</Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-white font-semibold">
                            {formatCurrency(stock.currentPrice)}
                          </div>
                          <div
                            className={`text-sm ${stock.performance?.day > 0 ? 'text-green-400' : 'text-red-400'}`}
                          >
                            {stock.performance?.day > 0 ? '+' : ''}
                            {stock.performance?.day?.toFixed(2)}%
                          </div>
                        </div>

                        <div className="text-center">
                          <div
                            className={`text-2xl font-bold ${getScoreColor(stock.buyScore.overall)}`}
                          >
                            {stock.buyScore.overall}
                          </div>
                          <Badge className={getScoreBadgeColor(stock.buyScore.overall)}>
                            {stock.buyScore.rating}
                          </Badge>
                        </div>

                        <div className="text-center">
                          {getMarketIcon(stock.marketClassification.classification)}
                          <div className="text-slate-400 text-xs mt-1">
                            {stock.marketClassification.classification.split(' ')[0]}
                          </div>
                        </div>

                        <div className="text-center">
                          <Volume2 className="h-5 w-5 text-blue-400 mx-auto" />
                          <div className="text-white text-sm">
                            {formatVolume(stock.volume?.currentVolume || 0)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
