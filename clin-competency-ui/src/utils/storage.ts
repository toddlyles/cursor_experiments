export const saveJsonToFile = (data: unknown, filename: string) => {
	const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
	const link = document.createElement('a')
	link.href = URL.createObjectURL(blob)
	link.download = filename
	document.body.appendChild(link)
	link.click()
	link.remove()
}

export const generateId = (prefix: string = 'id'): string => {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}