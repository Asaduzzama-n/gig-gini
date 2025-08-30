"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building, 
  Briefcase,
  Edit,
  Save,
  X,
  Plus,
  Star,
  Award,
  Target
} from "lucide-react";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  bio?: string;
  joinDate: string;
  // Employee specific
  skills?: string[];
  experience?: string;
  education?: string;
  portfolio?: string;
  // Employer specific
  companyName?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  // Admin specific
  role?: string;
  permissions?: string[];
  lastLogin?: string;
}

interface ProfileComponentProps {
  userRole: 'employee' | 'employer' | 'admin';
  profileData: ProfileData;
  onSave: (data: ProfileData) => void;
}

const mockProfileData: Record<string, ProfileData> = {
  employee: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    avatar: '',
    bio: 'Passionate full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.',
    joinDate: '2023-01-15',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'Python'],
    experience: '5+ years',
    education: 'Bachelor of Computer Science',
    portfolio: 'https://johndoe.dev'
  },
  employer: {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    avatar: '',
    bio: 'HR Director at TechCorp, focused on finding and nurturing top talent in the technology sector.',
    joinDate: '2022-08-20',
    companyName: 'TechCorp Solutions',
    companySize: '500-1000 employees',
    industry: 'Technology',
    website: 'https://techcorp.com'
  },
  admin: {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@giggini.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    avatar: '',
    bio: 'Platform administrator with expertise in system management and user experience optimization.',
    joinDate: '2021-03-10',
    role: 'Super Admin',
    permissions: ['User Management', 'System Settings', 'Analytics', 'Content Management'],
    lastLogin: '2024-01-15 14:30:00'
  }
};

export default function ProfileComponent({ userRole, profileData, onSave }: ProfileComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profileData);
  const [newSkill, setNewSkill] = useState('');

  // Memoize role-specific fields
  const roleSpecificFields = useMemo(() => {
    switch (userRole) {
      case 'employer':
        return [
          { key: 'company', label: 'Company', type: 'text' },
          { key: 'industry', label: 'Industry', type: 'text' },
          { key: 'companySize', label: 'Company Size', type: 'text' }
        ];
      case 'employee':
        return [
          { key: 'skills', label: 'Skills', type: 'text' },
          { key: 'experience', label: 'Experience', type: 'text' },
          { key: 'portfolio', label: 'Portfolio URL', type: 'url' }
        ];
      case 'admin':
        return [
          { key: 'permissions', label: 'Permissions', type: 'text' },
          { key: 'department', label: 'Department', type: 'text' }
        ];
      default:
        return [];
    }
  }, [userRole]);

  // Memoize form validation
  const isFormValid = useMemo(() => {
    return editData.name.trim() !== '' && editData.email.trim() !== '';
  }, [editData.name, editData.email]);

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && editData.skills) {
      setEditData({
        ...editData,
        skills: [...editData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    if (editData.skills) {
      setEditData({
        ...editData,
        skills: editData.skills.filter(skill => skill !== skillToRemove)
      });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {userRole === 'employee' ? 'My Profile' : 
             userRole === 'employer' ? 'Company Profile' : 
             'Admin Profile'}
          </h1>
          <p className="text-gray-600">Manage your profile information and preferences</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!isFormValid}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => window.dispatchEvent(new CustomEvent('triggerProfileCompletion'))}>
                <User className="h-4 w-4 mr-2" />
                Complete Profile
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          {userRole === 'employee' && <TabsTrigger value="skills">Skills & Experience</TabsTrigger>}
          {userRole === 'employer' && <TabsTrigger value="company">Company Details</TabsTrigger>}
          {userRole === 'admin' && <TabsTrigger value="permissions">Permissions</TabsTrigger>}
        </TabsList>

        <TabsContent value="basic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={editData.avatar} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(editData.name)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Your personal information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{editData.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{editData.email}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editData.phone || ''}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{editData.phone || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={editData.location || ''}
                        onChange={(e) => setEditData({...editData, location: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{editData.location || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={editData.bio || ''}
                      onChange={(e) => setEditData({...editData, bio: e.target.value})}
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-700">{editData.bio || 'No bio provided'}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(editData.joinDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Employee Skills Tab */}
        {userRole === 'employee' && (
          <TabsContent value="skills">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>Your technical and professional skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {editData.skills?.map((skill) => (
                      <Badge key={skill} variant="secondary" className="relative">
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Experience & Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    {isEditing ? (
                      <Input
                        id="experience"
                        value={editData.experience || ''}
                        onChange={(e) => setEditData({...editData, experience: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                        <span>{editData.experience || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    {isEditing ? (
                      <Input
                        id="education"
                        value={editData.education || ''}
                        onChange={(e) => setEditData({...editData, education: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-gray-400" />
                        <span>{editData.education || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio</Label>
                    {isEditing ? (
                      <Input
                        id="portfolio"
                        value={editData.portfolio || ''}
                        onChange={(e) => setEditData({...editData, portfolio: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-gray-400" />
                        {editData.portfolio ? (
                          <a href={editData.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {editData.portfolio}
                          </a>
                        ) : (
                          <span>Not provided</span>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {/* Employer Company Tab */}
        {userRole === 'employer' && (
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Details about your company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    {isEditing ? (
                      <Input
                        id="companyName"
                        value={editData.companyName || ''}
                        onChange={(e) => setEditData({...editData, companyName: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span>{editData.companyName || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    {isEditing ? (
                      <Input
                        id="industry"
                        value={editData.industry || ''}
                        onChange={(e) => setEditData({...editData, industry: e.target.value})}
                      />
                    ) : (
                      <span>{editData.industry || 'Not provided'}</span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    {isEditing ? (
                      <Input
                        id="companySize"
                        value={editData.companySize || ''}
                        onChange={(e) => setEditData({...editData, companySize: e.target.value})}
                      />
                    ) : (
                      <span>{editData.companySize || 'Not provided'}</span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    {isEditing ? (
                      <Input
                        id="website"
                        value={editData.website || ''}
                        onChange={(e) => setEditData({...editData, website: e.target.value})}
                      />
                    ) : (
                      editData.website ? (
                        <a href={editData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {editData.website}
                        </a>
                      ) : (
                        <span>Not provided</span>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Admin Permissions Tab */}
        {userRole === 'admin' && (
          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>Admin Permissions</CardTitle>
                <CardDescription>Your administrative role and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{editData.role}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Last Login</Label>
                    <span className="text-sm text-gray-600">{editData.lastLogin}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="flex flex-wrap gap-2">
                    {editData.permissions?.map((permission) => (
                      <Badge key={permission} variant="outline">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

export { mockProfileData };