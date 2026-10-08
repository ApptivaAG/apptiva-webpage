import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projectsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { matchesCategory } from '../category'
import { ProjectPage, projectMetadata } from '../detail-page'
import { categoryMetadata, ProjectListing } from '../listing-page'
import { parseProjectRoute } from '../project-route'

type Props = { params: Promise<{ slug: string[] }> }

export async function generateStaticParams() {
  const { published: projects } = await load(projectsQuery, false, undefined, [
    'project',
  ])
  return [
    { slug: ['chatbots'] },
    { slug: ['development'] },
    ...projects.flatMap((project) => {
      if (!project.slug) return []
      const category = matchesCategory(project, 'chatbots')
        ? 'chatbots'
        : 'development'
      return [{ slug: [project.slug] }, { slug: [category, project.slug] }]
    }),
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = parseProjectRoute((await params).slug) ?? notFound()
  return route.kind === 'listing'
    ? categoryMetadata(route.category)
    : projectMetadata(route.slug, route.category)
}

export default async function Page({ params }: Props) {
  const route = parseProjectRoute((await params).slug) ?? notFound()
  return route.kind === 'listing' ? (
    <ProjectListing category={route.category} />
  ) : (
    <ProjectPage params={{ slug: route.slug }} category={route.category} />
  )
}
