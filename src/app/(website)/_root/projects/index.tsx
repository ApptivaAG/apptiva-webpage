import { ModuleData, projectsFromSettingsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import ProjectsPreview from './preview'
import ProjectsLayout from './projects-layout'

export default async function Projects() {
  const { isEnabled } = draftMode()

  const { draft, published, error } = await load(
    projectsFromSettingsQuery,
    isEnabled,
    undefined,
    ['project']
  )

  return isEnabled ? (
    <>
      {error && <div>{JSON.stringify(error)}</div>}
      <ProjectsPreview initial={draft} />
    </>
  ) : (
    <>
      <ProjectsLayout
        projects={published.projectStartpage.projects}
        introduction={published.projectStartpage.introduction}
      />
    </>
  )
}
