import Link from 'next/link'
import SanityImage from '@/components/sanity-image'
import { Card } from '@/components/ui/card'
import UnderlineForLink from '@/components/ui/underline-for-link'
import { urlForImage } from '@/sanity/lib/image'
import { Category } from './search-params'
import { ProjectQueryData } from './types'

export function ProjectTeaser(props: {
  project: ProjectQueryData
  intent: 'dark' | 'light'
  category?: Category
}) {
  const { project, category } = props
  const logoUrl = project.customerRef?.logo
    ? urlForImage(project.customerRef.logo).format('png').width(1200).url()
    : undefined
  const projectUrl = category
    ? `/projekte/${project.slug}?category=${category}`
    : `/projekte/${project.slug}`
  return (
    <Card
      key={project._id}
      intent={props.intent}
      padding="none"
      className="flex h-full max-w-md flex-col shadow"
    >
      <div className="aspect-video flex-col items-center justify-center bg-base-grey">
        {project.customerRef?.logo ? (
          <div className="size-full px-16 py-12">
            <div
              className={`size-full bg-primary [mask-mode:alpha]`}
              style={{
                maskImage: `url("${logoUrl}")`,
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskImage: `url("${logoUrl}")`,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                WebkitMaskSize: 'contain',
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
        <Link className="mt-6 self-end" href={projectUrl}>
          <UnderlineForLink>Zum Projekt&ensp;→</UnderlineForLink>
        </Link>
      </div>
    </Card>
  )
}
