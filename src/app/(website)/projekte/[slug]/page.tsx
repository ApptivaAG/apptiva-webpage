import { projectBySlugQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { notFound } from 'next/navigation'
import { SanityDocument } from 'sanity'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { getImageDimensions } from '@sanity/asset-utils'
import { PortableText } from '@portabletext/react'

export default async function Home(props: { params: { slug: string } }) {
  const project = (await sanityFetch<SanityDocument>({
    query: projectBySlugQuery(props.params.slug),
  })) as any // TODO: type

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
      <Image
        key={project.image.toString()}
        src={urlForImage(project.image).url()}
        alt={project.imageAlt}
        width={getImageDimensions(project.image).width}
        height={getImageDimensions(project.image).height}
        placeholder="blur"
        blurDataURL={urlForImage(project.image)
          .width(24)
          .height(24)
          .blur(10)
          .url()}
        sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
      />
      <div>{project.description}</div>
      <div>{project.tasks}</div>
      <div>{project.time}</div>
      <div>{project.technologies}</div>
      <div>{project.customer}</div>

      <PortableText key={project.content._key} value={project.content} />

      <div>{project.contactPerson.personName}</div>
    </>
  )
}
