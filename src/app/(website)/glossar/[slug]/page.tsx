import SanityImage from '@/components/sanity-image'
import { getGlossaryItemBySlug } from '@/utils/glossary'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

export default async function Glossary(props: { params: { slug: string } }) {
  const glossary =
    (await getGlossaryItemBySlug(props.params.slug)) ?? notFound()
  return (
    <>
      <h1>{glossary.title}</h1>
      {glossary.summary && <PortableText value={glossary.summary} />}
      {glossary?.modules?.map((module) => (
        <>
          <h2>{module.title}</h2>
          <SanityImage image={module.image} />
          {module.content && <PortableText value={module.content} />}
        </>
      ))}
    </>
  )
}
