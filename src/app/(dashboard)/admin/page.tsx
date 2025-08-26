// app/admin/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Trophy, Building, BarChart3, Settings, FileText,
  TrendingUp, Eye, Edit, Trash2, UserCheck, Ban, Search,
  Calendar, DollarSign, Award, Activity, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/authStore';



interface AdminStats {
  totalUsers: number;
  totalEmployees: number;
  totalEmployers: number;
  totalCompetitions: number;
  activeCompetitions: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  type: 'employee' | 'employer';
  status: 'active' | 'suspended' | 'pending';
  joinDate: Date;
  lastActive: Date;
  competitions: number;
}

interface Competition {
  id: string;
  title: string;
  organizer: string;
  status: 'active' | 'completed' | 'pending' | 'cancelled';
  participants: number;
  startDate: Date;
  endDate: Date;
  revenue: number;
  categories: string[];
}

interface Subscription {
  id: string;
  userId: string;
  userName: string;
  plan: 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  amount: number;
}

// Mock data
const mockStats: AdminStats = {
  totalUsers: 15420,
  totalEmployees: 12340,
  totalEmployers: 3080,
  totalCompetitions: 248,
  activeCompetitions: 42,
  totalRevenue: 125000,
  monthlyGrowth: 15.3
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    type: 'employee',
    status: 'active',
    joinDate: new Date('2024-01-15'),
    lastActive: new Date('2024-08-20'),
    competitions: 8
  },
  {
    id: '2',
    name: 'TechCorp Solutions',
    email: 'hr@techcorp.com',
    type: 'employer',
    status: 'active',
    joinDate: new Date('2024-03-10'),
    lastActive: new Date('2024-08-22'),
    competitions: 3
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    type: 'employee',
    status: 'suspended',
    joinDate: new Date('2024-05-20'),
    lastActive: new Date('2024-08-18'),
    competitions: 2
  }
];

const mockCompetitions: Competition[] = [
  {
    id: '1',
    title: 'Full Stack Developer Challenge 2024',
    organizer: 'TechCorp Solutions',
    status: 'active',
    participants: 234,
    startDate: new Date('2024-09-15'),
    endDate: new Date('2024-10-15'),
    revenue: 0,
    categories: ['IT', 'Programming']
  },
  {
    id: '2',
    title: 'Marketing Campaign Contest',
    organizer: 'Marketing Masters Inc',
    status: 'completed',
    participants: 156,
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-09-01'),
    revenue: 3900,
    categories: ['Marketing', 'Business']
  }
];

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    userId: '2',
    userName: 'TechCorp Solutions',
    plan: 'premium',
    status: 'active',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2025-03-15'),
    amount: 299
  },
  {
    id: '2',
    userId: '4',
    userName: 'StartupXYZ',
    plan: 'basic',
    status: 'expired',
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-07-10'),
    amount: 99
  }
];

function AdminDashboardContent() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats(mockStats);
      setUsers(mockUsers);
      setCompetitions(mockCompetitions);
      setSubscriptions(mockSubscriptions);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'suspended': case 'cancelled': case 'expired': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'basic': return 'bg-gray-100 text-gray-700';
      case 'premium': return 'bg-orange-100 text-orange-700';
      case 'enterprise': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
        </div>
        <Badge variant="outline" className="bg-red-100 text-red-700">Admin Panel</Badge>
      </div>
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalEmployees.toLocaleString()} employees, {stats.totalEmployers.toLocaleString()} employers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Competitions</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCompetitions}</div>
              <p className="text-xs text-muted-foreground">{stats.activeCompetitions} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">+{stats.monthlyGrowth}% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyGrowth}%</div>
              <p className="text-xs text-muted-foreground">Monthly growth</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="competitions">Competitions</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events and user activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New user registration spike</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Competition "Frontend Challenge" launched</p>
                        <p className="text-xs text-muted-foreground">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">System maintenance completed</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                  <CardDescription>System performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">User Engagement</span>
                        <span className="text-sm text-green-600">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Competition Success Rate</span>
                        <span className="text-sm text-blue-600">87%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Revenue Target</span>
                        <span className="text-sm text-orange-600">76%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">User Management</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Users</option>
                  <option>Employees</option>
                  <option>Employers</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4">
              {users.map(user => (
                <Card key={user.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>{user.type}</span>
                          <span>Joined: {formatDate(user.joinDate)}</span>
                          <span>{user.competitions} competitions</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      {user.status === 'active' ? (
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Ban className="w-4 h-4 mr-2" />
                          Suspend
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                          <UserCheck className="w-4 h-4 mr-2" />
                          Activate
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="competitions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Competition Management</h2>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Categories</option>
                  <option>IT</option>
                  <option>Marketing</option>
                  <option>Business</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6">
              {competitions.map(competition => (
                <Card key={competition.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{competition.title}</h3>
                        <Badge className={getStatusColor(competition.status)}>
                          {competition.status}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-3">by {competition.organizer}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {competition.categories.map(category => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {competition.participants} participants
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(competition.startDate)}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(competition.endDate)}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {formatCurrency(competition.revenue)}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Manage
                      </Button>
                      {competition.status === 'pending' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Subscription Management</h2>
              <div className="flex space-x-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Plans</option>
                  <option>Basic</option>
                  <option>Premium</option>
                  <option>Enterprise</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Expired</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4">
              {subscriptions.map(subscription => (
                <Card key={subscription.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{subscription.userName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <Badge className={getPlanColor(subscription.plan)}>
                          {subscription.plan}
                        </Badge>
                        <span>Started: {formatDate(subscription.startDate)}</span>
                        <span>Ends: {formatDate(subscription.endDate)}</span>
                        <span>{formatCurrency(subscription.amount)}/year</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(subscription.status)}>
                        {subscription.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">User Growth</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-gray-500">Revenue chart would go here</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Competition Performance</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-gray-500">Performance metrics chart would go here</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">User Engagement</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-gray-500">Engagement analytics would go here</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return <AdminDashboardContent />;
}