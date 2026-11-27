import { fireEvent, render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import BackToTopButton from '../back-to-top-button'

vi.mock('next/navigation', () => ({ usePathname: vi.fn() }))

const scrollTo = vi.fn()
const matchMedia = vi.fn()

describe('BackToTopButton', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReset().mockReturnValue('/')
    scrollTo.mockClear()
    matchMedia.mockReset().mockReturnValue({ matches: false })
    vi.stubGlobal('scrollTo', scrollTo)
    vi.stubGlobal('matchMedia', matchMedia)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('renders one button with the expected label and type on the homepage', () => {
    render(<BackToTopButton />)

    const button = screen.getByRole('button', { name: 'Zurück nach oben' })
    expect(button.getAttribute('type')).toBe('button')
    expect(
      screen.getAllByRole('button', { name: 'Zurück nach oben' })
    ).toHaveLength(1)
  })

  it.each(['/kontakt', '/angebot/development'])(
    'does not render on %s',
    (pathname) => {
      vi.mocked(usePathname).mockReturnValue(pathname)

      render(<BackToTopButton />)

      expect(
        screen.queryByRole('button', { name: 'Zurück nach oben' })
      ).toBeNull()
    }
  )

  it('updates button presence when the pathname changes', () => {
    vi.mocked(usePathname).mockReturnValue('/kontakt')
    const { rerender } = render(<BackToTopButton />)
    expect(
      screen.queryByRole('button', { name: 'Zurück nach oben' })
    ).toBeNull()

    vi.mocked(usePathname).mockReturnValue('/')
    rerender(<BackToTopButton />)

    expect(
      screen.getByRole('button', { name: 'Zurück nach oben' })
    ).not.toBeNull()
  })

  it('smoothly scrolls to the top when reduced motion is not preferred', () => {
    render(<BackToTopButton />)

    fireEvent.click(screen.getByRole('button', { name: 'Zurück nach oben' }))

    expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('scrolls immediately when reduced motion is preferred', () => {
    matchMedia.mockReturnValue({ matches: true })
    render(<BackToTopButton />)

    fireEvent.click(screen.getByRole('button', { name: 'Zurück nach oben' }))

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' })
  })

  it('does not scroll before the button is clicked', () => {
    render(<BackToTopButton />)

    expect(scrollTo).not.toHaveBeenCalled()
  })
})
