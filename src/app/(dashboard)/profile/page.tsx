"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Edit,
  Save,
  X,
  Star,
  Globe,
  Github,
  Linkedin,
  Camera
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  current: boolean;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const mockProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Love solving complex problems and learning new technologies.',
  website: 'https://johndoe.dev',
  github: 'https://github.com/johndoe',
  linkedin: 'https://linkedin.com/in/johndoe',
  joinDate: '2023-01-15',
  avatar: '/api/placeholder/150/150'
};

const mockSkills: Skill[] = [
  { id: '1', name: 'JavaScript', level: 'Expert', category: 'Programming' },
  { id: '2', name: 'React', level: 'Advanced', category: 'Frontend' },
  { id: '3', name: 'Node.js', level: 'Advanced', category: 'Backend' },
  { id: '4', name: 'TypeScript', level: 'Advanced', category: 'Programming' },
  { id: '5', name: 'Python', level: 'Intermediate', category: 'Programming' },
  { id: '6', name: 'AWS', level: 'Intermediate', category: 'Cloud' },
  { id: '7', name: 'Docker', level: 'Intermediate', category: 'DevOps' },
  { id: '8', name: 'MongoDB', level: 'Advanced', category: 'Database' }
];

const mockExperience: Experience[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Inc.',
    duration: '2022 - Present',
    description: 'Lead development of microservices architecture, mentored junior developers, and improved system performance by 40%.',
    current: true
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupHub',
    duration: '2020 - 2022',
    description: 'Built and maintained multiple web applications using React and Node.js, collaborated with cross-functional teams.',
    current: false
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'WebSolutions',
    duration: '2019 - 2020',
    description: 'Developed responsive user interfaces, optimized web performance, and implemented modern design systems.',
    current: false
  }
];

const mockEducation: Education[] = [
  {
    id: '1',
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of California, Berkeley',
    year: '2019',
    gpa: '3.8'
  },
  {
    id: '2',
    degree: 'Full Stack Web Development Bootcamp',
    institution: 'General Assembly',
    year: '2018'
  }
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Top 10 Finalist - React Developer Challenge',
    description: 'Achieved top 10 position among 500+ participants in a comprehensive React development competition.',
    date: '2024-01-15',
    category: 'Competition'
  },
  {
    id: '2',
    title: 'AWS Certified Solutions Architect',
    description: 'Successfully obtained AWS Solutions Architect Associate certification.',
    date: '2023-11-20',
    category: 'Certification'
  },
  {
    id: '3',
    title: 'Best Innovation Award',
    description: 'Received company-wide recognition for implementing automated testing framework.',
    date: '2023-09-10',
    category: 'Work'
  }
];

function getSkillLevelColor(level: string) {
  switch (level) {
    case 'Beginner': return 'bg-red-100 text-red-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-blue-100 text-blue-800';
    case 'Expert': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockProfile);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfile(mockProfile); // Reset to original values
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and professional details</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <div className="grid gap-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
                      <AvatarFallback className="text-2xl">
                        {profile.firstName[0]}{profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button size="sm" variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        {isEditing ? (
                          <Input
                            id="firstName"
                            value={profile.firstName}
                            onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                          />
                        ) : (
                          <p className="text-lg font-semibold">{profile.firstName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        {isEditing ? (
                          <Input
                            id="lastName"
                            value={profile.lastName}
                            onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                          />
                        ) : (
                          <p className="text-lg font-semibold">{profile.lastName}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      {isEditing ? (
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                          rows={3}
                        />
                      ) : (
                        <p className="text-gray-700">{profile.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-orange-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{profile.email}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{profile.phone}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>Member Since</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{new Date(profile.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-orange-600" />
                  Social Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    {isEditing ? (
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => setProfile({...profile, website: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                          {profile.website}
                        </a>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    {isEditing ? (
                      <Input
                        id="github"
                        value={profile.github}
                        onChange={(e) => setProfile({...profile, github: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Github className="h-4 w-4 text-gray-500" />
                        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                          {profile.github}
                        </a>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    {isEditing ? (
                      <Input
                        id="linkedin"
                        value={profile.linkedin}
                        onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Linkedin className="h-4 w-4 text-gray-500" />
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                          {profile.linkedin}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-orange-600" />
                    Skills & Expertise
                  </CardTitle>
                  <CardDescription>Showcase your technical and professional skills</CardDescription>
                </div>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {['Programming', 'Frontend', 'Backend', 'Database', 'Cloud', 'DevOps'].map(category => {
                  const categorySkills = mockSkills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map(skill => (
                          <div key={skill.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                            <span className="font-medium">{skill.name}</span>
                            <Badge className={getSkillLevelColor(skill.level)} variant="secondary">
                              {skill.level}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience">
          <div className="space-y-6">
            {/* Work Experience */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-orange-600" />
                      Work Experience
                    </CardTitle>
                    <CardDescription>Your professional work history</CardDescription>
                  </div>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockExperience.map(exp => (
                  <div key={exp.id} className="border-l-2 border-orange-200 pl-4 pb-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                        <p className="text-orange-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-600 mb-2">{exp.duration}</p>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                      {exp.current && (
                        <Badge className="bg-green-100 text-green-800">Current</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-orange-600" />
                      Education
                    </CardTitle>
                    <CardDescription>Your educational background</CardDescription>
                  </div>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockEducation.map(edu => (
                  <div key={edu.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-orange-600 font-medium">{edu.institution}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>Graduated: {edu.year}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-orange-600" />
                    Achievements & Certifications
                  </CardTitle>
                  <CardDescription>Your accomplishments and recognitions</CardDescription>
                </div>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAchievements.map(achievement => (
                <div key={achievement.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-gray-700 mt-1">{achievement.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-600">{achievement.date}</span>
                        <Badge variant="secondary">{achievement.category}</Badge>
                      </div>
                    </div>
                    <Award className="h-6 w-6 text-orange-600 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}