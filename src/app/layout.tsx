import RootLayout from './(website)/layout'

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RootLayout>{children}</RootLayout>
}
