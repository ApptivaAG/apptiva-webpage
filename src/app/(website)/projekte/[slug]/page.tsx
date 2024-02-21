import { projectBySlugQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import ProjectDetail from './detail'
import ProjectsPreview from './preview'

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
