import { describe, expect, it, vi } from 'vitest'

vi.mock('@/sanity/lib/sanityFetch', () => ({ load: vi.fn() }))

import { authorProfileQuery } from '../author-profile'

describe('author profile article dates', () => {
  it('falls back to the creation date when the publication date is missing', () => {
    expect(authorProfileQuery.query).toContain(
      '"publishedAt": coalesce(publishedAt, _createdAt)'
    )
  })

  it('preserves the existing article ordering', () => {
    expect(authorProfileQuery.query).toContain('order(publishedAt desc)')
  })
})
