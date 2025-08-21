import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedTemplates } from '../models/seed'
import type { ChecklistTemplate, ChecklistPerformance, RatingValue } from '../models/types'

interface StoreState {
	templates: ChecklistTemplate[]
	performances: ChecklistPerformance[]
	addPerformance: (performance: ChecklistPerformance) => void
	updateItemRating: (
		performanceId: string,
		itemId: string,
		rating: RatingValue,
		comment?: string,
	) => void
	upsertPerformance: (performance: ChecklistPerformance) => void
}

export const useAppStore = create<StoreState>()(
	persist(
		(set, get) => ({
			templates: seedTemplates,
			performances: [],
			addPerformance: (performance) =>
				set((state) => ({ performances: [performance, ...state.performances] })),
			updateItemRating: (performanceId, itemId, rating, comment) => {
				const { performances } = get()
				const updated = performances.map((p) =>
					p.id === performanceId
						? {
							...p,
							items: p.items.map((it) =>
								it.itemId === itemId ? { ...it, rating, comment } : it,
							),
							updatedAtIso: new Date().toISOString(),
						}
						: p,
				)
				set({ performances: updated })
			},
			upsertPerformance: (performance) => {
				const { performances } = get()
				const exists = performances.some((p) => p.id === performance.id)
				if (exists) {
					set({
						performances: performances.map((p) =>
							p.id === performance.id ? performance : p,
						),
					})
				} else {
					set({ performances: [performance, ...performances] })
				}
			},
		}),
		{ name: 'clin-competency-store' },
	),
)