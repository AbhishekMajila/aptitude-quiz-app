import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aptitude-quiz App',
  description: 'Created with next.js15,React18 ,TypeScript',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
