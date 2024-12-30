import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Evidence {
  type: string;
  requirements: string;
}

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'practical' | 'portfolio';
  text: string;
  options?: string[];
  marks: number;
  evidence?: Evidence;
}

interface Assessment {
  id?: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  questions: Question[];
  instructions: string;
}

interface AssessmentPreviewProps {
  assessment: Assessment;
  previewMode?: 'student' | 'instructor';
}

const AssessmentPreview = ({ assessment, previewMode = 'student' }: AssessmentPreviewProps) => {
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, string | File>>({});
  const [timeRemaining, setTimeRemaining] = useState(assessment.duration * 60); // in seconds

  // Timer effect
  React.useEffect(() => {
    if (previewMode !== 'student') return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [previewMode]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());

  const handleAnswerChange = (questionId: string, answer: string | File) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const toggleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderQuestion = (question: Question, index: number) => {
    const isFlagged = flaggedQuestions.has(question.id);

    return (
      <Card key={question.id} className={`p-6 ${isFlagged ? 'border-yellow-400 border-2' : ''}`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-medium text-gray-900">Question {index + 1}</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {question.marks} marks
              </span>
              {previewMode === 'student' && (
                <button
                  onClick={() => toggleFlagQuestion(question.id)}
                  className={`ml-2 text-sm ${isFlagged ? 'text-yellow-500' : 'text-gray-500'}`}
                >
                  {isFlagged ? 'Flagged for review' : 'Flag for review'}
                </button>
              )}
            </div>
            <p className="text-gray-800 mb-4">{question.text}</p>
          </div>
        </div>

        {question.type === 'multiple-choice' && (
          <div className="space-y-2">
            {question.options?.map((option, optionIndex) => (
              <label key={optionIndex} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={currentAnswers[question.id] === option}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'true-false' && (
          <div className="space-y-2">
            {['True', 'False'].map((option) => (
              <label key={option} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option.toLowerCase()}
                  checked={currentAnswers[question.id] === option.toLowerCase()}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'short-answer' && (
          <textarea
            value={currentAnswers[question.id] as string || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            rows={4}
            placeholder="Enter your answer here..."
          />
        )}

        {(question.type === 'practical' || question.type === 'portfolio') && (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Evidence Requirements:</h4>
              <p className="text-gray-600">{question.evidence?.requirements}</p>
            </div>
            <div>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleAnswerChange(question.id, file);
                  }
                }}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-medium
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{assessment.title}</h1>
        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>Duration: {assessment.duration} minutes</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span>Total Marks: {assessment.totalMarks}</span>
          </div>
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span>Passing Marks: {assessment.passingMarks}</span>
          </div>
        </div>
        {assessment.instructions && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h2 className="text-sm font-medium text-blue-800 mb-2">Instructions:</h2>
            <p className="text-sm text-blue-700">{assessment.instructions}</p>
          </div>
        )}
      </div>

      {/* Timer */}
      {previewMode === 'student' && (
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 mb-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Time Remaining:</span>
            <span className="text-lg font-bold text-blue-600">{formatTime(timeRemaining)}</span>
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {assessment.questions.map((question, index) => renderQuestion(question, index))}
      </div>

      {/* Submit Button */}
      {previewMode === 'student' && (
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Submit Assessment
          </button>
        </div>
      )}
    </div>
  );
};

export default AssessmentPreview;