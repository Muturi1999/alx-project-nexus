import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import Toast from '@/components/ui/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ProDev Books - Personal Development & Financial Growth',
  description: 'Discover life-changing books on personal growth, financial literacy, emotional intelligence, and spiritual development. Your journey to success starts here.',
  keywords: 'books, personal development, financial literacy, emotional intelligence, spiritual growth, investment, self-help',
  authors: [{ name: 'ProDev Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            {children}
            <Toast />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}