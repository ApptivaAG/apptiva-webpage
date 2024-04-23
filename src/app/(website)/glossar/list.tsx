import GlossaryComponent from '@/components/glossary-entries'
import Heading from '@/components/heading'
import { PageHeader } from '@/components/page-header'
import { glossaryQuery } from '@/sanity/lib/queries'
import { InferType } from 'groqd'

export function GlossaryList(props: {
  data?: InferType<typeof glossaryQuery>
}) {
  if (!props.data) {
    return <>Empty</>
  }
  return (
    <>
      <PageHeader
        title="Glossar"
        lead="Hier haben wir alle wichtigen Fachbegriffe rund um die Themen
        Chatbot und Conversational AI für dich zusammengestellt."
        links={[{ name: 'Glossar', href: '/glossar' }]}
      />
      <div className="full text-primary">
        <div className="content ">
          <section className="full py-16 text-primary">
            <div className="content">
              <Heading level={2} size={3} className="col-left">
                Glossar
              </Heading>
              {props.data && <GlossaryComponent glossaryEntries={props.data} />}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
