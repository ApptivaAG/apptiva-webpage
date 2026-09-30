import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ContactLinkAnalytics from '../contact-link-analytics'

const plausible = vi.fn()
vi.mock('next-plausible', () => ({ usePlausible: () => plausible }))

function clickLink(href: string) {
  const a = document.createElement('a')
  a.href = href
  a.innerHTML = '<span>link</span>'
  a.addEventListener('click', (e) => e.preventDefault())
  document.body.appendChild(a)
  a.querySelector('span')!.click()
  a.remove()
}

describe('ContactLinkAnalytics', () => {
  afterEach(() => plausible.mockClear())

  it('tracks mailto links', () => {
    render(<ContactLinkAnalytics />)
    clickLink('mailto:info@apptiva.ch?subject=Hallo')
    expect(plausible).toHaveBeenCalledWith('E-Mail-Klick', {
      props: { email: 'info@apptiva.ch', url: '/' },
    })
  })

  it('tracks tel links', () => {
    render(<ContactLinkAnalytics />)
    clickLink('tel:+41%2041%20123%2045%2067')
    expect(plausible).toHaveBeenCalledWith('Telefon-Klick', {
      props: { phone: '+41 41 123 45 67', url: '/' },
    })
  })

  it('ignores other links', () => {
    render(<ContactLinkAnalytics />)
    clickLink('https://apptiva.ch')
    expect(plausible).not.toHaveBeenCalled()
  })
})
