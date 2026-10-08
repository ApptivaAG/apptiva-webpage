import { type NextRequest, NextResponse } from 'next/server'

/**
 * Permanently redirects legacy project category URLs to their path-based routes.
 * For example, /projekte/example?category=dev becomes /projekte/development/example.
 * Existing category listing paths stay unchanged. Only the category query parameter
 * is removed; other parameters, such as utm_source, are preserved.
 *
 * This uses Proxy because Next.js redirects configured in redirects.ts automatically
 * forward incoming query parameters and cannot remove category from the destination.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  const category = url.searchParams.get('category')
  if (category !== 'dev' && category !== 'chatbots') return NextResponse.next()

  const path = category === 'dev' ? 'development' : 'chatbots'
  const slug = url.pathname.slice('/projekte'.length)
  url.pathname =
    slug === '/chatbots' || slug === '/development'
      ? url.pathname
      : `/projekte/${path}${slug}`
  url.searchParams.delete('category')
  return NextResponse.redirect(url, 308)
}

export const config = {
  // Only legacy listings and single-segment project URLs with a known category match.
  matcher: [
    {
      source: '/projekte/:slug?',
      has: [{ type: 'query', key: 'category', value: 'dev|chatbots' }],
    },
  ],
}
