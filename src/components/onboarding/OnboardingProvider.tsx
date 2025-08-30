'use client';

import { usePathname } from 'next/navigation';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { ProfileCompletionModal } from './ProfileCompletionModal';
import { useAuthStore } from '@/stores/authStore';

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const {
    showCompletionModal,
    handleProfileCompleted,
    handleSkipProfileCompletion,
  } = useProfileCompletion();

  // Don't show modals on auth pages
  const isAuthPage = pathname?.startsWith('/login') || 
                     pathname?.startsWith('/signup') || 
                     pathname?.startsWith('/auth/verify-email');

  // Check if user should see profile completion
  const shouldShowProfileCompletion = user?.isEmailVerified && !user?.isProfileComplete && !isAuthPage;

  return (
    <>
      {children}
      
      {/* Show profile completion modal when conditions are met */}
      <ProfileCompletionModal
        isOpen={shouldShowProfileCompletion ? showCompletionModal : false}
        onClose={handleSkipProfileCompletion}
        onComplete={handleProfileCompleted}
      />
    </>
  );
}