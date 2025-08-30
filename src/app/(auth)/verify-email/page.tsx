import { Metadata } from 'next';
import { EmailVerificationPage } from '@/components/auth/EmailVerificationPage';

export const metadata: Metadata = {
  title: 'Verify Your Email | GiG Geni',
  description: 'Verify your email address to complete your account setup and access all features.',
  keywords: 'email verification, account setup, OTP verification',
};

export default function VerifyEmailPage() {
  return <EmailVerificationPage />;
}