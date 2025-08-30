'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, X, Plus, Lightbulb, Zap } from 'lucide-react';

interface SkillsStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const popularSkills = {
  technical: [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++', 'SQL',
    'AWS', 'Docker', 'Kubernetes', 'Git', 'MongoDB', 'PostgreSQL', 'Redis',
    'GraphQL', 'REST APIs', 'Microservices', 'Machine Learning', 'Data Analysis'
  ],
  design: [
    'Figma', 'Adobe Creative Suite', 'Sketch', 'Prototyping', 'UI/UX Design',
    'User Research', 'Wireframing', 'Design Systems', 'Adobe XD', 'InVision'
  ],
  business: [
    'Project Management', 'Agile', 'Scrum', 'Leadership', 'Strategic Planning',
    'Business Analysis', 'Market Research', 'Financial Analysis', 'Budgeting'
  ],
  marketing: [
    'Digital Marketing', 'SEO', 'SEM', 'Social Media Marketing', 'Content Marketing',
    'Email Marketing', 'Analytics', 'PPC', 'Brand Management', 'Growth Hacking'
  ],
  soft: [
    'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking',
    'Time Management', 'Adaptability', 'Creativity', 'Leadership', 'Negotiation'
  ]
};

export function SkillsStep({ data, onUpdate }: SkillsStepProps) {
  const [skills, setSkills] = useState<string[]>(data.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [activeCategory, setActiveCategory] = useState<keyof typeof popularSkills>('technical');

  useEffect(() => {
    onUpdate({ skills });
  }, [skills, onUpdate]);

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(newSkill);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-[#FC5602]" />
            <span>Skills & Expertise</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Skills */}
          <div className="space-y-3">
            <Label>Your Skills ({skills.length})</Label>
            <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border rounded-lg bg-gray-50">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-[#FC5602] text-white hover:bg-[#FC5602]/90 cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No skills added yet. Add skills below.</p>
              )}
            </div>
          </div>

          {/* Add Custom Skill */}
          <div className="space-y-3">
            <Label>Add Custom Skill</Label>
            <div className="flex space-x-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a skill and press Enter"
                className="flex-1"
              />
              <Button
                onClick={() => addSkill(newSkill)}
                disabled={!newSkill.trim()}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Popular Skills Categories */}
          <div className="space-y-4">
            <Label className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4 text-[#FC5602]" />
              <span>Popular Skills by Category</span>
            </Label>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(popularSkills).map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category as keyof typeof popularSkills)}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className={activeCategory === category ? "btn-primary" : ""}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {popularSkills[activeCategory].map((skill) => (
                <Button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  variant="outline"
                  size="sm"
                  disabled={skills.includes(skill)}
                  className={`justify-start text-left h-auto py-2 px-3 ${
                    skills.includes(skill) 
                      ? 'bg-green-50 border-green-200 text-green-700' 
                      : 'hover:bg-[#FC5602]/5 hover:border-[#FC5602]/20'
                  }`}
                >
                  {skills.includes(skill) && <Zap className="h-3 w-3 mr-1 text-green-500" />}
                  <span className="truncate">{skill}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Code className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-900">Skills Guidelines:</h4>
                <ul className="text-sm text-orange-700 mt-2 space-y-1">
                  <li>• Add both technical and soft skills relevant to your career</li>
                  <li>• Include programming languages, frameworks, and tools you know</li>
                  <li>• Don't forget soft skills like communication and leadership</li>
                  <li>• Be honest about your skill level - employers value authenticity</li>
                  <li>• Aim for 10-20 skills for a comprehensive profile</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}