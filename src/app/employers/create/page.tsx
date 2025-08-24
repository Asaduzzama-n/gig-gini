// app/employers/create/page.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Calendar, DollarSign, MapPin, Users, Trophy, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface CompetitionRound {
  roundNumber: number;
  title: string;
  description: string;
  type: "quiz" | "task" | "presentation" | "interview";
  evaluationCriteria: string[];
}

interface CompetitionForm {
  title: string;
  description: string;
  categories: string[];
  location: string;
  startDate: string;
  endDate: string;
  resultDate: string;
  prizes: string;
  registrationFee: string;
  projectBrief: string;
  skillsTested: string[];
  requirements: string[];
  submissionFormats: string[];
  maxFileSize: string;
  termsAndConditions: string[];
  rounds: CompetitionRound[];
}

const initialForm: CompetitionForm = {
  title: '',
  description: '',
  categories: [],
  location: '',
  startDate: '',
  endDate: '',
  resultDate: '',
  prizes: '',
  registrationFee: 'Free',
  projectBrief: '',
  skillsTested: [],
  requirements: [],
  submissionFormats: [],
  maxFileSize: '100MB',
  termsAndConditions: [],
  rounds: []
};

const availableCategories = ['IT', 'Programming', 'Marketing', 'Sales', 'Business', 'Design', 'Data Science', 'Mobile Development'];
const competitionTypes = {
  'Computer Science / IT': [
    { roundNumber: 1, title: 'Technical Screening', description: 'Comprehensive technical assessment', type: 'quiz' as const, evaluationCriteria: ['Technical knowledge', 'Problem-solving', 'Best practices'] },
    { roundNumber: 2, title: 'Coding Challenge', description: 'Build a complete application', type: 'task' as const, evaluationCriteria: ['Code quality', 'Functionality', 'Architecture'] },
    { roundNumber: 3, title: 'Technical Presentation', description: 'Present your solution', type: 'presentation' as const, evaluationCriteria: ['Communication', 'Technical depth', 'Demo quality'] },
    { roundNumber: 4, title: 'Technical Interview', description: 'Final technical discussion', type: 'interview' as const, evaluationCriteria: ['Technical expertise', 'Problem-solving', 'Cultural fit'] }
  ],
  'Business & Sales': [
    { roundNumber: 1, title: 'Business Knowledge Test', description: 'Assessment of business fundamentals', type: 'quiz' as const, evaluationCriteria: ['Business acumen', 'Market understanding', 'Strategy knowledge'] },
    { roundNumber: 2, title: 'Case Study Challenge', description: 'Solve a real business problem', type: 'task' as const, evaluationCriteria: ['Strategic thinking', 'Solution quality', 'Implementation plan'] },
    { roundNumber: 3, title: 'Business Pitch', description: 'Present your business solution', type: 'presentation' as const, evaluationCriteria: ['Presentation skills', 'Business insight', 'Persuasiveness'] },
    { roundNumber: 4, title: 'Final Interview', description: 'Cultural fit and role discussion', type: 'interview' as const, evaluationCriteria: ['Communication', 'Leadership potential', 'Cultural alignment'] }
  ],
  'Marketing': [
    { roundNumber: 1, title: 'Marketing Fundamentals', description: 'Test marketing knowledge and trends', type: 'quiz' as const, evaluationCriteria: ['Marketing knowledge', 'Trend awareness', 'Digital marketing'] },
    { roundNumber: 2, title: 'Campaign Development', description: 'Create a complete marketing campaign', type: 'task' as const, evaluationCriteria: ['Creativity', 'Strategy', 'Target audience understanding'] },
    { roundNumber: 3, title: 'Campaign Presentation', description: 'Present your marketing campaign', type: 'presentation' as const, evaluationCriteria: ['Presentation skills', 'Creative execution', 'ROI justification'] },
    { roundNumber: 4, title: 'Strategy Interview', description: 'Discuss marketing strategies', type: 'interview' as const, evaluationCriteria: ['Strategic thinking', 'Industry knowledge', 'Innovation'] }
  ]
};

export default function CreateCompetitionPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<CompetitionForm>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newTerm, setNewTerm] = useState('');

  const handleInputChange = (field: keyof CompetitionForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayAdd = (field: 'skillsTested' | 'requirements' | 'termsAndConditions', value: string) => {
    if (!value.trim()) return;
    setForm(prev => ({
      ...prev,
      [field]: [...prev[field], value.trim()]
    }));
  };

  const handleArrayRemove = (field: 'skillsTested' | 'requirements' | 'termsAndConditions', index: number) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setForm(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const loadTemplateRounds = (template: keyof typeof competitionTypes) => {
    setForm(prev => ({
      ...prev,
      rounds: [...competitionTypes[template]]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Competition created:', form);
    setIsLoading(false);
    
    // Redirect to employer dashboard or competition details
    alert('Competition created successfully!');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Competition Title *
            </label>
            <Input
              value={form.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Full Stack Developer Challenge 2024"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <Textarea
              value={form.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your competition, its goals, and what participants will gain..."
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories *
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {availableCategories.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    form.categories.includes(category)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {form.categories.map(category => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <Input
                value={form.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Remote / City, State"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Fee
              </label>
              <Select value={form.registrationFee} onValueChange={(value) => handleInputChange('registrationFee', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="$25">$25</SelectItem>
                  <SelectItem value="$50">$50</SelectItem>
                  <SelectItem value="$100">$100</SelectItem>
                  <SelectItem value="Custom">Custom Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Timeline & Prizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date *
            </label>
            <Input
              type="datetime-local"
              value={form.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date *
            </label>
            <Input
              type="datetime-local"
              value={form.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Results Date *
            </label>
            <Input
              type="datetime-local"
              value={form.resultDate}
              onChange={(e) => handleInputChange('resultDate', e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prizes & Rewards
          </label>
          <Input
            value={form.prizes}
            onChange={(e) => handleInputChange('prizes', e.target.value)}
            placeholder="e.g., $5000 + Job Offer + Certificate"
          />
        </div>
      </Card>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Competition Details</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Brief
          </label>
          <Textarea
            value={form.projectBrief}
            onChange={(e) => handleInputChange('projectBrief', e.target.value)}
            placeholder="Detailed description of what participants need to build or accomplish..."
            rows={4}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills Tested
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleArrayAdd('skillsTested', newSkill);
                  setNewSkill('');
                }
              }}
            />
            <Button
              type="button"
              onClick={() => {
                handleArrayAdd('skillsTested', newSkill);
                setNewSkill('');
              }}
              disabled={!newSkill.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.skillsTested.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <button
                  type="button"
                  onClick={() => handleArrayRemove('skillsTested', index)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  <Minus className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requirements
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="Add a requirement..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleArrayAdd('requirements', newRequirement);
                  setNewRequirement('');
                }
              }}
            />
            <Button
              type="button"
              onClick={() => {
                handleArrayAdd('requirements', newRequirement);
                setNewRequirement('');
              }}
              disabled={!newRequirement.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {form.requirements.map((req, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm">{req}</span>
                <button
                  type="button"
                  onClick={() => handleArrayRemove('requirements', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Competition Rounds</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Choose a Template</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(competitionTypes).map((template) => (
              <Button
                key={template}
                variant="outline"
                className="h-auto p-4 text-left"
                onClick={() => loadTemplateRounds(template as keyof typeof competitionTypes)}
              >
                <div>
                  <div className="font-medium">{template}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {competitionTypes[template as keyof typeof competitionTypes].length} rounds
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {form.rounds.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4">Competition Flow</h3>
            <div className="space-y-4">
              {form.rounds.map((round, index) => (
                <Card key={index} className="p-4 border-l-4 border-l-orange-500">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Round {round.roundNumber}: {round.title}</h4>
                    <Badge variant="outline">{round.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{round.description}</p>
                  <div className="text-xs text-gray-500">
                    Evaluation: {round.evaluationCriteria.join(', ')}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Terms & Conditions
          </label>
          <div className="flex gap-2 mb-2">
            <Textarea
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              placeholder="Add a term or condition..."
              rows={2}
            />
            <Button
              type="button"
              onClick={() => {
                handleArrayAdd('termsAndConditions', newTerm);
                setNewTerm('');
              }}
              disabled={!newTerm.trim()}
              className="self-start"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {form.termsAndConditions.map((term, index) => (
              <div key={index} className="flex items-start justify-between bg-gray-50 p-3 rounded">
                <span className="text-sm flex-1">{term}</span>
                <button
                  type="button"
                  onClick={() => handleArrayRemove('termsAndConditions', index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Submission Formats
            </label>
            <div className="space-y-2">
              {['GitHub Repository Link', 'Live Demo URL', 'Documentation (README.md)', 'Video Walkthrough'].map(format => (
                <label key={format} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.submissionFormats.includes(format)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm(prev => ({ ...prev, submissionFormats: [...prev.submissionFormats, format] }));
                      } else {
                        setForm(prev => ({ ...prev, submissionFormats: prev.submissionFormats.filter(f => f !== format) }));
                      }
                    }}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm">{format}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max File Size
            </label>
            <Select value={form.maxFileSize} onValueChange={(value) => handleInputChange('maxFileSize', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50MB">50MB</SelectItem>
                <SelectItem value="100MB">100MB</SelectItem>
                <SelectItem value="250MB">250MB</SelectItem>
                <SelectItem value="500MB">500MB</SelectItem>
                <SelectItem value="1GB">1GB</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Preview */}
      <Card className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
        <h3 className="text-lg font-semibold mb-4">Competition Preview</h3>
        <div className="space-y-3 text-sm">
          <div><strong>Title:</strong> {form.title || 'Not set'}</div>
          <div><strong>Categories:</strong> {form.categories.join(', ') || 'None selected'}</div>
          <div><strong>Location:</strong> {form.location || 'Not specified'}</div>
          <div><strong>Start Date:</strong> {form.startDate ? new Date(form.startDate).toLocaleDateString() : 'Not set'}</div>
          <div><strong>Rounds:</strong> {form.rounds.length} rounds configured</div>
          <div><strong>Skills:</strong> {form.skillsTested.join(', ') || 'None specified'}</div>
          <div><strong>Prizes:</strong> {form.prizes || 'Not specified'}</div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/employers/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Competition</h1>
            <p className="text-gray-600">Set up your competition and attract top talent</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`h-1 w-16 mx-2 ${
                    step < currentStep ? 'bg-orange-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-center text-sm">
            <div className={currentStep >= 1 ? 'text-orange-600 font-medium' : 'text-gray-500'}>
              Basic Info
            </div>
            <div className={currentStep >= 2 ? 'text-orange-600 font-medium' : 'text-gray-500'}>
              Competition Details
            </div>
            <div className={currentStep >= 3 ? 'text-orange-600 font-medium' : 'text-gray-500'}>
              Rounds Setup
            </div>
            <div className={currentStep >= 4 ? 'text-orange-600 font-medium' : 'text-gray-500'}>
              Terms & Review
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || !form.title || form.categories.length === 0}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  <>
                    <Trophy className="w-4 h-4 mr-2" />
                    Create Competition
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}