import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LearningPlanHeaderProps {
  onUpdate: (field: string, value: string | number) => void;
  values: {
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
  };
}

export const LearningPlanHeader: React.FC<LearningPlanHeaderProps> = ({ onUpdate, values }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Plan Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name
            </label>
            <input
              type="text"
              value={values.courseName}
              onChange={(e) => onUpdate('courseName', e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
              placeholder="Enter course name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit of Competency
            </label>
            <input
              type="text"
              value={values.unitOfCompetency}
              onChange={(e) => onUpdate('unitOfCompetency', e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
              placeholder="Enter unit of competency"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Code
            </label>
            <input
              type="text"
              value={values.unitCode}
              onChange={(e) => onUpdate('unitCode', e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
              placeholder="HOS/OS/HK/CR/01/5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trainer Name
            </label>
            <input
              type="text"
              value={values.trainerName}
              onChange={(e) => onUpdate('trainerName', e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
              placeholder="Enter trainer name"
            />
          </div>
          {/* Add remaining fields */}
        </div>
      </CardContent>
    </Card>
  );
};