import GlossaryComponent from '@/components/glossary-entries'
import Heading from '@/components/heading'
import UnderlineForLink from '@/components/ui/underline-for-link'
import { GlossaryQueryData } from '@/sanity/lib/queries'
import Link from 'next/link'

export default function Glossar(props: { data: GlossaryQueryData }) {
  const glossaryEntries = props.data

  return (
    <>
      <section className="full py-16 text-primary">
        <div className="content">
          <Heading level={2} size={3} className="col-left">
            Glossar
          </Heading>
          <div className="col-right max-lg:mt-4">
            <p>
              Hier haben wir alle wichtigen Fachbegriffe rund um die Themen
              Chatbot und Conversational AI für dich zusammengestellt.
            </p>
          </div>
          {glossaryEntries && (
            <GlossaryComponent glossaryEntries={glossaryEntries.slice(0, 5)} />
          )}
          <div className="col-right mt-8">
            <p>
              Tauche ein in unser Glossar und erweitere dein Verständnis über
              Begriffe wie Chatbots, KI, und mehr.
              <Link className="self-end pl-2" href={`/glossar`}>
                <UnderlineForLink>→&ensp;Alle Begriffe</UnderlineForLink>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
