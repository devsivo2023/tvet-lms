import { useState } from 'react';
import { LearningPlan, LearningSession } from '../types';

export const useLearningPlan = () => {
  const [plan, setPlan] = useState<LearningPlan>({
    title: '',
    description: '',
    courseId: '',
    totalHours: 0,
    numberOfSessions: 0,
    objectives: [''],
    sessions: []
  });

  const updatePlanField = (field: keyof LearningPlan, value: any) => {
    setPlan(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addObjective = () => {
    setPlan(prev => ({
      ...prev,
      objectives: [...prev.objectives, '']
    }));
  };

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...plan.objectives];
    newObjectives[index] = value;
    setPlan(prev => ({
      ...prev,
      objectives: newObjectives
    }));
  };

  const addSession = (session: LearningSession) => {
    setPlan(prev => ({
      ...prev,
      sessions: [...prev.sessions, session]
    }));
  };

  return {
    plan,
    updatePlanField,
    addObjective,
    updateObjective,
    addSession
  };
};
