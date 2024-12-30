import React from 'react';
import { useForm, FormProvider, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, Printer } from 'lucide-react';
import { SessionPlanHeader } from './components/SessionPlanHeader';
import { SpecialRequirements } from './components/SpecialRequirements';
import { LearningOutcomes } from './components/LearningOutcomes';
import { ResourcesAndSafety } from './components/ResourcesAndSafety';
import { SessionDelivery } from './components/SessionDelivery';
import { sessionPlanSchema, type SessionPlanFormData } from './schema';

const defaultValues: SessionPlanFormData = {
  /** @see KTTC - Kenya Technical Training College */
  ref: 'KTTC/LP/F06',
  date: '',
  time: '',
  trainerName: '',
  trainerNumber: '',
  institution: '',
  level: '',
  unitCode: '',
  unitOfCompetency: '',
  sessionTitle: '',
  languageLiteracyNumeracyNeeds: '',
  learningOutcomes: [''],
  resources: {
    references: [''],
    trainingAids: ['']
  },
  safetyRequirements: '',
  steps: [{
    step: 1,
    duration: 0,
    trainerActivity: [''],
    traineeActivity: [''],
    learningChecks: {
      knowledge: [''],
      skills: [''],
      attitudes: ['']
    }
  }],
  totalTime: 0,
  sessionReflection: ''
};

export const SessionPlanManager: React.FC = () => {
  const methods = useForm<SessionPlanFormData>({
    resolver: zodResolver(sessionPlanSchema),
    defaultValues
  });

  const { handleSubmit, formState: { errors, isDirty } } = methods;

  const onSubmit = async (data: SessionPlanFormData) => {
    try {
      // TODO: Implement save functionality
      console.log('Form data:', data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error saving session plan:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50 p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Session Plan</h1>
              <p className="mt-1 text-gray-600">Create and manage your session plan</p>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                disabled={!isDirty}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Plan
              </button>
              <button
                type="button"
                className="bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-300 flex items-center hover:bg-gray-50"
                onClick={() => {
                  // TODO: Implement print functionality
                }}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <SessionPlanHeader 
              values={methods.getValues()}
              onUpdate={(field: Path<SessionPlanFormData>, value: string) => 
                methods.setValue(field, value, { shouldValidate: true })
              }
            />

            <SpecialRequirements
              value={methods.getValues('languageLiteracyNumeracyNeeds')}
              onUpdate={(value) => methods.setValue('languageLiteracyNumeracyNeeds', value)}
            />

            <LearningOutcomes
              outcomes={methods.getValues('learningOutcomes')}
              onUpdate={(outcomes) => methods.setValue('learningOutcomes', outcomes)}
            />

            <ResourcesAndSafety
              resources={methods.getValues('resources')}
              safetyRequirements={methods.getValues('safetyRequirements')}
              onUpdate={(field: 'resources' | 'safetyRequirements', value) => 
                methods.setValue(field, value)
              }
            />

            <SessionDelivery
              steps={methods.getValues('steps')}
              onUpdate={(steps) => {
                methods.setValue('steps', steps);
                // Calculate total time
                const totalTime = steps.reduce((acc, step) => acc + step.duration, 0);
                methods.setValue('totalTime', totalTime);
              }}
            />

            {/* Session Reflection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Session Reflection</h3>
              <textarea
                {...methods.register('sessionReflection')}
                rows={4}
                className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
                placeholder="Enter session reflection..."
              />
            </div>

            {/* Error Summary */}
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-red-800 font-medium mb-2">Please correct the following errors:</h3>
                <ul className="list-disc list-inside text-sm text-red-700">
                  {Object.entries(errors).map(([key, error]) => (
                    <li key={key}>{error.message}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};