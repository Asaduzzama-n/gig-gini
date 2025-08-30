'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Plus, X, Calendar } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function ExperienceStep({ data, onUpdate }: ExperienceStepProps) {
  const [experiences, setExperiences] = useState<Experience[]>(
    data.experiences || [
      {
        id: '1',
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ]
  );

  useEffect(() => {
    onUpdate({ experiences });
  }, [experiences, onUpdate]);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-[#FC5602]" />
              <span>Work Experience</span>
            </div>
            <Button onClick={addExperience} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">Experience #{index + 1}</Badge>
                {experiences.length > 1 && (
                  <Button
                    onClick={() => removeExperience(experience.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name *</Label>
                  <Input
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    placeholder="Company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    value={experience.role}
                    onChange={(e) => updateExperience(experience.id, 'role', e.target.value)}
                    placeholder="Your role/position"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    disabled={experience.current}
                    placeholder={experience.current ? 'Present' : ''}
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <Checkbox
                      id={`current-${experience.id}`}
                      checked={experience.current}
                      onCheckedChange={(checked) => {
                        updateExperience(experience.id, 'current', checked);
                        if (checked) {
                          updateExperience(experience.id, 'endDate', '');
                        }
                      }}
                    />
                    <Label htmlFor={`current-${experience.id}`} className="text-sm">
                      I currently work here
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Job Description</Label>
                <Textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  placeholder="Describe your responsibilities, achievements, and key projects..."
                  rows={3}
                />
              </div>
            </div>
          ))}

          {experiences.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No work experience added yet.</p>
              <Button onClick={addExperience} className="mt-4" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Experience
              </Button>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Tips for better visibility:</h4>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• Include quantifiable achievements (e.g., "Increased sales by 25%")</li>
                  <li>• Mention relevant technologies and tools you used</li>
                  <li>• Highlight leadership and teamwork experiences</li>
                  <li>• Keep descriptions concise but informative</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}