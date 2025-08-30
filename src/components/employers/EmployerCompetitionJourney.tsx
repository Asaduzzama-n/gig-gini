'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  Calendar,
  Trophy,
  CheckCircle,
  Clock,
  Play,
  Edit,
  Send,
  Eye,
  Star,
  MessageSquare,
  Settings,
  BarChart3,
  FileText,
  Video,
  Award
} from 'lucide-react';

interface EmployerCompetitionJourneyProps {
  competitionId: string;
}

// Mock data for employer journey management
const mockCompetition = {
  id: '1',
  title: 'Senior Frontend Developer Challenge',
  status: 'active',
  currentRound: 2,
  totalRounds: 4,
  rounds: [
    {
      number: 1,
      title: 'Screening Quiz',
      type: 'quiz',
      status: 'completed',
      participants: 45,
      qualified: 32,
      description: 'Technical screening with React and JavaScript questions',
      passingScore: 85,
      timeLimit: 45
    },
    {
      number: 2,
      title: 'Video Pitch',
      type: 'video',
      status: 'active',
      participants: 32,
      qualified: 0,
      description: '2-minute video showcasing skills and motivation',
      deadline: '2024-02-10',
      submissions: 18
    },
    {
      number: 3,
      title: 'Live Interview',
      type: 'interview',
      status: 'upcoming',
      participants: 0,
      qualified: 0,
      description: '30-minute technical and behavioral interview',
      scheduledSlots: 0
    },
    {
      number: 4,
      title: 'Final Evaluation',
      type: 'evaluation',
      status: 'upcoming',
      participants: 0,
      qualified: 0,
      description: 'Final assessment and winner selection'
    }
  ]
};

const mockCandidates = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: '',
    currentRound: 2,
    status: 'active',
    scores: { 1: 92, 2: null },
    submissionDate: '2024-01-28',
    notes: 'Strong technical background, excellent communication'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: '',
    currentRound: 2,
    status: 'active',
    scores: { 1: 88, 2: null },
    submissionDate: '2024-01-29',
    notes: 'Good problem-solving skills, needs improvement in React hooks'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    avatar: '',
    currentRound: 1,
    status: 'eliminated',
    scores: { 1: 72 },
    submissionDate: '2024-01-30',
    notes: 'Did not meet minimum requirements for round 1'
  }
];

export function EmployerCompetitionJourney({ competitionId }: EmployerCompetitionJourneyProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRound, setSelectedRound] = useState(2);

  const currentRound = mockCompetition.rounds.find(r => r.number === selectedRound);
  const activeCandidates = mockCandidates.filter(c => c.status === 'active' && c.currentRound === selectedRound);

  const getRoundIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'interview':
        return <Calendar className="h-5 w-5" />;
      case 'evaluation':
        return <Award className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/employer/competitions/${competitionId}`}>
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Competition
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Competition Journey</h1>
            <p className="text-gray-600">{mockCompetition.title}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Journey Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {mockCompetition.rounds.map((round) => (
              <div
                key={round.number}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedRound === round.number
                    ? 'border-[#FC5602] bg-[#FC5602]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRound(round.number)}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg ${getStatusColor(round.status)}`}>
                    {getRoundIcon(round.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Round {round.number}</h4>
                    <p className="text-sm text-gray-600">{round.title}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Participants:</span>
                    <span className="font-medium">{round.participants}</span>
                  </div>
                  {round.qualified > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Qualified:</span>
                      <span className="font-medium text-green-600">{round.qualified}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Round Management */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Round Overview</TabsTrigger>
          <TabsTrigger value="candidates">Candidates ({activeCandidates.length})</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="settings">Round Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getRoundIcon(currentRound?.type || '')}
                <span>Round {selectedRound}: {currentRound?.title}</span>
                <Badge className={getStatusColor(currentRound?.status || '')}>
                  {currentRound?.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{currentRound?.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-900">{currentRound?.participants}</p>
                  <p className="text-sm text-blue-600">Participants</p>
                </div>
                
                {currentRound?.submissions !== undefined && (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-900">{currentRound.submissions}</p>
                    <p className="text-sm text-green-600">Submissions</p>
                  </div>
                )}
                
                {currentRound?.qualified !== undefined && currentRound.qualified > 0 && (
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Trophy className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-900">{currentRound.qualified}</p>
                    <p className="text-sm text-purple-600">Qualified</p>
                  </div>
                )}
                
                {currentRound?.deadline && (
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-sm font-bold text-orange-900">
                      {new Date(currentRound.deadline).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-orange-600">Deadline</p>
                  </div>
                )}
              </div>

              {currentRound?.status === 'active' && (
                <div className="flex space-x-2">
                  <Button className="btn-primary">
                    <Play className="h-4 w-4 mr-2" />
                    Advance Qualified Candidates
                  </Button>
                  <Button variant="outline">
                    <Send className="h-4 w-4 mr-2" />
                    Send Notifications
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Round {selectedRound} Candidates</h3>
            <div className="flex space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Candidates</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {activeCandidates.map((candidate) => (
              <Card key={candidate.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={candidate.avatar} alt={candidate.name} />
                        <AvatarFallback>
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                        <p className="text-sm text-gray-600">{candidate.email}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          {candidate.scores[1] && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium">Round 1: {candidate.scores[1]}%</span>
                            </div>
                          )}
                          <span className="text-sm text-gray-500">
                            Submitted: {new Date(candidate.submissionDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                  
                  {candidate.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{candidate.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submission Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Submission Review
                </h3>
                <p className="text-gray-600 mb-6">
                  Review and evaluate candidate submissions for Round {selectedRound}
                </p>
                <Button className="btn-primary">
                  <Eye className="h-4 w-4 mr-2" />
                  Review Submissions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Round {selectedRound} Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Round Title</Label>
                  <Input value={currentRound?.title} readOnly />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <Select value={currentRound?.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {currentRound?.passingScore && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Passing Score (%)</Label>
                    <Input type="number" value={currentRound.passingScore} />
                  </div>
                )}
                
                {currentRound?.timeLimit && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Time Limit (minutes)</Label>
                    <Input type="number" value={currentRound.timeLimit} />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Description</Label>
                <Textarea value={currentRound?.description} rows={3} />
              </div>
              
              <div className="flex space-x-2">
                <Button className="btn-primary">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Settings
                </Button>
                <Button variant="outline">
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}