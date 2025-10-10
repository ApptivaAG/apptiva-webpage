import Heading from '@/components/heading'
import Contact from '@/components/module/contact'
import { PageHeader } from '@/components/page-header'
import Button from '@/components/ui/button'
import Underline from '@/components/ui/underline'
import { orderGlossaryByTitle } from '@/domain/glossary'
import { faqsQuery, glossaryQuery, ModuleData } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import Blogposts from './blogposts'
import FAQ from './faq'
import Glossar from './glossary'
import KnowledgePreview from './preview'

const meta = {
  title: 'Know-how wird bei uns gross geschrieben.',
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

const contactModule = {
  _key: '55630fc5cd6c',
  _type: 'module',
  content: [
    {
      _key: 'a209a434d3e3',
      _type: 'block',
      children: [
        {
          _key: 'fcfa50d81b5b',
          _type: 'span',
          marks: [],
          text: 'Drückt der Schuh ',
        },
        {
          _key: 'fcfa50d81b5b',
          _type: 'span',
          marks: ['underline'],
          text: 'bei einem Thema',
        },
        {
          _key: '9a53858d51c0',
          _type: 'span',
          marks: [],
          text: ', das wir noch nicht behandelt haben?',
        },
      ],
      markDefs: [],
      style: 'h3',
    },
    {
      _key: '4d23906bd75c',
      _type: 'block',
      children: [
        {
          _key: '77eb86fc6fcc',
          _type: 'span',
          marks: [],
          text: 'Kontaktiere uns gerne – wir sind möglicherweise in der Lage, dir weiterzuhelfen.',
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ],
  title: 'Kontakt',
  type: 'contact',
  persons: [
    {
      _createdAt: '2024-03-14T11:01:50Z',
      _id: 'ce2fc8d7-2d78-415c-9f72-9d4c7de39fba',
      _rev: 'weZehhaScXOr3OfXvD9Iux',
      _type: 'person',
      _updatedAt: '2024-04-11T08:34:56Z',
      claim: 'Vorauszeichnender Denker',
      contact: {
        _type: 'contact',
        mail: 'philip.schoenholzer@apptiva.ch',
        phone: '079 407 00 83',
        socialNetworks: [
          {
            _key: '4e6baef660f3',
            _type: 'social',
            title: 'LinkedIn',
            url: 'https://www.linkedin.com/in/philip-schoenholzer/',
          },
          {
            _key: '8dd06a4c2a61',
            _type: 'social',
            title: 'Xing',
            url: 'https://www.xing.com/profile/Philip_Schoenholzer',
          },
        ],
      },
      education: 'MAS in Requirements Engineering und Interaction Design',
      image: {
        _type: 'imageWithAlt',
        alt: 'Philip Schönholzer, Produktentwickler, UX-Experte und Unternehmer bei der Apptiva.',
        asset: {
          _ref: 'image-792b4d6fa0f2da90d9b602b5520420f2d2123b29-2827x4238-jpg',
          _type: 'reference',
        },
      },
      imageWithoutBackground: {
        _type: 'imageWithAlt',
        alt: 'Philip Schönholer als deine Ansprechperson bei der Apptiva.',
        asset: {
          _ref: 'image-5987352030bb06237d558136275dd763c3d9bef6-8192x5464-png',
          _type: 'reference',
        },
      },
      personName: 'Philip Schönholzer',
      role: 'Produktentwickler, UX-Experte, Unternehmer',
      slogan:
        'Das Leben von Menschen zu erleichtern gibt mir den Kick. Deshalb kämpfe ich für einfach geniale Lösungen.',
      slug: {
        _type: 'slug',
        current: 'philip-schoenholzer',
      },
    },
  ],
} as unknown as ModuleData
export default async function Knowledge() {
  const { published: faqPublished, draft: faqDraft } = await load(
    faqsQuery,
    (await draftMode()).isEnabled,
    undefined,
    ['faq']
  )

  const { published: glossaryPublished, draft: glossaryDraft } = await load(
    glossaryQuery,
    (await draftMode()).isEnabled,
    undefined,
    ['glossary']
  )

  return (
    <>
      <PageHeader
        title={
          <>
            <Underline>Know-how</Underline> wird bei uns{' '}
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
          <div className="pb-8 pt-4">
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
      {(await draftMode()).isEnabled ? (
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
      <Contact module={contactModule} />
    </>
  );
}
