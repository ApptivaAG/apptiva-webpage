import { projectsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import ProjectList from './list'
import ProjectsPreview from './preview'

const url = '/projekte'
const title = 'Unsere Referenzprojekte'
export const metadata: Metadata = {
  title,
  description: 'Eine Auswahl unserer Projekte der letzten 10 Jahre.',
  alternates: { canonical: url },
  openGraph: {
    title,
    url,
  },
}

export default async function Home() {
  const { isEnabled } = draftMode()
  const { draft, published } = await load(projectsQuery, isEnabled, undefined, [
    'project',
  ])

  return isEnabled ? (
    <ProjectsPreview initial={draft} />
  ) : (
    <ProjectList projects={published} />
  )
}
