"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { TrendingUp, TrendingDown, Brain, DollarSign, BarChart3, Activity, Search, Zap } from "lucide-react"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  aiScore: number
  prediction: "BUY" | "SELL" | "HOLD"
  marketCap: string
}

const initialStocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.34,
    changePercent: 1.35,
    volume: 45678900,
    aiScore: 8.5,
    prediction: "BUY",
    marketCap: "2.8T",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.56,
    change: -1.23,
    changePercent: -0.85,
    volume: 23456789,
    aiScore: 7.8,
    prediction: "HOLD",
    marketCap: "1.7T",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 378.85,
    change: 5.67,
    changePercent: 1.52,
    volume: 34567890,
    aiScore: 9.1,
    prediction: "BUY",
    marketCap: "2.9T",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.42,
    change: -8.34,
    changePercent: -3.25,
    volume: 67890123,
    aiScore: 6.9,
    prediction: "SELL",
    marketCap: "789B",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 875.28,
    change: 15.67,
    changePercent: 1.82,
    volume: 56789012,
    aiScore: 9.3,
    prediction: "BUY",
    marketCap: "2.1T",
  },
]

const aiInsights = [
  {
    title: "Market Sentiment Analysis",
    content: "AI models detect bullish sentiment across tech sector with 87% confidence",
    type: "positive",
  },
  {
    title: "Volatility Alert",
    content: "Increased volatility expected in energy sector due to geopolitical tensions",
    type: "warning",
  },
  {
    title: "Opportunity Detected",
    content: "Machine learning algorithms identify potential breakout in semiconductor stocks",
    type: "positive",
  },
  {
    title: "Risk Assessment",
    content: "Portfolio risk level: Moderate. Consider diversification in defensive sectors",
    type: "neutral",
  },
]

export default function AlphaAiStockX() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [portfolioValue, setPortfolioValue] = useState(125430.5)
  const [isMarketOpen, setIsMarketOpen] = useState(true)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 2,
          change: stock.change + (Math.random() - 0.5) * 0.5,
          changePercent: stock.changePercent + (Math.random() - 0.5) * 0.1,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "BUY":
        return "bg-green-500 text-white"
      case "SELL":
        return "bg-red-500 text-white"
      case "HOLD":
        return "bg-yellow-500 text-black"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getAiScoreColor = (score: number) => {
    if (score >= 8.5) return "text-green-400"
    if (score >= 7) return "text-yellow-400"
    return "text-red-400"
  }

  const getInsightTypeColor = (type: string) => {
    switch (type) {
      case "positive":
        return "border-green-500/30 bg-green-500/10"
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/10"
      case "neutral":
        return "border-blue-500/30 bg-blue-500/10"
      default:
        return "border-gray-500/30 bg-gray-500/10"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AlphaAI StockX</h1>
                <p className="text-sm text-purple-200">AI-Powered Trading Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant="outline"
                className={`${isMarketOpen ? "text-green-400 border-green-400" : "text-red-400 border-red-400"}`}
              >
                {isMarketOpen ? "Market Open" : "Market Closed"}
              </Badge>
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2.5% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Confidence</CardTitle>
              <Brain className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-purple-400 flex items-center gap-1">
                <Zap className="h-3 w-3" />
                High confidence signals
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-blue-400">8 profitable positions</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's P&L</CardTitle>
              <Activity className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">+$1,247</div>
              <p className="text-xs text-green-400">+0.99% gain</p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/40 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-black/40 border-white/10">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-purple-600">
              Live Dashboard
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="text-white data-[state=active]:bg-purple-600">
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="text-white data-[state=active]:bg-purple-600">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="trading" className="text-white data-[state=active]:bg-purple-600">
              Trading
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">AI-Powered Stock Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time analysis with AI confidence scores and predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStocks.map((stock) => (
                    <div
                      key={stock.symbol}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-200 border border-transparent hover:border-purple-500/30"
                      onClick={() => setSelectedStock(stock)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{stock.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{stock.symbol}</div>
                          <div className="text-sm text-gray-400">{stock.name}</div>
                          <div className="text-xs text-gray-500">Vol: {stock.volume.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="font-semibold text-white text-lg">${stock.price.toFixed(2)}</div>
                          <div
                            className={`text-sm flex items-center gap-1 ${
                              stock.change >= 0 ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {stock.change >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {stock.change >= 0 ? "+" : ""}
                            {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                          </div>
                          <div className="text-xs text-gray-500">Cap: {stock.marketCap}</div>
                        </div>

                        <div className="text-right">
                          <div className={`font-semibold text-lg ${getAiScoreColor(stock.aiScore)}`}>
                            {stock.aiScore.toFixed(1)}/10
                          </div>
                          <div className="text-xs text-gray-400 mb-1">AI Score</div>
                          <Badge className={getPredictionColor(stock.prediction)}>{stock.prediction}</Badge>
                        </div>

                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          Trade
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  AI Market Intelligence
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Advanced machine learning insights and market predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${getInsightTypeColor(insight.type)}`}>
                      <h3 className="font-semibold text-white mb-2">{insight.title}</h3>
                      <p className="text-gray-300 text-sm">{insight.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Portfolio Management</CardTitle>
                <CardDescription className="text-gray-400">AI-optimized portfolio with risk management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">AI Portfolio Optimization</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Connect your brokerage account to enable AI-powered portfolio management and automated rebalancing
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Connect Brokerage Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">AI Trading Terminal</CardTitle>
                <CardDescription className="text-gray-400">
                  Execute trades with AI-powered recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Advanced Trading Features</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Paper trading, algorithmic strategies, and risk management tools coming soon
                  </p>
                  <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Start Paper Trading
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Stock Detail Modal */}
        {selectedStock && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="bg-black/80 border-white/20 max-w-lg w-full">
              <CardHeader>
                <CardTitle className="text-white flex justify-between items-center">
                  <div>
                    <div className="text-xl">{selectedStock.symbol}</div>
                    <div className="text-sm text-gray-400 font-normal">{selectedStock.name}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedStock(null)}
                    className="text-white hover:bg-white/10"
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Current Price</div>
                    <div className="text-3xl font-bold text-white">${selectedStock.price.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Change</div>
                    <div
                      className={`text-xl font-semibold flex items-center gap-1 ${
                        selectedStock.change >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {selectedStock.change >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {selectedStock.change >= 0 ? "+" : ""}
                      {selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">AI Score</div>
                    <div className={`text-2xl font-bold ${getAiScoreColor(selectedStock.aiScore)}`}>
                      {selectedStock.aiScore.toFixed(1)}/10
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Prediction</div>
                    <Badge className={`${getPredictionColor(selectedStock.prediction)} mt-1`}>
                      {selectedStock.prediction}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Market Cap</div>
                    <div className="text-lg font-semibold text-white">{selectedStock.marketCap}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400">Volume</div>
                  <div className="text-lg font-semibold text-white">{selectedStock.volume.toLocaleString()}</div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">Buy</Button>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700">Sell</Button>
                  <Button variant="outline" className="flex-1 text-white border-white/20 hover:bg-white/10">
                    Add to Watchlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
