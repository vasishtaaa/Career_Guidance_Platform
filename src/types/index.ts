/**
 * TypeScript Type Definitions & Interfaces
 * Customized Digital Guidance Platform (2025)
 */

export interface DimensionWeights {
  technology: number;
  analytical: number;
  problemSolving: number;
  leadership: number;
  creative: number;
  [key: string]: number;
}

export interface Milestone {
  id: string;
  title: string;
  detail: string;
}

export interface CuratedResource {
  name: string;
  type: string;
}

export interface Career {
  id: string;
  title: string;
  domain: string;
  badgeClass: string;
  description: string;
  minSalaryUSD: number;
  maxSalaryUSD: number;
  growthRate: string;
  educationLevel: string;
  matchedCourseFields: string[];
  matchWeights: DimensionWeights;
  skills: string[];
  prerequisites: string[];
  milestones: Milestone[];
  curatedResources: CuratedResource[];
  matchScore?: number;
  cosineSimilarity?: number;
  primaryAlignment?: string;
}

export interface College {
  id: string;
  name: string;
  country: string;
  city: string;
  flag: string;
  globalRank: string;
  badgeClass: string;
  matchedCareerDomains: string[];
  flagshipPrograms: string[];
  entranceExams: string[];
  annualTuitionUSD: number;
  acceptanceRate: string;
  scholarshipsAvailable: boolean;
  notableFocus: string;
}

export interface QuizOption {
  id: string;
  label: string;
  weights: DimensionWeights;
}

export interface QuizQuestion {
  step: number;
  category: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
}

export interface AssessmentResult {
  weights: DimensionWeights;
  topMatches: Career[];
  completedAt?: string;
  timestamp?: string;
}

export interface UserProfile {
  fullName: string;
  educationLevel: string;
  interests: string[];
}

export interface AppState {
  version: string;
  theme: "light" | "dark";
  currency?: string;
  lastAssessment: AssessmentResult | null;
  bookmarkedCareerIds: string[];
  milestoneProgress: Record<string, string[]>;
  userProfile: UserProfile;
}

export interface CurrencyRate {
  rate: number;
  symbol: string;
  code: string;
  name: string;
}
