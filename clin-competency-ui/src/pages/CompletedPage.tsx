import { Box, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'
import { useAppStore } from '../store/store'
import { saveJsonToFile } from '../utils/storage'
import { useRef } from 'react'
import { exportElementToPdf } from '../utils/pdf'

export default function CompletedPage() {
	const performances = useAppStore((s) => s.performances)
	const refs = useRef<Record<string, HTMLDivElement | null>>({})

	return (
		<Box sx={{ display: 'grid', gap: 2 }}>
			{performances.map((p) => (
				<Card key={p.id}>
					<CardContent>
						<div ref={(el) => { refs.current[p.id] = el }}>
							<Stack spacing={0.5}>
								<Typography variant="h6">{p.templateId}</Typography>
								<Typography variant="body2">Learner: {p.learnerName}</Typography>
								<Typography variant="body2">Preceptor: {p.preceptorName}</Typography>
								<Typography variant="body2">Date: {new Date(p.performedAtIso).toLocaleString()}</Typography>
							</Stack>
						</div>
					</CardContent>
					<CardActions>
						<Button size="small" onClick={() => saveJsonToFile(p, `checklist_${p.id}.json`)}>
							Export JSON
						</Button>
						<Button
							size="small"
							onClick={async () => {
								const el = refs.current[p.id]
								if (el) await exportElementToPdf(el, `checklist_${p.id}.pdf`)
							}}
						>
							Export PDF
						</Button>
					</CardActions>
				</Card>
			))}
		</Box>
	)
}