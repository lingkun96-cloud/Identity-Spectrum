export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Option {
  label: string;
  value: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, string>; // questionId -> answerValue
  isComplete: boolean;
}

export interface Resource {
  title: string;
  url: string;
  description: string;
}

export interface IdentityResult {
  identityName: string;
  shortDescription: string;
  detailedExplanation: string;
  flagColors: string[]; // Array of hex codes
  relatedIdentities: string[];
  affirmation: string;
  resources: Resource[];
}

export type FlagOrientation = 'horizontal' | 'vertical' | 'diagonal' | 'circular' | 'heart';

export enum AppStatus {
  WELCOME = 'WELCOME',
  QUIZ = 'QUIZ',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}