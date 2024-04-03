import Heading from '@/components/heading'
import { PageHeader } from '@/components/page-header'
import Button from '@/components/ui/button'
import Underline from '@/components/ui/underline'
import { faqsQuery, glossaryQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import Blogposts from './blogposts'
import FAQ from './faq'
import Glossar from './glossary'
import KnowledgePreview from './preview'

export default async function Knowledge() {
  const { published: faqPublished, draft: faqDraft } = await load(
    faqsQuery,
    draftMode().isEnabled,
    undefined,
    ['faq']
  )

  const { published: glossaryPublished, draft: glossaryDraft } = await load(
    glossaryQuery,
    draftMode().isEnabled,
    undefined,
    ['glossary']
  )

  const lead =
    'In unseren wöchentlichen Wissensaustausch-Sitzungen vermitteln wir untereinander abwechselnd neues Wissen. Unser Ziel ist es, dieses Wissen zu teilen und nicht für uns zu behalten. Deshalb haben wir es für dich aufgeschrieben: Durchstöbere unsere Blogposts, erweitere deinen Wortschatz mit unserem Glossar oder finde Antworten auf deine Fragen in unserem FAQ. Drückt der Schuh bei einem Thema, das wir noch nicht behandelt haben, kontaktiere uns gerne - wir sind möglicherweise in der Lage, dir weiterzuhelfen.'

  return (
    <>
      <PageHeader
        title={
          <>
            Wissen wird bei uns{' '}
            <Underline className="uppercase">gross</Underline> geschrieben
          </>
        }
        lead={lead}
        links={[{ name: 'Wissen', href: '/wissen' }]}
      />
      <Blogposts show="blog">
        <div className="content space-y-8">
          <Heading level={2} size={3}>
            Neueste Blogposts
          </Heading>
          <div>
            <Link href={'/blog/'}>
              <Button element="div" className="inline">
                Alle Blogposts
              </Button>
            </Link>
          </div>
        </div>
      </Blogposts>
      {draftMode().isEnabled ? (
        <KnowledgePreview
          initialFAQs={faqDraft}
          initialGlossar={glossaryDraft}
        />
      ) : (
        <>
          <FAQ data={faqPublished} />
          <Glossar data={glossaryPublished} />
        </>
      )}
      <Blogposts show="apptiva-lernt">
        <div className="content space-y-8">
          <Heading level={2} size={3}>
            Apptiva lernt
          </Heading>
          <p>
            Kleine (technische) Wissenshappen, die wir jede Woche neu dazu
            lernen.
          </p>
          <div>
            <Link href={'/blog/'}>
              <Button element="div" className="inline">
                Alle Engineering Posts
              </Button>
            </Link>
          </div>
        </div>
      </Blogposts>
    </>
  )
}
