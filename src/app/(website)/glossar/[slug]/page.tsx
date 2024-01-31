import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import { getGlossaryItemBySlug } from '@/utils/glossary'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

export default async function Glossary(props: { params: { slug: string } }) {
  const glossary =
    (await getGlossaryItemBySlug(props.params.slug)) ?? notFound()
  return (
    <>
      <Heading level={2}>{glossary.title}</Heading>
      {glossary.summary && <PortableText value={glossary.summary} />}
      {glossary?.modules?.map((module) => (
        <>
          <Heading level={3} size={4}>
            {module.title}
          </Heading>
          <SanityImage image={module.image} />
          {module.content && <PortableText value={module.content} />}
        </>
      ))}
    </>
  )
}
