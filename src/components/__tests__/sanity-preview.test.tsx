import { stegaEncodeSourceMap } from '@sanity/client/stega'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SanityPreview } from '../sanity-preview'

const { push, useLiveMode, withConfig } = vi.hoisted(() => ({
  push: vi.fn(),
  useLiveMode: vi.fn(),
  withConfig: vi.fn((config) => config),
}))

vi.mock('@sanity/react-loader', () => ({ useLiveMode }))
vi.mock('@/sanity/lib/client', () => ({ client: { withConfig } }))
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))
vi.mock('next-sanity/visual-editing', () => ({ VisualEditing: () => null }))

function renderPreview(href = 'https://apptiva.ch/blog?category=ki#posts') {
  return render(
    <>
      <SanityPreview websiteOrigin="https://apptiva.ch" />
      <a href={href} onClick={(event) => event.preventDefault()}>
        <span>Next page</span>
      </a>
    </>
  )
}

describe('SanityPreview', () => {
  beforeEach(() => {
    push.mockClear()
    useLiveMode.mockClear()
  })

  it('connects the preview query loader', () => {
    renderPreview()

    expect(useLiveMode).toHaveBeenCalledWith({
      client: {
        perspective: 'drafts',
        useCdn: false,
        stega: { enabled: true, studioUrl: '/studio' },
      },
    })
  })

  it('keeps published-site links on the preview host', () => {
    renderPreview()

    const allowed = fireEvent.click(screen.getByText('Next page'))

    expect(allowed).toBe(false)
    expect(push).toHaveBeenCalledWith('/blog?category=ki#posts')
  })

  it('leaves external links alone', () => {
    renderPreview('https://example.com/blog')

    fireEvent.click(screen.getByText('Next page'))
    expect(push).not.toHaveBeenCalled()
  })

  it('removes Sanity editing metadata from the navigation URL', () => {
    const { href } = stegaEncodeSourceMap(
      { href: 'https://apptiva.ch/blog' },
      {
        documents: [{ _id: 'drafts.homepage', _type: 'homepage' }],
        paths: ["$['href']"],
        mappings: {
          "$['href']": {
            type: 'value',
            source: { type: 'documentValue', document: 0, path: 0 },
          },
        },
      },
      { enabled: true, studioUrl: '/studio', filter: () => true }
    )
    expect(href).not.toBe('https://apptiva.ch/blog')
    renderPreview(href)

    fireEvent.click(screen.getByText('Next page'))

    expect(push).toHaveBeenCalledWith('/blog')
  })

  it('leaves relative links to Next.js', () => {
    renderPreview('/blog')

    fireEvent.click(screen.getByText('Next page'))
    expect(push).not.toHaveBeenCalled()
  })

  it.each(['ctrlKey', 'metaKey', 'shiftKey', 'altKey'])(
    'preserves clicks with %s',
    (modifier) => {
      renderPreview()

      fireEvent.click(screen.getByText('Next page'), { [modifier]: true })
      expect(push).not.toHaveBeenCalled()
    }
  )

  it('preserves links that open a new tab or download a file', () => {
    renderPreview()
    const link = screen.getByRole('link')
    link.setAttribute('target', '_blank')
    fireEvent.click(link)
    link.removeAttribute('target')
    link.setAttribute('download', '')
    fireEvent.click(link)

    expect(push).not.toHaveBeenCalled()
  })

  it('removes the navigation listener when preview unmounts', () => {
    const { unmount } = renderPreview()
    unmount()
    const link = document.createElement('a')
    link.href = 'https://apptiva.ch/blog'
    link.addEventListener('click', (event) => event.preventDefault())
    document.body.append(link)
    fireEvent.click(link)
    link.remove()

    expect(push).not.toHaveBeenCalled()
  })
})
