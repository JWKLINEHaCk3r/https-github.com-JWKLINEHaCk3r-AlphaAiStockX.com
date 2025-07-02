'use client';

import { useState } from 'react';
import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield,
  Crown,
  Settings,
  Key,
  Bell,
  Database,
  Users,
  Activity,
  Lock,
  AlertTriangle,
  CheckCircle,
  Save,
} from 'lucide-react';

export default function AdminProfile({ admin, onUpdateAdmin }) {
  const [adminSettings, setAdminSettings] = useState({
    notifications: {
      systemAlerts: true,
      userActivity: true,
      securityEvents: true,
      performanceAlerts: true,
      revenueUpdates: true,
    },
    permissions: {
      userManagement: true,
      systemConfig: true,
      dataAccess: true,
      financialData: true,
      securitySettings: true,
    },
    preferences: {
      darkMode: true,
      autoRefresh: true,
      detailedLogs: true,
      realTimeUpdates: true,
    },
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    sessionTimeout: 30,
    ipWhitelist: ['192.168.1.1', '10.0.0.1'],
    lastPasswordChange: '2024-01-15',
    loginAttempts: 3,
  });

  const handleNotificationChange = (key, value) => {
    setAdminSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }));
  };

  const handlePermissionChange = (key, value) => {
    setAdminSettings(prev => ({
      ...prev,
      permissions: { ...prev.permissions, [key]: value },
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setAdminSettings(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value },
    }));
  };

  const saveSettings = () => {
    // Save admin settings
    console.log('Saving admin settings:', adminSettings);
    // Call API to update settings
  };

  return (
    <div className="space-y-6">
      {/* Admin Profile Header */}
      <Card className="bg-gradient-to-r from-red-900/90 to-black/90 border-red-500/50 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Crown size={32} className="text-yellow-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <Shield size={12} className="text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-100">
                  {admin?.name || 'Supreme Alpha Admin'}
                </h2>
                <p className="text-gray-400">{admin?.email || 'admin@alphawolf.com'}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-gradient-to-r from-red-500 to-orange-600">
                    <Crown size={12} className="mr-1" />
                    SUPREME ADMIN
                  </Badge>
                  <Badge className="bg-green-500">
                    <CheckCircle size={12} className="mr-1" />
                    ACTIVE
                  </Badge>
                </div>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700">
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Admin Settings Tabs */}
      <Tabs defaultValue="permissions" className="space-y-6">
        <TabsList className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
          <TabsTrigger
            value="permissions"
            className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300"
          >
            <Key size={16} className="mr-2" />
            Permissions
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300"
          >
            <Lock size={16} className="mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300"
          >
            <Bell size={16} className="mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300"
          >
            <Settings size={16} className="mr-2" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Permissions Tab */}
        <TabsContent value="permissions">
          <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-gray-100 flex items-center">
                <Key size={20} className="mr-2 text-yellow-400" />
                Admin Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-gray-200 font-semibold">System Access</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users size={16} className="text-blue-400" />
                        <span className="text-gray-300">User Management</span>
                      </div>
                      <Switch
                        checked={adminSettings.permissions.userManagement}
                        onCheckedChange={checked =>
                          handlePermissionChange('userManagement', checked)
                        }
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Settings size={16} className="text-green-400" />
                        <span className="text-gray-300">System Configuration</span>
                      </div>
                      <Switch
                        checked={adminSettings.permissions.systemConfig}
                        onCheckedChange={checked => handlePermissionChange('systemConfig', checked)}
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Database size={16} className="text-purple-400" />
                        <span className="text-gray-300">Data Access</span>
                      </div>
                      <Switch
                        checked={adminSettings.permissions.dataAccess}
                        onCheckedChange={checked => handlePermissionChange('dataAccess', checked)}
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-gray-200 font-semibold">Advanced Permissions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Activity size={16} className="text-orange-400" />
                        <span className="text-gray-300">Financial Data</span>
                      </div>
                      <Switch
                        checked={adminSettings.permissions.financialData}
                        onCheckedChange={checked =>
                          handlePermissionChange('financialData', checked)
                        }
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Shield size={16} className="text-red-400" />
                        <span className="text-gray-300">Security Settings</span>
                      </div>
                      <Switch
                        checked={adminSettings.permissions.securitySettings}
                        onCheckedChange={checked =>
                          handlePermissionChange('securitySettings', checked)
                        }
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-gray-100 flex items-center">
                <Lock size={20} className="mr-2 text-red-400" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-gray-200 font-semibold">Authentication</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <span className="text-gray-300">Two-Factor Authentication</span>
                      <Badge
                        className={
                          securitySettings.twoFactorEnabled ? 'bg-green-500' : 'bg-red-500'
                        }
                      >
                        {securitySettings.twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Session Timeout (minutes)</Label>
                      <Input
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={e =>
                          setSecuritySettings(prev => ({
                            ...prev,
                            sessionTimeout: Number.parseInt(e.target.value),
                          }))
                        }
                        className="bg-gray-800/30 border-red-500/30 text-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Max Login Attempts</Label>
                      <Input
                        type="number"
                        value={securitySettings.loginAttempts}
                        onChange={e =>
                          setSecuritySettings(prev => ({
                            ...prev,
                            loginAttempts: Number.parseInt(e.target.value),
                          }))
                        }
                        className="bg-gray-800/30 border-red-500/30 text-gray-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-gray-200 font-semibold">Access Control</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800/30 rounded-lg">
                      <p className="text-gray-300 text-sm mb-2">Last Password Change</p>
                      <p className="text-gray-100 font-semibold">
                        {securitySettings.lastPasswordChange}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">IP Whitelist</Label>
                      <div className="space-y-1">
                        {securitySettings.ipWhitelist.map((ip, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-800/50 rounded"
                          >
                            <span className="text-gray-200 font-mono">{ip}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500/30 text-red-400"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Add IP
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-gray-100 flex items-center">
                <Bell size={20} className="mr-2 text-blue-400" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-gray-200 font-semibold">Alert Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle size={16} className="text-red-400" />
                        <span className="text-gray-300">System Alerts</span>
                      </div>
                      <Switch
                        checked={adminSettings.notifications.systemAlerts}
                        onCheckedChange={checked =>
                          handleNotificationChange('systemAlerts', checked)
                        }
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users size={16} className="text-blue-400" />
                        <span className="text-gray-300">User Activity</span>
                      </div>
                      <Switch
                        checked={adminSettings.notifications.userActivity}
                        onCheckedChange={checked =>
                          handleNotificationChange('userActivity', checked)
                        }
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Shield size={16} className="text-yellow-400" />
                        <span className="text-gray-300">Security Events</span>
                      </div>
                      <Switch
                        checked={adminSettings.notifications.securityEvents}
                        onCheckedChange={checked =>
                          handleNotificationChange('securityEvents', checked)
                        }
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Activity size={16} className="text-green-400" />
                        <span className="text-gray-300">Performance Alerts</span>
                      </div>
                      <Switch
                        checked={adminSettings.notifications.performanceAlerts}
                        onCheckedChange={checked =>
                          handleNotificationChange('performanceAlerts', checked)
                        }
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Activity size={16} className="text-purple-400" />
                        <span className="text-gray-300">Revenue Updates</span>
                      </div>
                      <Switch
                        checked={adminSettings.notifications.revenueUpdates}
                        onCheckedChange={checked =>
                          handleNotificationChange('revenueUpdates', checked)
                        }
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="bg-gray-900/60 border-red-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-gray-100 flex items-center">
                <Settings size={20} className="mr-2 text-purple-400" />
                Admin Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-gray-200 font-semibold">Interface Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <span className="text-gray-300">Dark Mode</span>
                      <Switch
                        checked={adminSettings.preferences.darkMode}
                        onCheckedChange={checked => handlePreferenceChange('darkMode', checked)}
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <span className="text-gray-300">Auto Refresh</span>
                      <Switch
                        checked={adminSettings.preferences.autoRefresh}
                        onCheckedChange={checked => handlePreferenceChange('autoRefresh', checked)}
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <span className="text-gray-300">Detailed Logs</span>
                      <Switch
                        checked={adminSettings.preferences.detailedLogs}
                        onCheckedChange={checked => handlePreferenceChange('detailedLogs', checked)}
                        className="data-[state=checked]:bg-red-500"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                      <span className="text-gray-300">Real-time Updates</span>
                      <Switch
                        checked={adminSettings.preferences.realTimeUpdates}
                        onCheckedChange={checked =>
                          handlePreferenceChange('realTimeUpdates', checked)
                        }
                        className="data-[state=checked]:bg-red-500"
                      />
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
