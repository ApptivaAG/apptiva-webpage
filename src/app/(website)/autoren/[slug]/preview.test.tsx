import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { authorProfileQuery } from '@/domain/author-profile'
import AuthorPreview from './preview'

const { useQuery } = vi.hoisted(() => ({ useQuery: vi.fn() }))
vi.mock('@sanity/react-loader', () => ({ useQuery }))
vi.mock('@/components/author-profile', () => ({
  default: ({ person }: { person: { personName: string } }) => (
    <h1>{person.personName}</h1>
  ),
}))

describe('author live preview', () => {
  it('subscribes to the author query with the route slug and initial source map', () => {
    const initial = { data: null, sourceMap: undefined }
    useQuery.mockReturnValue({ data: { personName: 'Max Muster' } })
    const { rerender } = render(
      <AuthorPreview initial={initial} slug="max-muster" />
    )

    expect(useQuery).toHaveBeenCalledWith(
      authorProfileQuery.query,
      { slug: 'max-muster' },
      { initial }
    )
    expect(screen.getByRole('heading').textContent).toBe('Max Muster')

    useQuery.mockReturnValue({ data: { personName: 'Max Aktualisiert' } })
    rerender(<AuthorPreview initial={initial} slug="max-muster" />)
    expect(screen.getByRole('heading').textContent).toBe('Max Aktualisiert')
  })

  it('handles a profile disappearing from the query', () => {
    useQuery.mockReturnValue({ data: null })
    const { container } = render(
      <AuthorPreview
        initial={{ data: null, sourceMap: undefined }}
        slug="max-muster"
      />
    )
    expect(container.innerHTML).toBe('')
  })
})
