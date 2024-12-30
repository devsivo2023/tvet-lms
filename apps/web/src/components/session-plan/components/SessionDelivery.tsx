import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Clock } from 'lucide-react';
import { Step } from '../schema';

interface SessionDeliveryProps {
  steps: Step[];
  onUpdate: (steps: Step[]) => void;
}

export const SessionDelivery: React.FC<SessionDeliveryProps> = ({ steps, onUpdate }) => {
  const addStep = () => {
    const newStep: Step = {
      step: steps.length + 1,
      duration: 0,
      trainerActivity: [''],
      traineeActivity: [''],
      learningChecks: {
        knowledge: [''],
        skills: [''],
        attitudes: ['']
      }
    };
    onUpdate([...steps, newStep]);
  };

  const updateStep = (index: number, field: keyof Step, value: Step[keyof Step]) => {
    const newSteps = [...steps];
    newSteps[index] = {
      ...newSteps[index],
      [field]: value
    };
    onUpdate(newSteps);
  };

  const addActivity = (stepIndex: number, type: 'trainerActivity' | 'traineeActivity') => {
    const newSteps = [...steps];
    newSteps[stepIndex][type].push('');
    onUpdate(newSteps);
  };

  const updateActivity = (
    stepIndex: number, 
    activityIndex: number, 
    type: 'trainerActivity' | 'traineeActivity', 
    value: string
  ) => {
    const newSteps = [...steps];
    newSteps[stepIndex][type][activityIndex] = value;
    onUpdate(newSteps);
  };

  const removeActivity = (
    stepIndex: number, 
    activityIndex: number, 
    type: 'trainerActivity' | 'traineeActivity'
  ) => {
    const newSteps = [...steps];
    newSteps[stepIndex][type] = newSteps[stepIndex][type].filter((_, i) => i !== activityIndex);
    onUpdate(newSteps);
  };

  const updateLearningCheck = (
    stepIndex: number,
    checkType: keyof Step['learningChecks'],
    value: string
  ) => {
    const newSteps = [...steps];
    newSteps[stepIndex].learningChecks[checkType] = value.split(',').map(s => s.trim());
    onUpdate(newSteps);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Delivery</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Step {step.step}</h3>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <input
                    type="number"
                    value={step.duration}
                    onChange={(e) => 
                      updateStep(index, 'duration', parseInt(e.target.value) || 0)
                    }
                    className="w-20 border border-gray-300 rounded-lg shadow-sm py-1 px-2"
                    placeholder="Minutes"
                  />
                  <span className="text-sm text-gray-500">minutes</span>
                </div>
              </div>

              {/* Trainer Activities */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Trainer Activities</h4>
                <div className="space-y-2">
                  {step.trainerActivity.map((activity, actIndex) => (
                    <div key={actIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={activity}
                        onChange={(e) => 
                          updateActivity(index, actIndex, 'trainerActivity', e.target.value)
                        }
                        className="flex-1 border border-gray-300 rounded-lg shadow-sm py-2 px-3"
                        placeholder="Enter trainer activity"
                      />
                      {actIndex === step.trainerActivity.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => addActivity(index, 'trainerActivity')}
                          className="p-2 text-blue-600 hover:text-blue-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeActivity(index, actIndex, 'trainerActivity')}
                          className="p-2 text-gray-500 hover:text-red-500"
                        >
                          <Plus className="w-4 h-4 rotate-45" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trainee Activities */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Trainee Activities</h4>
                <div className="space-y-2">
                  {step.traineeActivity.map((activity, actIndex) => (
                    <div key={actIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={activity}
                        onChange={(e) => 
                          updateActivity(index, actIndex, 'traineeActivity', e.target.value)
                        }
                        className="flex-1 border border-gray-300 rounded-lg shadow-sm py-2 px-3"
                        placeholder="Enter trainee activity"
                      />
                      {actIndex === step.traineeActivity.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => addActivity(index, 'traineeActivity')}
                          className="p-2 text-blue-600 hover:text-blue-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeActivity(index, actIndex, 'traineeActivity')}
                          className="p-2 text-gray-500 hover:text-red-500"
                        >
                          <Plus className="w-4 h-4 rotate-45" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Checks */}
              <div>
                <h4 className="font-medium mb-2">Learning Checks</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-sm font-medium mb-1">Knowledge</h5>
                    <input
                      type="text"
                      value={step.learningChecks.knowledge.join(', ')}
                      onChange={(e) => updateLearningCheck(index, 'knowledge', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
                      placeholder="Enter knowledge checks"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-1">Skills</h5>
                    <input
                      type="text"
                      value={step.learningChecks.skills.join(', ')}
                      onChange={(e) => updateLearningCheck(index, 'skills', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
                      placeholder="Enter skills checks"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-1">Attitudes</h5>
                    <input
                      type="text"
                      value={step.learningChecks.attitudes.join(', ')}
                      onChange={(e) => updateLearningCheck(index, 'attitudes', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
                      placeholder="Enter attitude checks"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addStep}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Step
          </button>
        </div>
      </CardContent>
    </Card>
  );
};