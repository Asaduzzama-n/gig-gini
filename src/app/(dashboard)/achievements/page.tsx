"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Trophy, 
  Award, 
  Star, 
  Medal, 
  Target, 
  Calendar, 
  Download, 
  Share2, 
  Filter,
  Crown,
  Zap,
  TrendingUp,
  Users,
  CheckCircle
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'trophy' | 'badge' | 'certificate' | 'milestone';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  competition: string;
  dateEarned: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: string;
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Place Winner',
    description: 'Won first place in a major competition',
    type: 'trophy',
    level: 'gold',
    competition: 'Full Stack Developer Challenge',
    dateEarned: '2024-01-15',
    points: 500,
    rarity: 'legendary',
    category: 'Development'
  },
  {
    id: '2',
    title: 'Innovation Master',
    description: 'Demonstrated exceptional innovation in solution design',
    type: 'badge',
    level: 'platinum',
    competition: 'Startup Pitch Competition',
    dateEarned: '2024-01-10',
    points: 300,
    rarity: 'epic',
    category: 'Business'
  },
  {
    id: '3',
    title: 'Speed Demon',
    description: 'Completed challenge in record time',
    type: 'badge',
    level: 'silver',
    competition: 'React Developer Challenge',
    dateEarned: '2024-01-08',
    points: 200,
    rarity: 'rare',
    category: 'Development'
  },
  {
    id: '4',
    title: 'Team Player',
    description: 'Excellent collaboration in team-based competition',
    type: 'badge',
    level: 'bronze',
    competition: 'Hackathon 2024',
    dateEarned: '2024-01-05',
    points: 150,
    rarity: 'common',
    category: 'Collaboration'
  },
  {
    id: '5',
    title: 'UI/UX Excellence',
    description: 'Outstanding user interface and experience design',
    type: 'certificate',
    level: 'gold',
    competition: 'Design Challenge',
    dateEarned: '2024-01-03',
    points: 400,
    rarity: 'epic',
    category: 'Design'
  },
  {
    id: '6',
    title: '10 Competitions Milestone',
    description: 'Participated in 10 competitions',
    type: 'milestone',
    level: 'silver',
    competition: 'Platform Achievement',
    dateEarned: '2024-01-01',
    points: 250,
    rarity: 'rare',
    category: 'Participation'
  }
];

const stats = [
  {
    title: 'Total Achievements',
    value: '24',
    icon: Trophy,
    color: 'text-orange-600'
  },
  {
    title: 'Points Earned',
    value: '3,450',
    icon: Star,
    color: 'text-yellow-600'
  },
  {
    title: 'Rare Achievements',
    value: '8',
    icon: Crown,
    color: 'text-purple-600'
  },
  {
    title: 'Current Streak',
    value: '12 days',
    icon: Zap,
    color: 'text-blue-600'
  }
];

function getTypeIcon(type: string) {
  switch (type) {
    case 'trophy': return Trophy;
    case 'badge': return Award;
    case 'certificate': return Medal;
    case 'milestone': return Target;
    default: return Star;
  }
}

function getLevelColor(level: string) {
  switch (level) {
    case 'bronze': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
    default: return 'bg-blue-100 text-blue-800 border-blue-200';
  }
}

function getRarityColor(rarity: string) {
  switch (rarity) {
    case 'common': return 'bg-gray-50 border-gray-200';
    case 'rare': return 'bg-blue-50 border-blue-200';
    case 'epic': return 'bg-purple-50 border-purple-200';
    case 'legendary': return 'bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200';
    default: return 'bg-gray-50 border-gray-200';
  }
}

function getRarityBadgeColor(rarity: string) {
  switch (rarity) {
    case 'common': return 'bg-gray-100 text-gray-800';
    case 'rare': return 'bg-blue-100 text-blue-800';
    case 'epic': return 'bg-purple-100 text-purple-800';
    case 'legendary': return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export default function Achievements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredAchievements = mockAchievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.competition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "all" || achievement.type === activeTab;
    const matchesCategory = selectedCategory === "all" || achievement.category === selectedCategory;
    
    return matchesSearch && matchesTab && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(mockAchievements.map(a => a.category)))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">My Achievements</h1>
            <p className="text-orange-100">Showcase your competition victories and milestones</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="secondary" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Profile
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Achievement Gallery</CardTitle>
              <CardDescription>Browse your earned achievements and certificates</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search achievements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="trophy">Trophies</TabsTrigger>
              <TabsTrigger value="badge">Badges</TabsTrigger>
              <TabsTrigger value="certificate">Certificates</TabsTrigger>
              <TabsTrigger value="milestone">Milestones</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              {filteredAchievements.length === 0 ? (
                <div className="text-center py-12">
                  <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAchievements.map((achievement) => {
                    const TypeIcon = getTypeIcon(achievement.type);
                    return (
                      <Card 
                        key={achievement.id} 
                        className={`hover:shadow-lg transition-all duration-200 border-2 ${getRarityColor(achievement.rarity)}`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`p-3 rounded-full ${getLevelColor(achievement.level).replace('text-', 'bg-').replace('800', '100')}`}>
                                <TypeIcon className={`h-6 w-6 ${getLevelColor(achievement.level).split(' ')[1]}`} />
                              </div>
                              <div className="flex flex-col">
                                <Badge className={getRarityBadgeColor(achievement.rarity)} variant="secondary">
                                  {achievement.rarity}
                                </Badge>
                              </div>
                            </div>
                            <Badge className={getLevelColor(achievement.level)} variant="outline">
                              {achievement.level}
                            </Badge>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">{achievement.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                            </div>
                            
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Trophy className="h-4 w-4" />
                                <span>{achievement.competition}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{achievement.dateEarned}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                <span>{achievement.points} points</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-3 border-t">
                              <Badge variant="secondary">{achievement.category}</Badge>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                                {achievement.type === 'certificate' && (
                                  <Button size="sm" variant="outline">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Achievement Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              Achievement Progress
            </CardTitle>
            <CardDescription>Track your progress towards new achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Competition Veteran</span>
                <span className="text-sm text-gray-600">8/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{width: '80%'}}></div>
              </div>
              <p className="text-xs text-gray-600">Complete 10 competitions to unlock</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Skill Master</span>
                <span className="text-sm text-gray-600">3/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
              <p className="text-xs text-gray-600">Win in 5 different categories</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Point Collector</span>
                <span className="text-sm text-gray-600">3,450/5,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{width: '69%'}}></div>
              </div>
              <p className="text-xs text-gray-600">Earn 5,000 achievement points</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest achievement milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAchievements.slice(0, 4).map((achievement, index) => {
              const TypeIcon = getTypeIcon(achievement.type);
              return (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className={`p-2 rounded-full ${getLevelColor(achievement.level).replace('text-', 'bg-').replace('800', '100')}`}>
                    <TypeIcon className={`h-4 w-4 ${getLevelColor(achievement.level).split(' ')[1]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{achievement.title}</p>
                    <p className="text-sm text-gray-600">{achievement.competition}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getLevelColor(achievement.level)} variant="outline">
                        {achievement.level}
                      </Badge>
                      <span className="text-xs text-gray-500">{achievement.dateEarned}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-orange-600">+{achievement.points}</div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}