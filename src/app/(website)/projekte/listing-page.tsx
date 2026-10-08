import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { projectsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { type Category, projectPath } from './category'
import ProjectList from './list'
import ProjectsPreview from './preview'

const url = '/projekte'
const title = 'Erfolgsprojekte: Softwarelösungen und Chatbots im Einsatz'
export const metadata: Metadata = {
  title,
  description:
    'Lass dich von unseren Referenzen inspirieren! Seit über 10 Jahren entwickeln wir Softwarelösungen und Chatbots für Kund:innen aus verschiedensten Branchen.',
  alternates: { canonical: url },
  openGraph: {
    title,
    url,
  },
}

export async function ProjectListing({
  category = '',
}: {
  category?: Category
}) {
  const { isEnabled } = await draftMode()
  const { draft, published } = await load(projectsQuery, isEnabled, undefined, [
    'project',
  ])

  return isEnabled ? (
    <ProjectsPreview initial={draft} category={category} />
  ) : (
    <ProjectList projects={published} category={category} />
  )
}

export default async function Home() {
  return <ProjectListing />
}

export function categoryMetadata(category: Category): Metadata {
  const categoryTitle =
    category === 'chatbots'
      ? 'Erfolgsprojekte: Chatbots im Einsatz'
      : 'Erfolgsprojekte: Softwarelösungen im Einsatz'
  return {
    ...metadata,
    title: categoryTitle,
    alternates: { canonical: projectPath(category) },
    openGraph: { title: categoryTitle, url: projectPath(category) },
  }
}
