import SanityImage from '@/components/sanity-image'
import { projectBySlugQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

export default async function Home(props: { params: { slug: string } }) {
  const project = await runQuery(projectBySlugQuery, {
    slug: props.params.slug,
  })

  if (!project) {
    notFound()
  }

  return (
    <>
      <h1
        style={{ fontSize: '30px', fontWeight: 'bold', paddingBottom: '1em' }}
      >
        {project.projectName}
      </h1>
      <SanityImage image={project.image} />
      <div>{project.description}</div>
      <div>{project.tasks}</div>
      <div>{project.time}</div>
      <div>{project.technologies}</div>
      <div>{project.customer}</div>
      {project.content?.map((content) => (
        <PortableText key={content._key} value={content} />
      ))}
      <div>{project.contactPerson}</div>
    </>
  )
}
