import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { projectBySlugQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { type Category, matchesCategory } from './category'
import ProjectDetail from './detail'
import ProjectsPreview from './detail-preview'

export async function projectMetadata(
  slug: string,
  category: Category
): Promise<Metadata> {
  const { published: project } = await load(
    projectBySlugQuery,
    false,
    { slug },
    ['project']
  )

  if (!project || !matchesCategory(project, category)) notFound()

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
export async function ProjectPage({
  params,
  category = '',
}: {
  params: { slug: string }
  category?: Category
}) {
  const { isEnabled } = await draftMode()
  const { published, draft } = await load(
    projectBySlugQuery,
    isEnabled,
    params,
    ['project', params.slug]
  )

  if (!isEnabled && (!published || !matchesCategory(published, category))) {
    notFound()
  }

  return isEnabled ? (
    <ProjectsPreview initial={draft} params={params} category={category} />
  ) : (
    <ProjectDetail project={published} category={category} />
  )
}
