import SanityImage from '@/components/sanity-image'
import { getServiceBySlug } from '@/utils/service-page'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

export default async function Home(props: { params: { slug: string } }) {
  const servicePage = (await getServiceBySlug(props.params.slug)) ?? notFound()

  // Use the schema and the query as you see fit, for example:

  return (
    <>
      <h1 className="text-3xl font-bold">{servicePage.title}</h1>

      <p>{servicePage.description}</p>
      <SanityImage image={servicePage.image} />
      {servicePage.content?.map((content) => (
        <PortableText key={content._key} value={content} />
      ))}

      {servicePage.modules?.map((module) => (
        <>
          <h2>{module.title}</h2>
          <SanityImage image={module.image} />
          {module.content?.map((content) => (
            <PortableText key={content._key} value={content} />
          ))}
        </>
      ))}
    </>
  )
}
