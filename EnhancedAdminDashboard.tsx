'use client';

import { useState, useEffect } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Shield,
  Users,
  Edit,
  Ban,
  CheckCircle,
  Crown,
  Search,
  UserCog,
  DollarSign,
  TrendingUp,
  Activity,
  Eye,
  Trash2,
  RefreshCw,
} from 'lucide-react';

export default function EnhancedAdminDashboard({ onSwitchToOwner }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    generateUsers();
  }, []);

  const generateUsers = () => {
    const sampleUsers = [
      {
        id: 1,
        name: 'John Alpha',
        email: 'john@example.com',
        membership: 'ultimate',
        status: 'active',
        balance: 125000,
        totalTrades: 1247,
        profitLoss: 23847.32,
        winRate: 73.5,
        riskScore: 7.2,
        joinDate: '2024-01-15',
        lastActive: '2 minutes ago',
        location: 'New York, USA',
        phone: '+1-555-0123',
        verified: true,
      },
      {
        id: 2,
        name: 'Sarah Wolf',
        email: 'sarah@example.com',
        membership: 'pro',
        status: 'active',
        balance: 87500,
        totalTrades: 892,
        profitLoss: 15632.18,
        winRate: 68.2,
        riskScore: 5.8,
        joinDate: '2024-02-20',
        lastActive: '5 minutes ago',
        location: 'London, UK',
        phone: '+44-20-7946-0958',
        verified: true,
      },
      {
        id: 3,
        name: 'Mike Predator',
        email: 'mike@example.com',
        membership: 'ultimate',
        status: 'suspended',
        balance: 45000,
        totalTrades: 2156,
        profitLoss: -8934.67,
        winRate: 42.3,
        riskScore: 9.1,
        joinDate: '2023-11-10',
        lastActive: '1 hour ago',
        location: 'Tokyo, Japan',
        phone: '+81-3-1234-5678',
        verified: false,
      },
      {
        id: 4,
        name: 'Emma Hunter',
        email: 'emma@example.com',
        membership: 'basic',
        status: 'active',
        balance: 25000,
        totalTrades: 234,
        profitLoss: 3247.89,
        winRate: 61.7,
        riskScore: 3.4,
        joinDate: '2024-03-05',
        lastActive: '10 minutes ago',
        location: 'Sydney, Australia',
        phone: '+61-2-9876-5432',
        verified: true,
      },
    ];
    setUsers(sampleUsers);
  };

  const updateUser = (userId, updates) => {
    setUsers(prev => prev.map(user => (user.id === userId ? { ...user, ...updates } : user)));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({ ...selectedUser, ...updates });
    }
  };

  const suspendUser = userId => {
    updateUser(userId, { status: 'suspended' });
  };

  const activateUser = userId => {
    updateUser(userId, { status: 'active' });
  };

  const deleteUser = userId => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(null);
    }
  };

  const changeMembership = (userId, newMembership) => {
    updateUser(userId, { membership: newMembership });
  };

  const adjustBalance = (userId, newBalance) => {
    updateUser(userId, { balance: Number.parseFloat(newBalance) });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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

  const getMembershipColor = membership => {
    switch (membership) {
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

  return (
    <div className="space-y-6">
      {/* Enhanced Admin Header */}
      <Card className="bg-gradient-to-r from-red-900/90 to-black/90 border-red-500/50 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/5"></div>
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
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
                  Enhanced Admin Control Center
                </h2>
                <p className="text-sm text-gray-400">Full User Management & Platform Control</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={onSwitchToOwner}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
              >
                <Crown className="mr-2 h-4 w-4" />
                Owner Mode
              </Button>
              <Badge className="bg-gradient-to-r from-red-500 to-orange-600 animate-pulse">
                <Eye size={12} className="mr-1" />
                LIVE ADMIN
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
          <TabsTrigger value="users" className="data-[state=active]:bg-red-500/20">
            <Users size={16} className="mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="edit" className="data-[state=active]:bg-red-500/20">
            <UserCog size={16} className="mr-2" />
            Edit Profiles
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-red-500/20">
            <TrendingUp size={16} className="mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* User Management Tab */}
        <TabsContent value="users">
          <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-100 flex items-center">
                  <Users size={20} className="mr-2 text-blue-400" />
                  Advanced User Management
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
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32 bg-gray-800/30 border-red-500/30 text-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-red-500/30 text-red-400">
                    <RefreshCw size={16} className="mr-2" />
                    Refresh
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

                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-gray-100 font-bold text-lg">{user.name}</span>
                            <Badge className={getMembershipColor(user.membership)}>
                              {user.membership.toUpperCase()}
                            </Badge>
                            <Badge
                              className={`${getStatusColor(user.status)} border border-current`}
                              variant="outline"
                            >
                              {user.status.toUpperCase()}
                            </Badge>
                            {user.verified && (
                              <Badge className="bg-green-500">
                                <CheckCircle size={12} className="mr-1" />
                                VERIFIED
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            {user.location} • Joined {user.joinDate} • {user.lastActive}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div>
                            <p className="text-xs text-gray-400">Balance</p>
                            <p className="text-sm font-bold text-green-400">
                              ${user.balance.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Trades</p>
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

                      <div className="flex flex-col space-y-2">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => setSelectedUser(user)}
                            size="sm"
                            variant="outline"
                            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
                          >
                            <Edit size={12} className="mr-1" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => setSelectedUser(user)}
                            size="sm"
                            variant="outline"
                            className="border-green-500/30 text-green-400 hover:bg-green-500/20"
                          >
                            <Eye size={12} className="mr-1" />
                            View
                          </Button>
                        </div>
                        <div className="flex space-x-2">
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
                            onClick={() => deleteUser(user.id)}
                            size="sm"
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 size={12} className="mr-1" />
                            Delete
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

        {/* Edit Profiles Tab */}
        <TabsContent value="edit">
          {selectedUser ? (
            <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-gray-100 flex items-center">
                  <UserCog size={20} className="mr-2 text-purple-400" />
                  Editing: {selectedUser.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-white text-sm font-medium">Full Name</label>
                      <Input
                        value={selectedUser.name}
                        onChange={e => setSelectedUser({ ...selectedUser, name: e.target.value })}
                        className="bg-gray-800/30 border-red-500/30 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium">Email</label>
                      <Input
                        value={selectedUser.email}
                        onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })}
                        className="bg-gray-800/30 border-red-500/30 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium">Phone</label>
                      <Input
                        value={selectedUser.phone}
                        onChange={e => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                        className="bg-gray-800/30 border-red-500/30 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium">Location</label>
                      <Input
                        value={selectedUser.location}
                        onChange={e =>
                          setSelectedUser({ ...selectedUser, location: e.target.value })
                        }
                        className="bg-gray-800/30 border-red-500/30 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-white text-sm font-medium">Membership Level</label>
                      <Select
                        value={selectedUser.membership}
                        onValueChange={value =>
                          setSelectedUser({ ...selectedUser, membership: value })
                        }
                      >
                        <SelectTrigger className="bg-gray-800/30 border-red-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="pro">Pro</SelectItem>
                          <SelectItem value="ultimate">Ultimate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium">Account Balance</label>
                      <Input
                        type="number"
                        value={selectedUser.balance}
                        onChange={e =>
                          setSelectedUser({
                            ...selectedUser,
                            balance: Number.parseFloat(e.target.value),
                          })
                        }
                        className="bg-gray-800/30 border-red-500/30 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium">Status</label>
                      <Select
                        value={selectedUser.status}
                        onValueChange={value => setSelectedUser({ ...selectedUser, status: value })}
                      >
                        <SelectTrigger className="bg-gray-800/30 border-red-500/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white">Verified Account</span>
                      <Switch
                        checked={selectedUser.verified}
                        onCheckedChange={checked =>
                          setSelectedUser({ ...selectedUser, verified: checked })
                        }
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => {
                      updateUser(selectedUser.id, selectedUser);
                      setSelectedUser(null);
                    }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setSelectedUser(null)}
                    variant="outline"
                    className="border-gray-500/30 text-gray-400"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
              <CardContent className="p-12 text-center">
                <UserCog size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-white mb-2">Select a User to Edit</h3>
                <p className="text-gray-400">
                  Choose a user from the User Management tab to edit their profile
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="mr-2 text-blue-400" />
                  User Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Users:</span>
                    <span className="text-blue-400 font-semibold">{users.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Users:</span>
                    <span className="text-green-400 font-semibold">
                      {users.filter(u => u.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Suspended:</span>
                    <span className="text-red-400 font-semibold">
                      {users.filter(u => u.status === 'suspended').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Verified:</span>
                    <span className="text-purple-400 font-semibold">
                      {users.filter(u => u.verified).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="mr-2 text-green-400" />
                  Financial Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Balance:</span>
                    <span className="text-green-400 font-semibold">
                      ${users.reduce((sum, user) => sum + user.balance, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total P&L:</span>
                    <span className="text-yellow-400 font-semibold">
                      ${users.reduce((sum, user) => sum + user.profitLoss, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Win Rate:</span>
                    <span className="text-blue-400 font-semibold">
                      {(users.reduce((sum, user) => sum + user.winRate, 0) / users.length).toFixed(
                        1
                      )}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="mr-2 text-purple-400" />
                  Membership Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ultimate:</span>
                    <span className="text-red-400 font-semibold">
                      {users.filter(u => u.membership === 'ultimate').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pro:</span>
                    <span className="text-purple-400 font-semibold">
                      {users.filter(u => u.membership === 'pro').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Basic:</span>
                    <span className="text-blue-400 font-semibold">
                      {users.filter(u => u.membership === 'basic').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Free:</span>
                    <span className="text-gray-400 font-semibold">
                      {users.filter(u => u.membership === 'free').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
