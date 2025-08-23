// components/home/UpcomingFeatures.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useNotification } from '@/providers/NotificationProvider';
import {
  Smartphone,
  Bell,
  Zap,
  Shield,
  Users,
  Brain,
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  Mail,
  Gift,
} from 'lucide-react';

const upcomingFeatures = [
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'Complete competitions on-the-go with native iOS and Android apps',
    comingSoon: 'Q2 2025',
    color: 'from-blue-500 to-blue-600',
    benefits: ['Offline mode', 'Push notifications', 'Mobile-first UI', 'Real-time updates'],
  },
  {
    icon: Brain,
    title: 'AI Matching',
    description: 'Smart algorithms that match candidates with perfect opportunities',
    comingSoon: 'Q2 2025',
    color: 'from-purple-500 to-purple-600',
    benefits: ['Skill analysis', 'Culture fit', 'Career recommendations', 'Success prediction'],
  },
  {
    icon: Bell,
    title: 'Real-time Notifications',
    description: 'Stay updated with instant alerts for competitions and results',
    comingSoon: 'Q1 2025',
    color: 'from-[#FC5602] to-[#FF7B02]',
    benefits: ['Instant alerts', 'Email digest', 'Custom preferences', 'Multi-channel'],
  },
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'Enhanced protection for your data and competition integrity',
    comingSoon: 'Q3 2025',
    color: 'from-green-500 to-green-600',
    benefits: ['2FA authentication', 'Data encryption', 'Fraud prevention', 'Secure payments'],
  },
  {
    icon: Users,
    title: 'Team Competitions',
    description: 'Collaborate in group challenges and team-based hiring',
    comingSoon: 'Q4 2025',
    color: 'from-indigo-500 to-indigo-600',
    benefits: ['Group challenges', 'Team formation', 'Collaborative tools', 'Leadership assessment'],
  },
  {
    icon: Globe,
    title: 'Global Expansion',
    description: 'International competitions with multi-language support',
    comingSoon: '2026',
    color: 'from-teal-500 to-teal-600',
    benefits: ['Multi-language', 'Local currencies', 'Regional compliance', 'Cultural adaptation'],
  },
];

const waitlistBenefits = [
  'Early access to new features',
  'Exclusive beta testing opportunities',
  'Priority customer support',
  'Special launch promotions',
  'Direct feedback channel to our team',
];

interface WaitlistForm {
  email: string;
  name: string;
  role: 'job-seeker' | 'employer' | 'both';
  interests: string[];
  notifications: boolean;
}

export function UpcomingFeatures() {
  const [form, setForm] = useState<WaitlistForm>({
    email: '',
    name: '',
    role: 'job-seeker',
    interests: [],
    notifications: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleInterestChange = (feature: string, checked: boolean) => {
    setForm(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, feature]
        : prev.interests.filter(f => f !== feature)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would make the actual API call
      console.log('Waitlist signup:', form);
      
      showSuccess(
        'Welcome to the waitlist!',
        'You\'ll be the first to know when new features are available.'
      );
      
      // Reset form
      setForm({
        email: '',
        name: '',
        role: 'job-seeker',
        interests: [],
        notifications: true,
      });
      
    } catch (error) {
      showError(
        'Signup failed',
        'Please try again or contact support if the problem persists.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            What's Next
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Upcoming <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get excited for the innovative features we're building to make competitive hiring 
            even more powerful and accessible for everyone.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-hover border-0 shadow-lg h-full">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.comingSoon}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Key Benefits:</p>
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Waitlist Signup Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 text-white overflow-hidden">
            <CardContent className="p-0">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Join the Waitlist
                </h2>
                <p className="text-gray-300 mb-8">
                  Be the first to get access to our exclusive features and early beta testing.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      aria-label="Name"
                      value={form.name}
                      onChange={(e) => setForm(prev => ({...prev, name: e.target.value}))}
                      name="name"
                      placeholder="Enter your name"
                      required
                    />
                    <Input
                      aria-label="Email"
                      value={form.email}
                      onChange={(e) => setForm(prev => ({...prev, email: e.target.value}))}
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={form.role === 'job-seeker'}
                        onChange={() => setForm({ ...form, role: 'job-seeker' })}
                      />
                      <span>Job Seeker</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={form.role === 'employer'}
                        onChange={() => setForm({ ...form, role: 'employer' })}
                      />
                      <span>Employer</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
            <CardContent className="p-0">
                  <Button type="submit" className="w-full">
                    Join Waitlist
                  </Button>
            </CardContent>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
