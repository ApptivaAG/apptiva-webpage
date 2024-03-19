import SanityImage from '@/components/sanity-image'
import Button from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { ProjectQueryData } from './types'

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
      className="flex h-full max-w-md flex-col overflow-hidden shadow"
    >
      <div className="">
        <SanityImage
          className="aspect-video object-cover"
          image={project.image}
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-4 p-9">
        <p
          className="text-lg font-bold leading-5"
          dangerouslySetInnerHTML={{ __html: project.projectName ?? '' }}
        />
        <p className="line-clamp-5 flex-1">{project.description}</p>
        <Link className="mt-6 self-end" href={`/projekte/${project.slug}`}>
          <Button
            element="div"
            className="inline"
            intent={props.intent === 'dark' ? 'secondary' : 'primary'}
          >
            → Zum Projekt
          </Button>
        </Link>
      </div>
    </Card>
  )
}
