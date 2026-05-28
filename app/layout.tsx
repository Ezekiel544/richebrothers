import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const lato = Lato({ 
  subsets: ["latin"],
  variable: '--font-lato',
  weight: ['300', '400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Richie Brothers Tours Jamaica | Premium Tours & Airport Transfers',
  description: 'Luxury airport transfers, private tours, and fishing experiences in Jamaica. Premium service trusted by UK travellers and returning Jamaicans. Book securely with 20% deposit.',
  keywords: ['Jamaica tours', 'airport transfers', 'private tours', 'fishing charters', 'Jamaican adventures'],
  authors: [{ name: 'Richie Brothers Tours Jamaica' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://richiebrotherstours.com',
    title: 'Richie Brothers Tours Jamaica',
    description: 'Premium airport transfers and private tours in Jamaica',
    siteName: 'Richie Brothers Tours Jamaica',
  },
  icons: {
    icon: [
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a3d2e' },
  ],
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
