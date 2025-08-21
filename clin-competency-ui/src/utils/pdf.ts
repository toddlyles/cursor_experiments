import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export async function exportElementToPdf(element: HTMLElement, filename: string) {
	const canvas = await html2canvas(element, { useCORS: true } as any)
	const imgData = canvas.toDataURL('image/png')
	const pdf = new jsPDF('p', 'pt', 'a4')

	const pageWidth = pdf.internal.pageSize.getWidth()
	const pageHeight = pdf.internal.pageSize.getHeight()
	const imgWidth = pageWidth
	const imgHeight = (canvas.height * imgWidth) / canvas.width

	let heightLeft = imgHeight
	let position = 0

	pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
	heightLeft -= pageHeight

	while (heightLeft > 0) {
		position = heightLeft - imgHeight
		pdf.addPage()
		pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
		heightLeft -= pageHeight
	}

	pdf.save(filename)
}