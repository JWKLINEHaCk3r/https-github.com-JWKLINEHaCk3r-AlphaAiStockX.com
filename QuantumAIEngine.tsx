'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Brain,
  Cpu,
  Zap,
  BarChart3,
  Network,
  Layers,
  Lock,
  Sparkles,
  Lightbulb,
  Wand2,
  Dices,
  Sigma,
} from 'lucide-react';

export default function QuantumAIEngine() {
  const [quantumData, setQuantumData] = useState({
    processingPower: 98.7 + Math.random() * 1,
    predictionAccuracy: 94.8 + Math.random() * 2,
    quantumAdvantage: 1247 + Math.random() * 100,
    modelTraining: {
      progress: 87 + Math.random() * 10,
      timeRemaining: '2h 14m',
      dataProcessed: '47.8 TB',
      accuracy: 96.7 + Math.random() * 2,
    },
    marketPredictions: {
      shortTerm: {
        bullish: 68 + Math.random() * 10,
        bearish: 32 - Math.random() * 10,
        confidence: 87 + Math.random() * 5,
      },
      midTerm: {
        bullish: 72 + Math.random() * 10,
        bearish: 28 - Math.random() * 10,
        confidence: 82 + Math.random() * 5,
      },
      longTerm: {
        bullish: 78 + Math.random() * 10,
        bearish: 22 - Math.random() * 10,
        confidence: 76 + Math.random() * 5,
      },
    },
    quantumModels: [
      {
        name: 'Alpha Quantum Predictor v4.7',
        type: 'Market Direction',
        accuracy: 94.7 + Math.random() * 3,
        qubits: 1024,
        status: 'Active',
        lastUpdate: '2h ago',
      },
      {
        name: 'Quantum Pattern Recognition',
        type: 'Technical Analysis',
        accuracy: 92.3 + Math.random() * 3,
        qubits: 2048,
        status: 'Active',
        lastUpdate: '4h ago',
      },
      {
        name: 'Quantum Sentiment Analyzer',
        type: 'News & Social',
        accuracy: 89.5 + Math.random() * 3,
        qubits: 1536,
        status: 'Active',
        lastUpdate: '1h ago',
      },
      {
        name: 'Quantum Options Flow',
        type: 'Options Analysis',
        accuracy: 91.8 + Math.random() * 3,
        qubits: 3072,
        status: 'Training',
        lastUpdate: 'In progress',
      },
    ],
  });

  const [aiInsights, setAiInsights] = useState([
    {
      ticker: 'AAPL',
      prediction: 'Strong Buy',
      confidence: 94.7 + Math.random() * 3,
      priceTarget: '$248.50',
      timeFrame: '3 months',
      reasoning:
        'Quantum analysis of supply chain data and consumer sentiment indicates strong iPhone 16 cycle.',
    },
    {
      ticker: 'NVDA',
      prediction: 'Buy',
      confidence: 92.3 + Math.random() * 3,
      priceTarget: '$1,250.00',
      timeFrame: '6 months',
      reasoning:
        'AI infrastructure demand accelerating with quantum computing detecting increased enterprise adoption patterns.',
    },
    {
      ticker: 'TSLA',
      prediction: 'Hold',
      confidence: 78.5 + Math.random() * 3,
      priceTarget: '$275.00',
      timeFrame: '3 months',
      reasoning:
        'Mixed signals in manufacturing data with quantum analysis showing potential supply constraints.',
    },
    {
      ticker: 'MSFT',
      prediction: 'Strong Buy',
      confidence: 96.2 + Math.random() * 3,
      priceTarget: '$520.00',
      timeFrame: '6 months',
      reasoning:
        'Quantum pattern recognition identifies accelerating cloud revenue growth patterns across enterprise segments.',
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateQuantumData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateQuantumData = () => {
    setQuantumData(prev => ({
      ...prev,
      processingPower: Math.min(100, prev.processingPower + (Math.random() - 0.3) * 0.5),
      predictionAccuracy: Math.min(100, prev.predictionAccuracy + (Math.random() - 0.3) * 0.3),
      modelTraining: {
        ...prev.modelTraining,
        progress: Math.min(100, prev.modelTraining.progress + Math.random() * 0.5),
      },
      marketPredictions: {
        ...prev.marketPredictions,
        shortTerm: {
          ...prev.marketPredictions.shortTerm,
          bullish: Math.min(
            100,
            Math.max(0, prev.marketPredictions.shortTerm.bullish + (Math.random() - 0.45) * 2)
          ),
          bearish: Math.min(
            100,
            Math.max(0, prev.marketPredictions.shortTerm.bearish + (Math.random() - 0.55) * 2)
          ),
        },
      },
    }));

    setQuantumData(prev => ({
      ...prev,
      marketPredictions: {
        ...prev.marketPredictions,
        shortTerm: {
          ...prev.marketPredictions.shortTerm,
          bearish: 100 - prev.marketPredictions.shortTerm.bullish,
        },
        midTerm: {
          ...prev.marketPredictions.midTerm,
          bearish: 100 - prev.marketPredictions.midTerm.bullish,
        },
        longTerm: {
          ...prev.marketPredictions.longTerm,
          bearish: 100 - prev.marketPredictions.longTerm.bullish,
        },
      },
    }));

    setAiInsights(prev =>
      prev.map(insight => ({
        ...insight,
        confidence: Math.min(100, insight.confidence + (Math.random() - 0.45) * 0.5),
      }))
    );
  };

  const getPredictionColor = prediction => {
    switch (prediction.toLowerCase()) {
      case 'strong buy':
        return 'text-green-400';
      case 'buy':
        return 'text-emerald-400';
      case 'hold':
        return 'text-yellow-400';
      case 'sell':
        return 'text-orange-400';
      case 'strong sell':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  const getConfidenceColor = confidence => {
    if (confidence >= 95) return 'text-green-400';
    if (confidence >= 85) return 'text-emerald-400';
    if (confidence >= 75) return 'text-blue-400';
    if (confidence >= 65) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="space-y-6">
      {/* Quantum AI Engine Dashboard */}
      <Card className="bg-gradient-to-r from-violet-900/20 to-fuchsia-900/20 border-violet-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Brain className="h-7 w-7 mr-3 text-violet-400" />
            🧠 Quantum AI Engine
            <Badge className="ml-3 bg-gradient-to-r from-violet-400 to-fuchsia-500">
              <Cpu className="h-4 w-4 mr-1" />
              QUANTUM POWERED
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-lg border border-violet-400/30">
              <div className="flex items-center justify-between mb-4">
                <Cpu className="h-8 w-8 text-violet-400" />
                <Badge className="bg-violet-500">QUANTUM</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {quantumData.processingPower.toFixed(1)}%
              </div>
              <p className="text-violet-400 font-semibold">Processing Power</p>
              <p className="text-gray-400 text-sm">Quantum optimization</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10 rounded-lg border border-fuchsia-400/30">
              <div className="flex items-center justify-between mb-4">
                <Zap className="h-8 w-8 text-fuchsia-400" />
                <Badge className="bg-fuchsia-500">ACCURACY</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {quantumData.predictionAccuracy.toFixed(1)}%
              </div>
              <p className="text-fuchsia-400 font-semibold">Prediction Accuracy</p>
              <p className="text-gray-400 text-sm">Market forecasting</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="h-8 w-8 text-blue-400" />
                <Badge className="bg-blue-500">SPEED</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {quantumData.quantumAdvantage.toFixed(0)}x
              </div>
              <p className="text-blue-400 font-semibold">Quantum Advantage</p>
              <p className="text-gray-400 text-sm">vs. classical computing</p>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30">
              <div className="flex items-center justify-between mb-4">
                <Network className="h-8 w-8 text-green-400" />
                <Badge className="bg-green-500">TRAINING</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {quantumData.modelTraining.progress.toFixed(1)}%
              </div>
              <p className="text-green-400 font-semibold">Model Training</p>
              <p className="text-gray-400 text-sm">Next-gen completion</p>
            </div>
          </div>

          {/* Quantum Model Training */}
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-600/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-xl flex items-center">
                <Layers className="h-6 w-6 mr-2 text-violet-400" />
                Quantum Model Training Status
              </h3>
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-green-400 font-medium">Secure Quantum Environment</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Training Progress</span>
                  <span className="text-white font-bold">
                    {quantumData.modelTraining.progress.toFixed(1)}%
                  </span>
                </div>
                <div className="h-4 bg-violet-900/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    style={{ width: `${quantumData.modelTraining.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-400">
                    Time Remaining: {quantumData.modelTraining.timeRemaining}
                  </span>
                  <span className="text-gray-400">
                    Data: {quantumData.modelTraining.dataProcessed}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-lg border border-violet-400/30">
                  <div className="text-center">
                    <Sparkles className="h-6 w-6 mx-auto mb-2 text-violet-400" />
                    <p className="text-gray-400 text-sm">Accuracy</p>
                    <p className="text-white font-bold text-xl">
                      {quantumData.modelTraining.accuracy.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
                  <div className="text-center">
                    <Cpu className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                    <p className="text-gray-400 text-sm">Qubits</p>
                    <p className="text-white font-bold text-xl">4,096</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30">
                  <div className="text-center">
                    <Lightbulb className="h-6 w-6 mx-auto mb-2 text-green-400" />
                    <p className="text-gray-400 text-sm">Features</p>
                    <p className="text-white font-bold text-xl">1,247</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg border border-yellow-400/30">
                  <div className="text-center">
                    <Wand2 className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                    <p className="text-gray-400 text-sm">Optimization</p>
                    <p className="text-white font-bold text-xl">Level 5</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold">Active Quantum Models</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quantumData.quantumModels.map((model, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-lg border border-gray-700/30"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-white font-bold">{model.name}</h5>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant="outline"
                            className={
                              model.type === 'Market Direction'
                                ? 'border-violet-400/30 text-violet-400'
                                : model.type === 'Technical Analysis'
                                  ? 'border-blue-400/30 text-blue-400'
                                  : model.type === 'News & Social'
                                    ? 'border-green-400/30 text-green-400'
                                    : 'border-yellow-400/30 text-yellow-400'
                            }
                          >
                            {model.type}
                          </Badge>
                          <Badge
                            className={`ml-2 ${model.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}
                          >
                            {model.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">
                          {model.accuracy.toFixed(1)}%
                        </div>
                        <p className="text-gray-400 text-xs">Accuracy</p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 text-sm">
                      <span className="text-gray-400">{model.qubits.toLocaleString()} qubits</span>
                      <span className="text-gray-400">Updated: {model.lastUpdate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Predictions */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-400/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center text-2xl">
            <Dices className="h-7 w-7 mr-3 text-blue-400" />
            🔮 Quantum Market Predictions
            <Badge className="ml-3 bg-gradient-to-r from-blue-400 to-cyan-500">
              <Sigma className="h-4 w-4 mr-1" />
              PROBABILISTIC
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="market" className="space-y-6">
            <TabsList className="bg-black/20 border-blue-400/30">
              <TabsTrigger value="market">Market Direction</TabsTrigger>
              <TabsTrigger value="stocks">Stock Predictions</TabsTrigger>
              <TabsTrigger value="insights">Quantum Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="market">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                    <Dices className="h-5 w-5 mr-2 text-blue-400" />
                    Short-Term (1-7 days)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-green-400">Bullish</span>
                        <span className="text-white font-bold">
                          {quantumData.marketPredictions.shortTerm.bullish.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={quantumData.marketPredictions.shortTerm.bullish}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-red-400">Bearish</span>
                        <span className="text-white font-bold">
                          {quantumData.marketPredictions.shortTerm.bearish.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={quantumData.marketPredictions.shortTerm.bearish}
                        className="h-2"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <Badge className="bg-blue-500">
                        {quantumData.marketPredictions.shortTerm.confidence.toFixed(0)}% Confidence
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/30">
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                    <Dices className="h-5 w-5 mr-2 text-purple-400" />
                    Mid-Term (1-4 weeks)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-green-400">Bullish</span>
                        <span className="text-white font-bold">
                          {quantumData.marketPredictions.midTerm.bullish.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={quantumData.marketPredictions.midTerm.bullish}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-red-400">Bearish</span>
                        <span className="text-white font-bold">
                          {quantumData.marketPredictions.midTerm.bearish.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={quantumData.marketPredictions.midTerm.bearish}
                        className="h-2"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <Badge className="bg-purple-500">
                        {quantumData.marketPredictions.midTerm.confidence.toFixed(0)}% Confidence
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30">
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                    <Dices className="h-5 w-5 mr-2 text-green-400" />
                    Long-Term (1-6 months)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-green-400">Bullish</span>
                        <span className="text-white font-bold">
                          {quantumData.marketPredictions.longTerm.bullish.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={quantumData.marketPredictions.longTerm.bullish}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-red-400">Bearish</span>
                        <span className="text-white font-bold">
                          {quantumData.marketPredictions.longTerm.bearish.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={quantumData.marketPredictions.longTerm.bearish}
                        className="h-2"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <Badge className="bg-green-500">
                        {quantumData.marketPredictions.longTerm.confidence.toFixed(0)}% Confidence
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stocks">
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-600/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-bold text-xl">{insight.ticker}</span>
                            <Badge
                              className={getPredictionColor(insight.prediction)
                                .replace('text-', 'bg-')
                                .replace('-400', '-500')}
                            >
                              {insight.prediction}
                            </Badge>
                            <Badge variant="outline" className="border-blue-400/30 text-blue-400">
                              {insight.timeFrame}
                            </Badge>
                          </div>
                          <p className="text-gray-300 mt-2 max-w-md">{insight.reasoning}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{insight.priceTarget}</div>
                        <p className="text-gray-400 text-sm">Price Target</p>
                        <div
                          className={`text-lg font-bold mt-2 ${getConfidenceColor(insight.confidence)}`}
                        >
                          {insight.confidence.toFixed(1)}% Confidence
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-lg border border-violet-400/30">
                  <h3 className="text-white font-bold text-lg mb-4">Quantum Advantage Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Processing Speed</span>
                      <span className="text-violet-400 font-bold">
                        {quantumData.quantumAdvantage.toFixed(0)}x faster
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pattern Recognition</span>
                      <span className="text-fuchsia-400 font-bold">847x more patterns</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Data Processing</span>
                      <span className="text-pink-400 font-bold">2,456x throughput</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prediction Accuracy</span>
                      <span className="text-violet-400 font-bold">
                        +{(quantumData.predictionAccuracy - 85).toFixed(1)}% vs classical
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-400/30">
                  <h3 className="text-white font-bold text-lg mb-4">Quantum Computing Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Quantum Volume</span>
                      <span className="text-blue-400 font-bold">4,096</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Coherence Time</span>
                      <span className="text-cyan-400 font-bold">150 μs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gate Fidelity</span>
                      <span className="text-blue-400 font-bold">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Error Rate</span>
                      <span className="text-cyan-400 font-bold">0.001%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
