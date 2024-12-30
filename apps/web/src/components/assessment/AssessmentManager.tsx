import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Plus, Save, Eye, ChevronDown } from 'lucide-react';

type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer' | 'practical' | 'portfolio';

interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  marks: number;
  evidence?: {
    type: string;
    requirements: string;
  };
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

const AssessmentManager = () => {
  const [assessment, setAssessment] = useState<Partial<Assessment>>({
    title: '',
    description: '',
    duration: 60,
    totalMarks: 0,
    passingMarks: 0,
    questions: [],
    instructions: ''
  });

  const [currentQuestionType, setCurrentQuestionType] = useState<QuestionType>('multiple-choice');

  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice' },
    { value: 'true-false', label: 'True/False' },
    { value: 'short-answer', label: 'Short Answer' },
    { value: 'practical', label: 'Practical' },
    { value: 'portfolio', label: 'Portfolio' }
  ] as const;

  const addQuestion = () => {
    const newQuestion = {
      id: `q${assessment.questions?.length ?? 0 + 1}`,
      type: currentQuestionType,
      text: '',
      marks: 0,
      options: currentQuestionType === 'multiple-choice' ? [''] : undefined
    };

    setAssessment(prev => ({
      ...prev,
      questions: [...(prev.questions || []), newQuestion]
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Assessment</h1>
          <p className="mt-1 text-gray-600">Create and manage your assessment questions</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Assessment
          </button>
        </div>
      </div>

      <Card className="p-6 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assessment Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={assessment.title}
              onChange={e => setAssessment(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter assessment title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={assessment.duration}
              onChange={e => setAssessment(prev => ({ ...prev, duration: Number(e.target.value) }))}
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Marks
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={assessment.totalMarks}
              onChange={e => setAssessment(prev => ({ ...prev, totalMarks: Number(e.target.value) }))}
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passing Marks
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={assessment.passingMarks}
              onChange={e => setAssessment(prev => ({ ...prev, passingMarks: Number(e.target.value) }))}
              min={0}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={assessment.instructions}
              onChange={e => setAssessment(prev => ({ ...prev, instructions: e.target.value }))}
              rows={3}
              placeholder="Enter instructions for students"
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8"
              value={currentQuestionType}
              onChange={e => setCurrentQuestionType(e.target.value as QuestionType)}
            >
              {questionTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-3" />
          </div>
          <button 
            onClick={addQuestion}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {assessment.questions?.map((question, index) => (
          <Card key={question.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-900 mr-3">
                  Question {index + 1}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {questionTypes.find(t => t.value === question.type)?.label}
                </span>
              </div>
              <input
                type="number"
                className="w-20 border border-gray-300 rounded-lg px-3 py-1 text-sm"
                value={question.marks}
                onChange={e => {
                  const newQuestions = [...(assessment.questions || [])];
                  newQuestions[index].marks = Number(e.target.value);
                  setAssessment(prev => ({ ...prev, questions: newQuestions }));
                }}
                min={0}
                placeholder="Marks"
              />
            </div>

            <div className="space-y-4">
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={question.text}
                onChange={e => {
                  const newQuestions = [...(assessment.questions || [])];
                  newQuestions[index].text = e.target.value;
                  setAssessment(prev => ({ ...prev, questions: newQuestions }));
                }}
                rows={3}
                placeholder="Enter question text"
              />

              {question.type === 'multiple-choice' && (
                <div className="space-y-2">
                  {question.options?.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                        value={option}
                        onChange={e => {
                          const newQuestions = [...(assessment.questions || [])];
                          newQuestions[index].options![optionIndex] = e.target.value;
                          setAssessment(prev => ({ ...prev, questions: newQuestions }));
                        }}
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                      <button
                        onClick={() => {
                          const newQuestions = [...(assessment.questions || [])];
                          newQuestions[index].options = [
                            ...(newQuestions[index].options || []),
                            ''
                          ];
                          setAssessment(prev => ({ ...prev, questions: newQuestions }));
                        }}
                        className="p-2 text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {(question.type === 'practical' || question.type === 'portfolio') && (
                <div className="space-y-2">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={question.evidence?.requirements || ''}
                    onChange={e => {
                      const newQuestions = [...(assessment.questions || [])];
                      newQuestions[index].evidence = {
                        type: question.type,
                        requirements: e.target.value
                      };
                      setAssessment(prev => ({ ...prev, questions: newQuestions }));
                    }}
                    placeholder="Enter evidence requirements"
                  />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssessmentManager;