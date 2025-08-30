// app/auth/login/page.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, User, Building, Shield } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      // Small delay to ensure state is updated
      setTimeout(() => {
        const user = useAuthStore.getState().user;
        console.log('Login successful, user:', user);
        if (user) {
          switch (user.role) {
            case 'admin':
              router.push('/admin');
              break;
            case 'employer':
              router.push('/employer');
              break;
            case 'employee':
              router.push('/employee');
              break;
            default:
              router.push('/');
          }
        }
      }, 100);
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const quickLogin = async (userType: 'admin' | 'employer' | 'employee') => {
    const credentials = {
      admin: 'admin@gigGeni.com',
      employer: 'employer@gigGeni.com',
      employee: 'employee@gigGeni.com'
    };
    
    setError('');
    const result = await login(credentials[userType], 'password123');
    
    if (result.success) {
      // Small delay to ensure state is updated
      setTimeout(() => {
        const user = useAuthStore.getState().user;
        console.log('Quick login successful, user:', user);
        if (user) {
          switch (user.role) {
            case 'admin':
              router.push('/admin');
              break;
            case 'employer':
              router.push('/employer');
              break;
            case 'employee':
              router.push('/employee');
              break;
            default:
              router.push('/');
          }
        }
      }, 100);
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-white font-bold text-xl">GG</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your GiG Geni account</p>
        </div>

        <Card className="p-8 backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Quick Login Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick Login (Demo)</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                onClick={() => quickLogin('admin')}
                className="h-12 justify-start border-gray-200 hover:bg-gray-50"
                disabled={isLoading}
              >
                <Shield className="w-4 h-4 mr-2 text-red-500" />
                Login as Admin
              </Button>
              
              <Button
                variant="outline"
                onClick={() => quickLogin('employer')}
                className="h-12 justify-start border-gray-200 hover:bg-gray-50"
                disabled={isLoading}
              >
                <Building className="w-4 h-4 mr-2 text-blue-500" />
                Login as Employer
              </Button>
              
              <Button
                variant="outline"
                onClick={() => quickLogin('employee')}
                className="h-12 justify-start border-gray-200 hover:bg-gray-50"
                disabled={isLoading}
              >
                <User className="w-4 h-4 mr-2 text-green-500" />
                Login as Employee
              </Button>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2">Demo Credentials:</p>
              <div className="space-y-1">
                <p><strong>Admin:</strong> admin@gigGeni.com / password123</p>
                <p><strong>Employer:</strong> employer@gigGeni.com / password123</p>
                <p><strong>Employee:</strong> employee@gigGeni.com / password123</p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link 
              href="/signup" 
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              Sign up for free
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}