import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SessionPlanFormData } from '../schema';
import { Path } from 'react-hook-form';

interface SessionPlanHeaderProps {
  values: SessionPlanFormData;
  onUpdate: (field: Path<SessionPlanFormData>, value: string) => void;
}

export const SessionPlanHeader: React.FC<SessionPlanHeaderProps> = ({ onUpdate, values }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Plan Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={values.date}
              onChange={(e) => onUpdate('date', e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="text"
              value={values.time}
              onChange={(e) => onUpdate('time', e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
              placeholder="e.g., 8:00-10:00 am"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trainer Number
            </label>
            <input
              type="text"
              value={values.trainerNumber}
              onChange={(e) => onUpdate('trainerNumber', e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
              placeholder="Enter trainer number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institution
            </label>
            <input
              type="text"
              value={values.institution}
              onChange={(e) => onUpdate('institution', e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
              placeholder="Enter institution name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level
            </label>
            <input
              type="text"
              value={values.level}
              onChange={(e) => onUpdate('level', e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
              placeholder="e.g., LEVEL 5"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Session Title
            </label>
            <input
              type="text"
              value={values.sessionTitle}
              onChange={(e) => onUpdate('sessionTitle', e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
              placeholder="Enter session title"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};