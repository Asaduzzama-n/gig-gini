"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Users, Target, Clock, DollarSign,
  Calendar, BarChart3, PieChart, LineChart, Download, Filter,
  Eye, Award, Briefcase, UserCheck, Star, ArrowUp, ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProgressBar } from '@/components/ui/progress-bar';

interface AnalyticsData {
  overview: {
    totalHires: number;
    activeCompetitions: number;
    averageTimeToHire: number;
    costPerHire: number;
    applicationRate: number;
    qualityScore: number;
  };
  trends: {
    hiresThisMonth: number;
    hiresLastMonth: number;
    applicationsThisMonth: number;
    applicationsLastMonth: number;
    costThisMonth: number;
    costLastMonth: number;
  };
  competitionPerformance: Array<{
    id: string;
    title: string;
    applications: number;
    hires: number;
    conversionRate: number;
    avgQualityScore: number;
    timeToFill: number;
    cost: number;
    status: 'active' | 'completed' | 'paused';
  }>;
  timeMetrics: Array<{
    month: string;
    hires: number;
    applications: number;
    timeToHire: number;
  }>;
  qualityMetrics: {
    skillMatch: number;
    experienceLevel: number;
    culturalFit: number;
    performanceRating: number;
  };
  sourceAnalytics: Array<{
    source: string;
    applications: number;
    hires: number;
    conversionRate: number;
    cost: number;
  }>;
}

// Mock data
const mockAnalytics: AnalyticsData = {
  overview: {
    totalHires: 47,
    activeCompetitions: 8,
    averageTimeToHire: 18,
    costPerHire: 2400,
    applicationRate: 85,
    qualityScore: 4.2
  },
  trends: {
    hiresThisMonth: 12,
    hiresLastMonth: 8,
    applicationsThisMonth: 156,
    applicationsLastMonth: 134,
    costThisMonth: 28800,
    costLastMonth: 32000
  },
  competitionPerformance: [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      applications: 45,
      hires: 2,
      conversionRate: 4.4,
      avgQualityScore: 4.5,
      timeToFill: 15,
      cost: 4800,
      status: 'completed'
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      applications: 32,
      hires: 1,
      conversionRate: 3.1,
      avgQualityScore: 4.2,
      timeToFill: 22,
      cost: 2200,
      status: 'completed'
    },
    {
      id: '3',
      title: 'Data Scientist',
      applications: 28,
      hires: 0,
      conversionRate: 0,
      avgQualityScore: 3.8,
      timeToFill: 0,
      cost: 0,
      status: 'active'
    },
    {
      id: '4',
      title: 'Backend Engineer',
      applications: 51,
      hires: 3,
      conversionRate: 5.9,
      avgQualityScore: 4.1,
      timeToFill: 12,
      cost: 7200,
      status: 'completed'
    }
  ],
  timeMetrics: [
    { month: 'Jan', hires: 5, applications: 89, timeToHire: 22 },
    { month: 'Feb', hires: 7, applications: 102, timeToHire: 19 },
    { month: 'Mar', hires: 6, applications: 95, timeToHire: 21 },
    { month: 'Apr', hires: 8, applications: 118, timeToHire: 17 },
    { month: 'May', hires: 9, applications: 134, timeToHire: 16 },
    { month: 'Jun', hires: 12, applications: 156, timeToHire: 15 }
  ],
  qualityMetrics: {
    skillMatch: 87,
    experienceLevel: 82,
    culturalFit: 91,
    performanceRating: 85
  },
  sourceAnalytics: [
    { source: 'Direct Applications', applications: 89, hires: 15, conversionRate: 16.9, cost: 1200 },
    { source: 'Referrals', applications: 34, hires: 12, conversionRate: 35.3, cost: 800 },
    { source: 'Social Media', applications: 67, hires: 8, conversionRate: 11.9, cost: 1800 },
    { source: 'Job Boards', applications: 123, hires: 12, conversionRate: 9.8, cost: 3200 }
  ]
};

export default function EmployerAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6months');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalytics(mockAnalytics);
      setIsLoading(false);
    };

    fetchAnalytics();
  }, [timeRange]);

  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return { percentage: 0, isPositive: true };
    const percentage = ((current - previous) / previous) * 100;
    return { percentage: Math.abs(percentage), isPositive: percentage >= 0 };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!analytics) return null;

  const hiringTrend = calculateTrend(analytics.trends.hiresThisMonth, analytics.trends.hiresLastMonth);
  const applicationTrend = calculateTrend(analytics.trends.applicationsThisMonth, analytics.trends.applicationsLastMonth);
  const costTrend = calculateTrend(analytics.trends.costThisMonth, analytics.trends.costLastMonth);

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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Hiring Analytics</h1>
                <p className="text-gray-600">Track your hiring performance and optimize your recruitment strategy</p>
              </div>
              <div className="flex space-x-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hires</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.overview.totalHires}</p>
                <div className="flex items-center mt-1">
                  {hiringTrend.isPositive ? (
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${hiringTrend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {hiringTrend.percentage.toFixed(1)}% from last month
                  </span>
                </div>
              </div>
              <UserCheck className="w-8 h-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Time to Hire</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.overview.averageTimeToHire} days</p>
                <p className="text-sm text-gray-500">Industry avg: 23 days</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cost per Hire</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(analytics.overview.costPerHire)}</p>
                <div className="flex items-center mt-1">
                  {!costTrend.isPositive ? (
                    <ArrowDown className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowUp className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${!costTrend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {costTrend.percentage.toFixed(1)}% from last month
                  </span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </motion.div>

        {/* Secondary Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Application Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.applicationRate}%</p>
              </div>
              <Target className="w-6 h-6 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quality Score</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.qualityScore}/5.0</p>
              </div>
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Competitions</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.activeCompetitions}</p>
              </div>
              <Briefcase className="w-6 h-6 text-indigo-500" />
            </div>
          </Card>
        </motion.div>

        {/* Detailed Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Performance Overview</TabsTrigger>
              <TabsTrigger value="competitions">Competition Analysis</TabsTrigger>
              <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
              <TabsTrigger value="sources">Source Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Hiring Trends Chart */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Hiring Trends</h3>
                  <LineChart className="w-5 h-5 text-gray-500" />
                </div>
                <div className="space-y-4">
                  {analytics.timeMetrics.map((metric, index) => (
                    <div key={metric.month} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-600 w-12">{metric.month}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Hires: {metric.hires}</span>
                            <span className="text-sm text-gray-600">Applications: {metric.applications}</span>
                          </div>
                          <ProgressBar value={(metric.hires / 15) * 100} className="h-2" />
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{metric.timeToHire} days</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Application Sources */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Application Sources</h3>
                  <PieChart className="w-5 h-5 text-gray-500" />
                </div>
                <div className="space-y-4">
                  {analytics.sourceAnalytics.map((source, index) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{source.source}</span>
                          <span className="text-sm text-gray-600">{source.conversionRate.toFixed(1)}% conversion</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{source.applications} applications → {source.hires} hires</span>
                          <span>{formatCurrency(source.cost)} cost</span>
                        </div>
                        <ProgressBar value={(source.applications / 150) * 100} className="h-2 mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="competitions" className="space-y-4">
              {analytics.competitionPerformance.map(competition => (
                <Card key={competition.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{competition.title}</h3>
                      <Badge className={getStatusColor(competition.status)}>
                        {competition.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Applications</p>
                      <p className="text-xl font-bold text-gray-900">{competition.applications}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hires</p>
                      <p className="text-xl font-bold text-gray-900">{competition.hires}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                      <p className="text-xl font-bold text-gray-900">{competition.conversionRate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Quality Score</p>
                      <p className="text-xl font-bold text-gray-900">{competition.avgQualityScore}/5.0</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Time to Fill</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {competition.timeToFill > 0 ? `${competition.timeToFill} days` : 'In progress'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Cost</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {competition.cost > 0 ? formatCurrency(competition.cost) : 'TBD'}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="quality" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Hire Quality Metrics</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Skill Match</span>
                      <span className="text-sm text-gray-600">{analytics.qualityMetrics.skillMatch}%</span>
                    </div>
                    <ProgressBar value={analytics.qualityMetrics.skillMatch} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Experience Level</span>
                      <span className="text-sm text-gray-600">{analytics.qualityMetrics.experienceLevel}%</span>
                    </div>
                    <ProgressBar value={analytics.qualityMetrics.experienceLevel} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Cultural Fit</span>
                      <span className="text-sm text-gray-600">{analytics.qualityMetrics.culturalFit}%</span>
                    </div>
                    <ProgressBar value={analytics.qualityMetrics.culturalFit} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Performance Rating</span>
                      <span className="text-sm text-gray-600">{analytics.qualityMetrics.performanceRating}%</span>
                    </div>
                    <ProgressBar value={analytics.qualityMetrics.performanceRating} className="h-3" />
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="sources" className="space-y-4">
              {analytics.sourceAnalytics.map((source, index) => (
                <Card key={source.source} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{source.source}</h3>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                      <p className="text-xl font-bold text-gray-900">{source.conversionRate.toFixed(1)}%</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Applications</p>
                      <p className="text-lg font-semibold text-gray-900">{source.applications}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hires</p>
                      <p className="text-lg font-semibold text-gray-900">{source.hires}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cost</p>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(source.cost)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <ProgressBar value={(source.hires / source.applications) * 100} className="h-2" />
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}