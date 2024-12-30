// src/components/assessment/components/QuestionCard.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import { QuestionTypeForm } from './QuestionTypeForm';
import { Trash } from 'lucide-react';

interface QuestionCardProps {
  index: number;
  onRemove: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ index, onRemove }) => {
  const { register } = useFormContext();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Question {index + 1}</CardTitle>
        <div className="flex items-center space-x-2">
          <select
            {...register(`questions.${index}.type`)}
            className="border border-gray-300 rounded-lg shadow-sm p-2"
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="short-answer">Short Answer</option>
            <option value="practical">Practical</option>
            <option value="portfolio">Portfolio Evidence</option>
          </select>
          <button
            type="button"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <QuestionTypeForm questionIndex={index} />
      </CardContent>
    </Card>
  );
};