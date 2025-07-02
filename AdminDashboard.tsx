'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Shield,
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  AlertTriangle,
  Eye,
  Crown,
  BarChart3,
  Search,
  Filter,
  Download,
  Settings,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Brain,
  Sword,
} from 'lucide-react';

export default function AdminDashboard() {
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    dailyRevenue: 0,
    totalTrades: 0,
    activeTrades: 0,
    systemHealth: 0,
    serverLoad: 0,
  });

  const [userProfiles, setUserProfiles] = useState([]);
  const [liveData, setLiveData] = useState({
    realtimeUsers: 0,
    tradesPerSecond: 0,
    systemAlerts: [],
    performanceMetrics: {},
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  useEffect(() => {
    // Simulate real-time admin data
    const interval = setInterval(() => {
      generateAdminStats();
      generateUserProfiles();
      generateLiveData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const generateAdminStats = () => {
    setAdminStats({
      totalUsers: 15847 + Math.floor(Math.random() * 100),
      activeUsers: 3421 + Math.floor(Math.random() * 50),
      totalRevenue: 2847392 + Math.random() * 10000,
      dailyRevenue: 47832 + Math.random() * 5000,
      totalTrades: 892456 + Math.floor(Math.random() * 1000),
      activeTrades: 1247 + Math.floor(Math.random() * 100),
      systemHealth: 95 + Math.random() * 5,
      serverLoad: 45 + Math.random() * 30,
    });
  };

  const generateUserProfiles = () => {
    const profiles = [
      {
        id: 1,
        name: 'John Alpha',
        email: 'john@example.com',
        subscription: 'ultimate',
        status: 'active',
        totalTrades: 1247,
        profitLoss: 23847.32,
        riskScore: 7.2,
        lastActive: '2 minutes ago',
        location: 'New York, USA',
        accountValue: 125000,
        winRate: 73.5,
      },
      {
        id: 2,
        name: 'Sarah Wolf',
        email: 'sarah@example.com',
        subscription: 'pro',
        status: 'active',
        totalTrades: 892,
        profitLoss: 15632.18,
        riskScore: 5.8,
        lastActive: '5 minutes ago',
        location: 'London, UK',
        accountValue: 87500,
        winRate: 68.2,
      },
      {
        id: 3,
        name: 'Mike Predator',
        email: 'mike@example.com',
        subscription: 'ultimate',
        status: 'suspended',
        totalTrades: 2156,
        profitLoss: -8934.67,
        riskScore: 9.1,
        lastActive: '1 hour ago',
        location: 'Tokyo, Japan',
        accountValue: 45000,
        winRate: 42.3,
      },
      {
        id: 4,
        name: 'Emma Hunter',
        email: 'emma@example.com',
        subscription: 'basic',
        status: 'active',
        totalTrades: 234,
        profitLoss: 3247.89,
        riskScore: 3.4,
        lastActive: '10 minutes ago',
        location: 'Sydney, Australia',
        accountValue: 25000,
        winRate: 61.7,
      },
      {
        id: 5,
        name: 'David Apex',
        email: 'david@example.com',
        subscription: 'ultimate',
        status: 'active',
        totalTrades: 3421,
        profitLoss: 67834.21,
        riskScore: 6.9,
        lastActive: '1 minute ago',
        location: 'Toronto, Canada',
        accountValue: 250000,
        winRate: 78.9,
      },
    ];

    // Add random variations
    const updatedProfiles = profiles.map(profile => ({
      ...profile,
      profitLoss: profile.profitLoss + (Math.random() - 0.5) * 1000,
      accountValue: profile.accountValue + (Math.random() - 0.5) * 5000,
      totalTrades: profile.totalTrades + Math.floor(Math.random() * 10),
    }));

    setUserProfiles(updatedProfiles);
  };

  const generateLiveData = () => {
    setLiveData({
      realtimeUsers: 3421 + Math.floor(Math.random() * 100),
      tradesPerSecond: 12.5 + Math.random() * 5,
      systemAlerts: [
        {
          id: 1,
          type: 'warning',
          message: 'High server load detected on EU-West-1',
          timestamp: new Date(),
          severity: 'medium',
        },
        {
          id: 2,
          type: 'info',
          message: 'New user registration spike: +15% in last hour',
          timestamp: new Date(Date.now() - 300000),
          severity: 'low',
        },
        {
          id: 3,
          type: 'error',
          message: 'Payment gateway timeout for 3 transactions',
          timestamp: new Date(Date.now() - 600000),
          severity: 'high',
        },
      ],
      performanceMetrics: {
        apiResponseTime: 145 + Math.random() * 50,
        databaseConnections: 847 + Math.floor(Math.random() * 100),
        memoryUsage: 68 + Math.random() * 15,
        cpuUsage: 42 + Math.random() * 20,
      },
    });
  };

  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'suspended':
        return 'text-red-400';
      case 'pending':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getSubscriptionColor = subscription => {
    switch (subscription) {
      case 'ultimate':
        return 'bg-gradient-to-r from-red-500 to-orange-600';
      case 'pro':
        return 'bg-gradient-to-r from-purple-500 to-blue-600';
      case 'basic':
        return 'bg-gradient-to-r from-blue-500 to-cyan-600';
      default:
        return 'bg-gray-500';
    }
  };

  const suspendUser = userId => {
    setUserProfiles(prev =>
      prev.map(user => (user.id === userId ? { ...user, status: 'suspended' } : user))
    );
  };

  const activateUser = userId => {
    setUserProfiles(prev =>
      prev.map(user => (user.id === userId ? { ...user, status: 'active' } : user))
    );
  };

  const filteredUsers = userProfiles.filter(
    user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="bg-gradient-to-r from-red-900/90 to-black/90 border-red-500/50 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/5"></div>
        <CardHeader className="relative">
          <CardTitle className="text-gray-100 flex items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield size={32} className="text-red-400 animate-pulse" />
                <Crown
                  size={16}
                  className="text-yellow-400 absolute -top-1 -right-1 animate-bounce"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Alpha Wolf Admin Command Center
                </h2>
                <p className="text-sm text-gray-400">Supreme Pack Leader • Full System Control</p>
              </div>
            </div>
            <Badge className="ml-3 bg-gradient-to-r from-red-500 to-orange-600 animate-pulse">
              <Eye size={12} className="mr-1" />
              LIVE MONITORING
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Real-Time System Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card className="bg-gray-900/60 border-green-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Users size={24} className="text-green-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-green-400">
              {adminStats.totalUsers.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Total Users</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 border-blue-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Activity size={24} className="text-blue-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-blue-400">
              {adminStats.activeUsers.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Active Users</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 border-yellow-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <DollarSign size={24} className="text-yellow-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-yellow-400">
              ${(adminStats.totalRevenue / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-gray-400">Total Revenue</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 border-orange-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <TrendingUp size={24} className="text-orange-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-orange-400">
              ${(adminStats.dailyRevenue / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-gray-400">Daily Revenue</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 border-purple-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Sword size={24} className="text-purple-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-purple-400">
              {adminStats.totalTrades.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Total Trades</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <Target size={24} className="text-red-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-red-400">
              {adminStats.activeTrades.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">Active Trades</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 border-cyan-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <CheckCircle size={24} className="text-cyan-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-cyan-400">{adminStats.systemHealth.toFixed(1)}%</p>
            <p className="text-xs text-gray-400">System Health</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/60 border-pink-500/30 backdrop-blur-xl">
          <CardContent className="p-4 text-center">
            <BarChart3 size={24} className="text-pink-400 mx-auto mb-2" />
            <p className="text-lg font-bold text-pink-400">{adminStats.serverLoad.toFixed(0)}%</p>
            <p className="text-xs text-gray-400">Server Load</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Admin Tabs */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300"
          >
            <Users size={16} className="mr-2" />
            User Profiles
          </TabsTrigger>
          <TabsTrigger
            value="live"
            className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300"
          >
            <Activity size={16} className="mr-2" />
            Live Data
          </TabsTrigger>
          <TabsTrigger
            value="system"
            className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300"
          >
            <Settings size={16} className="mr-2" />
            System Monitor
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300"
          >
            <BarChart3 size={16} className="mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* User Profiles Tab */}
        <TabsContent value="users">
          <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-100 flex items-center">
                  <Users size={20} className="mr-2 text-blue-400" />
                  User Profile Management
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-10 w-64 bg-gray-800/30 border-red-500/30 text-gray-200"
                    />
                  </div>
                  <Button variant="outline" className="border-red-500/30 text-red-400">
                    <Filter size={16} className="mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" className="border-red-500/30 text-red-400">
                    <Download size={16} className="mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map(user => (
                  <div
                    key={user.id}
                    className="p-4 bg-gradient-to-r from-red-800/20 to-orange-800/20 rounded-lg border border-red-500/30 hover:border-red-400/50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{user.name.charAt(0)}</span>
                          </div>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${
                              user.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                            }`}
                          ></div>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-100 font-bold text-lg">{user.name}</span>
                            <Badge className={getSubscriptionColor(user.subscription)}>
                              {user.subscription.toUpperCase()}
                            </Badge>
                            <Badge
                              className={`${getStatusColor(user.status)} border border-current`}
                              variant="outline"
                            >
                              {user.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            {user.location} • {user.lastActive}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div>
                            <p className="text-xs text-gray-400">Account Value</p>
                            <p className="text-sm font-bold text-green-400">
                              ${user.accountValue.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Total Trades</p>
                            <p className="text-sm font-bold text-blue-400">
                              {user.totalTrades.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">P&L</p>
                            <p
                              className={`text-sm font-bold ${user.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}
                            >
                              {user.profitLoss >= 0 ? '+' : ''}${user.profitLoss.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Win Rate</p>
                            <p className="text-sm font-bold text-purple-400">
                              {user.winRate.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="text-center">
                          <p className="text-xs text-gray-400">Risk Score</p>
                          <div className="flex items-center">
                            <span
                              className={`font-bold ${
                                user.riskScore > 8
                                  ? 'text-red-400'
                                  : user.riskScore > 5
                                    ? 'text-yellow-400'
                                    : 'text-green-400'
                              }`}
                            >
                              {user.riskScore.toFixed(1)}
                            </span>
                            <Progress
                              value={user.riskScore * 10}
                              className="w-16 h-2 ml-2"
                              style={{
                                backgroundColor:
                                  user.riskScore > 8
                                    ? '#ef4444'
                                    : user.riskScore > 5
                                      ? '#eab308'
                                      : '#22c55e',
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col space-y-1">
                          {user.status === 'active' ? (
                            <Button
                              onClick={() => suspendUser(user.id)}
                              size="sm"
                              variant="outline"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                            >
                              <Ban size={12} className="mr-1" />
                              Suspend
                            </Button>
                          ) : (
                            <Button
                              onClick={() => activateUser(user.id)}
                              size="sm"
                              variant="outline"
                              className="border-green-500/30 text-green-400 hover:bg-green-500/20"
                            >
                              <CheckCircle size={12} className="mr-1" />
                              Activate
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                          >
                            <Eye size={12} className="mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Data Tab */}
        <TabsContent value="live">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-gray-100 flex items-center">
                  <Activity size={20} className="mr-2 text-green-400 animate-pulse" />
                  Real-Time Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <span className="text-gray-300">Users Online</span>
                    <span className="text-green-400 font-bold text-xl">
                      {liveData.realtimeUsers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <span className="text-gray-300">Trades/Second</span>
                    <span className="text-blue-400 font-bold text-xl">
                      {liveData.tradesPerSecond.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <span className="text-gray-300">API Response Time</span>
                    <span className="text-purple-400 font-bold text-xl">
                      {liveData.performanceMetrics.apiResponseTime?.toFixed(0)}ms
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
                    <span className="text-gray-300">DB Connections</span>
                    <span className="text-orange-400 font-bold text-xl">
                      {liveData.performanceMetrics.databaseConnections}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-gray-100 flex items-center">
                  <AlertTriangle size={20} className="mr-2 text-yellow-400" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {liveData.systemAlerts.map(alert => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border ${
                        alert.severity === 'high'
                          ? 'bg-red-500/10 border-red-500/30'
                          : alert.severity === 'medium'
                            ? 'bg-yellow-500/10 border-yellow-500/30'
                            : 'bg-blue-500/10 border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {alert.severity === 'high' ? (
                            <XCircle size={16} className="text-red-400" />
                          ) : alert.severity === 'medium' ? (
                            <AlertTriangle size={16} className="text-yellow-400" />
                          ) : (
                            <CheckCircle size={16} className="text-blue-400" />
                          )}
                          <span className="text-gray-200 font-medium">
                            {alert.type.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {alert.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Monitor Tab */}
        <TabsContent value="system">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-gray-100 flex items-center">
                  <Settings size={20} className="mr-2 text-cyan-400" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>CPU Usage</span>
                      <span>{liveData.performanceMetrics.cpuUsage?.toFixed(1)}%</span>
                    </div>
                    <Progress value={liveData.performanceMetrics.cpuUsage} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Memory Usage</span>
                      <span>{liveData.performanceMetrics.memoryUsage?.toFixed(1)}%</span>
                    </div>
                    <Progress value={liveData.performanceMetrics.memoryUsage} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Server Load</span>
                      <span>{adminStats.serverLoad.toFixed(1)}%</span>
                    </div>
                    <Progress value={adminStats.serverLoad} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>System Health</span>
                      <span>{adminStats.systemHealth.toFixed(1)}%</span>
                    </div>
                    <Progress value={adminStats.systemHealth} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-gray-100 flex items-center">
                  <Brain size={20} className="mr-2 text-purple-400" />
                  AI System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <span className="text-gray-300">Alpha Wolf Bot</span>
                    <Badge className="bg-green-500">
                      <CheckCircle size={12} className="mr-1" />
                      ACTIVE
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <span className="text-gray-300">Pattern Recognition</span>
                    <Badge className="bg-green-500">
                      <CheckCircle size={12} className="mr-1" />
                      ACTIVE
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <span className="text-gray-300">Sports Predictor</span>
                    <Badge className="bg-green-500">
                      <CheckCircle size={12} className="mr-1" />
                      ACTIVE
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                    <span className="text-gray-300">Model Training</span>
                    <Badge className="bg-yellow-500">
                      <Clock size={12} className="mr-1" />
                      TRAINING
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-gray-100 flex items-center">
                <BarChart3 size={20} className="mr-2 text-orange-400" />
                Platform Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-gray-200 font-semibold">User Distribution</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ultimate Pack:</span>
                      <span className="text-red-400 font-semibold">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pro Pack:</span>
                      <span className="text-purple-400 font-semibold">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Basic Pack:</span>
                      <span className="text-blue-400 font-semibold">20%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-gray-200 font-semibold">Trading Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Win Rate:</span>
                      <span className="text-green-400 font-semibold">68.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Profit Factor:</span>
                      <span className="text-green-400 font-semibold">2.34</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Volume:</span>
                      <span className="text-yellow-400 font-semibold">$2.8B</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-gray-200 font-semibold">System Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Uptime:</span>
                      <span className="text-green-400 font-semibold">99.97%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Response:</span>
                      <span className="text-blue-400 font-semibold">142ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Error Rate:</span>
                      <span className="text-green-400 font-semibold">0.03%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
