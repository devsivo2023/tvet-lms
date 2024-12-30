import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface LearningOutcomesProps {
  outcomes: string[];
  onUpdate: (outcomes: string[]) => void;
}

export const LearningOutcomes: React.FC<LearningOutcomesProps> = ({ outcomes, onUpdate }) => {
  const addOutcome = () => {
    onUpdate([...outcomes, '']);
  };

  const updateOutcome = (index: number, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    onUpdate(newOutcomes);
  };

  const removeOutcome = (index: number) => {
    const newOutcomes = outcomes.filter((_, i) => i !== index);
    onUpdate(newOutcomes);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Outcomes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex gap-2">
              <span className="mt-2 text-sm text-gray-500">{index + 1}.</span>
              <input
                type="text"
                value={outcome}
                onChange={(e) => updateOutcome(index, e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg shadow-sm py-2 px-3"
                placeholder="Enter learning outcome"
              />
              <button
                onClick={() => removeOutcome(index)}
                className="p-2 text-gray-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addOutcome}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Learning Outcome
          </button>
        </div>
      </CardContent>
    </Card>
  );
};