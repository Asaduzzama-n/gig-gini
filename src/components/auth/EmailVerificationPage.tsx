'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';
import {
    Mail,
    CheckCircle,
    Clock,
    RefreshCw,
    AlertCircle,
    ArrowRight,
    ArrowLeft
} from 'lucide-react';

export function EmailVerificationPage() {
    const router = useRouter();
    const { user, updateUserVerificationStatus } = useAuthStore();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [error, setError] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    // Redirect if user is not authenticated or already verified
    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        // Check if email is already verified
        const isEmailVerified = localStorage.getItem(`email_verified_${user.id}`) === 'true';
        if (isEmailVerified) {
            // Redirect to role-specific dashboard
            const roleRoutes = {
                'admin': '/admin',
                'employer': '/employer',
                'employee': '/employee'
            };
            router.push(roleRoutes[user.role as keyof typeof roleRoutes] || '/employee');
            return;
        }
    }, [user, router]);

    // Countdown timer for resend
    useEffect(() => {
        if (countdown > 0 && !canResend) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            setCanResend(true);
        }
    }, [countdown, canResend]);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return; // Only allow single digit

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }

        // Auto-verify when all fields are filled
        if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
            handleVerify(newOtp.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerify = async (otpCode?: string) => {
        const code = otpCode || otp.join('');

        if (code.length !== 6) {
            setError('Please enter the complete 6-digit code');
            return;
        }

        setIsVerifying(true);
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // For demo purposes, accept any 6-digit code
            if (code.length === 6 && user) {
                localStorage.setItem(`email_verified_${user.id}`, 'true');
                updateUserVerificationStatus(true, user.isProfileComplete);
                setIsVerified(true);

                setTimeout(() => {
                    // Redirect to role-specific dashboard
                    const roleRoutes = {
                        'admin': '/admin',
                        'employer': '/employer',
                        'employee': '/employee'
                    };
                    router.push(roleRoutes[user.role as keyof typeof roleRoutes] || '/employee');
                }, 2000);
            } else {
                setError('Invalid verification code. Please try again.');
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setCountdown(60);
            setCanResend(false);
            setOtp(['', '', '', '', '', '']);

            // Focus first input
            const firstInput = document.getElementById('otp-0');
            firstInput?.focus();
        } catch (err) {
            setError('Failed to resend code. Please try again.');
        } finally {
            setIsResending(false);
        }
    };

    const handleBackToLogin = () => {
        router.push('/login');
    };

    if (!user) {
        return null; // Will redirect in useEffect
    }

    if (isVerified) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full"
                >
                    <Card>
                        <CardContent className="text-center py-12">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.6 }}
                                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle className="h-10 w-10 text-green-600" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">Email Verified!</h2>
                                <p className="text-gray-600 mb-6">
                                    Your email has been successfully verified. Redirecting you to complete your profile...
                                </p>

                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verification Complete
                                </Badge>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <Card>
                    <CardHeader>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 bg-[#FC5602]/10 rounded-full flex items-center justify-center">
                                    <Mail className="h-8 w-8 text-[#FC5602]" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                Verify Your Email
                            </CardTitle>
                            <p className="text-gray-600 mt-2">
                                We've sent a 6-digit verification code to:
                            </p>
                            <p className="font-semibold text-gray-900 mt-1">{user.email}</p>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* OTP Input */}
                        <div className="space-y-4">
                            <Label className="text-center block font-medium">Enter Verification Code</Label>
                            <div className="flex justify-center space-x-3">
                                {otp.map((digit, index) => (
                                    <Input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-[#FC5602]"
                                        disabled={isVerifying}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200"
                            >
                                <AlertCircle className="h-4 w-4" />
                                <span className="text-sm">{error}</span>
                            </motion.div>
                        )}

                        {/* Verify Button */}
                        <Button
                            onClick={() => handleVerify()}
                            disabled={otp.join('').length !== 6 || isVerifying}
                            className="w-full btn-primary"
                            size="lg"
                        >
                            {isVerifying ? (
                                <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Verify Email
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </>
                            )}
                        </Button>

                        {/* Resend Section */}
                        <div className="text-center space-y-3">
                            <p className="text-sm text-gray-600">
                                Didn't receive the code?
                            </p>

                            {canResend ? (
                                <Button
                                    onClick={handleResend}
                                    variant="ghost"
                                    disabled={isResending}
                                    className="text-[#FC5602] hover:text-[#FC5602]/80"
                                >
                                    {isResending ? (
                                        <>
                                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Resend Code'
                                    )}
                                </Button>
                            ) : (
                                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                                    <Clock className="h-4 w-4" />
                                    <span>Resend in {countdown}s</span>
                                </div>
                            )}
                        </div>

                        {/* Back to Login */}
                        <div className="text-center pt-4 border-t border-gray-200">
                            <Button
                                onClick={handleBackToLogin}
                                variant="ghost"
                                size="sm"
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Login
                            </Button>
                        </div>

                        {/* Help Text */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-xs text-blue-700">
                                <strong>Tip:</strong> Check your spam folder if you don't see the email.
                                The code expires in 10 minutes.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}