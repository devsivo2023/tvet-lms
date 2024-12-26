export interface LearningPlan {
    id?: string;
    title: string;
    description: string;
    courseId: string;
    totalHours: number;
    numberOfSessions: number;
    objectives: string[];
    sessions: LearningSession[];
  }
  
  export interface LearningSession {
    id?: string;
    title: string;
    duration: number;
    description: string;
    learningOutcomes: string[];
    activities: string[];
    resources: string[];
  }
