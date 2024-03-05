import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CMS Apptiva Website',
  description: 'Sanity CMS für die Apptiva Website',
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
