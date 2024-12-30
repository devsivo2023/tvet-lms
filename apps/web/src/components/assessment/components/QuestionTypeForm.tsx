// src/components/assessment/components/QuestionTypeForm.tsx
import React, { useState, ChangeEvent } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MultipleChoiceQuestion, 
  QuestionType 
} from '../types';

interface MultipleChoiceQuestionFormProps {
  onSave: (question: MultipleChoiceQuestion) => void;
  //Demonstrate usage of QuestionType if needed
  questionType?: QuestionType;
}

export const MultipleChoiceQuestionForm: React.FC<MultipleChoiceQuestionFormProps> = ({ 
  onSave, 
  questionType = 'multiple-choice' 
}) => {
  const [question, setQuestion] = useState<MultipleChoiceQuestion>({
    type: 'multiple-choice',
    text: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 1
  });

  const handleQuestionTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(prev => ({
      ...prev,
      text: e.target.value
    }));
  };

  const handleOptionChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const newOptions = [...question.options];
    newOptions[index] = e.target.value;
    setQuestion(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const handleCorrectAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(prev => ({
      ...prev,
      correctAnswer: e.target.value
    }));
  };

  const handleMarksChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(prev => ({
      ...prev,
      marks: Number(e.target.value)
    }));
  };

  const handleSave = () => {
    // Comprehensive validation
    const isValid = validateQuestion();
    
    if (isValid) {
      onSave(question);
      // Optional: Reset form or provide feedback
    }
  };

  const validateQuestion = (): boolean => {
    // Detailed validation
    if (!question.text.trim()) {
      alert('Please enter a question text');
      return false;
    }

    if (question.options.some(option => !option.trim())) {
      alert('Please fill in all options');
      return false;
    }

    if (!question.correctAnswer.trim()) {
      alert('Please select a correct answer');
      return false;
    }

    if (question.marks <= 0) {
      alert('Marks must be a positive number');
      return false;
    }

    return true;
  };
  console.log('Question Type:', questionType);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Multiple Choice Question</h3>
      <div className="space-y-4">
        {/* Question Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Text
          </label>
          <Input 
            placeholder="Enter question text"
            value={question.text}
            onChange={handleQuestionTextChange}
          />
        </div>

        {/* Options */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input 
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={handleOptionChange(index)}
              />
              <input 
                type="radio"
                name="correctAnswer"
                value={option}
                checked={question.correctAnswer === option}
                onChange={handleCorrectAnswerChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Marks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marks
          </label>
          <Input 
            type="number"
            placeholder="Enter marks for this question"
            value={question.marks}
            onChange={handleMarksChange}
            min={1}
          />
        </div>

        {/* Save Button */}
        <Button 
          onClick={handleSave}
          className="w-full"
        >
          Save Multiple Choice Question
        </Button>
      </div>
    </Card>
  );
};