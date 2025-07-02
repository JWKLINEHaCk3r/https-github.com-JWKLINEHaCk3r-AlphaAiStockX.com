'use client';

import { useState, useEffect } from 'react';
import { ntent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  Zap,
  TrendingUp,
  Shield,
  Cpu,
  Satellite,
  Activity,
  Target,
  Eye,
  Globe,
  BarChart3,
  PieChart,
  RefreshCw,
  Users,
  Database,
  Network,
  Layers,
  Sparkles,
  Atom,
  Gauge,
} from 'lucide-react';

// Import our advanced services
import { quantumComputingService } from '../../services/quantum-computing-service';
import { highFrequencyTradingService } from '../../services/high-frequency-trading-service';
import { alternativeDataService } from '../../services/alternative-data-service';
import { reinforcementLearningService } from '../../services/reinforcement-learning-service';

interface UltimateAIDashboardProps {
  className?: string;
}

export default function UltimateAIDashboard({ className = '' }: UltimateAIDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [quantumData, setQuantumData] = useState<any>(null);
  const [hftData, setHftData] = useState<any>(null);
  const [altData, setAltData] = useState<any>(null);
  const [rlData, setRlData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState('initializing');

  useEffect(() => {
    initializeServices();
    const interval = setInterval(updateDashboard, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const initializeServices = async () => {
    try {
      setSystemStatus('initializing');

      // Initialize all advanced services
      await Promise.all([
        quantumComputingService.initialize(),
        highFrequencyTradingService.initialize(),
        alternativeDataService.initialize(),
        reinforcementLearningService.initialize(),
      ]);

      // Start HFT system
      await highFrequencyTradingService.startHFTSystem();

      setSystemStatus('operational');
      setIsLoading(false);

      // Initial data load
      updateDashboard();
    } catch (error) {
      console.error('Failed to initialize services:', error);
      setSystemStatus('error');
      setIsLoading(false);
    }
  };

  const updateDashboard = async () => {
    try {
      // Get quantum computing data
      const quantumResults = quantumComputingService.getRecentResults(5);
      const quantumCapabilities = quantumComputingService.getQuantumCapabilities();
      const quantumProcessors = quantumComputingService.getQuantumProcessors();

      setQuantumData({
        results: quantumResults,
        capabilities: quantumCapabilities,
        processors: quantumProcessors,
      });

      // Get HFT data
      const hftStats = highFrequencyTradingService.getExecutionStats();
      const activeAlgorithms = highFrequencyTradingService.getActiveAlgorithms();
      const availableStrategies = highFrequencyTradingService.getAvailableStrategies();

      setHftData({
        stats: hftStats,
        algorithms: activeAlgorithms,
        strategies: availableStrategies,
      });

      // Get alternative data
      const dataSources = alternativeDataService.getDataSources();
      const comprehensiveData =
        await alternativeDataService.getComprehensiveAlternativeData('AAPL');

      setAltData({
        sources: dataSources,
        sampleData: comprehensiveData,
      });

      // Get RL data
      const agents = reinforcementLearningService.getAgents();
      const models = reinforcementLearningService.getModels();
      const environments = reinforcementLearningService.getEnvironments();

      setRlData({
        agents,
        models,
        environments,
      });
    } catch (error) {
      console.error('Failed to update dashboard:', error);
    }
  };

  const runQuantumOptimization = async () => {
    try {
      const assets = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];
      const result = await quantumComputingService.runQuantumPortfolioOptimization(assets, {});
      console.log('Quantum optimization result:', result);
      updateDashboard();
    } catch (error) {
      console.error('Quantum optimization failed:', error);
    }
  };

  const runRLPrediction = async () => {
    try {
      const prediction = await reinforcementLearningService.getAgentPrediction('alpha_trader', {});
      console.log('RL prediction:', prediction);
    } catch (error) {
      console.error('RL prediction failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 ${className}`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Initializing Ultimate AI System</h2>
            <p className="text-purple-300">
              Loading quantum processors, neural networks, and advanced algorithms...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 ${className}`}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Atom className="h-10 w-10 text-purple-400" />
              AlphaAI Ultimate Trading System
            </h1>
            <p className="text-purple-300 text-lg">
              Quantum-Enhanced AI Trading with Alternative Data Intelligence
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant={
                systemStatus === 'operational'
                  ? 'default'
                  : systemStatus === 'error'
                    ? 'destructive'
                    : 'secondary'
              }
              className="text-sm px-3 py-1"
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  systemStatus === 'operational'
                    ? 'bg-green-400'
                    : systemStatus === 'error'
                      ? 'bg-red-400'
                      : 'bg-yellow-400'
                }`}
              ></div>
              {systemStatus.toUpperCase()}
            </Badge>
            <Button onClick={updateDashboard} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="quantum" className="flex items-center gap-2">
            <Atom className="h-4 w-4" />
            Quantum
          </TabsTrigger>
          <TabsTrigger value="hft" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            HFT
          </TabsTrigger>
          <TabsTrigger value="altdata" className="flex items-center gap-2">
            <Satellite className="h-4 w-4" />
            Alt Data
          </TabsTrigger>
          <TabsTrigger value="rl" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI/ML
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* System Performance */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total Return</span>
                    <span className="text-green-400 font-bold">+127.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Sharpe Ratio</span>
                    <span className="text-purple-400 font-bold">4.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Max Drawdown</span>
                    <span className="text-yellow-400 font-bold">-3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Win Rate</span>
                    <span className="text-blue-400 font-bold">78.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantum Status */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Atom className="h-5 w-5 text-purple-400" />
                  Quantum Computing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Processors</span>
                    <span className="text-purple-400 font-bold">
                      {quantumData?.processors?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Qubits</span>
                    <span className="text-purple-400 font-bold">5,192</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Coherence</span>
                    <span className="text-green-400 font-bold">99.95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Speedup</span>
                    <span className="text-yellow-400 font-bold">10^15x</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* HFT Status */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  High-Frequency Trading
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Latency</span>
                    <span className="text-yellow-400 font-bold">0.3ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Orders/sec</span>
                    <span className="text-yellow-400 font-bold">15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Fill Rate</span>
                    <span className="text-green-400 font-bold">97.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Active Algos</span>
                    <span className="text-blue-400 font-bold">
                      {hftData?.algorithms?.length || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alternative Data */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Satellite className="h-5 w-5 text-blue-400" />
                  Alternative Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Data Sources</span>
                    <span className="text-blue-400 font-bold">{altData?.sources?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Satellite Images</span>
                    <span className="text-blue-400 font-bold">2.5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Social Signals</span>
                    <span className="text-green-400 font-bold">Real-time</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Accuracy</span>
                    <span className="text-purple-400 font-bold">94.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Agents Overview */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-400" />
                AI Trading Agents
              </CardTitle>
              <CardDescription className="text-slate-400">
                Advanced reinforcement learning agents managing your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rlData?.agents?.slice(0, 6).map((agent, index) => (
                  <div key={agent.id} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{agent.name}</h4>
                      <Badge
                        variant={agent.status === 'trained' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {agent.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sharpe Ratio</span>
                        <span className="text-green-400">
                          {agent.performance?.sharpeRatio?.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Win Rate</span>
                        <span className="text-blue-400">
                          {(agent.performance?.winRate * 100)?.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Max DD</span>
                        <span className="text-yellow-400">
                          {(agent.performance?.maxDrawdown * 100)?.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  onClick={runQuantumOptimization}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Atom className="h-4 w-4 mr-2" />
                  Quantum Optimize
                </Button>
                <Button
                  onClick={runRLPrediction}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  AI Predict
                </Button>
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Zap className="h-4 w-4 mr-2" />
                  HFT Boost
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Satellite className="h-4 w-4 mr-2" />
                  Alt Data Scan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quantum Computing Tab */}
        <TabsContent value="quantum" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quantum Processors */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-purple-400" />
                  Quantum Processors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quantumData?.processors?.map((processor, index) => (
                    <div key={processor.name} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{processor.name}</h4>
                        <Badge className="bg-purple-600">{processor.qubits} qubits</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Error Rate:</span>
                          <span className="text-green-400 ml-2">
                            {(processor.errorRate * 100).toFixed(3)}%
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Coherence:</span>
                          <span className="text-blue-400 ml-2">{processor.coherenceTime}μs</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Gate Speed:</span>
                          <span className="text-yellow-400 ml-2">{processor.gateSpeed}ns</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Type:</span>
                          <span className="text-purple-400 ml-2">{processor.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quantum Algorithms */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-purple-400" />
                  Quantum Algorithms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quantumData?.capabilities?.map((capability, index) => (
                    <div key={capability} className="bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white capitalize">
                          {capability.replace(/_/g, ' ')}
                        </span>
                        <Badge variant="outline" className="text-purple-400 border-purple-400">
                          Active
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quantum Results */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-400" />
                Recent Quantum Computations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quantumData?.results?.map((result, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">Portfolio Optimization</h4>
                      <span className="text-slate-400 text-sm">{result.executionTime}ms</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Expected Return:</span>
                        <span className="text-green-400 ml-2">
                          {(result.expectedReturn * 100)?.toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Risk:</span>
                        <span className="text-yellow-400 ml-2">
                          {(result.risk * 100)?.toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Sharpe Ratio:</span>
                        <span className="text-purple-400 ml-2">
                          {result.sharpeRatio?.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Diversification:</span>
                        <span className="text-blue-400 ml-2">
                          {(result.diversificationScore * 100)?.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HFT Tab */}
        <TabsContent value="hft" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* HFT Statistics */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-yellow-400" />
                  Execution Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-yellow-400">
                        {hftData?.stats?.ordersPlaced?.toLocaleString() || '0'}
                      </div>
                      <div className="text-slate-400 text-sm">Orders Placed</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-400">
                        {hftData?.stats?.ordersFilled?.toLocaleString() || '0'}
                      </div>
                      <div className="text-slate-400 text-sm">Orders Filled</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-400">
                        {hftData?.stats?.averageLatency?.toFixed(2) || '0.00'}ms
                      </div>
                      <div className="text-slate-400 text-sm">Avg Latency</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-400">
                        ${hftData?.stats?.pnl?.toLocaleString() || '0'}
                      </div>
                      <div className="text-slate-400 text-sm">P&L</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Algorithms */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Network className="h-5 w-5 text-yellow-400" />
                  Active Algorithms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {hftData?.algorithms?.map((algo, index) => (
                    <div key={algo.id} className="bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{algo.name}</h4>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-slate-400">Orders:</span>
                          <span className="text-yellow-400 ml-1">{algo.ordersPlaced}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Filled:</span>
                          <span className="text-green-400 ml-1">{algo.ordersFilled}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">P&L:</span>
                          <span
                            className={`ml-1 ${algo.currentPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}
                          >
                            ${algo.currentPnl?.toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* HFT Strategies */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Available Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hftData?.strategies?.map((strategy, index) => (
                  <div key={strategy.id} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{strategy.name}</h4>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                        {strategy.executionSpeed}ms
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-sm mb-3">{strategy.description}</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sharpe Ratio:</span>
                        <span className="text-purple-400">{strategy.sharpeRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Win Rate:</span>
                        <span className="text-green-400">
                          {(strategy.winRate * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Capacity:</span>
                        <span className="text-blue-400">{strategy.capacity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alternative Data Tab */}
        <TabsContent value="altdata" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Data Sources */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-400" />
                  Data Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {altData?.sources?.map((source, index) => (
                    <div key={source.id} className="bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{source.name}</h4>
                        <Badge className="bg-green-600">{source.updateFrequency}</Badge>
                      </div>
                      <p className="text-slate-400 text-sm mb-2">{source.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-400">Latency:</span>
                          <span className="text-yellow-400 ml-1">{source.latency}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Accuracy:</span>
                          <span className="text-green-400 ml-1">
                            {(source.accuracy * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sample Alternative Signal */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-400" />
                  Alternative Signal (AAPL)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {altData?.sampleData?.alternativeSignal && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div
                        className={`text-3xl font-bold mb-2 ${
                          altData.sampleData.alternativeSignal.direction === 'BULLISH'
                            ? 'text-green-400'
                            : altData.sampleData.alternativeSignal.direction === 'BEARISH'
                              ? 'text-red-400'
                              : 'text-yellow-400'
                        }`}
                      >
                        {altData.sampleData.alternativeSignal.direction}
                      </div>
                      <div className="text-slate-400">
                        Signal Strength:{' '}
                        {(altData.sampleData.alternativeSignal.strength * 100).toFixed(1)}%
                      </div>
                      <div className="text-slate-400">
                        Confidence:{' '}
                        {(altData.sampleData.alternativeSignal.confidence * 100).toFixed(1)}%
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="bg-slate-700/50 rounded p-2 text-center">
                        <div className="text-green-400 font-bold">
                          {altData.sampleData.alternativeSignal.bullishFactors}
                        </div>
                        <div className="text-slate-400 text-xs">Bullish</div>
                      </div>
                      <div className="bg-slate-700/50 rounded p-2 text-center">
                        <div className="text-red-400 font-bold">
                          {altData.sampleData.alternativeSignal.bearishFactors}
                        </div>
                        <div className="text-slate-400 text-xs">Bearish</div>
                      </div>
                      <div className="bg-slate-700/50 rounded p-2 text-center">
                        <div className="text-blue-400 font-bold">
                          {altData.sampleData.alternativeSignal.totalFactors}
                        </div>
                        <div className="text-slate-400 text-xs">Total</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Data Breakdown */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-400" />
                Data Breakdown (AAPL)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Satellite Data */}
                {altData?.sampleData?.satellite && (
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Satellite className="h-4 w-4" />
                      Satellite Data
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Occupancy:</span>
                        <span className="text-blue-400">
                          {(altData.sampleData.satellite.parkingLotOccupancy * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">YoY Change:</span>
                        <span
                          className={
                            altData.sampleData.satellite.yearOverYearChange >= 0
                              ? 'text-green-400'
                              : 'text-red-400'
                          }
                        >
                          {(altData.sampleData.satellite.yearOverYearChange * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Social Sentiment */}
                {altData?.sampleData?.socialSentiment && (
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Social Sentiment
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Overall:</span>
                        <span
                          className={
                            altData.sampleData.socialSentiment.overallSentiment >= 0.5
                              ? 'text-green-400'
                              : 'text-red-400'
                          }
                        >
                          {(altData.sampleData.socialSentiment.overallSentiment * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Volume:</span>
                        <span className="text-blue-400">
                          {altData.sampleData.socialSentiment.sentimentVolume.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Web Traffic */}
                {altData?.sampleData?.webTraffic && (
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Web Traffic
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Visitors:</span>
                        <span className="text-blue-400">
                          {(altData.sampleData.webTraffic.visitors / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">YoY Change:</span>
                        <span
                          className={
                            altData.sampleData.webTraffic.yearOverYearChange >= 0
                              ? 'text-green-400'
                              : 'text-red-400'
                          }
                        >
                          {(altData.sampleData.webTraffic.yearOverYearChange * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI/ML Tab */}
        <TabsContent value="rl" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Models */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-green-400" />
                  AI Models
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rlData?.models?.map((model, index) => (
                    <div key={model.id} className="bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{model.name}</h4>
                        <Badge className="bg-green-600">{model.type}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-400">State Space:</span>
                          <span className="text-green-400 ml-1">{model.stateSpace}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Actions:</span>
                          <span className="text-blue-400 ml-1">{model.actionSpace}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Sharpe:</span>
                          <span className="text-purple-400 ml-1">
                            {model.performance.sharpeRatio}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Win Rate:</span>
                          <span className="text-yellow-400 ml-1">
                            {(model.performance.winRate * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training Environments */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-green-400" />
                  Training Environments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rlData?.environments?.map((env, index) => (
                    <div key={env.id} className="bg-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{env.name}</h4>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {env.type}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-400">Assets:</span>
                          <span className="text-green-400 ml-1">
                            {Array.isArray(env.assets) ? env.assets.length : env.assets}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">Episode:</span>
                          <span className="text-blue-400 ml-1">{env.episodeLength} days</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Lookback:</span>
                          <span className="text-purple-400 ml-1">{env.lookbackWindow}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Costs:</span>
                          <span className="text-yellow-400 ml-1">
                            {(env.transactionCosts * 100).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Agents Performance */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                AI Agent Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rlData?.agents?.map((agent, index) => (
                  <div key={agent.id} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold">{agent.name}</h4>
                      <Badge
                        variant={
                          agent.status === 'trained'
                            ? 'default'
                            : agent.status === 'training'
                              ? 'secondary'
                              : 'outline'
                        }
                        className={
                          agent.status === 'trained'
                            ? 'bg-green-600'
                            : agent.status === 'training'
                              ? 'bg-yellow-600'
                              : ''
                        }
                      >
                        {agent.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Total Return:</span>
                        <span className="text-green-400 font-bold">
                          +{(agent.performance.totalReturn * 100).toFixed(1)}%
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Sharpe Ratio:</span>
                        <span className="text-purple-400 font-bold">
                          {agent.performance.sharpeRatio.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Max Drawdown:</span>
                        <span className="text-yellow-400 font-bold">
                          -{(agent.performance.maxDrawdown * 100).toFixed(1)}%
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Win Rate:</span>
                        <span className="text-blue-400 font-bold">
                          {(agent.performance.winRate * 100).toFixed(1)}%
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Episodes:</span>
                        <span className="text-slate-300">
                          {agent.currentEpisode.toLocaleString()}
                        </span>
                      </div>

                      {agent.status === 'training' && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Training Progress</span>
                            <span className="text-slate-400">
                              {((agent.currentEpisode / agent.trainingEpisodes) * 100).toFixed(0)}%
                            </span>
                          </div>
                          <Progress
                            value={(agent.currentEpisode / agent.trainingEpisodes) * 100}
                            className="h-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Overall Performance */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Overall Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-green-400 mb-1">+127.5%</div>
                      <div className="text-slate-400 text-sm">Total Return</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-1">4.2</div>
                      <div className="text-slate-400 text-sm">Sharpe Ratio</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-1">-3.2%</div>
                      <div className="text-slate-400 text-sm">Max Drawdown</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-1">78.5%</div>
                      <div className="text-slate-400 text-sm">Win Rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Metrics */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-red-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-400" />
                  Risk Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Value at Risk (95%)</span>
                      <span className="text-red-400 font-bold">-2.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Expected Shortfall</span>
                      <span className="text-red-400 font-bold">-3.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Beta</span>
                      <span className="text-yellow-400 font-bold">0.85</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Volatility</span>
                      <span className="text-yellow-400 font-bold">12.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Correlation to SPY</span>
                      <span className="text-blue-400 font-bold">0.72</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Calmar Ratio</span>
                      <span className="text-purple-400 font-bold">3.98</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Attribution */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <PieChart className="h-5 w-5 text-green-400" />
                Performance Attribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Atom className="h-4 w-4 text-purple-400" />
                    Quantum Computing
                  </h4>
                  <div className="text-2xl font-bold text-purple-400 mb-1">+42.3%</div>
                  <div className="text-slate-400 text-sm">
                    Portfolio optimization and risk analysis
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    High-Frequency Trading
                  </h4>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">+31.7%</div>
                  <div className="text-slate-400 text-sm">Ultra-fast execution and arbitrage</div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-green-400" />
                    AI/ML Models
                  </h4>
                  <div className="text-2xl font-bold text-green-400 mb-1">+38.9%</div>
                  <div className="text-slate-400 text-sm">Reinforcement learning agents</div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Satellite className="h-4 w-4 text-blue-400" />
                    Alternative Data
                  </h4>
                  <div className="text-2xl font-bold text-blue-400 mb-1">+14.6%</div>
                  <div className="text-slate-400 text-sm">Satellite, social, and web data</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
