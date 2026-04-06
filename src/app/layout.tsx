// Pass-through root layout. Required by Next.js because `not-found.tsx` lives
// in the root segment, outside the `(website)` and `(cms)` route groups.
// The actual <html>/<body> wrapper is provided by `(website)/layout.tsx`,
// which `not-found.tsx` re-uses by importing it as a component.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
