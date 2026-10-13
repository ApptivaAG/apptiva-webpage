import { Button, Card, Flex, Spinner, Stack, Text } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { FaChartBar } from 'react-icons/fa'
import { useClient } from 'sanity'
import { apiVersion } from '../env'

type Row = { _id: string; personName: string; current: number; last: number }

const QUERY = `*[_type == "person" && active == true && !(_id in path("drafts.**"))]{
  _id,
  personName,
  "current": count(*[_type == "blog" && !(_id in path("drafts.**"))
    && !($excludedTagId in coalesce(tags[]._ref, []))
    && author._ref == ^._id && publishedAt >= $currentStart && publishedAt < $nextStart]),
  "last": count(*[_type == "blog" && !(_id in path("drafts.**"))
    && !($excludedTagId in coalesce(tags[]._ref, []))
    && author._ref == ^._id && publishedAt >= $lastStart && publishedAt < $currentStart])
} | order(current desc, last desc, personName asc)`

function BlogStats() {
  const client = useClient({ apiVersion })
  const [rows, setRows] = useState<Row[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const year = new Date().getFullYear()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    if (!rows) return
    const tsv = [
      ['Person', String(year), String(year - 1)],
      ...rows.map((r) => [
        r.personName ?? '',
        String(r.current),
        String(r.last),
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
        excludedTagId: 'b059ed38-345a-4b97-95be-56de061e34d0',
        lastStart: `${year - 1}-01-01T00:00:00Z`,
        currentStart: `${year}-01-01T00:00:00Z`,
        nextStart: `${year + 1}-01-01T00:00:00Z`,
      })
      .then(setRows)
      .catch((e: Error) => setError(e.message))
  }, [client, year])

  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <Stack style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Text size={3} weight="semibold">
          Blogposts pro Person
        </Text>
        {error && <Text>Fehler: {error}</Text>}
        {!rows && !error && (
          <Flex justify="center">
            <Spinner />
          </Flex>
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
