import { projectsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { type Category, projectPath } from './category'
import ProjectList from './list'
import ProjectsPreview from './preview'

const url = '/projekte'
const title = 'Erfolgsprojekte: Softwarelösungen und Chatbots im Einsatz'
export const metadata: Metadata = {
  title,
  description:
    'Einblicke in umgesetzte Software- und Chatbot-Projekte: Entdecke, wie Apptiva Unternehmen mit digitalen Produkten und individuellen Lösungen unterstützt.',
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
  const isChatbots = category === 'chatbots'
  const categoryTitle = isChatbots
    ? 'Erfolgsprojekte: Chatbots im Einsatz'
    : 'Erfolgsprojekte: Softwarelösungen im Einsatz'
  return {
    ...metadata,
    title: categoryTitle,
    description: isChatbots
      ? 'Entdecke Chatbot-Referenzen von Apptiva: digitale Assistenten für Kundenservice, interne Abläufe und neue digitale Angebote.'
      : 'Web- und Mobile-Apps, Schnittstellen und Produktkonfiguratoren: Entdecke Softwareprojekte, die Apptiva für Unternehmen umgesetzt hat.',
    alternates: { canonical: projectPath(category) },
    openGraph: { title: categoryTitle, url: projectPath(category) },
  }
}
