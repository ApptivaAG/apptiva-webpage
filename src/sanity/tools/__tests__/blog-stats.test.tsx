import '@testing-library/jest-dom/vitest'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { blogStatsTool } from '../blog-stats'

const { fetchRows, writeText } = vi.hoisted(() => ({
  fetchRows: vi.fn(),
  writeText: vi.fn().mockResolvedValue(undefined),
}))
const client = { fetch: fetchRows }

vi.mock('sanity', () => ({ useClient: () => client }))
vi.mock('../../env', () => ({ apiVersion: '2026-01-01' }))
vi.mock('@sanity/ui', () => {
  const Container = ({ children }: { children?: ReactNode }) => (
    <div>{children}</div>
  )
  return {
    Badge: ({ children, tone }: { children?: ReactNode; tone: string }) => (
      <span data-tone={tone}>{children}</span>
    ),
    Card: Container,
    Flex: Container,
    Stack: Container,
    Text: Container,
    Spinner: () => <div>Lädt</div>,
    Button: ({ text, onClick }: { text: string; onClick: () => void }) => (
      <button type="button" onClick={onClick}>
        {text}
      </button>
    ),
  }
})

const BlogStats = blogStatsTool().component

describe('Blogposts pro Person', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })
  })

  it('zeigt das Jahresziel, erreichte Ziele und fehlende Beiträge', async () => {
    fetchRows.mockResolvedValue([
      { _id: 'above', personName: 'Anna', current: 6, last: 0 },
      { _id: 'exact', personName: 'Beat', current: 4, last: 1 },
      { _id: 'below', personName: 'Clara', current: 3, last: 5 },
      { _id: 'zero', personName: 'David', current: 0, last: 4 },
    ])

    render(<BlogStats />)

    expect(await screen.findByText(/2 von 4 Personen/)).toBeInTheDocument()
    expect(screen.getByText('Ziel erreicht: Anna, Beat.')).toBeInTheDocument()
    expect(
      screen.getByText(/Unser Jahresziel ist 4 Blogposts/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /Blogposts mit dem Tag "Apptiva lernt" zählen nicht zur Statistik/
      )
    ).toBeInTheDocument()
    for (const name of ['Anna', 'Beat']) {
      const row = screen.getByRole('cell', { name }).closest('tr')!
      expect(within(row).getByText('Ziel erreicht')).toBeInTheDocument()
    }
    expect(screen.getByText('Noch 1 Blogpost')).toBeInTheDocument()
    expect(screen.getByText('Noch 4 Blogposts')).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: 'Für Tabelle kopieren' })
    )

    const year = new Date().getFullYear()
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(
        [
          `Person\t${year}\t${year - 1}\tJahresziel\tZielstatus ${year}`,
          'Anna\t6\t0\t4\tZiel erreicht',
          'Beat\t4\t1\t4\tZiel erreicht',
          'Clara\t3\t5\t4\tNoch 1 Blogpost',
          'David\t0\t4\t4\tNoch 4 Blogposts',
        ].join('\n')
      )
    )
  })

  it('zeigt an, wenn noch niemand das Jahresziel erreicht hat', async () => {
    fetchRows.mockResolvedValue([
      { _id: 'person', personName: 'Anna', current: 2, last: 4 },
    ])

    render(<BlogStats />)

    expect(await screen.findByText(/0 von 1 Personen/)).toBeInTheDocument()
    expect(
      screen.getByText('Bisher hat noch niemand das Jahresziel erreicht.')
    ).toBeInTheDocument()
    expect(screen.getByText('Noch 2 Blogposts')).toBeInTheDocument()
  })

  it('zeigt bei einer leeren Statistik keine erreichten Ziele', async () => {
    fetchRows.mockResolvedValue([])

    render(<BlogStats />)

    expect(await screen.findByText(/0 von 0 Personen/)).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(1)
  })

  it.each([
    [0, 'critical', 'Noch 4 Blogposts'],
    [1, 'critical', 'Noch 3 Blogposts'],
    [2, 'caution', 'Noch 2 Blogposts'],
    [3, 'caution', 'Noch 1 Blogpost'],
    [4, 'positive', 'Ziel erreicht'],
    [6, 'positive', 'Ziel erreicht'],
  ])(
    'markiert den Zielstatus bei %i Blogposts als %s',
    async (count, tone, status) => {
      fetchRows.mockResolvedValue([
        { _id: 'person', personName: 'Anna', current: count, last: 0 },
      ])

      render(<BlogStats />)

      const row = (await screen.findByRole('cell', { name: 'Anna' })).closest(
        'tr'
      )!
      expect(within(row).getByText(status)).toHaveAttribute('data-tone', tone)
    }
  )
})
