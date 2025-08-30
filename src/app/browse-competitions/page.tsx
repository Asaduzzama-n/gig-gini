// app/competitions/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Trophy, Users, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CategoryFilter } from '@/components/shared/CategoryFilter';
import Link from 'next/link';
import { mockCompetitions } from '@/utils/mockdata';

interface Competition {
  id: string;
  title: string;
  organizer: string;
  location?: string;
  rating?: number;
  categories: string[];
  prizes?: string;
  registrationFee?: string;
  startDate?: Date;
  endDate?: Date;
  resultDate?: Date;
  description?: string;
  skillsTested: string[];
  participantCount?: number;
}

// Mock data - replace with API call

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState<Competition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const searchTerm = searchParams.get('search') || '';
  const selectedCategories = searchParams.get('categories')?.split(',').filter(Boolean) || [];

  const categories = ['IT', 'Marketing', 'Sales', 'Business', 'Design'];
  
  const updateURL = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };
  
  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    updateURL('categories', newCategories.join(','));
  };

  const clearAllCategories = () => {
    updateURL('categories', '');
  };

  useEffect(() => {
    // Simulate API call
    const fetchCompetitions = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCompetitions(mockCompetitions);
      setFilteredCompetitions(mockCompetitions);
      setIsLoading(false);
    };

    fetchCompetitions();
  }, []);

  useEffect(() => {
    let filtered = competitions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(comp => 
        comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.skillsTested.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(comp => 
        comp.categories.some(cat => selectedCategories.includes(cat))
      );
    }



    setFilteredCompetitions(filtered);
  }, [searchTerm, selectedCategories.join(','), competitions]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Competitions</h1>
            <p className="text-gray-600">Discover exciting challenges and showcase your skills</p>
          </motion.div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto  ">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-lg p-8 mb-8 bg-white shadow-lg border border-gray-100"
        >
          {/* Search Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Your Perfect Competition</h2>
            <div className="relative ">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by title, organizer, or skills..."
                value={searchTerm}
                onChange={(e) => updateURL('search', e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 shadow-sm"
              />
            </div>
          </div>

          {/* Category Filters */}
          <CategoryFilter
             categories={categories}
             selectedCategories={selectedCategories}
             onToggleCategory={toggleCategory}
             onClearAll={clearAllCategories}
             className="-m-6 mb-2"
           />
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCompetitions.length} of {competitions.length} competitions
          </p>
        </div>

        {/* Competition Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6,7].map((i) => (
              <Card key={i} className="p-6 animate-pulse bg-gray-200 border-0">
                <div className="h-4 bg-gray-300 border-0 rounded mb-4"></div>
                <div className="h-3 bg-gray-300 border-0 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 border-0 rounded mb-4"></div>
                <div className="h-8 bg-gray-300 border-0 rounded"></div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompetitions.map((competition, index) => (
              <motion.div
                key={competition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CompetitionCard competition={competition} />
              </motion.div>
            ))}
          </div>
        )}

        {filteredCompetitions.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No competitions found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or check back later for new competitions.</p>
            <Button asChild>
              <Link href="/">Browse All Categories</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export { CompetitionCard };

interface CompetitionCardProps {
  competition: Competition;
}

function CompetitionCard({ competition }: CompetitionCardProps) {
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'TBD';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getRemainingDays = (endDate: Date | undefined) => {
    if (!endDate) return null;
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const remainingDays = getRemainingDays(competition.endDate);

  return (
    <Card className="group transition-all shadow-sm bg-white duration-300 border-0 h-full flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
              {competition.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{competition.organizer}</p>
          </div>
          {competition.rating && (
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
              <span className="text-yellow-600 text-sm font-medium">★ {competition.rating}</span>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {competition.categories.map(category => (
            <span
              key={category}
              className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {competition.description}
        </p>

        {/* Skills */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Skills Tested:</p>
          <div className="flex flex-wrap gap-1">
            {competition.skillsTested.slice(0, 3).map(skill => (
              <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {skill}
              </span>
            ))}
            {competition.skillsTested.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                +{competition.skillsTested.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Meta Info */}
        <div className="space-y-2 mb-4">
          {competition.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {competition.location}
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(competition.startDate)} - {formatDate(competition.endDate)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {competition.participantCount} participants
          </div>
          {competition.prizes && (
            <div className="flex items-center text-sm text-green-600 font-medium">
              <Trophy className="w-4 h-4 mr-2" />
              {competition.prizes}
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm">
            {competition.registrationFee === 'Free' ? (
              <span className="text-green-600 font-medium">Free to Join</span>
            ) : (
              <span className="text-gray-600">Fee: {competition.registrationFee}</span>
            )}
          </div>
          {remainingDays !== null && (
            <div className="text-sm">
              {remainingDays > 0 ? (
                <span className="text-orange-600 font-medium">
                  {remainingDays} days left
                </span>
              ) : (
                <span className="text-red-600 font-medium">Ended</span>
              )}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            <Link href={`/browse-competitions/${competition.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}