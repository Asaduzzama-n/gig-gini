// types/index.ts

// User Authentication Types
export interface User {
  id: string;
  email: string;
  role: 'employee' | 'employer' | 'admin';
  profile: UserProfile | EmployerProfile;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Competition Round Interface
export interface CompetitionRound {
  roundNumber: number;
  title: string;
  description: string;
  type: "quiz" | "task" | "presentation" | "interview";
  evaluationCriteria: string[];
  timeLimit?: number; // in minutes
  passingScore?: number; // percentage
  instructions?: string;
  resources?: string[]; // URLs or file paths
}

// Base Competition Interface
export interface Competition {
  id: string;
  title: string;
  organizer: string;
  organizerId: string;
  location?: string;
  rating?: number;
  categories: string[]; // e.g. ["IT", "Business"]
  prizes?: string;
  registrationFee?: string;
  startDate?: Date;
  endDate?: Date;
  resultDate?: Date;
  description?: string;
  skillsTested: string[];
  projectBrief?: string;
  termsAndConditions: string[];
  // participantCount: number;
  submissionFormats: string[];
  maxFileSize?: string;
  maxParticipants?: number;
  currentParticipants: number;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  rounds: CompetitionRound[];
}

// Employee Profile Interfaces
export interface Experience {
  id?: string;
  company?: string;
  role?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  current?: boolean;
}

export interface Education {
  id?: string;
  institution?: string;
  degree?: string;
  field?: string;
  startYear?: number;
  endYear?: number;
  grade?: string;
}

export interface Training {
  id?: string;
  title?: string;
  provider?: string;
  date?: Date;
  description?: string;
  certificateUrl?: string;
}

export interface Reference {
  id?: string;
  name?: string;
  relationship?: string;
  contact?: string;
  email?: string;
  company?: string;
}

export interface ContactInformation {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface Address {
  home?: string;
  permanent?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

// Employee Profile
export interface UserProfile {
  userId: string;
  name: string;
  profilePhoto?: string;
  rating?: number;
  ovationTag?: string;
  topRanking?: string;
  txValue?: number;
  aboutMe?: string;
  identityValidation?: string;
  salaryExpectation?: string;
  jobPreference?: string;
  availability?: 'immediate' | 'within-month' | 'within-3-months' | 'flexible';
  preferredLocation?: string[];
  workType?: 'remote' | 'hybrid' | 'onsite' | 'any';
  skills: string[];
  experience: Experience[];
  education: Education[];
  personalInformation?: string;
  address?: Address;
  contactInformation?: ContactInformation;
  assets: string[]; // Portfolio items, certificates, etc.
  additionalActivity?: string;
  training: Training[];
  reference: Reference[];
  socialLinks: string[];
  completionPercentage?: number;
  isProfileComplete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  appliedCompetitions?: string[]; // Competition IDs
}

// Employer Profile
export interface EmployerProfile {
  userId: string;
  companyName: string;
  companyLogo?: string;
  companySize?: number;
  industry?: string;
  companyDescription?: string;
  website?: string;
  foundedYear?: number;
  headquarters?: string;
  teamMembers?: string[];
  hiringPreferences?: string[];
  contactPerson?: {
    name: string;
    role: string;
    email: string;
    phone?: string;
  };
  postedCompetitions: string[]; // Competition IDs
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdAt?: Date;
  updatedAt?: Date;
}

// Application and Progress Tracking
export interface CompetitionApplication {
  id: string;
  competitionId: string;
  userId: string;
  status: 'applied' | 'in-progress' | 'completed' | 'selected' | 'rejected';
  currentRound: number;
  roundProgress: {
    [roundNumber: number]: {
      status: 'pending' | 'in-progress' | 'completed' | 'failed';
      score?: number;
      feedback?: string;
      submissionDate?: Date;
      scheduledDate?: Date; // For interviews
    };
  };
  totalScore?: number;
  ranking?: number;
  appliedAt: Date;
  completedAt?: Date;
  notes?: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// Analytics and Reporting
export interface AnalyticsData {
  totalUsers: number;
  totalCompetitions: number;
  activeCompetitions: number;
  totalApplications: number;
  userGrowth: {
    month: string;
    employees: number;
    employers: number;
  }[];
  competitionCategories: {
    category: string;
    count: number;
  }[];
  topSkills: {
    skill: string;
    demand: number;
  }[];
}

// Form Types
export interface CompetitionFormData {
  title: string;
  description: string;
  categories: string[];
  skillsTested: string[];
  location?: string;
  startDate?: Date;
  endDate?: Date;
  resultDate?: Date;
  prizes?: string;
  registrationFee?: string;
  maxParticipants?: number;
  projectBrief?: string;
  termsAndConditions: string[];
  submissionFormats: string[];
  rounds: CompetitionRound[];
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Filter and Search Types
export interface CompetitionFilters {
  categories?: string[];
  location?: string;
  prizeRange?: {
    min?: number;
    max?: number;
  };
  startDate?: {
    from?: Date;
    to?: Date;
  };
  status?: string[];
  skills?: string[];
  sortBy?: 'newest' | 'oldest' | 'prize' | 'participants' | 'rating';
}

// Homepage Content Types
export interface HomepageContent {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    backgroundImage?: string;
  };
  benefits: {
    employee: {
      title: string;
      points: string[];
    };
    employer: {
      title: string;
      points: string[];
    };
  };
  competitionFlow: {
    title: string;
    steps: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  roadmap: {
    title: string;
    description: string;
    features: {
      title: string;
      description: string;
      status: 'completed' | 'in-progress' | 'planned';
    }[];
  };
}

// Enums
export enum CompetitionCategory {
  IT = 'IT',
  BUSINESS = 'Business',
  SALES = 'Sales',
  MARKETING = 'Marketing',
  DESIGN = 'Design',
  FINANCE = 'Finance',
  ENGINEERING = 'Engineering',
  HEALTHCARE = 'Healthcare',
  EDUCATION = 'Education',
  OTHER = 'Other'
}

export enum CompetitionStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum UserRole {
  EMPLOYEE = 'employee',
  EMPLOYER = 'employer',
  ADMIN = 'admin'
}