import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gilbert Garcia - Blog',
  description: 'Personal blog by Gilbert Garcia - Thoughts on technology, programming, and life',
  authors: [{ name: 'Gilbert Garcia' }],
  openGraph: {
    title: 'Gilbert Garcia - Blog',
    description: 'Personal blog by Gilbert Garcia',
    url: 'https://gilbergarcia.com',
    siteName: 'Gilbert Garcia Blog',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}