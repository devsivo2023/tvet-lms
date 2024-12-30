// src/components/session-plan/schema.ts
import { z } from 'zod'

export const learningChecksSchema = z.object({
  knowledge: z.array(z.string()),
  skills: z.array(z.string()),
  attitudes: z.array(z.string())
})

export const stepSchema = z.object({
  step: z.number(),
  duration: z.number(),
  trainerActivity: z.array(z.string()),
  traineeActivity: z.array(z.string()),
  learningChecks: learningChecksSchema
})

export const resourcesSchema = z.object({
  references: z.array(z.string()),
  trainingAids: z.array(z.string())
})

export const sessionPlanSchema = z.object({
  ref: z.string(),
  date: z.string(),
  time: z.string(),
  trainerName: z.string(),
  trainerNumber: z.string(),
  institution: z.string(),
  level: z.string(),
  unitCode: z.string(),
  unitOfCompetency: z.string(),
  sessionTitle: z.string(),
  languageLiteracyNumeracyNeeds: z.string(),
  learningOutcomes: z.array(z.string()),
  resources: resourcesSchema,
  safetyRequirements: z.string(),
  steps: z.array(stepSchema),
  totalTime: z.number(),
  sessionReflection: z.string()
})

export type LearningChecks = z.infer<typeof learningChecksSchema>
export type Step = z.infer<typeof stepSchema>
export type Resources = z.infer<typeof resourcesSchema>
export type SessionPlanFormData = z.infer<typeof sessionPlanSchema>