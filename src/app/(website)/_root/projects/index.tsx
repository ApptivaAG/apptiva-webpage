import { projectsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import ProjectsPreview from './preview'
import Layout from './layout'

export default async function Projects() {
  const { isEnabled } = draftMode()
  const { draft, published } = await load(projectsQuery, isEnabled, undefined, [
    'project',
  ])
  return isEnabled ? (
    <ProjectsPreview initial={draft} />
  ) : (
    <Layout projects={published} />
  )
}
