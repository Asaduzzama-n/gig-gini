'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { ProgressBar as Progress } from '@/components/ui/progress-bar';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';

import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Link,
  Building,
  Target,
  CheckCircle,
  X
} from 'lucide-react';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { ExperienceStep } from './steps/ExperienceStep';
import { EducationStep } from './steps/EducationStep';
import { SkillsStep } from './steps/SkillsStep';
import { SocialLinksStep } from './steps/SocialLinksStep';
import { CompanyDetailsStep } from './steps/CompanyDetailsStep';
import { HiringPreferencesStep } from './steps/HiringPreferencesStep';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface ProfileCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const employeeSteps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Basic details about yourself',
    icon: User,
    component: PersonalInfoStep
  },
  {
    id: 'experience',
    title: 'Work Experience',
    description: 'Your professional background',
    icon: Briefcase,
    component: ExperienceStep
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Academic qualifications',
    icon: GraduationCap,
    component: EducationStep
  },
  {
    id: 'skills',
    title: 'Skills & Expertise',
    description: 'Technical and soft skills',
    icon: Code,
    component: SkillsStep
  },
  {
    id: 'social',
    title: 'Social Links',
    description: 'Portfolio and social profiles',
    icon: Link,
    component: SocialLinksStep
  }
];

const employerSteps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Basic contact details',
    icon: User,
    component: PersonalInfoStep
  },
  {
    id: 'company',
    title: 'Company Details',
    description: 'About your organization',
    icon: Building,
    component: CompanyDetailsStep
  },
  {
    id: 'hiring',
    title: 'Hiring Preferences',
    description: 'What you look for in candidates',
    icon: Target,
    component: HiringPreferencesStep
  },
  {
    id: 'social',
    title: 'Social Links',
    description: 'Company website and profiles',
    icon: Link,
    component: SocialLinksStep
  }
];

export function ProfileCompletionModal({ isOpen, onClose, onComplete }: ProfileCompletionModalProps) {
  const { user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<any>({});

  const steps = user?.role === 'employer' ? employerSteps : employeeSteps;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Profile completion finished
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const CurrentStepComponent = steps[currentStep]?.component;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex h-[80vh]">
          {/* Sidebar with steps */}
          <div className="w-80 bg-gray-50 border-r p-6 overflow-y-auto">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-bold text-gray-900">
                Complete Your Profile
              </DialogTitle>
              <p className="text-sm text-gray-600">
                Help us understand you better to provide personalized recommendations
              </p>
            </DialogHeader>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = completedSteps.has(index);
                const isAccessible = index <= currentStep || completedSteps.has(index);

                return (
                  <motion.button
                    key={step.id}
                    onClick={() => handleStepClick(index)}
                    disabled={!isAccessible}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      isActive
                        ? 'bg-[#FC5602] text-white border-[#FC5602] shadow-md'
                        : isCompleted
                        ? 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100'
                        : isAccessible
                        ? 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    }`}
                    whileHover={isAccessible ? { scale: 1.02 } : {}}
                    whileTap={isAccessible ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isActive
                          ? 'bg-white/20'
                          : isCompleted
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Icon className={`h-5 w-5 ${
                            isActive ? 'text-white' : isAccessible ? 'text-gray-600' : 'text-gray-400'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{step.title}</h3>
                        <p className={`text-xs ${
                          isActive ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                      {isActive && (
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          Current
                        </Badge>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Skip Option */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="w-full text-gray-600 hover:text-gray-800"
              >
                Skip for now
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                You can complete this later from your dashboard
              </p>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {steps[currentStep]?.title}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {steps[currentStep]?.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Step content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {CurrentStepComponent && (
                    <CurrentStepComponent
                      data={formData}
                      onUpdate={updateFormData}
                      userRole={user?.role}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer with navigation */}
            <div className="p-6 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                </div>

                <Button
                  onClick={handleNext}
                  className="btn-primary"
                >
                  {currentStep === steps.length - 1 ? 'Complete Profile' : 'Next Step'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}