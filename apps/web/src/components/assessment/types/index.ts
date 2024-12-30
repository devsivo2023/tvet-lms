// src/components/assessment/types/index.ts
export type QuestionType = 
  | 'multiple-choice' 
  | 'true-false' 
  | 'short-answer' 
  | 'practical' 
  | 'portfolio';

export type AnswerValue = string | File | boolean;

export type Answers = Record<string, AnswerValue>;

export interface BaseQuestion {
  id?: string;
  type: QuestionType;
  text: string;
  marks: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short-answer';
  modelAnswer?: string;
}

export interface PracticalQuestion extends BaseQuestion {
  type: 'practical';
  requirements: string;
  evidenceType: 'file' | 'description';
}

export type Question = 
  | MultipleChoiceQuestion 
  | TrueFalseQuestion 
  | ShortAnswerQuestion 
  | PracticalQuestion;

export interface Assessment {
  id?: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  questions: Question[];
  instructions?: string;
}

export interface AssessmentPreviewProps {
  assessment?: Assessment;
  onSubmit?: (answers: Answers) => void;
  onSave?: (answers: Answers) => void;
}