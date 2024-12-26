import React from 'react';
import { Save } from 'lucide-react';
import { PlanDetails } from './components/PlanDetails';
import { LearningObjectives } from './components/LearningObjectives';
import { SessionManager } from './components/SessionManager';
import { PlanSidebar } from './components/PlanSidebar';
import { useLearningPlan } from './hooks/useLearningPlan';

export const LearningPlanManager: React.FC = () => {
  const {
    plan,
    updatePlanField,
    addObjective,
    updateObjective,
    addSession
  } = useLearningPlan();

  const handleSave = async () => {
    // Implement save functionality
    console.log('Saving plan:', plan);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Plan</h1>
          <p className="mt-1 text-gray-600">
            Create and manage your course learning plans
          </p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Plan
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <PlanDetails
            title={plan.title}
            description={plan.description}
            onUpdate={updatePlanField}
          />
          <LearningObjectives
            objectives={plan.objectives}
            onAdd={addObjective}
            onUpdate={updateObjective}
          />
          <SessionManager
            sessions={plan.sessions}
            onAddSession={addSession}
          />
        </div>
        <PlanSidebar
          totalHours={plan.totalHours}
          numberOfSessions={plan.numberOfSessions}
          onUpdate={updatePlanField}
        />
      </div>
    </div>
  );
};