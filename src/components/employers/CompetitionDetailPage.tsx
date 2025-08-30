'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  Calendar,
  Trophy,
  Eye,
  Edit,
  BarChart3,
  Clock,
  CheckCircle,
  Star,
  Mail,
  Phone,
  MapPin,
  Download,
  MessageSquare
} from 'lucide-react';

interface CompetitionDetailPageProps {
  competitionId: string;
}

// Mock competition data
const mockCompetition = {
  id: '1',
  title: 'Senior Frontend Developer Challenge',
  description: 'We are looking for an experienced React developer to join our growing team. This competition will test your skills in modern frontend development, including React, TypeScript, and state management.',
  status: 'active',
  category: 'IT & Technology',
  skillsTested: ['React', 'TypeScript', 'Redux', 'CSS', 'JavaScript'],
  location: 'Remote',
  workType: 'Remote',
  experienceLevel: 'Senior Level (5-8 years)',
  startDate: '2024-01-15',
  endDate: '2024-02-15',
  resultDate: '2024-02-22',
  prize: '$5,000 + Job Offer',
  registrationFee: 'Free',
  maxParticipants: 100,
  currentParticipants: 45,
  projectBrief: 'Build a complete e-commerce dashboard with React and TypeScript. The application should include product management, order tracking, and analytics features.',
  evaluationCriteria: [
    'Code quality and organization',
    'User interface design',
    'Functionality and features',
    'Performance optimization',
    'Testing coverage'
  ],
  rounds: [
    { number: 1, title: 'Screening Quiz', status: 'completed', participants: 45 },
    { number: 2, title: 'Video Pitch', status: 'active', participants: 32 },
    { number: 3, title: 'Live Interview', status: 'upcoming', participants: 0 },
    { number: 4, title: 'Final Evaluation', status: 'upcoming', participants: 0 }
  ]
};

// Mock applicants data
const mockApplicants = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    avatar: '',
    experience: '6 years',
    skills: ['React', 'TypeScript', 'Node.js'],
    currentRound: 2,
    status: 'in-progress',
    score: 92,
    appliedDate: '2024-01-16'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    avatar: '',
    experience: '8 years',
    skills: ['React', 'Vue.js', 'Angular'],
    currentRound: 2,
    status: 'in-progress',
    score: 88,
    appliedDate: '2024-01-17'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    avatar: '',
    experience: '5 years',
    skills: ['React', 'TypeScript', 'GraphQL'],
    currentRound: 1,
    status: 'failed',
    score: 72,
    appliedDate: '2024-01-18'
  }
];

export function CompetitionDetailPage({ competitionId }: CompetitionDetailPageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoundStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/employer/competitions">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Competitions
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{mockCompetition.title}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <Badge className={getStatusColor(mockCompetition.status)}>
                {mockCompetition.status}
              </Badge>
              <span className="text-gray-600">{mockCompetition.category}</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">{mockCompetition.currentParticipants} applicants</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={`/employer/competitions/${competitionId}/journey`}>
            <Button variant="outline">
              <Trophy className="h-4 w-4 mr-2" />
              Manage Journey
            </Button>
          </Link>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Link href={`/employer/competitions/${competitionId}/analytics`}>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                <p className="text-3xl font-bold text-gray-900">{mockCompetition.currentParticipants}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Round</p>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Qualified</p>
                <p className="text-3xl font-bold text-gray-900">32</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days Left</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applicants">Applicants ({mockCompetition.currentParticipants})</TabsTrigger>
          <TabsTrigger value="rounds">Rounds</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Competition Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{mockCompetition.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Skills Tested</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockCompetition.skillsTested.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <p className="font-medium">{mockCompetition.location}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Work Type:</span>
                    <p className="font-medium">{mockCompetition.workType}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Experience:</span>
                    <p className="font-medium">{mockCompetition.experienceLevel}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Prize:</span>
                    <p className="font-medium text-green-600">{mockCompetition.prize}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Brief</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{mockCompetition.projectBrief}</p>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Evaluation Criteria</h4>
                  <ul className="space-y-1">
                    {mockCompetition.evaluationCriteria.map((criteria, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applicants" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Applicants</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="space-y-4">
            {mockApplicants.map((applicant) => (
              <Card key={applicant.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={applicant.avatar} alt={applicant.name} />
                        <AvatarFallback>
                          {applicant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900">{applicant.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {applicant.email}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {applicant.location}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-600">{applicant.experience} experience</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">Round {applicant.currentRound}</span>
                          <Badge className={getStatusColor(applicant.status)} size="sm">
                            {applicant.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{applicant.score}%</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rounds" className="space-y-4">
          <h3 className="text-lg font-semibold">Competition Rounds</h3>
          
          <div className="space-y-4">
            {mockCompetition.rounds.map((round) => (
              <Card key={round.number}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#FC5602] text-white rounded-full flex items-center justify-center font-semibold">
                          {round.number}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{round.title}</h4>
                          <p className="text-sm text-gray-600">{round.participants} participants</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge className={getRoundStatusColor(round.status)}>
                        {round.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competition Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                  <p className="text-gray-900">{mockCompetition.startDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">End Date</Label>
                  <p className="text-gray-900">{mockCompetition.endDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Max Participants</Label>
                  <p className="text-gray-900">{mockCompetition.maxParticipants}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Registration Fee</Label>
                  <p className="text-gray-900">{mockCompetition.registrationFee}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                  Delete Competition
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}