import { Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
	const navigate = useNavigate()
	return (
		<Stack spacing={2}>
			<Typography variant="h6">Page not found</Typography>
			<Button variant="contained" onClick={() => navigate('/templates')}>Go to Templates</Button>
		</Stack>
	)
}