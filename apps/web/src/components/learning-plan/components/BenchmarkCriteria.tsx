import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface BenchmarkCriteriaProps {
  criteria: {
    element: string;
    performanceCriteria: string[];
  }[];
  onUpdate: (criteria: { element: string; performanceCriteria: string[] }[]) => void;
}

export const BenchmarkCriteria: React.FC<BenchmarkCriteriaProps> = ({ criteria, onUpdate }) => {
  const addCriterion = () => {
    onUpdate([...criteria, { element: '', performanceCriteria: [''] }]);
  };

  const updateElement = (index: number, value: string) => {
    const newCriteria = [...criteria];
    newCriteria[index].element = value;
    onUpdate(newCriteria);
  };

  const addPerformanceCriterion = (criterionIndex: number) => {
    const newCriteria = [...criteria];
    newCriteria[criterionIndex].performanceCriteria.push('');
    onUpdate(newCriteria);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Benchmark Criteria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {criteria.map((criterion, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Element
                </label>
                <input
                  type="text"
                  value={criterion.element}
                  onChange={(e) => updateElement(index, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
                  placeholder="Enter element"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Performance Criteria
                </label>
                {criterion.performanceCriteria.map((pc, pcIndex) => (
                  <div key={pcIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={pc}
                      onChange={(e) => {
                        const newCriteria = [...criteria];
                        newCriteria[index].performanceCriteria[pcIndex] = e.target.value;
                        onUpdate(newCriteria);
                      }}
                      className="flex-1 border border-gray-300 rounded-lg shadow-sm py-2 px-3"
                      placeholder="Enter performance criterion"
                    />
                    <button
                      onClick={() => {
                        const newCriteria = [...criteria];
                        newCriteria[index].performanceCriteria = newCriteria[index].performanceCriteria.filter(
                          (_, i) => i !== pcIndex
                        );
                        onUpdate(newCriteria);
                      }}
                      className="p-2 text-gray-500 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addPerformanceCriterion(index)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Performance Criterion
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addCriterion}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Benchmark Criterion
          </button>
        </div>
      </CardContent>
    </Card>
  );
};