import Heading from '@/components/heading'
import { PageHeader } from '@/components/page-header'
import Blogposts from './blogposts'
import FAQ from './faq'
import Glossar from './glossary'

export default async function Knowledge() {
  return (
    <>
      <PageHeader
        title="Wissen"
        lead="Interessantes aus der Apptiva"
        links={[{ name: 'Wissen', href: '/wissen' }]}
      />
      <section className="full py-16 text-primary">
        <div className="content">
          <Heading level={2} size={3}>
            WISSEN wird bei uns gross geschrieben
          </Heading>
          <div className="mt-4 max-w-2xl lg:mt-6">
            <p>
              In unseren wöchentlichen Wissensaustausch-Sitzungen vermitteln wir
              untereinander abwechselnd neues Wissen. Unser Ziel ist es, dieses
              Wissen zu teilen und nicht für uns zu behalten. Deshalb haben wir
              es für dich aufgeschrieben: Durchstöbere unsere Blogposts,
              erweitere deinen Wortschatz mit unserem Glossar oder finde
              Antworten auf deine Fragen in unserem FAQ. Drückt der Schuh bei
              einem Thema, das wir noch nicht behandelt haben, kontaktiere uns
              gerne - wir sind möglicherweise in der Lage, dir weiterzuhelfen.
            </p>
          </div>
        </div>
      </section>
      <Blogposts />
      <FAQ />
      <Glossar />
    </>
  )
}
