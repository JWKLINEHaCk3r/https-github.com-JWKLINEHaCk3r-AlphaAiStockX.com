'use client';

import { useState, useEffect, useRef } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Eye,
  Camera,
  Scan,
  Target,
  Zap,
  Brain,
  BarChart3,
  Activity,
  Layers,
  ImageIcon,
  Search,
} from 'lucide-react';

export default function ComputerVisionAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [chartPatterns, setChartPatterns] = useState([]);
  const [visionModels, setVisionModels] = useState([]);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    initializeVisionModels();
    generateMockAnalysis();
  }, []);

  const initializeVisionModels = () => {
    const models = [
      {
        id: 1,
        name: 'Chart Pattern CNN',
        type: 'Convolutional Neural Network',
        accuracy: 96.8,
        specialty: 'Technical Pattern Recognition',
        status: 'active',
        confidence: 94.2,
        processing: 'Real-time Chart Analysis',
      },
      {
        id: 2,
        name: 'Candlestick Vision AI',
        type: 'Deep Learning Classifier',
        accuracy: 93.5,
        specialty: 'Candlestick Pattern Detection',
        status: 'active',
        confidence: 91.7,
        processing: 'Price Action Analysis',
      },
      {
        id: 3,
        name: 'Support/Resistance Detector',
        type: 'Object Detection Model',
        accuracy: 95.1,
        specialty: 'Key Level Identification',
        status: 'active',
        confidence: 89.3,
        processing: 'Level Detection',
      },
      {
        id: 4,
        name: 'Volume Profile Analyzer',
        type: 'Semantic Segmentation',
        accuracy: 92.7,
        specialty: 'Volume Analysis',
        status: 'training',
        confidence: 87.9,
        processing: 'Volume Pattern Recognition',
      },
    ];

    setVisionModels(models);
  };

  const generateMockAnalysis = () => {
    const patterns = [
      {
        id: 1,
        pattern: 'Head and Shoulders',
        confidence: 94.2,
        coordinates: { x: 150, y: 200, width: 300, height: 150 },
        direction: 'bearish',
        target: 165.5,
        probability: 87,
        timeframe: '4H',
      },
      {
        id: 2,
        pattern: 'Ascending Triangle',
        confidence: 91.8,
        coordinates: { x: 500, y: 180, width: 250, height: 120 },
        direction: 'bullish',
        target: 285.75,
        probability: 83,
        timeframe: '1D',
      },
      {
        id: 3,
        pattern: 'Double Bottom',
        confidence: 88.5,
        coordinates: { x: 800, y: 250, width: 200, height: 100 },
        direction: 'bullish',
        target: 195.25,
        probability: 79,
        timeframe: '1H',
      },
    ];

    setChartPatterns(patterns);

    const results = [
      {
        id: 1,
        type: 'Support Level',
        value: 175.5,
        strength: 92,
        touches: 5,
        confidence: 96.3,
        color: 'green',
      },
      {
        id: 2,
        type: 'Resistance Level',
        value: 185.75,
        strength: 88,
        touches: 3,
        confidence: 91.7,
        color: 'red',
      },
      {
        id: 3,
        type: 'Trend Line',
        slope: 'ascending',
        strength: 85,
        points: 4,
        confidence: 89.2,
        color: 'blue',
      },
      {
        id: 4,
        type: 'Volume Spike',
        location: 'breakout zone',
        magnitude: 340,
        significance: 94,
        confidence: 93.8,
        color: 'purple',
      },
    ];

    setAnalysisResults(results);
  };

  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setSelectedImage(e.target.result);
        analyzeChart(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeChart = async imageData => {
    setIsAnalyzing(true);
    setProcessingProgress(0);

    // Simulate AI processing with progress updates
    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate analysis completion
    setTimeout(() => {
      generateMockAnalysis();
      setIsAnalyzing(false);
      setProcessingProgress(100);
    }, 3000);
  };

  const drawAnalysisOverlay = () => {
    if (!canvasRef.current || !selectedImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw detected patterns
    chartPatterns.forEach(pattern => {
      ctx.strokeStyle = pattern.direction === 'bullish' ? '#10B981' : '#EF4444';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(
        pattern.coordinates.x,
        pattern.coordinates.y,
        pattern.coordinates.width,
        pattern.coordinates.height
      );

      // Add label
      ctx.fillStyle = pattern.direction === 'bullish' ? '#10B981' : '#EF4444';
      ctx.font = '14px Arial';
      ctx.fillText(
        `${pattern.pattern} (${pattern.confidence.toFixed(1)}%)`,
        pattern.coordinates.x,
        pattern.coordinates.y - 10
      );
    });
  };

  useEffect(() => {
    if (selectedImage && chartPatterns.length > 0) {
      drawAnalysisOverlay();
    }
  }, [selectedImage, chartPatterns]);

  return (
    <div className="space-y-6">
      {/* Computer Vision Control Panel */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-blue-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Eye className="h-6 w-6 mr-2 text-blue-400" />
            Computer Vision Analysis
            <Badge className="ml-3 bg-gradient-to-r from-blue-500 to-indigo-500">
              <Camera className="h-3 w-3 mr-1" />
              AI Vision
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Upload Section */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Chart Upload</h4>

              <div className="space-y-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  disabled={isAnalyzing}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Upload Chart Image
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {isAnalyzing && (
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 text-sm">Analyzing Chart...</span>
                      <span className="text-white text-sm">{processingProgress.toFixed(0)}%</span>
                    </div>
                    <Progress value={processingProgress} className="h-2" />
                  </div>
                )}

                <div className="text-xs text-gray-400">
                  Supported formats: JPG, PNG, GIF
                  <br />
                  Max size: 10MB
                </div>
              </div>
            </div>

            {/* Vision Models Status */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Active Vision Models</h4>

              <div className="space-y-2">
                {visionModels.slice(0, 3).map(model => (
                  <div
                    key={model.id}
                    className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/30"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-indigo-400 text-sm font-medium">{model.name}</span>
                      <Badge
                        className={model.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}
                      >
                        {model.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Accuracy: {model.accuracy}%</span>
                      <span>Confidence: {model.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Statistics */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Analysis Statistics</h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <Scan className="h-6 w-6 text-green-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Patterns Detected</p>
                  <p className="text-lg font-bold text-green-400">{chartPatterns.length}</p>
                </div>

                <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <Target className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Key Levels</p>
                  <p className="text-lg font-bold text-purple-400">{analysisResults.length}</p>
                </div>

                <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <Brain className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Avg Confidence</p>
                  <p className="text-lg font-bold text-yellow-400">
                    {chartPatterns.length > 0
                      ? (
                          chartPatterns.reduce((sum, p) => sum + p.confidence, 0) /
                          chartPatterns.length
                        ).toFixed(1)
                      : 0}
                    %
                  </p>
                </div>

                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <Activity className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Processing Speed</p>
                  <p className="text-lg font-bold text-blue-400">2.3s</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Analysis Display */}
      {selectedImage && (
        <Card className="bg-gradient-to-r from-gray-900/20 to-slate-900/20 border-gray-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Search className="h-6 w-6 mr-2 text-gray-400" />
              Chart Analysis Results
              <Badge className="ml-3 bg-gradient-to-r from-gray-500 to-slate-500">
                <Layers className="h-3 w-3 mr-1" />
                Computer Vision
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <img
                src={selectedImage || '/placeholder.svg'}
                alt="Chart Analysis"
                className="w-full max-h-96 object-contain rounded-lg"
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                width={800}
                height={400}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detected Patterns */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-green-400" />
            Detected Chart Patterns
            <Badge className="ml-3 bg-gradient-to-r from-green-500 to-emerald-500">
              <Eye className="h-3 w-3 mr-1" />
              Pattern Recognition
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chartPatterns.map(pattern => (
              <div
                key={pattern.id}
                className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold">{pattern.pattern}</span>
                        <Badge
                          className={
                            pattern.direction === 'bullish' ? 'bg-green-500' : 'bg-red-500'
                          }
                        >
                          {pattern.direction.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="border-green-500/30 text-green-400">
                          {pattern.timeframe}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">
                        Coordinates: ({pattern.coordinates.x}, {pattern.coordinates.y})
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Confidence</p>
                      <p className="text-green-400 font-bold">{pattern.confidence.toFixed(1)}%</p>
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

                  <div className="text-right">
                    <Progress value={pattern.confidence} className="w-20 h-2" />
                    <p className="text-xs text-gray-400 mt-1">Detection Score</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-6 w-6 mr-2 text-purple-400" />
            Key Level Analysis
            <Badge className="ml-3 bg-gradient-to-r from-purple-500 to-pink-500">
              <Zap className="h-3 w-3 mr-1" />
              AI Detection
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisResults.map(result => (
              <div
                key={result.id}
                className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold">{result.type}</span>
                    <div
                      className={`w-3 h-3 rounded-full`}
                      style={{ backgroundColor: result.color }}
                    />
                  </div>
                  <Badge className="bg-purple-500">{result.confidence.toFixed(1)}%</Badge>
                </div>

                <div className="space-y-2">
                  {result.value && (
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Value:</span>
                      <span className="text-white font-semibold">${result.value}</span>
                    </div>
                  )}

                  {result.strength && (
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Strength:</span>
                      <span className="text-purple-400 font-semibold">{result.strength}%</span>
                    </div>
                  )}

                  {result.touches && (
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Touches:</span>
                      <span className="text-blue-400 font-semibold">{result.touches}</span>
                    </div>
                  )}

                  {result.slope && (
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Direction:</span>
                      <span className="text-green-400 font-semibold">{result.slope}</span>
                    </div>
                  )}

                  {result.magnitude && (
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Magnitude:</span>
                      <span className="text-yellow-400 font-semibold">{result.magnitude}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vision Models Detail */}
      <Card className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-6 w-6 mr-2 text-cyan-400" />
            Computer Vision Models
            <Badge className="ml-3 bg-gradient-to-r from-cyan-500 to-blue-500">
              <Layers className="h-3 w-3 mr-1" />
              Deep Learning
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {visionModels.map(model => (
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
                      <p className="text-gray-400 text-sm">Confidence</p>
                      <p className="text-blue-400 font-bold">{model.confidence}%</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">{model.processing}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyan-500/30 text-cyan-400 mt-2"
                    >
                      Configure
                    </Button>
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
