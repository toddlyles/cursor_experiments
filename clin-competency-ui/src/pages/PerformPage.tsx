import { useMemo, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/store'
import type { ChecklistPerformance, RatingValue } from '../models/types'
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import ChecklistItemRow from '../components/ChecklistItemRow'
import SignaturePad from '../components/SignaturePad'
import { generateId } from '../utils/storage'
import { exportElementToPdf } from '../utils/pdf'

export default function PerformPage() {
	const { templateId } = useParams()
	const navigate = useNavigate()
	const { templates, upsertPerformance } = useAppStore()
	const template = useMemo(() => templates.find((t) => t.id === templateId), [templates, templateId])
	const [learnerName, setLearnerName] = useState('')
	const [preceptorName, setPreceptorName] = useState('')
	const [unit, setUnit] = useState('')
	const [overallComment, setOverallComment] = useState('')
	const [ratings, setRatings] = useState<Record<string, { rating: RatingValue; comment?: string }>>({})
	const [learnerSig, setLearnerSig] = useState<string | undefined>()
	const [preceptorSig, setPreceptorSig] = useState<string | undefined>()
	const printableRef = useRef<HTMLDivElement | null>(null)

	if (!template) {
		return (
			<Stack spacing={2}>
				<Typography variant="h6">Template not found.</Typography>
				<Button variant="contained" onClick={() => navigate('/templates')}>Back to Templates</Button>
			</Stack>
		)
	}

	const handleSave = () => {
		const performance: ChecklistPerformance = {
			id: generateId('perf'),
			templateId: template.id,
			learnerName,
			preceptorName,
			unit,
			performedAtIso: new Date().toISOString(),
			items: template.items.map((it) => ({
				itemId: it.id,
				rating: ratings[it.id]?.rating ?? 'NO',
				comment: ratings[it.id]?.comment,
			})),
			overallComment,
			signatures: {
				learnerSignatureDataUrl: learnerSig,
				preceptorSignatureDataUrl: preceptorSig,
			},
			updatedAtIso: new Date().toISOString(),
		}
		upsertPerformance(performance)
		navigate('/completed')
	}

	return (
		<Stack spacing={3}>
			<Box ref={printableRef}>
				<Stack spacing={2}>
					<Typography variant="h5">{template.title}</Typography>
					<Typography variant="body2" color="text.secondary">{template.description}</Typography>
					<Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
						<TextField label="Learner Name" value={learnerName} onChange={(e) => setLearnerName(e.target.value)} fullWidth />
						<TextField label="Preceptor Name" value={preceptorName} onChange={(e) => setPreceptorName(e.target.value)} fullWidth />
					</Stack>
					<Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
						<TextField label="Unit/Department" value={unit} onChange={(e) => setUnit(e.target.value)} fullWidth />
						<TextField label="Date/Time" value={new Date().toLocaleString()} fullWidth disabled />
					</Stack>
					<Divider />
					<Stack spacing={2}>
						{template.items.map((item) => (
							<ChecklistItemRow
								key={item.id}
								label={item.text}
								critical={item.critical}
								value={ratings[item.id]?.rating ?? 'NO'}
								onChange={(val) => setRatings((prev) => ({ ...prev, [item.id]: { rating: val, comment: prev[item.id]?.comment } }))}
								comment={ratings[item.id]?.comment}
								onChangeComment={(c) => setRatings((prev) => ({ ...prev, [item.id]: { rating: prev[item.id]?.rating ?? 'NO', comment: c } }))}
							/>
						))}
					</Stack>
					<TextField
						label="Overall Comment"
						value={overallComment}
						onChange={(e) => setOverallComment(e.target.value)}
						fullWidth
						minRows={3}
						multiline
					/>
					<Divider />
					<Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
						<Box sx={{ flex: 1 }}>
							<Typography variant="subtitle1" sx={{ mb: 1 }}>Learner Signature</Typography>
							<SignaturePad value={learnerSig} onChange={setLearnerSig} />
						</Box>
						<Box sx={{ flex: 1 }}>
							<Typography variant="subtitle1" sx={{ mb: 1 }}>Preceptor Signature</Typography>
							<SignaturePad value={preceptorSig} onChange={setPreceptorSig} />
						</Box>
					</Stack>
				</Stack>
			</Box>
			<Stack direction="row" spacing={2}>
				<Button variant="contained" onClick={handleSave}>Save</Button>
				<Button
					variant="outlined"
					onClick={async () => {
						if (printableRef.current) await exportElementToPdf(printableRef.current, `${template.id}_preview.pdf`)
					}}
				>
					Export PDF Preview
				</Button>
				<Button variant="text" onClick={() => navigate('/templates')}>Cancel</Button>
			</Stack>
		</Stack>
	)
}