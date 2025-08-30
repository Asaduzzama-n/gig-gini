'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CategoryFilter } from '@/components/shared/CategoryFilter';
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
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

const categories = ['IT', 'Design', 'Marketing', 'Sales', 'Business'];

export function LeaderboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Initialize categories from URL
  useEffect(() => {
    const categoriesParam = searchParams.get('categories');
    if (categoriesParam) {
      setSelectedCategories(categoriesParam.split(',').filter(Boolean));
    }
  }, [searchParams]);

  // Update URL when categories change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    } else {
      params.delete('categories');
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  }, [selectedCategories.join(','), router, searchParams]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  // Filter leaderboard data based on selected categories
  const filteredData = selectedCategories.length > 0
    ? mockLeaderboardData.filter(user => selectedCategories.includes(user.category))
    : mockLeaderboardData;

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

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            onClearAll={clearAllCategories}
            resultCount={filteredData.length}
            showResultCount={true}
          />
        </motion.div>

        {/* Leaderboard Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-[#FC5602]" />
                <span>Top Performers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredData.length > 0 ? (
                  filteredData.map((user, index) => (
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
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No results found for the selected categories.</p>
                    <Button
                      variant="outline"
                      onClick={clearAllCategories}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}