"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar, 
  Award, 
  Eye, 
  MessageCircle, 
  Phone, 
  Mail, 
  Download, 
  Heart, 
  X, 
  Check, 
  Clock, 
  Trophy, 
  Target, 
  Briefcase, 
  GraduationCap, 
  Users, 
  TrendingUp,
  FileText,
  ExternalLink,
  MoreHorizontal,
  UserPlus,
  UserX,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  location: string;
  experience: string;
  rating: number;
  skills: string[];
  competitions: {
    id: string;
    title: string;
    rank: number;
    score: number;
    status: 'completed' | 'in_progress' | 'submitted';
    submittedAt: string;
  }[];
  status: 'new' | 'reviewed' | 'shortlisted' | 'interviewed' | 'hired' | 'rejected';
  appliedAt: string;
  lastActive: string;
  portfolio: string;
  resume: string;
  salary: string;
  availability: string;
  notes: string;
  isBookmarked: boolean;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: '/avatars/sarah.jpg',
    title: 'Senior Full Stack Developer',
    location: 'San Francisco, CA',
    experience: '5+ years',
    rating: 4.9,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    competitions: [
      {
        id: '1',
        title: 'Senior Full Stack Developer Challenge',
        rank: 1,
        score: 95,
        status: 'completed',
        submittedAt: '2024-01-15'
      },
      {
        id: '2',
        title: 'React Performance Optimization',
        rank: 2,
        score: 88,
        status: 'completed',
        submittedAt: '2023-12-20'
      }
    ],
    status: 'shortlisted',
    appliedAt: '2024-01-10',
    lastActive: '2 hours ago',
    portfolio: 'https://sarahjohnson.dev',
    resume: 'sarah_johnson_resume.pdf',
    salary: '$120,000 - $140,000',
    availability: 'Immediate',
    notes: 'Excellent technical skills, strong communication',
    isBookmarked: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    avatar: '/avatars/michael.jpg',
    title: 'Digital Marketing Specialist',
    location: 'New York, NY',
    experience: '3+ years',
    rating: 4.7,
    skills: ['SEO', 'Google Analytics', 'Content Marketing', 'PPC', 'Social Media'],
    competitions: [
      {
        id: '2',
        title: 'Digital Marketing Strategy Contest',
        rank: 1,
        score: 92,
        status: 'completed',
        submittedAt: '2024-01-18'
      }
    ],
    status: 'interviewed',
    appliedAt: '2024-01-08',
    lastActive: '1 day ago',
    portfolio: 'https://michaelchen.marketing',
    resume: 'michael_chen_resume.pdf',
    salary: '$70,000 - $85,000',
    availability: '2 weeks notice',
    notes: 'Creative approach, good analytical skills',
    isBookmarked: false
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    avatar: '/avatars/emily.jpg',
    title: 'UX/UI Designer',
    location: 'Austin, TX',
    experience: '4+ years',
    rating: 4.8,
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
    competitions: [
      {
        id: '3',
        title: 'UI/UX Design Innovation Challenge',
        rank: 2,
        score: 88,
        status: 'submitted',
        submittedAt: '2024-01-20'
      }
    ],
    status: 'reviewed',
    appliedAt: '2024-01-12',
    lastActive: '3 hours ago',
    portfolio: 'https://emilyrodriguez.design',
    resume: 'emily_rodriguez_resume.pdf',
    salary: '$85,000 - $100,000',
    availability: 'Immediate',
    notes: 'Strong portfolio, user-centered design approach',
    isBookmarked: true
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@email.com',
    avatar: '/avatars/david.jpg',
    title: 'Data Scientist',
    location: 'Seattle, WA',
    experience: '6+ years',
    rating: 4.6,
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau', 'TensorFlow'],
    competitions: [
      {
        id: '4',
        title: 'Data Science Analytics Competition',
        rank: 3,
        score: 85,
        status: 'in_progress',
        submittedAt: '2024-01-22'
      }
    ],
    status: 'new',
    appliedAt: '2024-01-20',
    lastActive: '5 minutes ago',
    portfolio: 'https://davidkim.data',
    resume: 'david_kim_resume.pdf',
    salary: '$110,000 - $130,000',
    availability: '1 month notice',
    notes: '',
    isBookmarked: false
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    avatar: '/avatars/lisa.jpg',
    title: 'Mobile App Developer',
    location: 'Los Angeles, CA',
    experience: '4+ years',
    rating: 4.5,
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'API Integration'],
    competitions: [
      {
        id: '5',
        title: 'Mobile App Development Sprint',
        rank: 1,
        score: 90,
        status: 'completed',
        submittedAt: '2024-01-16'
      }
    ],
    status: 'hired',
    appliedAt: '2024-01-05',
    lastActive: '1 week ago',
    portfolio: 'https://lisathompson.mobile',
    resume: 'lisa_thompson_resume.pdf',
    salary: '$95,000 - $110,000',
    availability: 'Hired',
    notes: 'Excellent mobile development skills, hired for senior position',
    isBookmarked: true
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-800';
    case 'reviewed': return 'bg-yellow-100 text-yellow-800';
    case 'shortlisted': return 'bg-orange-100 text-orange-800';
    case 'interviewed': return 'bg-purple-100 text-purple-800';
    case 'hired': return 'bg-green-100 text-green-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getRankBadgeColor(rank: number) {
  switch (rank) {
    case 1: return 'bg-yellow-100 text-yellow-800';
    case 2: return 'bg-gray-100 text-gray-800';
    case 3: return 'bg-orange-100 text-orange-800';
    default: return 'bg-blue-100 text-blue-800';
  }
}

function getCompetitionStatusColor(status: string) {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in_progress': return 'bg-blue-100 text-blue-800';
    case 'submitted': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export default function EmployerCandidates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesSkill = skillFilter === 'all' || candidate.skills.includes(skillFilter);
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'bookmarked' && candidate.isBookmarked) ||
                      (activeTab === 'new' && candidate.status === 'new') ||
                      (activeTab === 'shortlisted' && candidate.status === 'shortlisted');
    return matchesSearch && matchesStatus && matchesSkill && matchesTab;
  });

  const allSkills = [...new Set(mockCandidates.flatMap(c => c.skills))];

  const stats = {
    total: mockCandidates.length,
    new: mockCandidates.filter(c => c.status === 'new').length,
    shortlisted: mockCandidates.filter(c => c.status === 'shortlisted').length,
    interviewed: mockCandidates.filter(c => c.status === 'interviewed').length,
    hired: mockCandidates.filter(c => c.status === 'hired').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600">Review and manage competition participants</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Candidate
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New</p>
                <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Shortlisted</p>
                <p className="text-2xl font-bold text-orange-600">{stats.shortlisted}</p>
              </div>
              <Bookmark className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Interviewed</p>
                <p className="text-2xl font-bold text-purple-600">{stats.interviewed}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hired</p>
                <p className="text-2xl font-bold text-green-600">{stats.hired}</p>
              </div>
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Candidates</TabsTrigger>
          <TabsTrigger value="new">New ({stats.new})</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted ({stats.shortlisted})</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search candidates by name, title, or skills..."
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
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interviewed">Interviewed</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={skillFilter} onValueChange={setSkillFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    {allSkills.map(skill => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Candidates List */}
          <div className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Candidate Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={candidate.avatar} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                              <p className="text-gray-600">{candidate.title}</p>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {candidate.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Briefcase className="h-4 w-4" />
                                  {candidate.experience}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  {candidate.rating}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(candidate.status)}>
                                {candidate.status}
                              </Badge>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {}}
                              >
                                {candidate.isBookmarked ? (
                                  <BookmarkCheck className="h-4 w-4 text-orange-600" />
                                ) : (
                                  <Bookmark className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {candidate.skills.slice(0, 5).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 5 && (
                              <Badge variant="secondary" className="text-xs">
                                +{candidate.skills.length - 5} more
                              </Badge>
                            )}
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-3">
                            <p><strong>Applied:</strong> {candidate.appliedAt}</p>
                            <p><strong>Last Active:</strong> {candidate.lastActive}</p>
                            <p><strong>Salary:</strong> {candidate.salary}</p>
                            <p><strong>Availability:</strong> {candidate.availability}</p>
                          </div>
                          
                          {candidate.notes && (
                            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                              <strong>Notes:</strong> {candidate.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Competition Results */}
                    <div className="lg:w-80">
                      <h4 className="font-medium text-gray-900 mb-3">Competition Performance</h4>
                      <div className="space-y-3">
                        {candidate.competitions.map((competition, index) => (
                          <div key={index} className="border rounded-lg p-3 bg-gray-50">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-medium text-sm text-gray-900 line-clamp-2">
                                {competition.title}
                              </h5>
                              <Badge className={getCompetitionStatusColor(competition.status)} variant="secondary">
                                {competition.status}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <Badge className={getRankBadgeColor(competition.rank)} variant="secondary">
                                  #{competition.rank}
                                </Badge>
                                <span className="font-medium">{competition.score}%</span>
                              </div>
                              <span className="text-gray-500">{competition.submittedAt}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 mt-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            View Profile
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-1" />
                            Resume
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Portfolio
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                            <Check className="h-4 w-4 mr-1" />
                            Shortlist
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCandidates.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Candidates
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}