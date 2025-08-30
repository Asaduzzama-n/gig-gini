'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Plus, X, Award } from 'lucide-react';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade: string;
}

interface EducationStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const degreeTypes = [
  'High School Diploma',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctoral Degree (PhD)',
  'Professional Degree',
  'Certificate',
  'Diploma',
  'Other'
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

export function EducationStep({ data, onUpdate }: EducationStepProps) {
  const [educations, setEducations] = useState<Education[]>(
    data.educations || [
      {
        id: '1',
        institution: '',
        degree: '',
        field: '',
        startYear: '',
        endYear: '',
        grade: ''
      }
    ]
  );

  useEffect(() => {
    onUpdate({ educations });
  }, [educations, onUpdate]);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      grade: ''
    };
    setEducations([...educations, newEducation]);
  };

  const removeEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(educations.filter(edu => edu.id !== id));
    }
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-[#FC5602]" />
              <span>Education Background</span>
            </div>
            <Button onClick={addEducation} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {educations.map((education, index) => (
            <div key={education.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">Education #{index + 1}</Badge>
                {educations.length > 1 && (
                  <Button
                    onClick={() => removeEducation(education.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Institution Name *</Label>
                  <Input
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                    placeholder="University, College, or School name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Degree Type *</Label>
                  <Select 
                    value={education.degree} 
                    onValueChange={(value) => updateEducation(education.id, 'degree', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree type" />
                    </SelectTrigger>
                    <SelectContent>
                      {degreeTypes.map((degree) => (
                        <SelectItem key={degree} value={degree}>
                          {degree}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Field of Study *</Label>
                  <Input
                    value={education.field}
                    onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                    placeholder="e.g., Computer Science, Business Administration"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Start Year</Label>
                  <Select 
                    value={education.startYear} 
                    onValueChange={(value) => updateEducation(education.id, 'startYear', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Start year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>End Year</Label>
                  <Select 
                    value={education.endYear} 
                    onValueChange={(value) => updateEducation(education.id, 'endYear', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="End year or expected" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="present">Present</SelectItem>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Grade/GPA (Optional)</Label>
                  <Input
                    value={education.grade}
                    onChange={(e) => updateEducation(education.id, 'grade', e.target.value)}
                    placeholder="e.g., 3.8/4.0, First Class, 85%"
                  />
                </div>
              </div>
            </div>
          ))}

          {educations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No education background added yet.</p>
              <Button onClick={addEducation} className="mt-4" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Your Education
              </Button>
            </div>
          )}

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Award className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Education Tips:</h4>
                <ul className="text-sm text-green-700 mt-2 space-y-1">
                  <li>• Include relevant coursework for your target roles</li>
                  <li>• Add certifications and online courses</li>
                  <li>• Mention academic achievements and honors</li>
                  <li>• List most recent education first</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}