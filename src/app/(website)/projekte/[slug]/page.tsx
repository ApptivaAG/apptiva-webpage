import { projectBySlugQuery, projectsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import ProjectDetail from './detail'
import ProjectsPreview from './preview'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { published: project } = await load(
    projectBySlugQuery,
    false,
    (await props.params),
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

export default async function Home(props: { params: Promise<{ slug: string }> }) {
  const { isEnabled } = await draftMode()
  const { published, draft } = await load(
    projectBySlugQuery,
    isEnabled,
    (await props.params),
    ['project', (await props.params).slug]
  )

  if (!draft) {
    notFound()
  }

  return isEnabled ? (
    <ProjectsPreview initial={draft} params={(await props.params)} />
  ) : (
    <ProjectDetail project={published} />
  );
}
