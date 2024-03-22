import BreadCrumb from '@/components/bread-crumb'
import Heading from '@/components/heading'
import Module from '@/components/module'
import StyledPortableText from '@/components/styled-portable-text'
import { glossaryBySlugQuery } from '@/sanity/lib/queries'
import { InferType } from 'groqd'

export default function Item(props: {
  glossary: InferType<typeof glossaryBySlugQuery>
}) {
  if (!props.glossary) return <div>Empty</div>

  const { glossary } = props

  return (
    <>
      <header className="full relative mt-[-8rem] min-h-fit animate-gradient items-center bg-gradient-to-br from-primary-light to-primary-dark bg-300% pb-8 pt-32 text-base-white md:pb-16 md:pt-44">
        <div className="content">
          <BreadCrumb
            className="pb-6"
            links={[
              { name: 'Glossar', href: '/glossar' },
              {
                name: glossary.title ?? 'Glossar',
                href: `/glossar/${glossary.slug}`,
              },
            ]}
          />
          <Heading level={1}>
            <span dangerouslySetInnerHTML={{ __html: glossary.title }} />
          </Heading>
          {glossary.summary && (
            <StyledPortableText content={glossary.summary} />
          )}
        </div>
      </header>

      {glossary.modules?.map((module) => (
        <Module key={module._key} module={module} customers={undefined} />
      ))}

      <Heading level={3}>Tags</Heading>
      <ul>{props.glossary.tags?.map((tag) => <li key={tag}>{tag}</li>)}</ul>
    </>
  )
}
