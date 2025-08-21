import { z } from 'zod'

export const ratingValueSchema = z.enum(['NI', 'ME', 'EX', 'NO'])

export const checklistItemTemplateSchema = z.object({
	id: z.string(),
	text: z.string(),
	critical: z.boolean().optional(),
})

export const checklistTemplateSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().optional(),
	items: z.array(checklistItemTemplateSchema),
})

export const checklistItemResultSchema = z.object({
	itemId: z.string(),
	rating: ratingValueSchema,
	comment: z.string().optional(),
})

export const signaturesSchema = z.object({
	learnerSignatureDataUrl: z.string().url().optional(),
	preceptorSignatureDataUrl: z.string().url().optional(),
})

export const checklistPerformanceSchema = z.object({
	id: z.string(),
	templateId: z.string(),
	learnerName: z.string(),
	preceptorName: z.string(),
	unit: z.string().optional(),
	performedAtIso: z.string(),
	items: z.array(checklistItemResultSchema),
	overallComment: z.string().optional(),
	signatures: signaturesSchema.optional(),
	updatedAtIso: z.string(),
})

export type ChecklistTemplateInput = z.infer<typeof checklistTemplateSchema>
export type ChecklistPerformanceInput = z.infer<typeof checklistPerformanceSchema>