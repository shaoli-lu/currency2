import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'World Currency Tracker',
  description: 'Realtime World Currency relative to USD',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
