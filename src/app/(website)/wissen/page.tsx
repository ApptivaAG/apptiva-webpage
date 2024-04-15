import Heading from '@/components/heading'
import { PageHeader } from '@/components/page-header'
import Button from '@/components/ui/button'
import Underline from '@/components/ui/underline'
import { faqsQuery, glossaryQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { orderGlossaryByTitle } from '@/utils/glossary'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import Blogposts from './blogposts'
import FAQ from './faq'
import Glossar from './glossary'
import KnowledgePreview from './preview'

const meta = {
  title: 'Wissen wird bei uns gross geschrieben.',
  description:
    'In unseren wöchentlichen Wissensaustausch-Sitzungen vermitteln wir untereinander abwechselnd neues Wissen. Unser Ziel ist es, dieses Wissen zu teilen und nicht für uns zu behalten. Deshalb haben wir es für dich aufgeschrieben.',
}
const url = '/wissen'

export const metadata: Metadata = {
  ...meta,
  alternates: { canonical: url },
  openGraph: {
    ...meta,
    url,
  },
}

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

  return (
    <>
      <PageHeader
        title={
          <>
            <Underline>Wissen</Underline> wird bei uns{' '}
            <Underline>gross</Underline> geschrieben.
          </>
        }
        lead={meta.description}
        links={[{ name: 'Wissen', href: url }]}
      />
      <Blogposts show="blog">
        <div className="content space-y-4">
          <Heading level={2} size={3}>
            Neueste Blogposts
          </Heading>
          <p>
            Wissenswertes über Chatbots, Softwareentwicklung und alles Mögliche
            aus der Apptiva Welt.
          </p>
          <div className=" pb-8 pt-4">
            <Link href={'/blog/'}>
              <Button element="div" className="inline" intent="secondary">
                Alle Blogposts
              </Button>
            </Link>
          </div>
        </div>
      </Blogposts>

      <Blogposts show="apptiva-lernt">
        <div className="content space-y-4">
          <Heading level={2} size={3}>
            Apptiva lernt
          </Heading>
          <p>
            Kleine (technische) Wissenshappen, die wir jede Woche neu dazu
            lernen.
          </p>
          <div className="pb-8 pt-4">
            <Link href={'/apptiva-lernt/'}>
              <Button element="div" className="inline" intent="secondary">
                Alle Engineering Posts
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
          <Glossar data={orderGlossaryByTitle(glossaryPublished)} />
        </>
      )}
    </>
  )
}
