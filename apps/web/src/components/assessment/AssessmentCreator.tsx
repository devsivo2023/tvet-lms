import React, { useState, ChangeEvent } from 'react';
import { MultipleChoiceQuestionForm } from './components/QuestionTypeForm'; // Now correctly imported
import { 
  Card,
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  Assessment, 
  Question, 
  QuestionType 
} from './types';

export const AssessmentCreator: React.FC = () => {
  const [assessment, setAssessment] = useState<Partial<Assessment>>({
    title: '',
    description: '',
    duration: 60, // default 60 minutes
    totalMarks: 0,
    passingMarks: 0,
    questions: []
  });

  const [currentQuestionType, setCurrentQuestionType] = useState<QuestionType>('multiple-choice');

  const addQuestion = (question: Question) => {
    setAssessment(prev => ({
      ...prev,
      questions: [...(prev.questions || []), question],
      totalMarks: (prev.totalMarks || 0) + question.marks
    }));
  };

  const handleSaveAssessment = () => {
    // Validate assessment before saving
    if (!assessment.title) {
      alert('Please enter an assessment title');
      return;
    }

    if (!assessment.questions || assessment.questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    // This would typically involve an API call to save the assessment
    console.log('Saving Assessment:', assessment);
    // TODO: Implement actual API save logic
  };

  const handleInputChange = (
    field: keyof Pick<Assessment, 'title' | 'description' | 'duration' | 'passingMarks'>
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = field === 'duration' || field === 'passingMarks' 
      ? Number(e.target.value) 
      : e.target.value;

    setAssessment(prev => ({
      ...prev,
      [field]: value
    }));
  };


  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Assessment Details */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Create New Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input 
              placeholder="Assessment Title"
              value={assessment.title || ''}
              onChange={handleInputChange('title')}
            />
            <Input 
              placeholder="Description"
              value={assessment.description || ''}
              onChange={handleInputChange('description')}
            />
            <div className="flex space-x-4">
              <Input 
                type="number"
                placeholder="Duration (minutes)"
                value={assessment.duration || 60}
                onChange={handleInputChange('duration')}
              />
              <Input 
                type="number"
                placeholder="Passing Marks"
                value={assessment.passingMarks || 0}
                onChange={handleInputChange('passingMarks')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Type Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Add Question</CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={currentQuestionType}
            onValueChange={(value) => setCurrentQuestionType(value as QuestionType)}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            <option value="short-answer">Short Answer</option>
            <option value="practical">Practical</option>
          </Select>
        </CardContent>
      </Card>

      {/* Question Creation Component */}
      <div className="col-span-3">
        {currentQuestionType === 'multiple-choice' && (
          <MultipleChoiceQuestionForm onSave={addQuestion} />
        )}
        {/* TODO: Add other question type forms */}
      </div>

      {/* Assessment Summary */}
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Assessment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>Total Questions: {assessment.questions?.length || 0}</p>
            <p>Total Marks: {assessment.totalMarks || 0}</p>
            <Button 
              onClick={handleSaveAssessment}
              className="mt-4"
            >
              Save Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};