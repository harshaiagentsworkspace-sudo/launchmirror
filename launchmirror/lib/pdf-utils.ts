import type { FormData, MirrorOutput, RoadmapOutput } from '@/types'

export async function generateAndDownloadPDF(
  formData: FormData,
  mirrorOutput: MirrorOutput,
  roadmapOutput: RoadmapOutput
): Promise<void> {
  const { pdf } = await import('@react-pdf/renderer')
  const { default: PDFReport } = await import('@/components/PDFReport')
  const React = (await import('react')).default

  // Cast to any to avoid the strict DocumentProps type mismatch
  // react-pdf's pdf() accepts React elements but its types are strict
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = React.createElement(PDFReport as any, { formData, mirrorOutput, roadmapOutput })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blob = await pdf(element as any).toBlob()
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `LaunchMirror-${formData.businessName.replace(/\s+/g, '-')}-Report.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
