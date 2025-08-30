'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Target, Users, Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

interface HiringPreferencesStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const skillCategories = {
  'Technical Skills': [
    'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'SQL', 'AWS',
    'Machine Learning', 'Data Analysis', 'DevOps', 'Mobile Development'
  ],
  'Design Skills': [
    'UI/UX Design', 'Graphic Design', 'Prototyping', 'Figma', 'Adobe Creative Suite',
    'User Research', 'Design Systems', 'Wireframing'
  ],
  'Business Skills': [
    'Project Management', 'Business Analysis', 'Strategic Planning', 'Leadership',
    'Sales', 'Marketing', 'Financial Analysis', 'Operations'
  ],
  'Soft Skills': [
    'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking',
    'Adaptability', 'Time Management', 'Creativity', 'Leadership'
  ]
};

const experienceLevels = [
  'Entry Level (0-2 years)',
  'Mid Level (2-5 years)',
  'Senior Level (5-8 years)',
  'Lead/Principal (8+ years)',
  'Executive Level'
];

const workTypes = [
  'Remote',
  'Hybrid',
  'On-site',
  'Flexible'
];

const employmentTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship'
];

export function HiringPreferencesStep({ data, onUpdate }: HiringPreferencesStepProps) {
  const [formData, setFormData] = useState({
    preferredSkills: data.preferredSkills || [],
    experienceLevels: data.experienceLevels || [],
    workTypes: data.workTypes || [],
    employmentTypes: data.employmentTypes || [],
    hiringGoals: data.hiringGoals || '',
    companyValues: data.companyValues || '',
    idealCandidate: data.idealCandidate || '',
    ...data
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const toggleArrayItem = (array: string[], item: string, field: string) => {
    const newArray = array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
    
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleTextChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Preferred Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-[#FC5602]" />
            <span>Skills You're Looking For</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category} className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">{category}</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {skills.map((skill) => (
                  <Button
                    key={skill}
                    onClick={() => toggleArrayItem(formData.preferredSkills, skill, 'preferredSkills')}
                    variant={formData.preferredSkills.includes(skill) ? "default" : "outline"}
                    size="sm"
                    className={`justify-start text-left h-auto py-2 px-3 ${
                      formData.preferredSkills.includes(skill) 
                        ? 'btn-primary' 
                        : 'hover:bg-[#FC5602]/5 hover:border-[#FC5602]/20'
                    }`}
                  >
                    <span className="truncate">{skill}</span>
                  </Button>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mt-4">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Selected Skills ({formData.preferredSkills.length})
            </Label>
            <div className="flex flex-wrap gap-2">
              {formData.preferredSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-[#FC5602] text-white cursor-pointer"
                  onClick={() => toggleArrayItem(formData.preferredSkills, skill, 'preferredSkills')}
                >
                  {skill} ×
                </Badge>
              ))}
              {formData.preferredSkills.length === 0 && (
                <p className="text-sm text-gray-500">No skills selected yet</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience & Work Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-[#FC5602]" />
            <span>Experience & Work Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Experience Levels */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Experience Levels</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {experienceLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={level}
                    checked={formData.experienceLevels.includes(level)}
                    onCheckedChange={() => toggleArrayItem(formData.experienceLevels, level, 'experienceLevels')}
                  />
                  <Label htmlFor={level} className="text-sm">{level}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Work Types */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Work Arrangement</span>
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {workTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={formData.workTypes.includes(type)}
                    onCheckedChange={() => toggleArrayItem(formData.workTypes, type, 'workTypes')}
                  />
                  <Label htmlFor={type} className="text-sm">{type}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Employment Types */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Employment Type</span>
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {employmentTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={formData.employmentTypes.includes(type)}
                    onCheckedChange={() => toggleArrayItem(formData.employmentTypes, type, 'employmentTypes')}
                  />
                  <Label htmlFor={type} className="text-sm">{type}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hiring Goals & Values */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-[#FC5602]" />
            <span>Hiring Goals & Company Culture</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hiringGoals">Current Hiring Goals</Label>
            <Textarea
              id="hiringGoals"
              value={formData.hiringGoals}
              onChange={(e) => handleTextChange('hiringGoals', e.target.value)}
              placeholder="Describe your current hiring needs, team expansion plans, and specific roles you're looking to fill..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyValues">Company Values & Culture</Label>
            <Textarea
              id="companyValues"
              value={formData.companyValues}
              onChange={(e) => handleTextChange('companyValues', e.target.value)}
              placeholder="What values and culture does your company promote? What kind of work environment do you offer?"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idealCandidate">Ideal Candidate Profile</Label>
            <Textarea
              id="idealCandidate"
              value={formData.idealCandidate}
              onChange={(e) => handleTextChange('idealCandidate', e.target.value)}
              placeholder="Describe the characteristics, mindset, and qualities of your ideal candidate beyond technical skills..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Hiring Preferences Summary</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Skills:</span>
            <Badge variant="outline">{formData.preferredSkills.length} selected</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Experience:</span>
            <Badge variant="outline">{formData.experienceLevels.length} levels</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Work Types:</span>
            <Badge variant="outline">{formData.workTypes.length} options</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Employment:</span>
            <Badge variant="outline">{formData.employmentTypes.length} types</Badge>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Target className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-900">Hiring Success Tips:</h4>
            <ul className="text-sm text-green-700 mt-2 space-y-1">
              <li>• Be specific about required vs. nice-to-have skills</li>
              <li>• Consider cultural fit alongside technical abilities</li>
              <li>• Clearly communicate your company values and work environment</li>
              <li>• Be open to candidates who show potential and willingness to learn</li>
              <li>• Use competitions to assess real-world problem-solving skills</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}