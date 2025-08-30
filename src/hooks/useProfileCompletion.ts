'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

interface ProfileCompletionState {
  isProfileComplete: boolean;
  completionPercentage: number;
  showCompletionModal: boolean;
  showEmailVerification: boolean;
  isEmailVerified: boolean;
}

export function useProfileCompletion() {
  const { user, isAuthenticated, pendingEmailVerification, updateUserVerificationStatus } = useAuthStore();
  const [state, setState] = useState<ProfileCompletionState>({
    isProfileComplete: false,
    completionPercentage: 0,
    showCompletionModal: false,
    showEmailVerification: false,
    isEmailVerified: false
  });

  // Check if user needs onboarding
  useEffect(() => {
    if (isAuthenticated && user) {
      // Check both localStorage and user object for verification status
      const localEmailVerified = localStorage.getItem(`email_verified_${user.id}`) === 'true';
      const localProfileComplete = localStorage.getItem(`profile_complete_${user.id}`) === 'true';
      
      // Use user object as source of truth, fallback to localStorage
      const isEmailVerified = user.isEmailVerified ?? localEmailVerified;
      const isProfileComplete = user.isProfileComplete ?? localProfileComplete;
      
      setState(prev => {
        // Only update if values have actually changed to prevent infinite loops
        if (
          prev.isEmailVerified !== isEmailVerified ||
          prev.isProfileComplete !== isProfileComplete ||
          prev.completionPercentage !== (isProfileComplete ? 100 : isEmailVerified ? 50 : 25)
        ) {
          const newState = {
            ...prev,
            isEmailVerified,
            isProfileComplete,
            completionPercentage: isProfileComplete ? 100 : isEmailVerified ? 50 : 25,
          };

          // Show profile completion if email verified but profile incomplete
          if (isEmailVerified && !isProfileComplete) {
            newState.showCompletionModal = true;
          }

          return newState;
        }
        return prev;
      });
    }
  }, [isAuthenticated, user?.id, user?.isEmailVerified, user?.isProfileComplete]);

  const handleEmailVerified = () => {
    if (user) {
      localStorage.setItem(`email_verified_${user.id}`, 'true');
      updateUserVerificationStatus(true, user.isProfileComplete);
      setState(prev => ({
        ...prev,
        isEmailVerified: true,
        showEmailVerification: false,
        showCompletionModal: true,
        completionPercentage: 50
      }));
    }
  };

  const handleProfileCompleted = () => {
    if (user) {
      localStorage.setItem(`profile_complete_${user.id}`, 'true');
      updateUserVerificationStatus(user.isEmailVerified || true, true);
      setState(prev => ({
        ...prev,
        isProfileComplete: true,
        showCompletionModal: false,
        completionPercentage: 100
      }));
    }
  };

  const handleSkipProfileCompletion = () => {
    setState(prev => ({
      ...prev,
      showCompletionModal: false
    }));
  };

  const triggerProfileCompletion = () => {
    setState(prev => ({
      ...prev,
      showCompletionModal: true
    }));
  };

  // Listen for custom event to trigger profile completion
  useEffect(() => {
    const handleTrigger = () => triggerProfileCompletion();
    window.addEventListener('triggerProfileCompletion', handleTrigger);
    return () => window.removeEventListener('triggerProfileCompletion', handleTrigger);
  }, []);

  const closeEmailVerification = () => {
    setState(prev => ({
      ...prev,
      showEmailVerification: false
    }));
  };

  return {
    ...state,
    handleEmailVerified,
    handleProfileCompleted,
    handleSkipProfileCompletion,
    triggerProfileCompletion,
    closeEmailVerification
  };
}