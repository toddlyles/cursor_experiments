import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
	return (
		<Box sx={{ display: 'flex', minHeight: '100vh' }}>
			<AppBar position="static" color="primary">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Clinical Competency
					</Typography>
					<Button color="inherit" component={RouterLink} to="/templates">Templates</Button>
					<Button color="inherit" component={RouterLink} to="/completed">Completed</Button>
				</Toolbar>
			</AppBar>
			<Container sx={{ py: 3, flex: 1 }}>{children}</Container>
		</Box>
	)
}