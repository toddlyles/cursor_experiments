import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { useAppStore } from '../store/store'
import { Link as RouterLink } from 'react-router-dom'

export default function TemplatesPage() {
	const templates = useAppStore((s) => s.templates)
	return (
		<Box sx={{
			display: 'grid',
			gap: 2,
			gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
		}}>
			{templates.map((t) => (
				<Card key={t.id}>
					<CardContent>
						<Typography variant="h6">{t.title}</Typography>
						<Typography variant="body2" color="text.secondary">
							{t.description}
						</Typography>
					</CardContent>
					<CardActions>
						<Button component={RouterLink} to={`/perform/${t.id}`} variant="contained">
							Start
						</Button>
					</CardActions>
				</Card>
			))}
		</Box>
	)
}