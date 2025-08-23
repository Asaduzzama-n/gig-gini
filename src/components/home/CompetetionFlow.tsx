// components/home/CompetitionFlow.tsx
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ClipboardList,
  Code,
  Presentation,
  Trophy,
  ArrowRight,
  CheckCircle,
  Users,
  Calendar,
} from 'lucide-react';

const flowSteps = [
  {
    step: 1,
    icon: ClipboardList,
    title: 'Screening Questions',
    description: 'Answer domain-specific questions and situational challenges to qualify',
    details: [
      'Technical assessments',
      'Problem-solving scenarios',
      'Industry knowledge tests',
      'Communication skills evaluation'
    ],
    color: 'from-blue-500 to-blue-600',
    duration: '30-45 mins',
  },
  {
    step: 2,
    icon: Code,
    title: 'Task Challenge',
    description: 'Complete real-world projects that showcase your practical abilities',
    details: [
      'Coding challenges',
      'Business case studies',
      'Design portfolios',
      'Sales presentations'
    ],
    color: 'from-[#FC5602] to-[#FF7B02]',
    duration: '2-5 days',
  },
  {
    step: 3,
    icon: Presentation,
    title: 'Demo Presentation',
    description: 'Present your solution to industry experts and potential employers',
    details: [
      'Live demonstrations',
      'Q&A sessions',
      'Peer interactions',
      'Expert feedback'
    ],
    color: 'from-purple-500 to-purple-600',
    duration: '15-30 mins',
  },
  {
    step: 4,
    icon: Trophy,
    title: 'Final Evaluation',
    description: 'Get scored, ranked, and potentially hired based on your performance',
    details: [
      'Comprehensive scoring',
      'Industry rankings',
      'Job offers',
      'Prize distributions'
    ],
    color: 'from-green-500 to-green-600',
    duration: '1-3 days',
  },
];

const competitionTypes = [
  {
    title: 'Computer Science & IT',
    icon: Code,
    steps: ['Algorithm Quiz', 'Coding Challenge', 'System Design', 'Technical Interview'],
    color: 'from-blue-500 to-cyan-500',
    participants: '2.3K+',
  },
  {
    title: 'Business & Strategy',
    icon: Presentation,
    steps: ['Case Study', 'Market Analysis', 'Strategy Pitch', 'Executive Review'],
    color: 'from-purple-500 to-pink-500',
    participants: '1.8K+',
  },
  {
    title: 'Sales & Marketing',
    icon: Users,
    steps: ['Product Knowledge', 'Role Play', 'Campaign Design', 'Client Presentation'],
    color: 'from-[#FC5602] to-yellow-500',
    participants: '1.5K+',
  },
];

export function CompetitionFlow() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <Badge className="bg-[#FC5602]/10 text-[#FC5602] border-[#FC5602]/20">
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            <span className="gradient-text">4-Step</span> Competition Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience a comprehensive evaluation process designed to showcase your true potential 
            and connect you with the right opportunities.
          </p>
        </motion.div>

        {/* Flow Steps */}
        <div className="space-y-8 mb-20">
          {flowSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-8`}>
                <div className="flex-1">
                  <Card className="card-hover border-0 shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shrink-0`}>
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-gray-900">
                              {step.title}
                            </h3>
                            <Badge variant="outline" className="text-sm">
                              <Calendar className="w-3 h-3 mr-1" />
                              {step.duration}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {step.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-3">
                            {step.details.map((detail, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-gray-600">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step Number */}
                <div className="relative shrink-0">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                    {step.step}
                  </div>
                  
                  {index < flowSteps.length - 1 && (
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.2) + 0.5, duration: 0.6 }}
                      >
                        <ArrowRight className={`w-8 h-8 text-gray-300 ${index % 2 === 1 ? 'rotate-180' : ''}`} />
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Competition Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-gray-900">
              Competition Types by <span className="gradient-text">Industry</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each industry has tailored competition formats designed to evaluate the most relevant skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {competitionTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="card-hover border-0 shadow-lg h-full">
                  <CardContent className="p-8 space-y-6">
                    <div className="text-center space-y-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center mx-auto`}>
                        <type.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {type.title}
                        </h4>
                        <Badge className="bg-[#FC5602]/10 text-[#FC5602] border-[#FC5602]/20">
                          {type.participants} participants
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {type.steps.map((step, stepIndex) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.2) + (stepIndex * 0.1) + 0.3, duration: 0.4 }}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {stepIndex + 1}
                          </div>
                          <span className="text-gray-700 font-medium">{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 text-white overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center space-y-6">
                <h3 className="text-3xl font-bold">
                  Start Your Competitive Journey{' '}
                  <span className="gradient-text bg-gradient-to-r from-[#FC5602] to-[#FF7B02] bg-clip-text text-transparent">
                    Today
                  </span>
                </h3>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Join over 10,000+ professionals who have transformed their careers 
                  through skill-based competitive hiring.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#FC5602] hover:bg-[#E04D02] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Trophy className="w-5 h-5" />
                    <span>Browse Competitions</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Users className="w-5 h-5" />
                    <span>Learn More</span>
                  </motion.button>
                </div>
                
                <div className="flex items-center justify-center space-x-8 pt-8 border-t border-gray-700">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#FC5602]">500+</p>
                    <p className="text-sm text-gray-400">Active Competitions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#FC5602]">92%</p>
                    <p className="text-sm text-gray-400">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#FC5602]">$2M+</p>
                    <p className="text-sm text-gray-400">Prizes Awarded</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}