import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AvukatAjanda - Modern Hukuk Yönetim Sistemi',
  description: 'Hukuk büroları için SaaS çözümü',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
