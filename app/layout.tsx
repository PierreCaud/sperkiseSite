import Navbar from '@/components/Navbar'
import '../style/globals.css'
import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import React from 'react'

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
})

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Sperkise | Club de minéralogie et paléontologie de Wasquehal',
  description:
    'Site du club de minéralogie et de paléontologie de la Métropole Nord - Wasquehal: Sperkise.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='fr' data-scroll-behavior='smooth'>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
