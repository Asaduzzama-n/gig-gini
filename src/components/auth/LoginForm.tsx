"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, LogIn, User, Building, Shield } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, isLoading } = useAuthStore();

  // Memoize form validation
  const isFormValid = useMemo(() => {
    return email.trim() !== '' && password.trim() !== '';
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    
    if (result.success) {
      // Redirect based on user role
      const user = useAuthStore.getState().user;
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
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const quickLogin = (userType: 'admin' | 'employer' | 'employee') => {
    const credentials = {
      admin: 'admin@gigGeni.com',
      employer: 'employer@gigGeni.com',
      employee: 'employee@gigGeni.com'
    };
    
    setEmail(credentials[userType]);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold gradient-text">GiG Geni</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <Card className="card-rounded shadow-xl">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-rounded"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-rounded pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
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
                className="w-full btn-primary" 
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Login Options */}
        <Card className="card-rounded">
          <CardHeader>
            <CardTitle className="text-lg">Quick Login (Demo)</CardTitle>
            <CardDescription>
              Click any button below to quickly login as different user types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                onClick={() => quickLogin('admin')}
                className="justify-start"
                disabled={isLoading}
              >
                <Shield className="w-4 h-4 mr-2 text-red-500" />
                Login as Admin
              </Button>
              
              <Button
                variant="outline"
                onClick={() => quickLogin('employer')}
                className="justify-start"
                disabled={isLoading}
              >
                <Building className="w-4 h-4 mr-2 text-blue-500" />
                Login as Employer
              </Button>
              
              <Button
                variant="outline"
                onClick={() => quickLogin('employee')}
                className="justify-start"
                disabled={isLoading}
              >
                <User className="w-4 h-4 mr-2 text-green-500" />
                Login as Employee
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="card-rounded bg-gray-50">
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2">Demo Credentials:</p>
              <div className="space-y-1">
                <p><strong>Admin:</strong> admin@gigGeni.com / password123</p>
                <p><strong>Employer:</strong> employer@gigGeni.com / password123</p>
                <p><strong>Employee:</strong> employee@gigGeni.com / password123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}