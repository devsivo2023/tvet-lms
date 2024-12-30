// src/components/session-plan/types.ts
export interface LearningChecks {
    knowledge: string[];
    skills: string[];
    attitudes: string[];
  }
  
  export interface Step {
    step: number;
    duration: number;
    trainerActivity: string[];
    traineeActivity: string[];
    learningChecks: LearningChecks;
  }
  
  export interface Resources {
    references: string[];
    trainingAids: string[];
  }