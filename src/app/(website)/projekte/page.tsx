import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import type { SearchParams } from 'nuqs/server'
import { projectsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import ProjectList from './list'
import ProjectsPreview from './preview'
import { loadSearchParams } from './search-params'

const url = '/projekte'
const title = 'Erfolgsprojekte: Softwarelösungen und Chatbots im Einsatz'
export const metadata: Metadata = {
  title,
  description:
    'Lass dich von unseren Referenzen inspirieren! Seit über 10 Jahren entwickeln wir Softwarelösungen und Chatbots für Kund:innen aus verschiedensten Branchen.',
  alternates: { canonical: url },
  openGraph: {
    title,
    url,
  },
}

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams
  const { category } = loadSearchParams(searchParams)
  const { isEnabled } = await draftMode()
  const { draft, published } = await load(projectsQuery, isEnabled, undefined, [
    'project',
  ])

  return isEnabled ? (
    <ProjectsPreview initial={draft} />
  ) : (
    <ProjectList
      projects={published.filter((project) => {
        if (category === 'chatbots') {
          return project.tags?.includes('Chatbots')
        } else if (category === 'dev') {
          return !project.tags?.includes('Chatbots')
        } else return project
      })}
      category={category}
    />
  )
}
