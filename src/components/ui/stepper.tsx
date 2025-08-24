// components/ui/stepper.tsx
'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  title: string;
  description?: string;
  status: 'pending' | 'current' | 'completed';
}

interface StepperProps {
  steps: Step[];
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function Stepper({ steps, className, orientation = 'horizontal' }: StepperProps) {
  return (
    <div className={cn('', className)}>
      {orientation === 'horizontal' ? (
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center space-y-2">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ 
                    scale: step.status === 'current' ? 1.1 : 1,
                    opacity: step.status === 'pending' ? 0.5 : 1 
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold',
                    step.status === 'completed' && 'bg-green-500 border-green-500 text-white',
                    step.status === 'current' && 'bg-[#FC5602] border-[#FC5602] text-white',
                    step.status === 'pending' && 'bg-gray-100 border-gray-300 text-gray-400'
                  )}
                >
                  {step.status === 'completed' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </motion.div>
                
                <div className="text-center">
                  <p className={cn(
                    'text-sm font-medium',
                    step.status === 'pending' ? 'text-gray-400' : 'text-gray-700'
                  )}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                  )}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-0.5 bg-gray-200 relative">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ 
                        width: steps[index + 1].status !== 'pending' ? '100%' : '0%' 
                      }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute top-0 left-0 h-full bg-green-500"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ 
                  scale: step.status === 'current' ? 1.1 : 1,
                  opacity: step.status === 'pending' ? 0.5 : 1 
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold shrink-0',
                  step.status === 'completed' && 'bg-green-500 border-green-500 text-white',
                  step.status === 'current' && 'bg-[#FC5602] border-[#FC5602] text-white',
                  step.status === 'pending' && 'bg-gray-100 border-gray-300 text-gray-400'
                )}
              >
                {step.status === 'completed' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>
              
              <div className="flex-1 pb-8">
                <p className={cn(
                  'text-lg font-medium',
                  step.status === 'pending' ? 'text-gray-400' : 'text-gray-700'
                )}>
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-gray-500 mt-1">{step.description}</p>
                )}
                
                {index < steps.length - 1 && (
                  <div className="ml-5 mt-4">
                    <div className="w-0.5 h-8 bg-gray-200 relative">
                      <motion.div
                        initial={{ height: '0%' }}
                        animate={{ 
                          height: steps[index + 1].status !== 'pending' ? '100%' : '0%' 
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute top-0 left-0 w-full bg-green-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


