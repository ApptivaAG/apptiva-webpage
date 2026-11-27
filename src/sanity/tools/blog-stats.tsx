import { Badge, Button, Card, Flex, Spinner, Stack, Text } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { FaChartBar } from 'react-icons/fa'
import { useClient } from 'sanity'
import { apiVersion } from '../env'

type Row = { _id: string; personName: string; current: number; last: number }

const ANNUAL_TARGET = 4

function goalStatus(count: number) {
  const remaining = ANNUAL_TARGET - count
  return remaining <= 0
    ? 'Ziel erreicht'
    : `Noch ${remaining} ${remaining === 1 ? 'Blogpost' : 'Blogposts'}`
}

function goalTone(count: number) {
  if (count >= ANNUAL_TARGET) return 'positive'
  if (count <= 1) return 'critical'
  return 'caution'
}

const QUERY = `*[_type == "person" && active == true && !(_id in path("drafts.**"))
  && _id != $excludedPersonId]{
  _id,
  personName,
  "current": count(*[_type == "blog" && !(_id in path("drafts.**"))
    && ^._id in select(count(authors) > 0 => authors[]._ref, defined(author) => [author._ref], [])
    && publishedAt >= $currentStart && publishedAt < $nextStart]),
  "last": count(*[_type == "blog" && !(_id in path("drafts.**"))
    && ^._id in select(count(authors) > 0 => authors[]._ref, defined(author) => [author._ref], [])
    && publishedAt >= $lastStart && publishedAt < $currentStart])
} | order(current desc, last desc, personName asc)`

function BlogStats() {
  const client = useClient({ apiVersion })
  const [rows, setRows] = useState<Row[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const year = new Date().getFullYear()
  const [copied, setCopied] = useState(false)
  const achievers = rows?.filter((row) => row.current >= ANNUAL_TARGET) ?? []

  const copy = async () => {
    if (!rows) return
    const tsv = [
      [
        'Person',
        String(year),
        String(year - 1),
        'Jahresziel',
        `Zielstatus ${year}`,
      ],
      ...rows.map((r) => [
        r.personName ?? '',
        String(r.current),
        String(r.last),
        String(ANNUAL_TARGET),
        goalStatus(r.current),
      ]),
    ]
      .map((cols) => cols.join('\t'))
      .join('\n')
    await navigator.clipboard.writeText(tsv)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    client
      .fetch<Row[]>(QUERY, {
        excludedPersonId: '5b407138-d0ac-4c97-ab3f-095dd64da859', // Brigitte Wey
        lastStart: `${year - 1}-01-01T00:00:00Z`,
        currentStart: `${year}-01-01T00:00:00Z`,
        nextStart: `${year + 1}-01-01T00:00:00Z`,
      })
      .then(setRows)
      .catch((e: Error) => setError(e.message))
  }, [client, year])

  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <Stack style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Text size={3} weight="semibold">
          Blogposts pro Person
        </Text>
        <Text as="p" style={{ lineHeight: 1.5 }}>
          Unser Jahresziel ist {ANNUAL_TARGET} Blogposts pro Person. Ab{' '}
          {ANNUAL_TARGET} Beiträgen im jeweiligen Kalenderjahr ist das Ziel
          erreicht. Blogposts mit dem Tag "Apptiva lernt" zählen ebenfalls zur
          Statistik.
        </Text>
        {error && <Text>Fehler: {error}</Text>}
        {!rows && !error && (
          <Flex justify="center">
            <Spinner />
          </Flex>
        )}
        {rows && (
          <Card
            padding={4}
            radius={2}
            tone={achievers.length ? 'positive' : 'default'}
          >
            <Stack
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <Text weight="semibold">
                Jahresziel {year}: {achievers.length} von {rows.length} Personen
                haben das Ziel erreicht.
              </Text>
              <Text as="p" style={{ lineHeight: 1.5 }}>
                {achievers.length
                  ? `Ziel erreicht: ${achievers.map((row) => row.personName).join(', ')}.`
                  : 'Bisher hat noch niemand das Jahresziel erreicht.'}
              </Text>
            </Stack>
          </Card>
        )}
        {rows && (
          <Card border radius={2} padding={5}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th style={{ paddingBottom: 10 }}>Person</th>
                  <th style={{ textAlign: 'right', paddingBottom: 10 }}>
                    {year}
                  </th>
                  <th style={{ textAlign: 'right', paddingBottom: 10 }}>
                    {year - 1}
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      paddingLeft: 16,
                      paddingBottom: 10,
                    }}
                  >
                    Zielstatus {year}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, index) => (
                  <tr
                    key={r._id}
                    style={{
                      borderTop:
                        index > 0
                          ? '1px solid var(--card-border-color)'
                          : undefined,
                    }}
                  >
                    <td style={{ paddingBlock: 8 }}>{r.personName}</td>
                    <td style={{ paddingBlock: 8, textAlign: 'right' }}>
                      {r.current}
                    </td>
                    <td style={{ paddingBlock: 8, textAlign: 'right' }}>
                      {r.last}
                    </td>
                    <td style={{ paddingBlock: 8, paddingLeft: 16 }}>
                      <Badge tone={goalTone(r.current)}>
                        {goalStatus(r.current)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
        {rows && (
          <Flex>
            <Button
              text={copied ? 'Kopiert' : 'Für Tabelle kopieren'}
              tone={copied ? 'positive' : 'default'}
              onClick={copy}
            />
          </Flex>
        )}
      </Stack>
    </div>
  )
}

export const blogStatsTool = () => ({
  name: 'blog-stats',
  title: 'Statistik',
  icon: FaChartBar,
  component: BlogStats,
})
