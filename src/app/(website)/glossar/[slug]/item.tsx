import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import { glossaryBySlugQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { InferType } from 'groqd'

export default function Item(props: {
  glossary: InferType<typeof glossaryBySlugQuery>
}) {
  if (!props.glossary) return <div>Empty</div>

  return (
    <>
      <Heading level={2}>{props.glossary.title}</Heading>
      {props.glossary.summary && (
        <PortableText value={props.glossary.summary} />
      )}
      {props.glossary?.modules?.map((module) => (
        <>
          <Heading level={3} size={4}>
            {module.title}
          </Heading>
          <SanityImage image={module.image} />
          {module.content && <PortableText value={module.content} />}
        </>
      ))}
        <Heading level={3}>Tags</Heading>
      <ul>
        {props.glossary.tags?.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
    </>
  )
}
