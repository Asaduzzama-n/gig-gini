'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Users,
  Target,
  Calendar,
  Filter,
  Crown,
  Star,
  Zap
} from 'lucide-react';

// Mock data for leaderboard
const mockLeaderboardData = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '',
    role: 'Frontend Developer',
    totalPoints: 2850,
    competitionsWon: 12,
    competitionsParticipated: 18,
    achievements: ['Top Performer', 'Quick Learner', 'Team Player'],
    rank: 1,
    rankChange: 0,
    category: 'IT'
  },
  {
    id: '2', 
    name: 'Alex Rodriguez',
    avatar: '',
    role: 'Full Stack Developer',
    totalPoints: 2720,
    competitionsWon: 10,
    competitionsParticipated: 15,
    achievements: ['Innovation Award', 'Code Master'],
    rank: 2,
    rankChange: 1,
    category: 'IT'
  },
  {
    id: '3',
    name: 'Mike Chen',
    avatar: '',
    role: 'UX Designer',
    totalPoints: 2650,
    competitionsWon: 8,
    competitionsParticipated: 14,
    achievements: ['Design Excellence', 'User Champion'],
    rank: 3,
    rankChange: -1,
    category: 'Design'
  },
  {
    id: '4',
    name: 'Emily Davis',
    avatar: '',
    role: 'Marketing Specialist',
    totalPoints: 2480,
    competitionsWon: 7,
    competitionsParticipated: 12,
    achievements: ['Campaign Master', 'Growth Hacker'],
    rank: 4,
    rankChange: 2,
    category: 'Marketing'
  },
  {
    id: '5',
    name: 'David Wilson',
    avatar: '',
    role: 'Sales Manager',
    totalPoints: 2350,
    competitionsWon: 6,
    competitionsParticipated: 11,
    achievements: ['Sales Champion', 'Deal Closer'],
    rank: 5,
    rankChange: 0,
    category: 'Sales'
  }
];

const categories = ['All', 'IT', 'Design', 'Marketing', 'Sales', 'Business'];
const timeRanges = ['All Time', '30 Days', '90 Days', 'This Year'];

export function LeaderboardPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTimeRange, setSelectedTimeRange] = useState('All Time');
  const [activeTab, setActiveTab] = useState('overall');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
    return <div className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-width section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-[#FC5602] mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Leaderboards</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover top performers, track rankings, and celebrate achievements in our competitive hiring community
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Participants</p>
                  <p className="text-3xl font-bold text-gray-900">10,247</p>
                </div>
                <Users className="h-8 w-8 text-[#FC5602]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Competitions</p>
                  <p className="text-3xl font-bold text-gray-900">127</p>
                </div>
                <Target className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Prizes</p>
                  <p className="text-3xl font-bold text-gray-900">$2.4M</p>
                </div>
                <Award className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-3xl font-bold text-gray-900">92%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Leaderboard Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overall">Overall Rankings</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Leaders</TabsTrigger>
              <TabsTrigger value="categories">By Category</TabsTrigger>
            </TabsList>

            <TabsContent value="overall" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-[#FC5602]" />
                    <span>Top Performers - All Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockLeaderboardData.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-gray-50 ${
                          user.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-white'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-12 h-12">
                            {getRankIcon(user.rank)}
                          </div>
                          
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-[#FC5602] text-white">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900">{user.name}</h3>
                              {user.rank <= 3 && <Star className="h-4 w-4 text-yellow-500" />}
                            </div>
                            <p className="text-sm text-gray-600">{user.role}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              {user.achievements.slice(0, 2).map((achievement) => (
                                <Badge key={achievement} variant="secondary" className="text-xs">
                                  {achievement}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <Zap className="h-4 w-4 text-[#FC5602]" />
                            <span className="text-lg font-bold text-gray-900">{user.totalPoints.toLocaleString()}</span>
                            {getRankChangeIcon(user.rankChange)}
                          </div>
                          <p className="text-sm text-gray-600">
                            {user.competitionsWon}/{user.competitionsParticipated} wins
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {user.category}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-[#FC5602]" />
                    <span>This Month's Champions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Monthly leaderboard will be available soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.slice(1).map((category) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category} Leaders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockLeaderboardData
                          .filter(user => user.category === category)
                          .slice(0, 3)
                          .map((user, index) => (
                            <div key={user.id} className="flex items-center space-x-3">
                              <div className="w-8 h-8 flex items-center justify-center">
                                {getRankIcon(index + 1)}
                              </div>
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-[#FC5602] text-white text-sm">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{user.name}</p>
                                <p className="text-xs text-gray-600">{user.totalPoints} points</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}