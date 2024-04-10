import ContactForm from '@/components/contact-form/contact-form'
import { PageHeader } from '@/components/page-header'
import Underline from '@/components/ui/underline'
import { Metadata } from 'next'

const meta = {
  title: 'Kontakt',
  description:
    'Möchtest du uns kennenlernen oder hast du Fragen zu unseren Dienstleistungen? Zögere nicht und nimm mit uns Kontakt auf!',
}
const url = '/kontakt'

export const metadata: Metadata = {
  ...meta,
  alternates: { canonical: url },
  openGraph: {
    ...meta,
    url,
  },
}

export default async function Kontakt() {
  return (
    <>
      <PageHeader
        title={<Underline>{meta.title}</Underline>}
        lead={meta.description}
        links={[{ name: 'Kontakt', href: url }]}
      />
      <ContactForm />
    </>
  )
}
