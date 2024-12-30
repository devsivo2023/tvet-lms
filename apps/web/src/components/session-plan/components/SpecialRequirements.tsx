import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SpecialRequirementsProps {
  value: string;
  onUpdate: (value: string) => void;
}

export const SpecialRequirements: React.FC<SpecialRequirementsProps> = ({ value, onUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Language, Literacy or Numeracy needs</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <textarea
            value={value}
            onChange={(e) => onUpdate(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3"
            placeholder="Indicate whether there is any trainee with Language, Literacy or Numeracy needs and other special needs..."
          />
          <p className="mt-1 text-sm text-gray-500">
            For example, if you are using English as a language of instruction, are there any trainees 
            with difficulties in understanding the language? Specify what measures will be taken.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
