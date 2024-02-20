import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import { glossaryBySlugQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { PortableText } from '@portabletext/react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function Glossary(props: { params: { slug: string } }) {
  const {published: glossary} =
    (await load(glossaryBySlugQuery, draftMode().isEnabled, props.params, ['glossary'])) ?? notFound()
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
      <ul>
        <Heading level={3}>Tags</Heading>
      {glossary.tags?.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
    </>
  )
}
