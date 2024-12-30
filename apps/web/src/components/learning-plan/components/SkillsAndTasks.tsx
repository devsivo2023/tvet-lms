import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SkillsAndTasksProps {
  skillOrJobTask: string;
  onUpdate: (value: string) => void;
}

export const SkillsAndTasks: React.FC<SkillsAndTasksProps> = ({ skillOrJobTask, onUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill or Job Task</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={skillOrJobTask}
            onChange={(e) => onUpdate(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
            placeholder="Describe the skill or job task..."
          />
          <p className="mt-1 text-sm text-gray-500">
            Obtain the Skill or Job task from the UNIT OF DESCRIPTION in the OS.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};