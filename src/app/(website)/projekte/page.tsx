import Heading from '@/components/heading'
import { projectsQuery } from '@/sanity/lib/queries'
import { load, runQuery } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import ProjectsPreview from './preview'
import ProjectList from './list'

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
