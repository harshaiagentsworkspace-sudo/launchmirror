import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { AnalysisProvider } from '@/lib/context'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LaunchMirror — AI Business Validator for Indian Founders',
  description:
    'Get a brutally honest AI analysis of your business idea. Viability score, market pulse, and 90-day roadmap. Free.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="bg-[#200c1c] font-sans antialiased">
        <AnalysisProvider>{children}</AnalysisProvider>
      </body>
    </html>
  )
}
