// src/components/assessment/components/QuestionManager.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import type { Question } from '../schema';

export const QuestionManager: React.FC = () => {
  const { watch, setValue } = useFormContext();
  const questions = watch('questions') as Question[];

  const addQuestion = () => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      type: 'multiple-choice',
      text: '',
      marks: 0,
      options: [
        { id: crypto.randomUUID(), text: '', isCorrect: false },
        { id: crypto.randomUUID(), text: '', isCorrect: false }
      ]
    };
    setValue('questions', [...questions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    setValue('questions', questions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Questions List */}
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          index={index}
          onRemove={() => removeQuestion(index)}
        />
      ))}

      {/* Add Question Button */}
      <button
        type="button"
        onClick={addQuestion}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Question
      </button>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700">Question Summary</h3>
        <div className="mt-2 text-sm text-gray-600">
          <p>Total Questions: {questions.length}</p>
          <p>Total Marks: {questions.reduce((sum, q) => sum + (q.marks || 0), 0)}</p>
        </div>
      </div>
    </div>
  );
};