import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: { main: '#00695c' },
		secondary: { main: '#00838f' },
		background: { default: '#fafafa' },
	},
	typography: {
		fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
	},
})

export default theme