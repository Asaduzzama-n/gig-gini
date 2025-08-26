// app/competitions/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import {  MapPin, Trophy, Users,  Star, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface CompetitionRound {
  roundNumber: number;
  title: string;
  description: string;
  type: "quiz" | "task" | "presentation" | "interview";
  evaluationCriteria: string[];
}

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
  projectBrief?: string;
  termsAndConditions: string[];
  submissionFormats: string[];
  maxFileSize?: string;
  rounds: CompetitionRound[];
  participantCount?: number;
  requirements?: string[];
  benefits?: string[];
}

// Mock competition data
const mockCompetition: Competition = {
  id: '1',
  title: 'Full Stack Developer Challenge 2024',
  organizer: 'TechCorp Solutions',
  location: 'Remote',
  rating: 4.8,
  categories: ['IT', 'Programming'],
  prizes: '$5000 + Job Offer',
  registrationFee: 'Free',
  startDate: new Date('2024-09-15'),
  endDate: new Date('2024-10-15'),
  resultDate: new Date('2024-10-22'),
  description: 'Join the ultimate full-stack development challenge where you\'ll build a complete e-commerce application from scratch. This competition tests your skills in modern web development technologies and provides an opportunity to showcase your talent to top tech companies.',
  skillsTested: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'Authentication', 'Payment Integration'],
  projectBrief: 'Build a complete e-commerce platform with user authentication, product catalog, shopping cart, payment processing, and admin dashboard. The application should be responsive, secure, and scalable.',
  termsAndConditions: [
    'Participants must be 18+ years old',
    'Original work only - no plagiarism allowed',
    'Code must be submitted via GitHub repository',
    'All submissions become property of the organizer',
    'Winners will be contacted within 48 hours of announcement'
  ],
  submissionFormats: ['GitHub Repository Link', 'Live Demo URL', 'Documentation (README.md)', 'Video Walkthrough (optional)'],
  maxFileSize: '100MB',
  participantCount: 234,
  requirements: [
    '2+ years of web development experience',
    'Proficiency in React and Node.js',
    'Understanding of database design',
    'Experience with RESTful API development'
  ],
  benefits: [
    'Direct job interview opportunity',
    'Portfolio project for your resume',
    'Networking with industry professionals',
    'Certificate of participation',
    'Mentorship opportunities'
  ],
  rounds: [
    {
      roundNumber: 1,
      title: 'Technical Screening',
      description: 'Complete a comprehensive technical assessment covering full-stack development concepts, algorithms, and system design.',
      type: 'quiz',
      evaluationCriteria: ['Technical knowledge', 'Problem-solving approach', 'Code quality', 'Best practices']
    },
    {
      roundNumber: 2,
      title: 'Project Development',
      description: 'Build the e-commerce application according to the provided specifications. You have 3 weeks to complete this task.',
      type: 'task',
      evaluationCriteria: ['Functionality', 'Code architecture', 'UI/UX design', 'Performance', 'Security implementation']
    },
    {
      roundNumber: 3,
      title: 'Project Presentation',
      description: 'Present your completed project to a panel of senior developers and product managers. Demo the key features and explain your technical decisions.',
      type: 'presentation',
      evaluationCriteria: ['Presentation skills', 'Technical depth', 'Problem-solving approach', 'Q&A handling']
    },
    {
      roundNumber: 4,
      title: 'Final Interview',
      description: 'One-on-one technical interview with the hiring team covering your project, technical concepts, and cultural fit.',
      type: 'interview',
      evaluationCriteria: ['Technical expertise', 'Communication skills', 'Cultural alignment', 'Growth potential']
    }
  ]
};

export default function CompetitionDetailsPage() {
  const params = useParams();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchCompetition = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCompetition(mockCompetition);
      setIsLoading(false);
    };

    fetchCompetition();
  }, [params.id]);

  const handleJoinCompetition = () => {
    // Here you would handle the join competition logic
    // For now, just simulate joining
    setHasApplied(true);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'TBD';
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getRemainingDays = (endDate: Date | undefined) => {
    if (!endDate) return null;
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Competition not found</h2>
          <Button asChild>
            <Link href="/competitions">← Back to Competitions</Link>
          </Button>
        </div>
      </div>
    );
  }

  const remainingDays = getRemainingDays(competition.endDate);

  return (
    <div className="min-h-screen  bg-gray-50">
      {/* Header */}
      <div className= "bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/competitions">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Competitions
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {competition.categories.map(category => (
                  <Badge key={category} variant="secondary" className="bg-orange-100 text-orange-700">
                    {category}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{competition.title}</h1>
              <p className="text-xl text-gray-600">by {competition.organizer}</p>
              
              <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                {competition.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {competition.location}
                  </div>
                )}
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {competition.participantCount} participants
                </div>
                {competition.rating && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {competition.rating}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:ml-8">
              <Card className="p-6 min-w-[280px] border-0 bg-gray-50 shadow-none">
                <div className="text-center mb-4">
                  {competition.prizes && (
                    <div className="flex items-center justify-center mb-2">
                      <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                      <span className="font-semibold text-green-600">{competition.prizes}</span>
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    {competition.registrationFee === 'Free' ? 'Free to Join' : `Fee: ${competition.registrationFee}`}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">{formatDate(competition.startDate)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-medium">{formatDate(competition.endDate)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Results:</span>
                    <span className="font-medium">{formatDate(competition.resultDate)}</span>
                  </div>
                  {remainingDays !== null && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Time Left:</span>
                      <span className="font-medium text-orange-600">
                        {remainingDays > 0 ? `${remainingDays} days` : 'Ended'}
                      </span>
                    </div>
                  )}
                </div>

                {hasApplied ? (
                  <Button disabled className="w-full bg-green-500 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Applied Successfully
                  </Button>
                ) : remainingDays && remainingDays > 0 ? (
                  <Button 
                    onClick={handleJoinCompetition}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    Join Competition
                  </Button>
                ) : (
                  <Button disabled className="w-full">
                    Registration Closed
                  </Button>
                )}
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-6 ">
            <TabsList className="grid w-full grid-cols-4 ">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rounds">Competition Rounds</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 ">
              <Card className="p-6 border-0 bg-white">
                <h2 className="text-2xl font-bold mb-4">About This Competition</h2>
                <p className="text-gray-700 mb-6">{competition.description}</p>
                
                {competition.projectBrief && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Project Brief</h3>
                    <p className="text-gray-700">{competition.projectBrief}</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Skills Tested</h3>
                    <div className="flex flex-wrap gap-2">
                      {competition.skillsTested.map(skill => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {competition.benefits && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">What You&apos;ll Gain</h3>
                      <ul className="space-y-2">
                        {competition.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="rounds" className="space-y-6">
              <div className="grid gap-6">
                {competition.rounds.map((round, index) => (
                  <motion.div
                    key={round.roundNumber}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="p-6  border-0 bg-white">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                          {round.roundNumber}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{round.title}</h3>
                          <Badge variant="secondary" className="mt-1">
                            {round.type.charAt(0).toUpperCase() + round.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{round.description}</p>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Evaluation Criteria:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {round.evaluationCriteria.map((criteria, criteriaIndex) => (
                            <li key={criteriaIndex} className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              {criteria}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {competition.requirements && (
                  <Card className="p-6  border-0 bg-white">
                    <h2 className="text-xl font-bold mb-4">Prerequisites</h2>
                    <ul className="space-y-3">
                      {competition.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                <Card className="p-6  border-0 bg-white">
                  <h2 className="text-xl font-bold mb-4">Submission Guidelines</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Required Formats:</h3>
                      <ul className="space-y-2">
                        {competition.submissionFormats.map((format, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 mt-2"></div>
                            <span>{format}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {competition.maxFileSize && (
                      <div>
                        <h3 className="font-semibold mb-2">File Size Limit:</h3>
                        <p className="text-gray-700">{competition.maxFileSize}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="terms" className="space-y-6">
              <Card className="p-6  border-0 bg-white">
                <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
                <div className="space-y-4">
                  {competition.termsAndConditions.map((term, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{term}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> By participating in this competition, you agree to abide by all terms and conditions listed above. 
                    Violation of any terms may result in disqualification.
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}