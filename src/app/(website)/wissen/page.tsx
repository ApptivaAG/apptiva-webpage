import { PageHeader } from '@/components/page-header'
import { faqsQuery, glossaryQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
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
        title="Wissen wird bei uns gross geschrieben"
        lead={lead}
        links={[{ name: 'Wissen', href: '/wissen' }]}
      />
      <Blogposts />
      {/* <FAQ /> */}
      {/* <Glossar /> */}
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
    </>
  )
}
