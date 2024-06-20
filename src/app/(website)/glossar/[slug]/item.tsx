import Module from '@/components/module'
import { PageHeader } from '@/components/page-header'
import { glossaryBySlugQuery } from '@/sanity/lib/queries'
import portableTextToString from '@/domain/portable-text-to-string'
import { InferType } from 'groqd'
import GlossaryPortableText from './glossar-portable-text'

export default function Item(props: {
  glossary: InferType<typeof glossaryBySlugQuery>
}) {
  if (!props.glossary) return <div>Empty</div>

  const { glossary } = props

  const title = glossary.header?.title
    ? portableTextToString(glossary.header.title)
    : 'Glossar'
  return (
    <>
      <PageHeader
        title={glossary.header?.title ?? 'Glossar'}
        lead={glossary.summary ?? glossary.header?.lead}
        image={glossary.header?.image}
        links={[
          { name: 'Glossar', href: '/glossar' },
          {
            name: title,
            href: `/glossar/${glossary.slug}`,
          },
        ]}
      />

      {glossary.content && (
        <div className="py-16">
          <div className="prose">
            <GlossaryPortableText content={glossary.content} />
          </div>
        </div>
      )}
    </>
  )
}
