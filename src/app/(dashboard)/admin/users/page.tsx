"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Search, Filter, Eye, Edit, Trash2, UserCheck, Ban, 
  Plus, Download, Upload, Mail, Phone, Calendar, Building,
  Award, TrendingUp, AlertTriangle, CheckCircle, XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  type: 'employee' | 'employer';
  status: 'active' | 'suspended' | 'pending' | 'banned';
  joinDate: Date;
  lastActive: Date;
  competitions: number;
  revenue?: number;
  location: string;
  verified: boolean;
  subscription?: {
    plan: 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'expired' | 'cancelled';
  };
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  suspendedUsers: number;
  employeeCount: number;
  employerCount: number;
  verifiedUsers: number;
  revenuePerUser: number;
}

// Mock data
const mockStats: UserStats = {
  totalUsers: 15420,
  activeUsers: 14230,
  newUsersThisMonth: 1240,
  suspendedUsers: 89,
  employeeCount: 12340,
  employerCount: 3080,
  verifiedUsers: 13890,
  revenuePerUser: 127
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    type: 'employee',
    status: 'active',
    joinDate: new Date('2024-01-15'),
    lastActive: new Date('2024-08-20'),
    competitions: 8,
    location: 'New York, USA',
    verified: true
  },
  {
    id: '2',
    name: 'TechCorp Solutions',
    email: 'hr@techcorp.com',
    phone: '+1 (555) 987-6543',
    type: 'employer',
    status: 'active',
    joinDate: new Date('2024-03-10'),
    lastActive: new Date('2024-08-22'),
    competitions: 3,
    revenue: 15000,
    location: 'San Francisco, USA',
    verified: true,
    subscription: {
      plan: 'premium',
      status: 'active'
    }
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    type: 'employee',
    status: 'suspended',
    joinDate: new Date('2024-05-20'),
    lastActive: new Date('2024-08-18'),
    competitions: 2,
    location: 'London, UK',
    verified: false
  },
  {
    id: '4',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '+1 (555) 456-7890',
    type: 'employee',
    status: 'active',
    joinDate: new Date('2024-07-01'),
    lastActive: new Date('2024-08-21'),
    competitions: 5,
    location: 'Toronto, Canada',
    verified: true
  },
  {
    id: '5',
    name: 'StartupXYZ',
    email: 'contact@startupxyz.com',
    type: 'employer',
    status: 'pending',
    joinDate: new Date('2024-08-15'),
    lastActive: new Date('2024-08-19'),
    competitions: 0,
    revenue: 0,
    location: 'Berlin, Germany',
    verified: false,
    subscription: {
      plan: 'basic',
      status: 'active'
    }
  }
];

export default function AdminUsersManagement() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats(mockStats);
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(user => user.type === typeFilter);
    }

    // Filter by active tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(user => user.type === activeTab);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, statusFilter, typeFilter, activeTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'suspended': return 'bg-orange-100 text-orange-700';
      case 'banned': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertTriangle className="w-4 h-4" />;
      case 'suspended': case 'banned': return <XCircle className="w-4 h-4" />;
      default: return null;
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

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Performing ${action} on user ${userId}`);
    // Implement user actions here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Users Management</h1>
                <p className="text-gray-600">Manage all platform users, permissions, and activities</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+{stats.newUsersThisMonth} this month</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Verified Users</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.verifiedUsers.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{Math.round((stats.verifiedUsers / stats.totalUsers) * 100)}% verified</p>
                </div>
                <Award className="w-8 h-8 text-orange-500" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue/User</p>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.revenuePerUser)}</p>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </Card>
          </motion.div>
        )}

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="User Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="employee">Employees</SelectItem>
                  <SelectItem value="employer">Employers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Users ({filteredUsers.length})</TabsTrigger>
              <TabsTrigger value="employee">Employees ({users.filter(u => u.type === 'employee').length})</TabsTrigger>
              <TabsTrigger value="employer">Employers ({users.filter(u => u.type === 'employer').length})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredUsers.length === 0 ? (
                <Card className="p-12 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                </Card>
              ) : (
                filteredUsers.map(user => (
                  <Card key={user.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold text-gray-900">{user.name}</h3>
                            {user.verified && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                            <Badge className={getStatusColor(user.status)}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(user.status)}
                                <span>{user.status}</span>
                              </div>
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {user.type}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-4 h-4" />
                              <span>{user.email}</span>
                            </div>
                            {user.phone && (
                              <div className="flex items-center space-x-1">
                                <Phone className="w-4 h-4" />
                                <span>{user.phone}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <Building className="w-4 h-4" />
                              <span>{user.location}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6 mt-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Joined: {formatDate(user.joinDate)}</span>
                            </div>
                            <span>Last active: {formatDate(user.lastActive)}</span>
                            <span>{user.competitions} competitions</span>
                            {user.revenue && (
                              <span>Revenue: {formatCurrency(user.revenue)}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, 'view')}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, 'edit')}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        {user.status === 'active' ? (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-orange-600 hover:text-orange-700"
                            onClick={() => handleUserAction(user.id, 'suspend')}
                          >
                            <Ban className="w-4 h-4 mr-2" />
                            Suspend
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleUserAction(user.id, 'activate')}
                          >
                            <UserCheck className="w-4 h-4 mr-2" />
                            Activate
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleUserAction(user.id, 'delete')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}