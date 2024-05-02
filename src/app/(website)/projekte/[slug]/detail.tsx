import BreadCrumb from '@/components/bread-crumb'
import ContactPerson from '@/components/contact-person'
import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import { PortableText } from '@portabletext/react'
import { ProjectBySlugQueryData } from '../types'

export default function ProjectDetail(props: {
  project: ProjectBySlugQueryData
}) {
  const { project } = props
  return (
    <>
      <header className="full relative mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pb-8 pt-32 text-base-white md:pb-16 md:pt-44">
        <div className="content">
          <BreadCrumb
            className="pb-6"
            links={[
              { name: 'Projekte', href: '/projekte' },
              {
                name: project.projectName ?? 'Projekt',
                href: `/projekte/${project.slug}`,
              },
            ]}
          />
          <Heading level={1}>
            <span
              dangerouslySetInnerHTML={{
                __html: project.projectName ?? '',
              }}
            />
          </Heading>
          <p className="max-w-xl pt-6 text-xl">{project.description}</p>

          <div className="popout justify-center pt-8 md:pt-16">
            <SanityImage
              className="rounded-lg"
              image={project.imageHeader ?? project.image}
              size="popout"
            />
          </div>
        </div>
      </header>

      <div className="flex items-start justify-between gap-16 py-16 max-lg:flex-col">
        <div className="prose max-lg:order-2">
          {project.content && <PortableText value={project.content} />}
        </div>
        <aside className="flex-shrink-0 basis-80 rounded bg-base-grey p-4 text-primary max-lg:order-1 lg:p-8 [&>div]:mb-4 [&>div]:text-xl [&>p]:text-sm [&>p]:font-bold">
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
              <div>{project.contactPerson.personName}</div>
            </>
          )}
        </aside>
      </div>
      <ContactPerson
        person={project.contactPerson}
        content={project.callToAction}
      />
    </>
  )
}
