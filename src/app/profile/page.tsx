// app/profile/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit, MapPin, Calendar, Mail, Phone, Star, Trophy, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProgressBar } from '@/components/ui/progress-bar';



interface Experience {
  company: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
}

interface Training {
  title: string;
  provider: string;
  date: Date;
  description: string;
}

interface Reference {
  name: string;
  relationship: string;
  contact: string;
}

interface UserProfile {
  name: string;
  profilePhoto?: string;
  rating: number;
  ovationTag: string;
  topRanking: string;
  txValue: number;
  aboutMe: string;
  identityValidation: string;
  salaryExpectation: string;
  jobPreference: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  personalInformation: string;
  address: {
    home: string;
    permanent: string;
  };
  contactInformation: {
    email: string;
    phone: string;
  };
  assets: string[];
  additionalActivity: string;
  training: Training[];
  reference: Reference[];
  socialLinks: string[];
  appliedCompetitions: number;
  completedCompetitions: number;
  wonCompetitions: number;
}

// Mock profile data
const mockProfile: UserProfile = {
  name: "Alex Johnson",
  profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  rating: 4.8,
  ovationTag: "Full Stack Expert",
  topRanking: "#3 in Web Development",
  txValue: 85000,
  aboutMe: "Passionate full-stack developer with 5+ years of experience building scalable web applications. I love solving complex problems and learning new technologies. Always excited to take on challenging projects that push the boundaries of what's possible.",
  identityValidation: "Verified",
  salaryExpectation: "$80,000 - $120,000",
  jobPreference: "Remote / Hybrid",
  skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL", "GraphQL", "Next.js"],
  experience: [
    {
      company: "TechCorp Solutions",
      role: "Senior Full Stack Developer",
      startDate: new Date('2022-01-15'),
      endDate: new Date('2024-08-30'),
      description: "Led development of multiple client-facing applications using React, Node.js, and AWS. Mentored junior developers and implemented CI/CD pipelines."
    },
    {
      company: "StartupXYZ",
      role: "Full Stack Developer",
      startDate: new Date('2020-06-01'),
      endDate: new Date('2021-12-31'),
      description: "Built the core platform from scratch using MERN stack. Developed RESTful APIs and implemented real-time features using WebSockets."
    }
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "Bachelor's",
      field: "Computer Science",
      startYear: 2016,
      endYear: 2020
    }
  ],
  personalInformation: "Born in 1998, passionate about technology and innovation",
  address: {
    home: "123 Tech Street, San Francisco, CA",
    permanent: "456 Main Avenue, Austin, TX"
  },
  contactInformation: {
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567"
  },
  assets: ["MacBook Pro", "iPhone", "Tesla Model 3"],
  additionalActivity: "Contributing to open source projects, Tech blogging, Mentoring bootcamp students",
  training: [
    {
      title: "AWS Solutions Architect",
      provider: "Amazon Web Services",
      date: new Date('2023-06-15'),
      description: "Comprehensive training on cloud architecture and AWS services"
    },
    {
      title: "Advanced React Patterns",
      provider: "Frontend Masters",
      date: new Date('2023-03-20'),
      description: "Deep dive into advanced React concepts and patterns"
    }
  ],
  reference: [
    {
      name: "Sarah Wilson",
      relationship: "Former Manager",
      contact: "sarah.wilson@techcorp.com"
    },
    {
      name: "Mike Chen",
      relationship: "Senior Developer",
      contact: "mike.chen@startupxyz.com"
    }
  ],
  socialLinks: [
    "https://github.com/alexjohnson",
    "https://linkedin.com/in/alexjohnson",
    "https://twitter.com/alexjohnson"
  ],
  appliedCompetitions: 12,
  completedCompetitions: 8,
  wonCompetitions: 3
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(mockProfile);
      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-50 px-4 sm:px-0">
      {/* Header */}
      <div className="max-w-7xl mx-auto pt-8">
        <div className="bg-white rounded-xl px-4 sm:px-6 lg:px-8 py-8 shadow-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            {/* Profile Header */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.profilePhoto} alt={profile.name} />
                  <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{profile.name}</h1>
                <p className="text-lg text-orange-600 font-medium mb-2">{profile.ovationTag}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    {profile.rating} Rating
                  </div>
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 text-orange-500 mr-1" />
                    {profile.topRanking}
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {profile.identityValidation}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 lg:mt-0 flex space-x-3">
              <Button 
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                Share Profile
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Stats & Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Competition Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Competition Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Applied</span>
                  </div>
                  <span className="font-semibold">{profile.appliedCompetitions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-green-500 mr-3" />
                    <span>Completed</span>
                  </div>
                  <span className="font-semibold">{profile.completedCompetitions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Trophy className="w-5 h-5 text-yellow-500 mr-3" />
                    <span>Won</span>
                  </div>
                  <span className="font-semibold">{profile.wonCompetitions}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 ">
                <div className="text-sm text-gray-600 mb-2">Success Rate</div>
                <ProgressBar
                  value={(profile.wonCompetitions / profile.completedCompetitions) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round((profile.wonCompetitions / profile.completedCompetitions) * 100)}% win rate
                </div>
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm">{profile.contactInformation.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm">{profile.contactInformation.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-sm">{profile.address.home}</span>
                </div>
              </div>
            </Card>

            {/* Preferences */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Job Preferences</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700">Salary Expectation</div>
                  <div className="text-sm text-gray-600">{profile.salaryExpectation}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Work Preference</div>
                  <div className="text-sm text-gray-600">{profile.jobPreference}</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="references">References</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">About Me</h3>
                  <p className="text-gray-700 leading-relaxed">{profile.aboutMe}</p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Additional Activities</h3>
                  <p className="text-gray-700">{profile.additionalActivity}</p>
                </Card>

                {profile.assets.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Assets</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.assets.map((asset, index) => (
                        <Badge key={index} variant="outline">
                          {asset}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Social Links</h3>
                  <div className="space-y-2">
                    {profile.socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 block"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                {profile.experience.map((exp, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                        <p className="text-orange-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{exp.description}</p>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                {profile.education.map((edu, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                        <p className="text-orange-600 font-medium">{edu.institution}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {edu.startYear} - {edu.endYear}
                      </div>
                    </div>
                  </Card>
                ))}

                {profile.training.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Training & Certifications</h3>
                    {profile.training.map((training, index) => (
                      <Card key={index} className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{training.title}</h4>
                            <p className="text-orange-600 font-medium">{training.provider}</p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(training.date)}
                          </div>
                        </div>
                        <p className="text-gray-700">{training.description}</p>
                      </Card>
                    ))}
                  </>
                )}
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {profile.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-3 text-center"
                      >
                        <span className="font-medium text-orange-800">{skill}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Skills could be expanded with proficiency levels */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Skill Proficiency</h3>
                  <div className="space-y-4">
                    {profile.skills.slice(0, 6).map((skill, index) => {
                      const proficiency = Math.floor(Math.random() * 30) + 70; // Mock proficiency
                      return (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-700">{skill}</span>
                            <span className="text-sm text-gray-500">{proficiency}%</span>
                          </div>
                          <ProgressBar value={proficiency} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="references" className="space-y-6">
                {profile.reference.map((ref, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{ref.name}</h3>
                        <p className="text-orange-600 font-medium mb-2">{ref.relationship}</p>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {ref.contact}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </Card>
                ))}

                <Card className="p-6 border-dashed border-2 border-gray-300">
                  <div className="text-center">
                    <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-4">Add more references to strengthen your profile</p>
                    <Button variant="outline">Add Reference</Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}