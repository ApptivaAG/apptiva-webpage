import { projectBySlugQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { getImageDimensions } from '@sanity/asset-utils'
import { PortableText } from '@portabletext/react'
import { runQuery } from '@/sanity/lib/sanityFetch'

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

      {project.content?.map((content) => (
        <PortableText key={content._key} value={content} />
      ))}

      <div>{project.contactPerson}</div>
    </>
  )
}
