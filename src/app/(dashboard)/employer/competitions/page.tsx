"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Calendar, 
  DollarSign, 
  Clock, 
  Target, 
  Briefcase, 
  Settings, 
  Copy, 
  Share, 
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  PauseCircle,
  PlayCircle
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProgressBar } from "@/components/ui/progress-bar";

interface Competition {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'draft' | 'completed' | 'paused' | 'scheduled';
  participants: number;
  applications: number;
  prize: string;
  deadline: string;
  category: string;
  skills: string[];
  createdAt: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  engagement: number;
}

const mockCompetitions: Competition[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer Challenge',
    description: 'Build a complete e-commerce platform with React, Node.js, and PostgreSQL. Must include user authentication, payment processing, and admin dashboard.',
    status: 'active',
    participants: 234,
    applications: 456,
    prize: '$8,000',
    deadline: '2024-02-15',
    category: 'Development',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    createdAt: '2024-01-01',
    duration: '4 weeks',
    difficulty: 'Advanced',
    engagement: 89
  },
  {
    id: '2',
    title: 'Digital Marketing Strategy Contest',
    description: 'Create a comprehensive digital marketing strategy for a SaaS startup. Include SEO, content marketing, social media, and paid advertising plans.',
    status: 'completed',
    participants: 156,
    applications: 298,
    prize: '$5,000',
    deadline: '2024-01-20',
    category: 'Marketing',
    skills: ['SEO', 'Content Marketing', 'Analytics', 'PPC'],
    createdAt: '2023-12-15',
    duration: '3 weeks',
    difficulty: 'Intermediate',
    engagement: 76
  },
  {
    id: '3',
    title: 'UI/UX Design Innovation Challenge',
    description: 'Design a mobile app interface for a fitness tracking application. Focus on user experience, accessibility, and modern design principles.',
    status: 'scheduled',
    participants: 0,
    applications: 89,
    prize: '$6,500',
    deadline: '2024-03-01',
    category: 'Design',
    skills: ['Figma', 'User Research', 'Prototyping', 'Mobile Design'],
    createdAt: '2024-01-10',
    duration: '2 weeks',
    difficulty: 'Intermediate',
    engagement: 0
  },
  {
    id: '4',
    title: 'Data Science Analytics Competition',
    description: 'Analyze customer behavior data and create predictive models for churn prevention. Use Python, machine learning, and data visualization.',
    status: 'draft',
    participants: 0,
    applications: 0,
    prize: '$7,000',
    deadline: '2024-03-15',
    category: 'Data Science',
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
    createdAt: '2024-01-12',
    duration: '5 weeks',
    difficulty: 'Expert',
    engagement: 0
  },
  {
    id: '5',
    title: 'Mobile App Development Sprint',
    description: 'Develop a cross-platform mobile application using React Native. Must include offline functionality and push notifications.',
    status: 'paused',
    participants: 67,
    applications: 123,
    prize: '$4,500',
    deadline: '2024-02-28',
    category: 'Mobile Development',
    skills: ['React Native', 'JavaScript', 'Firebase', 'API Integration'],
    createdAt: '2024-01-05',
    duration: '3 weeks',
    difficulty: 'Intermediate',
    engagement: 45
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'scheduled': return 'bg-orange-100 text-orange-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'active': return <CheckCircle className="h-4 w-4" />;
    case 'completed': return <CheckCircle className="h-4 w-4" />;
    case 'scheduled': return <Clock className="h-4 w-4" />;
    case 'draft': return <Edit className="h-4 w-4" />;
    case 'paused': return <PauseCircle className="h-4 w-4" />;
    default: return <AlertCircle className="h-4 w-4" />;
  }
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-orange-100 text-orange-800';
    case 'Expert': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export default function EmployerCompetitions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredCompetitions = mockCompetitions.filter(competition => {
    const matchesSearch = competition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competition.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || competition.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || competition.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [...new Set(mockCompetitions.map(c => c.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Competition Management</h1>
          <p className="text-gray-600">Create, manage, and track your competitions</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Competition
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Competitions</p>
                <p className="text-2xl font-bold">{mockCompetitions.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockCompetitions.filter(c => c.status === 'active').length}
                </p>
              </div>
              <PlayCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold">
                  {mockCompetitions.reduce((sum, c) => sum + c.participants, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Prize Pool</p>
                <p className="text-2xl font-bold text-purple-600">$31,000</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search competitions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Competitions List */}
      <div className="space-y-4">
        {filteredCompetitions.map((competition) => (
          <Card key={competition.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{competition.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{competition.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge className={getStatusColor(competition.status)}>
                        {getStatusIcon(competition.status)}
                        <span className="ml-1">{competition.status}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {competition.participants} participants
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Due {competition.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {competition.prize}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {competition.duration}
                    </span>
                    <Badge className={getDifficultyColor(competition.difficulty)} variant="secondary">
                      {competition.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">{competition.category}</Badge>
                    {competition.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {competition.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{competition.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  {competition.status === 'active' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Engagement Rate</span>
                        <span>{competition.engagement}%</span>
                      </div>
                      <ProgressBar value={competition.engagement} className="h-2" />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 lg:ml-4">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      {competition.status === 'active' && (
                        <DropdownMenuItem>
                          <PauseCircle className="h-4 w-4 mr-2" />
                          Pause
                        </DropdownMenuItem>
                      )}
                      {competition.status === 'paused' && (
                        <DropdownMenuItem>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Resume
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompetitions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No competitions found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button onClick={() => setShowCreateForm(true)} className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Competition
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}