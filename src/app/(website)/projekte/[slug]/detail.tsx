import BreadCrumb from '@/components/bread-crumb'
import ContactPerson from '@/components/contact-person'
import Heading from '@/components/heading'
import ProjectArticleSchema from '@/components/project-article-schema'
import ProjectPortableText from '@/components/project-portable-text'
import SanityImage from '@/components/sanity-image'
import { urlForImage } from '@/sanity/lib/image'
import { Category } from '../search-params'
import { ProjectBySlugQueryData } from '../types'

export default function ProjectDetail(props: {
  project: ProjectBySlugQueryData
  category?: Category
}) {
  const { project, category } = props

  // Prepare image URL for schema
  const imageUrl = project.imageHeader || project.image
  const schemaImageUrl = imageUrl
    ? urlForImage(imageUrl)?.width(1200).height(630).url()
    : undefined

  // Build breadcrumb based on category
  const breadcrumbLinks =
    category === 'chatbots'
      ? [
          { name: 'Angebot' },
          { name: 'Chatbots', href: '/angebot/chatbots' },
          { name: 'Projekte', href: '/projekte?category=chatbots' },
          {
            name: project.projectName ?? 'Projekt',
            href: `/projekte/${project.slug}?category=chatbots`,
          },
        ]
      : category === 'dev'
        ? [
            { name: 'Angebot' },
            { name: 'Development', href: '/angebot/development' },
            { name: 'Projekte', href: '/projekte?category=dev' },
            {
              name: project.projectName ?? 'Projekt',
              href: `/projekte/${project.slug}?category=dev`,
            },
          ]
        : [
            { name: 'Projekte', href: '/projekte' },
            {
              name: project.projectName ?? 'Projekt',
              href: `/projekte/${project.slug}`,
            },
          ]

  return (
    <>
      <ProjectArticleSchema
        projectName={project.projectName ?? 'Projekt'}
        slug={project.slug ?? ''}
        description={project.description ?? undefined}
        imageUrl={schemaImageUrl}
        customerName={
          project.customerRef?.customerName ?? project.customer ?? undefined
        }
        technologies={project.technologies ?? undefined}
        tags={project.tags ?? undefined}
        dateCreated={project._createdAt}
        dateModified={project._updatedAt}
      />
      <header className="full relative mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pb-8 pt-32 text-base-white md:pb-16 md:pt-44">
        <div className="content">
          <BreadCrumb className="pb-6" links={breadcrumbLinks} />
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
          {project.content && <ProjectPortableText content={project.content} />}
        </div>
        <aside className="flex-shrink-0 basis-80 rounded bg-base-grey p-4 text-primary max-lg:order-1 lg:p-8 [&>div]:mb-4 [&>div]:text-xl [&>div]:leading-tight [&>p]:text-sm [&>p]:font-bold">
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
          {project.contactPerson && (
            <>
              <p>Kontaktperson</p>
              <div>{project.contactPerson.personName}</div>
            </>
          )}
          {(project.customerRef?.customerName || project.customer) && (
            <>
              <p>Kunde</p>
              <div>{project.customerRef?.customerName ?? project.customer}</div>
            </>
          )}
          {project.customerRef?.logo && (
            <>
              <div
                className={`mb-0 bg-primary [mask-mode:alpha]`}
                style={{
                  height: 80,
                  mask: `url(${urlForImage(project.customerRef.logo).url()}) no-repeat `,
                  maskSize: 'contain',
                  maskPosition: '0 center',
                  marginBottom: 0,
                }}
                title={project.customerRef.customerName}
              />
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
