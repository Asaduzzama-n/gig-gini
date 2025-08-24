// app/competitions/[id]/progress/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { CheckCircle, Clock, Play, Lock, ArrowLeft, Calendar, FileText, Video, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ProgressBar } from '@/components/ui/progress-bar';

interface CompetitionRound {
  roundNumber: number;
  title: string;
  description: string;
  type: "quiz" | "task" | "presentation" | "interview";
  status: "completed" | "in-progress" | "upcoming" | "locked";
  score?: number;
  maxScore?: number;
  feedback?: string;
  startDate?: Date;
  endDate?: Date;
  submissionDate?: Date;
}

interface UserProgress {
  competitionId: string;
  competitionTitle: string;
  overallProgress: number;
  currentRound: number;
  totalRounds: number;
  rounds: CompetitionRound[];
  rank?: number;
  totalParticipants?: number;
}

// Mock progress data
const mockProgress: UserProgress = {
  competitionId: '1',
  competitionTitle: 'Full Stack Developer Challenge 2024',
  overallProgress: 60,
  currentRound: 3,
  totalRounds: 4,
  rank: 15,
  totalParticipants: 234,
  rounds: [
    {
      roundNumber: 1,
      title: 'Technical Screening',
      description: 'Complete a comprehensive technical assessment covering full-stack development concepts.',
      type: 'quiz',
      status: 'completed',
      score: 85,
      maxScore: 100,
      feedback: 'Excellent performance! Strong knowledge in React and Node.js. Consider reviewing database optimization techniques.',
      startDate: new Date('2024-09-15'),
      endDate: new Date('2024-09-16'),
      submissionDate: new Date('2024-09-15T14:30:00')
    },
    {
      roundNumber: 2,
      title: 'Project Development',
      description: 'Build the e-commerce application according to the provided specifications.',
      type: 'task',
      status: 'completed',
      score: 92,
      maxScore: 100,
      feedback: 'Outstanding work! Clean code architecture and excellent UI design. Minor improvements needed in error handling.',
      startDate: new Date('2024-09-17'),
      endDate: new Date('2024-10-08'),
      submissionDate: new Date('2024-10-07T16:45:00')
    },
    {
      roundNumber: 3,
      title: 'Project Presentation',
      description: 'Present your completed project to a panel of senior developers.',
      type: 'presentation',
      status: 'in-progress',
      startDate: new Date('2024-10-09'),
      endDate: new Date('2024-10-12')
    },
    {
      roundNumber: 4,
      title: 'Final Interview',
      description: 'One-on-one technical interview with the hiring team.',
      type: 'interview',
      status: 'locked',
      startDate: new Date('2024-10-15'),
      endDate: new Date('2024-10-16')
    }
  ]
};

export default function ProgressPage() {
  const params = useParams();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(mockProgress);
      setIsLoading(false);
    };

    fetchProgress();
  }, [params.id]);

  const getStatusIcon = (status: CompetitionRound['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <Play className="w-6 h-6 text-blue-500" />;
      case 'upcoming':
        return <Clock className="w-6 h-6 text-orange-500" />;
      case 'locked':
        return <Lock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: CompetitionRound['type']) => {
    switch (type) {
      case 'quiz':
        return <FileText className="w-5 h-5" />;
      case 'task':
        return <FileText className="w-5 h-5" />;
      case 'presentation':
        return <Video className="w-5 h-5" />;
      case 'interview':
        return <Users className="w-5 h-5" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Progress not found</h2>
          <Button asChild>
            <Link href="/competitions">← Back to Competitions</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/competitions/${progress.competitionId}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Competition
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
            <p className="text-xl text-gray-600">{progress.competitionTitle}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {progress.overallProgress}%
              </div>
              <div className="text-gray-600 mb-4">Overall Progress</div>
              <ProgressBar value={progress.overallProgress} className="h-2" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {progress.currentRound}/{progress.totalRounds}
              </div>
              <div className="text-gray-600">Rounds Completed</div>
            </div>
          </Card>

          {progress.rank && (
            <Card className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">
                  #{progress.rank}
                </div>
                <div className="text-gray-600">
                  Current Rank
                  <div className="text-sm text-gray-500">
                    out of {progress.totalParticipants} participants
                  </div>
                </div>
              </div>
            </Card>
          )}
        </motion.div>

        {/* Rounds Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Competition Rounds</h2>
          
          <div className="space-y-6">
            {progress.rounds.map((round, index) => (
              <motion.div
                key={round.roundNumber}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
              >
                <Card className={`p-6 ${round.status === 'in-progress' ? 'ring-2 ring-blue-500' : ''}`}>
                  <div className="flex items-start space-x-4">
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {getStatusIcon(round.status)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Round {round.roundNumber}: {round.title}
                          </h3>
                          <Badge variant="secondary" className="flex items-center space-x-1">
                            {getTypeIcon(round.type)}
                            <span className="ml-1">{round.type.charAt(0).toUpperCase() + round.type.slice(1)}</span>
                          </Badge>
                        </div>
                        
                        {round.status === 'completed' && round.score && (
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">
                              {round.score}/{round.maxScore}
                            </div>
                            <div className="text-sm text-gray-500">Score</div>
                          </div>
                        )}
                      </div>

                      <p className="text-gray-600 mb-4">{round.description}</p>

                      {/* Timeline */}
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        {round.startDate && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Start: {formatDate(round.startDate)}
                          </div>
                        )}
                        {round.endDate && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            End: {formatDate(round.endDate)}
                          </div>
                        )}
                        {round.submissionDate && (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Submitted: {formatDate(round.submissionDate)}
                          </div>
                        )}
                      </div>

                      {/* Feedback */}
                      {round.feedback && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Feedback</h4>
                          <p className="text-blue-800">{round.feedback}</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        {round.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            View Submission
                          </Button>
                        )}
                        
                        {round.status === 'in-progress' && (
                          <Button className="bg-blue-500 hover:bg-blue-600" size="sm">
                            Continue Round
                          </Button>
                        )}
                        
                        {round.status === 'upcoming' && (
                          <Button variant="outline" size="sm" disabled>
                            Starts Soon
                          </Button>
                        )}
                        
                        {round.status === 'locked' && (
                          <Button variant="outline" size="sm" disabled>
                            <Lock className="w-4 h-4 mr-2" />
                            Locked
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Steps */}
        {progress.currentRound < progress.totalRounds && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8"
          >
            <Card className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-orange-900 mb-2">What's Next?</h3>
                <p className="text-orange-800 mb-4">
                  You&apos;re currently in Round {progress.currentRound}. 
                  {progress.rounds.find(r => r.status === 'in-progress') && 
                    ` Complete your ${progress.rounds.find(r => r.status === 'in-progress')?.title} to advance to the next round.`
                  }
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Continue Competition
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}