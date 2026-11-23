import { stegaEncodeSourceMap } from '@sanity/client/stega'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { AuthorProfileData } from '@/domain/author-profile'
import AuthorProfile from '../author-profile'

vi.mock('@/components/sanity-image', () => ({ default: () => null }))

function draftText(value: string) {
  return stegaEncodeSourceMap(
    { value },
    {
      documents: [{ _id: 'drafts.author', _type: 'person' }],
      paths: ["$['authorProfile']['headline']"],
      mappings: {
        "$['value']": {
          type: 'value',
          source: { type: 'documentValue', document: 0, path: 0 },
        },
      },
    },
    { enabled: true, studioUrl: '/studio' }
  ).value
}

const headline = draftText('Softwareentwickler')
const person: AuthorProfileData = {
  _id: 'author',
  personName: 'Max Muster',
  slug: draftText('max-muster'),
  role: undefined,
  image: null,
  contact: {
    mail: draftText('max@example.com'),
    phone: draftText('+41 41 123 45 67'),
    socialNetworks: [
      { title: 'LinkedIn', url: draftText('https://example.com') },
    ],
  },
  authorProfile: {
    headline,
    introduction: undefined,
    articlesTitle: undefined,
    articlesIntroduction: undefined,
    contactTitle: undefined,
    contactIntroduction: undefined,
    meta: null,
    sections: [
      {
        _key: 'experience',
        label: 'Erfahrung',
        layout: draftText('stats'),
        entries: [
          {
            _key: 'years',
            title: '10 Jahre',
            subtitle: 'Berufserfahrung',
            href: draftText('https://example.com/work'),
            linkText: 'Referenz',
          },
        ],
      },
    ],
  },
  articles: [
    {
      _id: 'article',
      slug: draftText('testbeitrag'),
      name: undefined,
      title: 'Testbeitrag',
      lead: null,
      publishedAt: draftText('2026-01-15T09:00:00Z'),
      isLearning: false,
    },
  ],
}

describe('author profile preview rendering', () => {
  it('preserves editing metadata on visible text', () => {
    const { container } = render(<AuthorProfile person={person} />)

    expect(container.textContent).toContain(headline)
    expect(headline).not.toBe('Softwareentwickler')
  })

  it('cleans links, dates and layout values without cleaning the content', () => {
    const { container } = render(<AuthorProfile person={person} />)

    expect(
      screen
        .getByRole('link', { name: /Testbeitrag Beitrag lesen/ })
        .getAttribute('href')
    ).toBe('/blog/testbeitrag')
    expect(container.querySelector('time')?.getAttribute('dateTime')).toBe(
      '2026-01-15T09:00:00Z'
    )
    expect(
      container.querySelector('a[href^="mailto:"]')?.getAttribute('href')
    ).toBe('mailto:max@example.com')
    expect(
      container.querySelector('a[href^="tel:"]')?.getAttribute('href')
    ).toBe('tel:+41411234567')
    expect(
      screen
        .getAllByRole('link', { name: 'LinkedIn ↗' })[0]
        .getAttribute('href')
    ).toBe('https://example.com')
    expect(
      screen.getByRole('link', { name: 'Referenz ↗' }).getAttribute('target')
    ).toBe('_blank')
    expect(
      container
        .querySelector('#profil-experience')
        ?.classList.contains('bg-primary')
    ).toBe(true)
    expect(
      screen.getByRole('heading', { name: 'Erfahrung aus der Praxis' })
    ).not.toBeNull()
  })
})
