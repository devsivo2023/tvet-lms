import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlanDetailsProps {
  title: string;
  description: string;
  onUpdate: (field: string, value: string) => void;
}

export const PlanDetails: React.FC<PlanDetailsProps> = ({
  title,
  description,
  onUpdate
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => onUpdate('title', e.target.value)}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
              placeholder="Enter plan title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => onUpdate('description', e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
              placeholder="Enter plan description"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};