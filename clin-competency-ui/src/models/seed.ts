import type { ChecklistTemplate } from './types'

export const seedTemplates: ChecklistTemplate[] = [
	{
		id: 'iv-insertion',
		title: 'Peripheral IV Insertion',
		description: 'Assessment of competency for peripheral intravenous catheter insertion',
		items: [
			{ id: 'hand-hygiene', text: 'Performs hand hygiene per policy', critical: true },
			{ id: 'identify-patient', text: 'Identifies patient using two identifiers', critical: true },
			{ id: 'site-selection', text: 'Selects appropriate vein and site' },
			{ id: 'aseptic-technique', text: 'Maintains aseptic technique during insertion', critical: true },
			{ id: 'catheter-stabilization', text: 'Stabilizes catheter and secures dressing' },
			{ id: 'labeling', text: 'Labels site with date/time and initials' },
			{ id: 'documentation', text: 'Documents procedure and patient response' },
		],
	},
	{
		id: 'med-admin',
		title: 'Medication Administration (General)',
		description: 'Competency checklist for safe medication administration',
		items: [
			{ id: 'rights', text: 'Adheres to 6 rights of medication administration', critical: true },
			{ id: 'allergies', text: 'Verifies allergies and contraindications', critical: true },
			{ id: 'dose-calc', text: 'Performs dose calculation accurately' },
			{ id: 'patient-education', text: 'Provides patient education and obtains consent as needed' },
			{ id: 'monitoring', text: 'Monitors for therapeutic and adverse effects' },
			{ id: 'documentation', text: 'Documents administration and patient response' },
		],
	},
]