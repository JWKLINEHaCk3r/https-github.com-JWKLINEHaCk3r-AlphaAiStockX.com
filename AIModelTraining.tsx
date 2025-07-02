'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Brain,
  Cpu,
  Database,
  Zap,
  BarChart3,
  Target,
  Settings,
  Play,
  Pause,
  Square,
} from 'lucide-react';

export default function AIModelTraining() {
  const [trainingStatus, setTrainingStatus] = useState('idle'); // idle, training, completed, deployed
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [trainingConfig, setTrainingConfig] = useState({
    modelType: 'neural-network',
    datasetSize: '1M',
    epochs: 100,
    learningRate: 0.001,
    batchSize: 32,
    validationSplit: 0.2,
    features: ['price', 'volume', 'indicators', 'sentiment'],
    targetPrediction: 'price-direction',
    timeframe: '1D',
    lookbackPeriod: 60,
  });

  const modelTypes = [
    { id: 'neural-network', name: 'Deep Neural Network', accuracy: '92%', speed: 'Fast' },
    { id: 'lstm', name: 'LSTM Recurrent Network', accuracy: '89%', speed: 'Medium' },
    { id: 'transformer', name: 'Transformer Architecture', accuracy: '94%', speed: 'Slow' },
    { id: 'ensemble', name: 'Ensemble Model', accuracy: '96%', speed: 'Medium' },
    { id: 'reinforcement', name: 'Reinforcement Learning', accuracy: '91%', speed: 'Fast' },
    { id: 'gradient-boost', name: 'Gradient Boosting', accuracy: '87%', speed: 'Very Fast' },
  ];

  const predictionTargets = [
    { id: 'price-direction', name: 'Price Direction (Up/Down)', type: 'classification' },
    { id: 'price-target', name: 'Price Target', type: 'regression' },
    { id: 'volatility', name: 'Volatility Prediction', type: 'regression' },
    { id: 'support-resistance', name: 'Support/Resistance Levels', type: 'regression' },
    { id: 'pattern-recognition', name: 'Pattern Recognition', type: 'classification' },
    { id: 'risk-assessment', name: 'Risk Assessment', type: 'classification' },
  ];

  useEffect(() => {
    generateModels();

    if (trainingStatus === 'training') {
      const interval = setInterval(() => {
        setTrainingProgress(prev => {
          if (prev >= 100) {
            setTrainingStatus('completed');
            return 100;
          }
          return prev + Math.random() * 5;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [trainingStatus]);

  const generateModels = () => {
    const modelList = [
      {
        id: 1,
        name: 'AlphaAI Stock Predictor v3.2',
        type: 'neural-network',
        status: 'deployed',
        accuracy: 94.2,
        trainingTime: '2h 34m',
        dataPoints: '2.5M',
        lastTrained: '2024-01-15',
        performance: {
          precision: 0.942,
          recall: 0.938,
          f1Score: 0.94,
          sharpeRatio: 2.34,
          maxDrawdown: 8.2,
          winRate: 73.5,
        },
        predictions: 15847,
        profitability: 23.7,
      },
      {
        id: 2,
        name: 'Options Flow Predictor v2.1',
        type: 'lstm',
        status: 'training',
        accuracy: 91.8,
        trainingTime: '4h 12m',
        dataPoints: '1.8M',
        lastTrained: '2024-01-14',
        performance: {
          precision: 0.918,
          recall: 0.915,
          f1Score: 0.916,
          sharpeRatio: 2.12,
          maxDrawdown: 12.1,
          winRate: 69.3,
        },
        predictions: 8934,
        profitability: 18.9,
      },
      {
        id: 3,
        name: 'Crypto Pattern AI v1.7',
        type: 'transformer',
        status: 'completed',
        accuracy: 96.1,
        trainingTime: '6h 45m',
        dataPoints: '3.2M',
        lastTrained: '2024-01-13',
        performance: {
          precision: 0.961,
          recall: 0.958,
          f1Score: 0.959,
          sharpeRatio: 2.78,
          maxDrawdown: 6.4,
          winRate: 78.2,
        },
        predictions: 12456,
        profitability: 31.4,
      },
      {
        id: 4,
        name: 'Forex Momentum AI v2.8',
        type: 'ensemble',
        status: 'idle',
        accuracy: 88.7,
        trainingTime: '3h 21m',
        dataPoints: '1.9M',
        lastTrained: '2024-01-12',
        performance: {
          precision: 0.887,
          recall: 0.884,
          f1Score: 0.885,
          sharpeRatio: 1.98,
          maxDrawdown: 14.7,
          winRate: 65.8,
        },
        predictions: 6723,
        profitability: 16.2,
      },
    ];

    setModels(modelList);
  };

  const startTraining = () => {
    setTrainingStatus('training');
    setTrainingProgress(0);
  };

  const pauseTraining = () => {
    setTrainingStatus('idle');
  };

  const deployModel = modelId => {
    setModels(prev =>
      prev.map(model =>
        model.id === modelId
          ? { ...model, status: 'deployed' }
          : { ...model, status: model.status === 'deployed' ? 'idle' : model.status }
      )
    );
  };

  const getStatusColor = status => {
    switch (status) {
      case 'deployed':
        return 'bg-green-500';
      case 'training':
        return 'bg-blue-500 animate-pulse';
      case 'completed':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getModelTypeColor = type => {
    const colors = {
      'neural-network': 'bg-red-500/20 text-red-300 border-red-500/30',
      lstm: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      transformer: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      ensemble: 'bg-green-500/20 text-green-300 border-green-500/30',
      reinforcement: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'gradient-boost': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    };
    return colors[type] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  return (
    <div className="space-y-6">
      {/* AI Model Training Control Panel */}
      <Card className="bg-gray-900/90 border-red-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center">
            <Brain className="h-6 w-6 mr-2 text-red-400" />
            AI Model Training & Deployment Center
            <Badge className="ml-3 bg-gradient-to-r from-red-500 to-orange-600">
              <Cpu className="h-3 w-3 mr-1" />
              Neural Networks
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Training Configuration */}
            <div className="space-y-4">
              <h3 className="text-gray-200 font-semibold">Training Configuration</h3>

              <div className="space-y-2">
                <label className="text-gray-200 text-sm font-medium">Model Type</label>
                <Select
                  value={trainingConfig.modelType}
                  onValueChange={value =>
                    setTrainingConfig(prev => ({ ...prev, modelType: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-800/30 border-red-500/30 text-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {modelTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs text-gray-400">
                            Accuracy: {type.accuracy} • Speed: {type.speed}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-gray-200 text-sm font-medium">Prediction Target</label>
                <Select
                  value={trainingConfig.targetPrediction}
                  onValueChange={value =>
                    setTrainingConfig(prev => ({ ...prev, targetPrediction: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-800/30 border-red-500/30 text-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {predictionTargets.map(target => (
                      <SelectItem key={target.id} value={target.id}>
                        <div>
                          <div className="font-medium">{target.name}</div>
                          <div className="text-xs text-gray-400">Type: {target.type}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="text-gray-200 text-sm font-medium">Epochs</label>
                  <Input
                    type="number"
                    value={trainingConfig.epochs}
                    onChange={e =>
                      setTrainingConfig(prev => ({
                        ...prev,
                        epochs: Number.parseInt(e.target.value),
                      }))
                    }
                    className="bg-gray-800/30 border-red-500/30 text-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-200 text-sm font-medium">Learning Rate</label>
                  <Input
                    type="number"
                    step="0.0001"
                    value={trainingConfig.learningRate}
                    onChange={e =>
                      setTrainingConfig(prev => ({
                        ...prev,
                        learningRate: Number.parseFloat(e.target.value),
                      }))
                    }
                    className="bg-gray-800/30 border-red-500/30 text-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-200 text-sm font-medium">Dataset Size</label>
                <Select
                  value={trainingConfig.datasetSize}
                  onValueChange={value =>
                    setTrainingConfig(prev => ({ ...prev, datasetSize: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-800/30 border-red-500/30 text-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="100K">100K Data Points</SelectItem>
                    <SelectItem value="500K">500K Data Points</SelectItem>
                    <SelectItem value="1M">1M Data Points</SelectItem>
                    <SelectItem value="5M">5M Data Points</SelectItem>
                    <SelectItem value="10M">10M Data Points</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Training Progress */}
            <div className="space-y-4">
              <h3 className="text-gray-200 font-semibold">Training Progress</h3>

              <div className="p-4 bg-gray-800/30 rounded-lg border border-red-500/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-200">Current Training</span>
                  <Badge className={getStatusColor(trainingStatus)}>
                    {trainingStatus.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{trainingProgress.toFixed(1)}%</span>
                    </div>
                    <Progress value={trainingProgress} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Model Type:</span>
                      <p className="text-gray-200">
                        {modelTypes.find(t => t.id === trainingConfig.modelType)?.name}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Dataset:</span>
                      <p className="text-gray-200">{trainingConfig.datasetSize}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Epochs:</span>
                      <p className="text-gray-200">{trainingConfig.epochs}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Learning Rate:</span>
                      <p className="text-gray-200">{trainingConfig.learningRate}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                {trainingStatus === 'idle' && (
                  <Button
                    onClick={startTraining}
                    className="flex-1 bg-gradient-to-r from-red-600 to-orange-700 hover:from-red-700 hover:to-orange-800"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Training
                  </Button>
                )}

                {trainingStatus === 'training' && (
                  <Button
                    onClick={pauseTraining}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Training
                  </Button>
                )}

                {trainingStatus === 'completed' && (
                  <Button
                    onClick={() => setTrainingStatus('idle')}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                )}
              </div>
            </div>

            {/* Model Performance */}
            <div className="space-y-4">
              <h3 className="text-gray-200 font-semibold">Performance Metrics</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-red-500/20">
                  <Database className="h-6 w-6 text-red-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Total Models</p>
                  <p className="text-lg font-bold text-red-400">{models.length}</p>
                </div>

                <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-red-500/20">
                  <Target className="h-6 w-6 text-green-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Deployed</p>
                  <p className="text-lg font-bold text-green-400">
                    {models.filter(m => m.status === 'deployed').length}
                  </p>
                </div>

                <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-red-500/20">
                  <Zap className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Avg Accuracy</p>
                  <p className="text-lg font-bold text-blue-400">
                    {(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length).toFixed(1)}%
                  </p>
                </div>

                <div className="text-center p-3 bg-gray-800/50 rounded-lg border border-red-500/20">
                  <BarChart3 className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Avg Profit</p>
                  <p className="text-lg font-bold text-purple-400">
                    {(models.reduce((sum, m) => sum + m.profitability, 0) / models.length).toFixed(
                      1
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Management */}
      <Card className="bg-gray-900/90 border-red-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center">
            <Settings className="h-6 w-6 mr-2 text-red-400" />
            AI Model Management & Deployment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {models.map(model => (
              <div
                key={model.id}
                className="p-4 bg-gray-800/50 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-100 font-bold text-lg">{model.name}</span>
                        <Badge className={getStatusColor(model.status)}>
                          {model.status.toUpperCase()}
                        </Badge>
                        <Badge className={getModelTypeColor(model.type)}>
                          {model.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">
                        Last trained: {model.lastTrained} • {model.dataPoints} data points •{' '}
                        {model.trainingTime}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Accuracy</p>
                      <p className="text-green-400 font-bold text-lg">
                        {model.accuracy.toFixed(1)}%
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Win Rate</p>
                      <p className="text-blue-400 font-bold text-lg">
                        {model.performance.winRate.toFixed(1)}%
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Sharpe Ratio</p>
                      <p className="text-purple-400 font-bold text-lg">
                        {model.performance.sharpeRatio.toFixed(2)}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Profitability</p>
                      <p className="text-red-400 font-bold text-lg">
                        {model.profitability.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {model.status === 'completed' && (
                      <Button
                        onClick={() => deployModel(model.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Deploy Model
                      </Button>
                    )}

                    {model.status === 'deployed' && (
                      <Button
                        onClick={() =>
                          setModels(prev =>
                            prev.map(m => (m.id === model.id ? { ...m, status: 'idle' } : m))
                          )
                        }
                        variant="outline"
                        className="border-red-500/30 text-red-400"
                      >
                        Stop Model
                      </Button>
                    )}

                    <Button variant="outline" className="border-gray-500/30 text-gray-400">
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="mt-4 pt-4 border-t border-gray-700/30">
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Precision:</span>
                      <p className="text-gray-200 font-semibold">
                        {model.performance.precision.toFixed(3)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Recall:</span>
                      <p className="text-gray-200 font-semibold">
                        {model.performance.recall.toFixed(3)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">F1 Score:</span>
                      <p className="text-gray-200 font-semibold">
                        {model.performance.f1Score.toFixed(3)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Max Drawdown:</span>
                      <p className="text-red-400 font-semibold">
                        {model.performance.maxDrawdown.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Predictions:</span>
                      <p className="text-gray-200 font-semibold">
                        {model.predictions.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <p className="text-gray-200 font-semibold">{model.status}</p>
                    </div>
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
