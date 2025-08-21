import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import TemplatesPage from './pages/TemplatesPage'
import PerformPage from './pages/PerformPage'
import CompletedPage from './pages/CompletedPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Navigate to="/templates" replace />} />
				<Route path="/templates" element={<TemplatesPage />} />
				<Route path="/perform/:templateId" element={<PerformPage />} />
				<Route path="/completed" element={<CompletedPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Layout>
	)
}

export default App
