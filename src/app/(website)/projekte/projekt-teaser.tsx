import SanityImage from '@/components/sanity-image'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { ProjectQueryData } from './types'
import UnderlineForLink from '@/components/ui/underline-for-link'
import { urlForImage } from '@/sanity/lib/image'

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
      <div className="aspect-video flex-col items-center justify-center bg-base-grey">
        {project.customerRef?.logo ? (
          <div className="size-full p-16">
            <div
              className={`size-full bg-primary [mask-mode:alpha]`}
              style={{
                mask: `url(${urlForImage(project.customerRef.logo).url()}) no-repeat`,
                maskPosition: 'center',
              }}
              title={project.customerRef.customerName}
            />
          </div>
        ) : (
          <SanityImage
            className="aspect-video object-center"
            image={project.image}
          />
        )}
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
