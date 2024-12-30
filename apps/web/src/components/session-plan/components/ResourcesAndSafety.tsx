import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { Resources } from '../types';

interface ResourcesAndSafetyProps {
  resources: Resources;
  safetyRequirements: string;
  onUpdate: <K extends 'resources' | 'safetyRequirements'>(
    field: K,
    value: K extends 'resources' ? Resources : string
  ) => void;
}

export const ResourcesAndSafety: React.FC<ResourcesAndSafetyProps> = ({
  resources,
  safetyRequirements,
  onUpdate,
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">References (Use APA ref format, 7th Edition)</h4>
              <div className="space-y-2">
                {resources.references.map((ref, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={ref}
                      onChange={(e) => {
                        const newRefs = [...resources.references];
                        newRefs[index] = e.target.value;
                        onUpdate('resources', { ...resources, references: newRefs });
                      }}
                      className="flex-1 border border-gray-300 rounded-lg shadow-sm py-2 px-3"
                      placeholder="Enter reference"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newRefs = resources.references.filter((_, i) => i !== index);
                        onUpdate('resources', { ...resources, references: newRefs });
                      }}
                      className="p-2 text-gray-500 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newRefs = [...resources.references, ''];
                    onUpdate('resources', { ...resources, references: newRefs });
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Reference
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Training Aids</h4>
              <div className="space-y-2">
                {resources.trainingAids.map((aid, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={aid}
                      onChange={(e) => {
                        const newAids = [...resources.trainingAids];
                        newAids[index] = e.target.value;
                        onUpdate('resources', { ...resources, trainingAids: newAids });
                      }}
                      className="flex-1 border border-gray-300 rounded-lg shadow-sm py-2 px-3"
                      placeholder="Enter training aid"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newAids = resources.trainingAids.filter((_, i) => i !== index);
                        onUpdate('resources', { ...resources, trainingAids: newAids });
                      }}
                      className="p-2 text-gray-500 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newAids = [...resources.trainingAids, ''];
                    onUpdate('resources', { ...resources, trainingAids: newAids });
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Training Aid
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Safety Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={safetyRequirements}
            onChange={(e) => onUpdate('safetyRequirements', e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
            placeholder="Enter safety requirements and SOPs for workplace..."
          />
        </CardContent>
      </Card>
    </div>
  );
};