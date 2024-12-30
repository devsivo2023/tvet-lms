// CDACC Learning Plan Types
export interface LearningPlan {
  // Header Information
  ref: string;  // REF:ETTI/TP/LP/F07
  courseName: string;
  unitOfCompetency: string;
  unitCode: string;
  trainerName: string;
  trainerNumber: string;
  institution: string;
  level: string;
  dateOfPreparation: string;
  dateOfRevision: string;
  numberOfTrainees: number;
  classCode: string;
  totalUnitHours: number;
  numberOfSessions: number;

  // Core Content
  skillOrJobTask: string;
  benchmarkCriteria: BenchmarkCriterion[];
  sessions: WeeklySession[];
}

export interface BenchmarkCriterion {
  element: string;  // e.g., "Carry out market research"
  performanceCriteria: string[];
}

export interface WeeklySession {
  week: number;
  sessionNo: number;
  sessionTitle: string;
  sessionLearningOutcome: string;
  trainerActivities: string[];
  traineeActivities: string[];
  resourcesAndRefs: string[];
  learningChecks: LearningChecks;
  reflectionsAndDate: string;
}

export interface LearningChecks {
  knowledge: string[];
  skills: string[];
  attitudes: string[];
}

// CDACC Session Plan Types
export interface SessionPlan {
  // Header Information
  ref: string;  // REF: KTTC/LP/F06
  date: string;
  time: string;
  trainerName: string;
  trainerNumber: string;
  institution: string;
  level: string;
  unitCode: string;
  unitOfCompetency: string;
  sessionTitle: string;
  
  // Special Requirements
  languageLiteracyNumeracyNeeds: string;
  
  // Learning Outcomes
  learningOutcomes: string[];
  
  // Resources
  resources: {
    references: string[];
    trainingAids: string[];
  };
  
  // Safety Requirements
  safetyRequirements: string;
  
  // Session Components
  introduction: {
    duration: number; // in minutes
    activities: string[];
  };
  
  delivery: SessionDelivery[];
  
  review: {
    duration: number;
    summary: string;
  };
  
  assignment?: string;
  totalTime: number;
  sessionReflection?: string;
}

export interface SessionDelivery {
  step: number;
  duration: number;  // in minutes
  trainerActivity: string[];
  traineeActivity: string[];
  learningChecks: LearningChecks;
}