import { projectBySlugQuery, projectsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import ProjectDetail from './detail'
import ProjectsPreview from './preview'

export async function generateMetadata(props: {
  params: { slug: string }
}): Promise<Metadata> {
  const { published: project } = await load(
    projectBySlugQuery,
    false,
    props.params,
    ['project']
  )

  const url = `/projekte/${project.slug}`

  return {
    title: `${project.projectName ?? 'Projekt'} | Projekte`,
    description: project.description ?? 'Ohne Beschreibung',
    alternates: { canonical: url },
    openGraph: {
      title: project.projectName ?? 'Projekt',
      url,
    },
  }
}

export async function generateStaticParams() {
  const { published: projects } = await load(projectsQuery, false, undefined, [
    'project',
  ])

  return projects?.map(({ slug }) => ({ slug }))
}

export default async function Home(props: { params: { slug: string } }) {
  const { isEnabled } = draftMode()
  const { published, draft } = await load(
    projectBySlugQuery,
    isEnabled,
    props.params,
    ['project', props.params.slug]
  )

  if (!draft) {
    notFound()
  }

  return isEnabled ? (
    <ProjectsPreview initial={draft} params={props.params} />
  ) : (
    <ProjectDetail project={published} />
  )
}
