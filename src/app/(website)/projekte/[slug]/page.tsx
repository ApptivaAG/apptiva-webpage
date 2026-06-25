import { projectBySlugQuery, projectsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { SearchParams } from 'nuqs/server'
import { loadSearchParams } from '../search-params'
import ProjectDetail from './detail'
import ProjectsPreview from './preview'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { published: project } = await load(
    projectBySlugQuery,
    false,
    await props.params,
    ['project']
  )

  const url = `/projekte/${project.slug}`

  const metaTitle = project.meta?.title || project.projectName || 'Projekt'
  const metaDescription =
    project.meta?.description || project.description || 'Ohne Beschreibung'

  return {
    title: `${metaTitle} | Projekte`,
    description: metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle,
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

export default async function Home(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}) {
  const searchParams = await props.searchParams
  const { category } = loadSearchParams(searchParams)
  const { isEnabled } = await draftMode()
  const { published, draft } = await load(
    projectBySlugQuery,
    isEnabled,
    await props.params,
    ['project', (await props.params).slug]
  )

  if (!draft) {
    notFound()
  }

  return isEnabled ? (
    <ProjectsPreview initial={draft} params={await props.params} />
  ) : (
    <ProjectDetail project={published} category={category} />
  )
}
