import { ModuleData, projectsFromSettingsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import ProjectsPreview from './preview'
import ProjectsLayout from './projects-layout'

export default async function Projects() {
  const { isEnabled } = draftMode()

  const { draft, published } = await load(
    projectsFromSettingsQuery,
    isEnabled,
    undefined,
    ['project']
  )

  return isEnabled ? (
    <ProjectsPreview initial={draft} />
  ) : (
    <ProjectsLayout module={published.projectStartpage as ModuleData} />
  )
}
