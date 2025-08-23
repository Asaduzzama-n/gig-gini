// providers/AuthProvider.tsx
'use client';

import { EmployerProfile, User, UserProfile } from '@/interfaces/types';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | EmployerProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile | EmployerProfile>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'employee' | 'employer';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | EmployerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API calls
  const mockUserData: User = {
    id: '1',
    email: 'john@example.com',
    role: 'employee',
    profile: {
      userId: '1',
      name: 'John Doe',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: [],
      education: [],
      training: [],
      reference: [],
      assets: [],
      socialLinks: [],
      contactInformation: {
        email: 'john@example.com',
        phone: '+1234567890',
      },
    } as UserProfile,
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  useEffect(() => {
    // Check for existing authentication on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is logged in (e.g., check localStorage, validate token)
      const token = localStorage.getItem('authToken');
      if (token) {
        // Validate token and fetch user data
        // For now, we'll use mock data
        setUser(mockUserData);
        setProfile(mockUserData.profile);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Make API call to authenticate user
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      
      // For mock purposes:
      console.log('Logging in:', { email, password });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store token
      localStorage.setItem('authToken', 'mock-token-123');
      
      // Set user data
      setUser(mockUserData);
      setProfile(mockUserData.profile);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Make API call to logout
      // await fetch('/api/auth/logout', { method: 'POST' });
      
      // Clear local storage
      localStorage.removeItem('authToken');
      
      // Clear state
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      
      // Make API call to register user
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // });
      
      console.log('Registering user:', userData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user based on registration data
      const newUser: User = {
        ...mockUserData,
        email: userData.email,
        role: userData.role,
        profile: userData.role === 'employee' 
          ? { ...mockUserData.profile as UserProfile, name: userData.name }
          : {
              userId: '1',
              companyName: userData.name,
              postedCompetitions: [],
              verificationStatus: 'pending',
              createdAt: new Date(),
              updatedAt: new Date(),
            } as EmployerProfile,
      };
      
      localStorage.setItem('authToken', 'mock-token-123');
      setUser(newUser);
      setProfile(newUser.profile);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile | EmployerProfile>) => {
    try {
      setIsLoading(true);
      
      // Make API call to update profile
      // const response = await fetch('/api/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(profileData),
      // });
      
      console.log('Updating profile:', profileData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update profile state
      if (profile) {
        const updatedProfile = { ...profile, ...profileData };
        setProfile(updatedProfile);
        
        // Update user state if needed
        if (user) {
          setUser({ ...user, profile: updatedProfile });
        }
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      
      // Fetch fresh user data
      // const response = await fetch('/api/user/me');
      // const userData = await response.json();
      
      // For mock purposes, just refresh the existing data
      if (user) {
        setUser({ ...user, updatedAt: new Date() });
      }
    } catch (error) {
      console.error('User refresh failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    updateProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}