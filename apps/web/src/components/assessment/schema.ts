// src/components/assessment/schema.ts
import { z } from 'zod';

export const questionOptionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, 'Option text is required'),
  isCorrect: z.boolean().default(false)
});

export const questionSchema = z.object({
  id: z.string(),
  type: z.enum(['multiple-choice', 'true-false', 'short-answer', 'practical', 'portfolio']),
  text: z.string().min(1, 'Question text is required'),
  marks: z.number().min(0, 'Marks must be 0 or greater'),
  options: z.array(questionOptionSchema).optional(),
  correctAnswer: z.string().optional(),
  rubric: z.string().optional(),
});

export const assessmentSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Assessment title is required'),
  type: z.enum(['formative', 'summative']),
  description: z.string(),
  courseId: z.string(),
  unitId: z.string(),
  totalMarks: z.number().min(0, 'Total marks must be 0 or greater'),
  passingMarks: z.number().min(0, 'Passing marks must be 0 or greater'),
  duration: z.number().min(0, 'Duration must be 0 or greater'), // in minutes
  dueDate: z.string(),
  instructions: z.string(),
  questions: z.array(questionSchema),
  status: z.enum(['draft', 'published', 'archived']).default('draft')
});

export type QuestionOption = z.infer<typeof questionOptionSchema>;
export type Question = z.infer<typeof questionSchema>;
export type Assessment = z.infer<typeof assessmentSchema>;