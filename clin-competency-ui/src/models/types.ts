export type RatingValue = 'NI' | 'ME' | 'EX' | 'NO'

export interface ChecklistItemTemplate {
	id: string
	text: string
	critical?: boolean
}

export interface ChecklistTemplate {
	id: string
	title: string
	description?: string
	items: ChecklistItemTemplate[]
}

export interface ChecklistItemResult {
	itemId: string
	rating: RatingValue
	comment?: string
}

export interface Signatures {
	learnerSignatureDataUrl?: string
	preceptorSignatureDataUrl?: string
}

export interface ChecklistPerformance {
	id: string
	templateId: string
	learnerName: string
	preceptorName: string
	unit?: string
	performedAtIso: string
	items: ChecklistItemResult[]
	overallComment?: string
	signatures?: Signatures
	updatedAtIso: string
}