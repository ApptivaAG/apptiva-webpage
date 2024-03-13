import { PortableText } from '@portabletext/react'
import { ProjectBySlugQueryData } from '../types'
import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'

export default function ProjectDetail(props: {
  project: ProjectBySlugQueryData
}) {
  const { project } = props
  return (
    <>
      <header className="full relative mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pb-8 pt-32 text-base-white md:pb-16 md:pt-44">
        <div className="content">
          <Heading level={1}>
            <span
              dangerouslySetInnerHTML={{
                __html: project.projectName ?? '',
              }}
            />
          </Heading>
          <p className="mt-4 max-w-xl text-xl">{project.description}</p>

          <div className="popout justify-center pt-8 md:pt-16">
            <SanityImage className="rounded-lg" image={project.image} />
          </div>
        </div>
      </header>

      <div className="flex items-start justify-between gap-16 py-16 max-lg:flex-col">
        <div className="prose prose-lg">
          {project.content && <PortableText value={project.content} />}
        </div>
        <aside className="flex-shrink-0 basis-80 rounded bg-base-grey p-4 lg:p-8 [&>div]:mb-4 [&>div]:text-lg [&>p]:text-sm [&>p]:font-bold [&>p]:text-primary">
          {project.tasks && (
            <>
              <p>Aufgaben</p>
              <div>{project.tasks}</div>
            </>
          )}
          {project.time && (
            <>
              <p>Zeitraum</p>
              <div>{project.time}</div>
            </>
          )}
          {project.technologies && (
            <>
              <p>Technologien</p>
              <div>{project.technologies}</div>
            </>
          )}
          {project.customer && (
            <>
              <p>Kunde</p>
              <div>{project.customer}</div>
            </>
          )}
          {project.contactPerson && (
            <>
              <p>Kontaktperson</p>
              <div>{project.contactPerson}</div>
            </>
          )}
        </aside>
      </div>
    </>
  )

  return (
    <>
      <Heading level={2}>{props.project.projectName}</Heading>
      <SanityImage image={props.project.image} />
      <div>{props.project.description}</div>
      <div>{props.project.tasks}</div>
      <div>{props.project.time}</div>
      <div>{props.project.technologies}</div>
      <div>{props.project.customer}</div>
      {props.project.content?.map((content) => (
        <PortableText key={content._key} value={content} />
      ))}
      <div>{props.project.contactPerson}</div>
    </>
  )
}
