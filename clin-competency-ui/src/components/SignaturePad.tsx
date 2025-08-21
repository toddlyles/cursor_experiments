import { useEffect, useRef } from 'react'
import SignaturePadLib from 'signature_pad'
import { Box, Button } from '@mui/material'

interface SignaturePadProps {
	value?: string
	onChange?: (dataUrl?: string) => void
	height?: number
}

export default function SignaturePad({ value, onChange, height = 150 }: SignaturePadProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const padRef = useRef<SignaturePadLib | null>(null)

	useEffect(() => {
		if (!canvasRef.current) return
		const canvas = canvasRef.current
		const pad = new SignaturePadLib(canvas, { backgroundColor: 'rgba(255,255,255,0)' })
		padRef.current = pad
		const handleEnd = () => onChange?.(pad.isEmpty() ? undefined : pad.toDataURL('image/png'))
		;(pad as any).onEnd = handleEnd
		return () => {
			;(pad as any).onEnd = undefined
			padRef.current = null
		}
	}, [onChange])

	useEffect(() => {
		if (value && canvasRef.current && padRef.current) {
			const img = new Image()
			img.onload = () => {
				const ctx = canvasRef.current!.getContext('2d')!
				ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
				ctx.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height)
			}
			img.src = value
		}
	}, [value])

	return (
		<Box>
			<canvas
				ref={canvasRef}
				width={600}
				height={height}
				style={{ width: '100%', border: '1px solid #ccc', borderRadius: 8 }}
			/>
			<Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
				<Button
					variant="outlined"
					onClick={() => {
						padRef.current?.clear()
						onChange?.(undefined)
					}}
				>
					Clear
				</Button>
			</Box>
		</Box>
	)
}