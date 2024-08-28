import SanityImage from '@/components/sanity-image'
import Button from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { ProjectQueryData } from './types'
import UnderlineForLink from '@/components/ui/underline-for-link'

export function ProjectTeaser(props: {
  project: ProjectQueryData
  intent: 'dark' | 'light'
}) {
  const { project } = props
  return (
    <Card
      key={project._id}
      intent={props.intent}
      padding="none"
      className="flex h-full max-w-md flex-col shadow"
    >
      <div className="">
        <SanityImage
          className="aspect-video object-cover"
          image={project.image}
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-4 p-9">
        <p
          className="text-xl font-bold leading-5"
          dangerouslySetInnerHTML={{ __html: project.projectName ?? '' }}
        />
        <div className="flex-1">
          <p className="line-clamp-5">{project.description}</p>
        </div>
        <Link className="mt-6 self-end" href={`/projekte/${project.slug}`}>
          <UnderlineForLink>Zum Projekt&ensp;→</UnderlineForLink>
        </Link>
      </div>
    </Card>
  )
}
