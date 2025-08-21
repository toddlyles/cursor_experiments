import { Box, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import type { RatingValue } from '../models/types'

interface Props {
	label: string
	value: RatingValue
	onChange: (value: RatingValue) => void
	comment?: string
	onChangeComment?: (comment: string) => void
	critical?: boolean
}

const options: { value: RatingValue; label: string }[] = [
	{ value: 'NI', label: 'Needs Improvement' },
	{ value: 'ME', label: 'Meets Expectations' },
	{ value: 'EX', label: 'Exceeds' },
	{ value: 'NO', label: 'Not Observed' },
]

export default function ChecklistItemRow({ label, value, onChange, comment, onChangeComment, critical }: Props) {
	return (
		<Stack spacing={1} sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
					{label}
				</Typography>
				{critical && (
					<Typography variant="caption" color="error" sx={{ ml: 1 }}>
						Critical
					</Typography>
				)}
			</Box>
			<RadioGroup
				row
				value={value}
				onChange={(e) => onChange((e.target as HTMLInputElement).value as RatingValue)}
			>
				{options.map((opt) => (
					<FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={opt.label} />
				))}
			</RadioGroup>
			<TextField
				label="Comment"
				value={comment ?? ''}
				fullWidth
				minRows={2}
				multiline
				onChange={(e) => onChangeComment?.(e.target.value)}
			/>
		</Stack>
	)
}