'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft,
  Plus,
  X,
  Trophy,
  Users,
  Calendar,
  DollarSign,
  Target,
  FileText,
  Save,
  Eye
} from 'lucide-react';

const categories = [
  'IT & Technology',
  'Design & Creative',
  'Marketing & Sales',
  'Business & Strategy',
  'Finance & Accounting',
  'Engineering',
  'Healthcare',
  'Education',
  'Other'
];

const skillSuggestions = {
  'IT & Technology': ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'MongoDB'],
  'Design & Creative': ['Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Prototyping', 'User Research'],
  'Marketing & Sales': ['Digital Marketing', 'SEO', 'Social Media', 'Content Marketing', 'Sales Strategy'],
  'Business & Strategy': ['Business Analysis', 'Project Management', 'Strategic Planning', 'Leadership'],
  'Finance & Accounting': ['Financial Analysis', 'Accounting', 'Excel', 'Financial Modeling', 'Budgeting']
};

export function CreateCompetitionPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    skillsTested: [] as string[],
    location: '',
    workType: '',
    experienceLevel: '',
    startDate: '',
    endDate: '',
    resultDate: '',
    prize: '',
    registrationFee: 'free',
    maxParticipants: '',
    projectBrief: '',
    evaluationCriteria: [] as string[],
    termsAndConditions: [] as string[],
    submissionFormats: [] as string[]
  });

  const [newSkill, setNewSkill] = useState('');
  const [newCriteria, setNewCriteria] = useState('');
  const [newTerm, setNewTerm] = useState('');
  const [newFormat, setNewFormat] = useState('');

  const totalSteps = 4;

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: string, value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      const currentArray = formData[field as keyof typeof formData] as string[];
      handleInputChange(field, [...currentArray, value.trim()]);
      setter('');
    }
  };

  const removeFromArray = (field: string, index: number) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    handleInputChange(field, currentArray.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    console.log('Creating competition:', formData);
    router.push('/employer/competitions');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
              <p className="text-gray-600">Tell us about your competition</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Competition Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Senior Frontend Developer Challenge"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what you're looking for and what the competition involves..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select value={formData.experienceLevel} onValueChange={(value) => handleInputChange('experienceLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5-8 years)</SelectItem>
                      <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Remote, New York, NY"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workType">Work Type</Label>
                  <Select value={formData.workType} onValueChange={(value) => handleInputChange('workType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills & Requirements</h2>
              <p className="text-gray-600">Define what skills you're looking for</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Skills Tested *</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('skillsTested', newSkill, setNewSkill)}
                  />
                  <Button
                    type="button"
                    onClick={() => addToArray('skillsTested', newSkill, setNewSkill)}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {formData.category && skillSuggestions[formData.category as keyof typeof skillSuggestions] && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Suggested skills for {formData.category}:</p>
                    <div className="flex flex-wrap gap-2">
                      {skillSuggestions[formData.category as keyof typeof skillSuggestions].map((skill) => (
                        <Button
                          key={skill}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (!formData.skillsTested.includes(skill)) {
                              handleInputChange('skillsTested', [...formData.skillsTested, skill]);
                            }
                          }}
                          disabled={formData.skillsTested.includes(skill)}
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {formData.skillsTested.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('skillsTested', index)}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectBrief">Project Brief</Label>
                <Textarea
                  id="projectBrief"
                  value={formData.projectBrief}
                  onChange={(e) => handleInputChange('projectBrief', e.target.value)}
                  placeholder="Describe the project or challenge participants will work on..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Evaluation Criteria</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newCriteria}
                    onChange={(e) => setNewCriteria(e.target.value)}
                    placeholder="Add evaluation criteria"
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('evaluationCriteria', newCriteria, setNewCriteria)}
                  />
                  <Button
                    type="button"
                    onClick={() => addToArray('evaluationCriteria', newCriteria, setNewCriteria)}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {formData.evaluationCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{criteria}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('evaluationCriteria', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Timeline & Rewards</h2>
              <p className="text-gray-600">Set dates and prizes for your competition</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resultDate">Result Date</Label>
                  <Input
                    id="resultDate"
                    type="date"
                    value={formData.resultDate}
                    onChange={(e) => handleInputChange('resultDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prize">Prize *</Label>
                  <Input
                    id="prize"
                    value={formData.prize}
                    onChange={(e) => handleInputChange('prize', e.target.value)}
                    placeholder="e.g., $5,000 + Job Offer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                    placeholder="Leave empty for unlimited"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Registration Fee</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="free"
                      checked={formData.registrationFee === 'free'}
                      onCheckedChange={() => handleInputChange('registrationFee', 'free')}
                    />
                    <Label htmlFor="free">Free</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="paid"
                      checked={formData.registrationFee === 'paid'}
                      onCheckedChange={() => handleInputChange('registrationFee', 'paid')}
                    />
                    <Label htmlFor="paid">Paid</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms & Submission</h2>
              <p className="text-gray-600">Final details and terms</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Submission Formats</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value)}
                    placeholder="e.g., GitHub repository, PDF document"
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('submissionFormats', newFormat, setNewFormat)}
                  />
                  <Button
                    type="button"
                    onClick={() => addToArray('submissionFormats', newFormat, setNewFormat)}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {formData.submissionFormats.map((format, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{format}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('submissionFormats', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Terms and Conditions</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newTerm}
                    onChange={(e) => setNewTerm(e.target.value)}
                    placeholder="Add a term or condition"
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('termsAndConditions', newTerm, setNewTerm)}
                  />
                  <Button
                    type="button"
                    onClick={() => addToArray('termsAndConditions', newTerm, setNewTerm)}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {formData.termsAndConditions.map((term, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{term}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('termsAndConditions', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-900">Competition Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Title:</strong> {formData.title || 'Not set'}</p>
                  <p><strong>Category:</strong> {formData.category || 'Not set'}</p>
                  <p><strong>Skills:</strong> {formData.skillsTested.join(', ') || 'None added'}</p>
                  <p><strong>Prize:</strong> {formData.prize || 'Not set'}</p>
                  <p><strong>Duration:</strong> {formData.startDate && formData.endDate 
                    ? `${formData.startDate} to ${formData.endDate}` 
                    : 'Not set'}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Competition</h1>
          <p className="text-gray-600">Set up a new competition to find top talent</p>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#FC5602] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card>
        <CardContent className="p-6">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        <div className="flex space-x-2">
          {currentStep === totalSteps ? (
            <>
              <Button variant="outline" onClick={() => console.log('Save as draft')}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleSubmit} className="btn-primary">
                <Trophy className="h-4 w-4 mr-2" />
                Create Competition
              </Button>
            </>
          ) : (
            <Button onClick={handleNext} className="btn-primary">
              Next Step
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}