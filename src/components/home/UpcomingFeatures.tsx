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
              <Card className="card-hover border-0 shadow-lg h-full rounded-xl bg-white/95 backdrop-blur-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs rounded-full px-3 py-1 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
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
                  
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Key Benefits:</p>
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Waitlist Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-[#FC5602]/5 to-[#FF7B02]/5 rounded-2xl">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <Badge className="bg-[#FC5602]/10 text-[#FC5602] border-[#FC5602]/20 rounded-full px-4 py-2">
                  <Gift className="w-3 h-3 mr-1" />
                  Early Access
                </Badge>
                <h3 className="text-2xl font-bold text-gray-900">
                  Join the <span className="gradient-text">Waitlist</span>
                </h3>
                <p className="text-gray-600">
                  Be among the first to experience these amazing features when they launch.
                </p>
              </div>

              {/* Waitlist Benefits */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 space-y-3 border border-gray-200/50">
                <h4 className="font-semibold text-gray-900 mb-4">What you'll get:</h4>
                {waitlistBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-[#FC5602]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-[#FC5602]" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Waitlist Form */}
              <div className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-rounded h-12 bg-white/80 backdrop-blur-sm"
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-rounded h-12 bg-white/80 backdrop-blur-sm"
                      required
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-700">I am a:</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/60 border border-gray-200/50 flex-1">
                        <Checkbox
                          id="job-seeker"
                          checked={form.role === 'job-seeker'}
                          onCheckedChange={() => setForm({ ...form, role: 'job-seeker' })}
                          className="checkbox-rounded"
                        />
                        <label htmlFor="job-seeker" className="text-sm font-medium cursor-pointer">Job Seeker</label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/60 border border-gray-200/50 flex-1">
                        <Checkbox
                          id="employer"
                          checked={form.role === 'employer'}
                          onCheckedChange={() => setForm({ ...form, role: 'employer' })}
                          className="checkbox-rounded"
                        />
                        <label htmlFor="employer" className="text-sm font-medium cursor-pointer">Employer</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/60 border border-gray-200/50">
                    <Checkbox
                      id="notifications"
                      checked={form.notifications}
                      onCheckedChange={(checked) => setForm({ ...form, notifications: !!checked })}
                      className="checkbox-rounded"
                    />
                    <label htmlFor="notifications" className="text-sm text-gray-700 cursor-pointer">
                      Send me email updates about new features and competitions
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-primary h-12 text-lg rounded-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Joining...
                      </>
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
