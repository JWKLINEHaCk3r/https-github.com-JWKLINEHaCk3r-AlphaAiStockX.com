'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  Network,
  Eye,
  Zap,
  Target,
  Activity,
  TrendingUp,
  BarChart3,
  Cpu,
  Database,
  Layers,
  GitBranch,
} from 'lucide-react';

export default function NeuralMarketAnalysis() {
  const [neuralAnalysis, setNeuralAnalysis] = useState({});
  const [deepLearningModels, setDeepLearningModels] = useState([]);
  const [marketPatterns, setMarketPatterns] = useState([]);
  const [neuralPredictions, setNeuralPredictions] = useState([]);

  useEffect(() => {
    generateNeuralAnalysis();
    initializeDeepLearningModels();
    detectMarketPatterns();
    generateNeuralPredictions();

    const interval = setInterval(() => {
      generateNeuralAnalysis();
      detectMarketPatterns();
      generateNeuralPredictions();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generateNeuralAnalysis = () => {
    setNeuralAnalysis({
      marketSentiment: {
        overall: 78 + Math.random() * 20,
        bullish: 65 + Math.random() * 25,
        bearish: 15 + Math.random() * 20,
        neutral: 20 + Math.random() * 15,
        confidence: 85 + Math.random() * 15,
      },
      volatilityPrediction: {
        current: 15 + Math.random() * 25,
        predicted: 12 + Math.random() * 30,
        trend: Math.random() > 0.5 ? 'increasing' : 'decreasing',
        accuracy: 92 + Math.random() * 8,
      },
      momentumAnalysis: {
        shortTerm: Math.random() > 0.6 ? 'bullish' : 'bearish',
        mediumTerm: Math.random() > 0.5 ? 'bullish' : 'neutral',
        longTerm: Math.random() > 0.7 ? 'bullish' : 'bearish',
        strength: 70 + Math.random() * 30,
      },
      riskAssessment: {
        level: Math.random() > 0.6 ? 'low' : Math.random() > 0.3 ? 'medium' : 'high',
        score: 60 + Math.random() * 40,
        factors: ['Market Volatility', 'Economic Indicators', 'Geopolitical Events'],
        mitigation: 85 + Math.random() * 15,
      },
    });
  };

  const initializeDeepLearningModels = () => {
    const models = [
      {
        id: 1,
        name: 'Alpha-CNN Market Vision',
        type: 'Convolutional Neural Network',
        accuracy: 96.8,
        layers: 152,
        parameters: '45M',
        specialty: 'Chart Pattern Recognition',
        status: 'active',
        processing: 'Real-time Analysis',
      },
      {
        id: 2,
        name: 'Temporal-LSTM Predictor',
        type: 'Long Short-Term Memory',
        accuracy: 94.2,
        layers: 8,
        parameters: '23M',
        specialty: 'Time Series Forecasting',
        status: 'active',
        processing: 'Price Prediction',
      },
      {
        id: 3,
        name: 'Transformer-Alpha',
        type: 'Attention Mechanism',
        accuracy: 97.5,
        layers: 24,
        parameters: '110M',
        specialty: 'Market Sentiment Analysis',
        status: 'active',
        processing: 'News & Social Media',
      },
      {
        id: 4,
        name: 'GAN-Market Simulator',
        type: 'Generative Adversarial Network',
        accuracy: 93.7,
        layers: 16,
        parameters: '67M',
        specialty: 'Scenario Generation',
        status: 'training',
        processing: 'Synthetic Data Creation',
      },
      {
        id: 5,
        name: 'Reinforcement-Trader',
        type: 'Deep Q-Network',
        accuracy: 95.1,
        layers: 12,
        parameters: '34M',
        specialty: 'Trading Strategy Optimization',
        status: 'active',
        processing: 'Strategy Learning',
      },
    ];

    setDeepLearningModels(models);
  };

  const detectMarketPatterns = () => {
    const patterns = [
      {
        id: 1,
        name: 'Head and Shoulders',
        confidence: 87 + Math.random() * 13,
        timeframe: '4H',
        symbol: 'AAPL',
        direction: 'bearish',
        completion: 75 + Math.random() * 25,
        target: 165.5,
        probability: 82,
      },
      {
        id: 2,
        name: 'Ascending Triangle',
        confidence: 92 + Math.random() * 8,
        timeframe: '1D',
        symbol: 'TSLA',
        direction: 'bullish',
        completion: 85 + Math.random() * 15,
        target: 285.75,
        probability: 89,
      },
      {
        id: 3,
        name: 'Double Bottom',
        confidence: 78 + Math.random() * 22,
        timeframe: '1H',
        symbol: 'NVDA',
        direction: 'bullish',
        completion: 65 + Math.random() * 35,
        target: 520.25,
        probability: 76,
      },
      {
        id: 4,
        name: 'Bull Flag',
        confidence: 94 + Math.random() * 6,
        timeframe: '15M',
        symbol: 'MSFT',
        direction: 'bullish',
        completion: 90 + Math.random() * 10,
        target: 385.0,
        probability: 91,
      },
    ];

    setMarketPatterns(patterns);
  };

  const generateNeuralPredictions = () => {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'META'];
    const predictions = symbols.map(symbol => ({
      symbol,
      neuralScore: 75 + Math.random() * 25,
      priceTarget: 100 + Math.random() * 400,
      timeframe: ['1H', '4H', '1D', '3D'][Math.floor(Math.random() * 4)],
      confidence: 80 + Math.random() * 20,
      direction: Math.random() > 0.5 ? 'bullish' : 'bearish',
      volatility: 10 + Math.random() * 30,
      momentum: 50 + Math.random() * 50,
      riskLevel: Math.random() > 0.6 ? 'low' : Math.random() > 0.3 ? 'medium' : 'high',
    }));

    setNeuralPredictions(predictions);
  };

  const getDirectionColor = direction => {
    return direction === 'bullish' ? 'text-green-400' : 'text-red-400';
  };

  const getRiskColor = risk => {
    switch (risk) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Neural Market Overview */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-6 w-6 mr-2 text-blue-400" />
            Neural Market Analysis
            <Badge className="ml-3 bg-gradient-to-r from-blue-500 to-purple-500">
              <Network className="h-3 w-3 mr-1" />
              Deep Learning
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-400 font-semibold">Market Sentiment</span>
                <Eye className="h-4 w-4 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">
                {neuralAnalysis.marketSentiment?.overall.toFixed(0)}%
              </p>
              <Progress value={neuralAnalysis.marketSentiment?.overall} className="h-2 mt-2" />
              <p className="text-xs text-gray-400 mt-1">
                Confidence: {neuralAnalysis.marketSentiment?.confidence.toFixed(0)}%
              </p>
            </div>

            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400 font-semibold">Volatility</span>
                <Activity className="h-4 w-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">
                {neuralAnalysis.volatilityPrediction?.current.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-300">
                Predicted: {neuralAnalysis.volatilityPrediction?.predicted.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Accuracy: {neuralAnalysis.volatilityPrediction?.accuracy.toFixed(0)}%
              </p>
            </div>

            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-semibold">Momentum</span>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
              <p className="text-lg font-bold text-white">
                {neuralAnalysis.momentumAnalysis?.shortTerm.toUpperCase()}
              </p>
              <p className="text-sm text-gray-300">
                Strength: {neuralAnalysis.momentumAnalysis?.strength.toFixed(0)}%
              </p>
              <Progress value={neuralAnalysis.momentumAnalysis?.strength} className="h-2 mt-2" />
            </div>

            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-400 font-semibold">Risk Level</span>
                <Target className="h-4 w-4 text-red-400" />
              </div>
              <p className="text-lg font-bold text-white">
                {neuralAnalysis.riskAssessment?.level.toUpperCase()}
              </p>
              <p className="text-sm text-gray-300">
                Score: {neuralAnalysis.riskAssessment?.score.toFixed(0)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Mitigation: {neuralAnalysis.riskAssessment?.mitigation.toFixed(0)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deep Learning Models */}
      <Card className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Cpu className="h-6 w-6 mr-2 text-cyan-400" />
            Active Deep Learning Models
            <Badge className="ml-3 bg-gradient-to-r from-cyan-500 to-blue-500">
              <Database className="h-3 w-3 mr-1" />
              Neural Networks
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {deepLearningModels.map(model => (
              <div
                key={model.id}
                className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold">{model.name}</span>
                        <Badge
                          className={model.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}
                        >
                          {model.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">{model.specialty}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Type</p>
                      <p className="text-cyan-400 font-semibold text-xs">{model.type}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Accuracy</p>
                      <p className="text-green-400 font-bold">{model.accuracy}%</p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Layers</p>
                      <p className="text-blue-400 font-bold">{model.layers}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Parameters</p>
                      <p className="text-purple-400 font-bold">{model.parameters}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">{model.processing}</p>
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 mt-1">
                      <Layers className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pattern Recognition */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <GitBranch className="h-6 w-6 mr-2 text-green-400" />
            AI Pattern Recognition
            <Badge className="ml-3 bg-gradient-to-r from-green-500 to-emerald-500">
              <Eye className="h-3 w-3 mr-1" />
              Computer Vision
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketPatterns.map(pattern => (
              <div
                key={pattern.id}
                className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold">{pattern.name}</span>
                        <Badge className={getDirectionColor(pattern.direction)}>
                          {pattern.direction.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="border-green-500/30 text-green-400">
                          {pattern.symbol}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">Timeframe: {pattern.timeframe}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Confidence</p>
                      <p className="text-green-400 font-bold">{pattern.confidence.toFixed(0)}%</p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Completion</p>
                      <p className="text-blue-400 font-bold">{pattern.completion.toFixed(0)}%</p>
                      <Progress value={pattern.completion} className="w-16 h-1 mt-1" />
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Target</p>
                      <p className="text-yellow-400 font-bold">${pattern.target}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Probability</p>
                      <p className="text-purple-400 font-bold">{pattern.probability}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Neural Predictions */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="h-6 w-6 mr-2 text-purple-400" />
            Neural Network Predictions
            <Badge className="ml-3 bg-gradient-to-r from-purple-500 to-pink-500">
              <BarChart3 className="h-3 w-3 mr-1" />
              AI Forecasting
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {neuralPredictions.map((prediction, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold text-lg">{prediction.symbol}</span>
                    <Badge className={getDirectionColor(prediction.direction)}>
                      {prediction.direction.toUpperCase()}
                    </Badge>
                  </div>
                  <Badge className="bg-purple-500">{prediction.confidence.toFixed(0)}%</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Neural Score:</span>
                    <p className="text-purple-400 font-bold">{prediction.neuralScore.toFixed(0)}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Price Target:</span>
                    <p className="text-white font-bold">${prediction.priceTarget.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Timeframe:</span>
                    <p className="text-blue-400 font-bold">{prediction.timeframe}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Risk Level:</span>
                    <p className={`font-bold ${getRiskColor(prediction.riskLevel)}`}>
                      {prediction.riskLevel.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Momentum</span>
                    <span>{prediction.momentum.toFixed(0)}%</span>
                  </div>
                  <Progress value={prediction.momentum} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
