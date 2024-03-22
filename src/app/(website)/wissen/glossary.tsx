import GlossaryComponent from '@/components/glossary-entries'
import Heading from '@/components/heading'
import { GlossaryQueryData } from '@/sanity/lib/queries'

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
              Hier kommt der <u>Glossar</u> Titel Text
            </p>
          </div>
          {glossaryEntries && (
            <GlossaryComponent glossaryEntries={glossaryEntries} />
          )}
        </div>
      </section>
    </>
  )
}
