import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../providers/auth-provider'
import { SocketProvider } from '../providers/socket-provider'
import { Toaster } from '../components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SkillSwap - Exchange Skills, Build Connections',
  description: 'A frictionless platform for exchanging skills and building meaningful connections through knowledge sharing.',
  keywords: ['skill exchange', 'learning', 'networking', 'professional development'],
  authors: [{ name: 'SkillSwap Team' }],
  creator: 'SkillSwap Platform',
  publisher: 'SkillSwap',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://skillswap.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SkillSwap - Exchange Skills, Build Connections',
    description: 'A frictionless platform for exchanging skills and building meaningful connections through knowledge sharing.',
    url: 'https://skillswap.com',
    siteName: 'SkillSwap',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillSwap - Exchange Skills, Build Connections',
    description: 'A frictionless platform for exchanging skills and building meaningful connections through knowledge sharing.',
    creator: '@skillswap',
  },
  verification: {
    google: 'google-site-verification-token',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <AuthProvider>
          <SocketProvider>
            <main className="min-h-full">
              {children}
            </main>
            <Toaster />
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
