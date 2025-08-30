'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar as Progress } from '@/components/ui/progress-bar';
import { Separator } from '@/components/ui/separator';
import {
  Trophy,
  Clock,
  Users,
  CheckCircle,
  Lock,
  Play,
  Upload,
  Video,
  Calendar,
  Award,
  ArrowRight,
  FileText,
  Zap,
  X
} from 'lucide-react';

interface CompetitionJourneyProps {
  competitionId: string;
  competitionTitle: string;
  currentRound: number;
  totalRounds: number;
  roundsData: Array<{
    roundNumber: number;
    title: string;
    description: string;
    type: 'quiz' | 'video' | 'interview' | 'evaluation';
    status: 'locked' | 'available' | 'in-progress' | 'completed' | 'failed';
    score?: number;
    feedback?: string;
    deadline?: Date;
    scheduledDate?: Date;
  }>;
}

const roundIcons = {
  quiz: FileText,
  video: Video,
  interview: Calendar,
  evaluation: Award
};

const roundColors = {
  locked: 'bg-gray-100 text-gray-400 border-gray-200',
  available: 'bg-blue-50 text-blue-600 border-blue-200',
  'in-progress': 'bg-yellow-50 text-yellow-600 border-yellow-200',
  completed: 'bg-green-50 text-green-600 border-green-200',
  failed: 'bg-red-50 text-red-600 border-red-200'
};

export function CompetitionJourney({ 
  competitionId, 
  competitionTitle, 
  currentRound, 
  totalRounds, 
  roundsData 
}: CompetitionJourneyProps) {
  const [activeRound, setActiveRound] = useState(currentRound);
  
  const progress = (currentRound / totalRounds) * 100;
  const currentRoundData = roundsData.find(r => r.roundNumber === activeRound);

  const getRoundStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Play className="h-5 w-5 text-yellow-600" />;
      case 'failed':
        return <X className="h-5 w-5 text-red-600" />;
      case 'locked':
        return <Lock className="h-5 w-5 text-gray-400" />;
      default:
        return <Clock className="h-5 w-5 text-blue-600" />;
    }
  };

  const renderRoundContent = (round: typeof roundsData[0]) => {
    switch (round.type) {
      case 'quiz':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Screening Quiz</h4>
              <p className="text-sm text-blue-700 mb-3">
                Complete the screening questions to demonstrate your knowledge and problem-solving skills.
              </p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>• 20 multiple choice questions</li>
                <li>• 45 minutes time limit</li>
                <li>• Minimum 85% score required to advance</li>
                <li>• One attempt only</li>
              </ul>
            </div>
            
            {round.status === 'available' && (
              <Button className="w-full btn-primary">
                <Play className="h-4 w-4 mr-2" />
                Start Quiz
              </Button>
            )}
            
            {round.status === 'completed' && round.score && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-green-900">Quiz Completed</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Score: {round.score}%
                  </Badge>
                </div>
                <p className="text-sm text-green-700">
                  Congratulations! You've successfully passed the screening round.
                </p>
              </div>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Video Pitch</h4>
              <p className="text-sm text-purple-700 mb-3">
                Record a 1-2 minute video showcasing your skills and explaining why you're the best fit.
              </p>
              <ul className="text-xs text-purple-600 space-y-1">
                <li>• Maximum 2 minutes duration</li>
                <li>• Upload to Google Drive and share public link</li>
                <li>• Clear audio and video quality required</li>
                <li>• Professional presentation expected</li>
              </ul>
            </div>
            
            {round.status === 'available' && (
              <div className="space-y-3">
                <Button className="w-full btn-primary">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Video Link
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Make sure your Google Drive link is set to "Anyone with the link can view"
                </p>
              </div>
            )}
            
            {round.status === 'completed' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-green-900">Video Submitted</span>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    Under Review
                  </Badge>
                </div>
                <p className="text-sm text-green-700">
                  Your video has been submitted and is being reviewed by our team.
                </p>
              </div>
            )}
          </div>
        );

      case 'interview':
        return (
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-medium text-orange-900 mb-2">Live Zoom Interview</h4>
              <p className="text-sm text-orange-700 mb-3">
                Join a live interview session with the hiring team to discuss your background and skills.
              </p>
              <ul className="text-xs text-orange-600 space-y-1">
                <li>• 30-45 minute session</li>
                <li>• Technical and behavioral questions</li>
                <li>• Portfolio/project discussion</li>
                <li>• Q&A opportunity</li>
              </ul>
            </div>
            
            {round.scheduledDate && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Scheduled Interview</p>
                    <p className="text-sm text-blue-700">
                      {round.scheduledDate.toLocaleDateString()} at {round.scheduledDate.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {round.status === 'available' && !round.scheduledDate && (
              <div className="text-center py-4">
                <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Waiting for interview to be scheduled. You'll receive an email notification.
                </p>
              </div>
            )}
            
            {round.status === 'completed' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-green-900">Interview Completed</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Passed
                  </Badge>
                </div>
                <p className="text-sm text-green-700">
                  Great job! You've successfully completed the interview round.
                </p>
              </div>
            )}
          </div>
        );

      case 'evaluation':
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Final Evaluation</h4>
              <p className="text-sm text-yellow-700 mb-3">
                The final assessment where winners are selected based on overall performance across all rounds.
              </p>
              <ul className="text-xs text-yellow-600 space-y-1">
                <li>• Comprehensive performance review</li>
                <li>• Scoring across all competition rounds</li>
                <li>• Winner selection and ranking</li>
                <li>• Final results announcement</li>
              </ul>
            </div>
            
            {round.status === 'in-progress' && (
              <div className="text-center py-4">
                <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2 animate-pulse" />
                <p className="text-sm text-gray-600">
                  Final evaluation in progress. Results will be announced soon!
                </p>
              </div>
            )}
            
            {round.status === 'completed' && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                <div className="text-center">
                  <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <h4 className="font-bold text-gray-900 mb-1">Competition Completed!</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Thank you for participating. Check your results below.
                  </p>
                  <Button variant="outline" size="sm">
                    View Results
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {competitionTitle}
              </CardTitle>
              <p className="text-gray-600 mt-1">
                Round {currentRound} of {totalRounds} • Competition Journey
              </p>
            </div>
            <Badge className="bg-[#FC5602] text-white">
              <Trophy className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-medium text-gray-900">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Rounds Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Competition Rounds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roundsData.map((round, index) => {
              const Icon = roundIcons[round.type];
              const isActive = round.roundNumber === activeRound;
              
              return (
                <motion.div
                  key={round.roundNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    isActive 
                      ? 'border-[#FC5602] bg-[#FC5602]/5 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveRound(round.roundNumber)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg border ${roundColors[round.status]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">
                            Round {round.roundNumber}: {round.title}
                          </h3>
                          {getRoundStatusIcon(round.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {round.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge 
                        variant="outline" 
                        className={`capitalize ${roundColors[round.status]}`}
                      >
                        {round.status.replace('-', ' ')}
                      </Badge>
                      {round.score && (
                        <p className="text-sm text-gray-600 mt-1">
                          Score: {round.score}%
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Round Details */}
      {currentRoundData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {React.createElement(roundIcons[currentRoundData.type], { 
                className: "h-5 w-5 text-[#FC5602]" 
              })}
              <span>Round {activeRound}: {currentRoundData.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderRoundContent(currentRoundData)}
          </CardContent>
        </Card>
      )}
    </div>
  );
}