// components/home/BenefitsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Trophy,
  Target,
  Users,
  Briefcase,
  Zap,
  Shield,
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  Eye,
  CheckCircle,
} from 'lucide-react';

const employeeBenefits = [
  {
    icon: Trophy,
    title: 'Showcase Your Skills',
    description: 'Demonstrate your abilities through real challenges, not just resumes',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: DollarSign,
    title: 'Win Cash Prizes',
    description: 'Compete for substantial monetary rewards while getting hired',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Eye,
    title: 'Get Noticed',
    description: 'Stand out to top employers who value skills over credentials',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Target,
    title: 'Fair Assessment',
    description: 'Experience unbiased evaluation based purely on performance',
    color: 'from-[#FC5602] to-[#FF7B02]',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Build your reputation and ranking in your field',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: CheckCircle,
    title: 'Skip Traditional Hiring',
    description: 'Bypass lengthy interview processes with performance-based selection',
    color: 'from-teal-500 to-teal-600',
  },
];

const employerBenefits = [
  {
    icon: Users,
    title: 'Quality Talent Pool',
    description: 'Access pre-screened candidates who prove their skills',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: Zap,
    title: 'Faster Hiring',
    description: 'Reduce time-to-hire with streamlined competitive processes',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Shield,
    title: 'Risk Reduction',
    description: 'Make data-driven decisions based on actual performance',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Briefcase,
    title: 'Brand Visibility',
    description: 'Showcase your company to top talent in your industry',
    color: 'from-[#FC5602] to-[#FF7B02]',
  },
  {
    icon: Award,
    title: 'Better Matches',
    description: 'Find candidates who truly fit your requirements',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: Clock,
    title: 'Cost Effective',
    description: 'Lower recruitment costs with higher success rates',
    color: 'from-cyan-500 to-cyan-600',
  },
];

export function BenefitsSection() {
  return (
    <section className="section-padding bg-gray-50">
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
            Why Choose GiG Gini?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Benefits for{' '}
            <span className="gradient-text">Everyone</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform revolutionizes hiring by creating win-win situations for both 
            job seekers and employers through competitive challenges.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Employee Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FC5602] to-[#FF7B02] rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  For Job Seekers
                </h3>
              </div>
              <p className="text-gray-600 text-lg">
                Turn your job search into an exciting competition and get rewarded for your skills.
              </p>
            </div>

            <div className="grid gap-4">
              {employeeBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="card-hover border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center shrink-0`}>
                          <benefit.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Employer Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  For Employers
                </h3>
              </div>
              <p className="text-gray-600 text-lg">
                Find the best talent efficiently through performance-based hiring.
              </p>
            </div>

            <div className="grid gap-4">
              {employerBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index * 0.1) + 0.3, duration: 0.6 }}
                >
                  <Card className="card-hover border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center shrink-0`}>
                          <benefit.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-br from-[#FC5602] to-[#FF7B02] border-0 text-white">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Experience the Future of Hiring?
              </h3>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have transformed their careers 
                through competitive hiring.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#FC5602] px-8 py-4 rounded-lg cursor-pointer font-semibold text-lg hover:shadow-lg transition-all"
                >
                  Start as Job Seeker
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 cursor-pointer rounded-lg font-semibold text-lg hover:bg-white hover:text-[#FC5602] transition-all"
                >
                  Hire Top Talent
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>

    
  );
}