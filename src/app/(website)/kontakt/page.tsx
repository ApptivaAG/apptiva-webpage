import ContactForm from '@/components/contact-form/contact-form'
import Hero from '../_root/hero'
import { PageHeader } from '@/components/page-header'

export default async function Kontakt() {
  const leadText =
    'Möchtest du uns kennenlernen oder hast du Fragen zu unseren Dienstleistungen? Zögere nicht und nimm mit uns Kontakt auf!'

  return (
    <>
      <PageHeader
        title="Kontakt"
        lead={leadText}
        links={[{ name: 'Kontakt', href: '/kontakt' }]}
      />
      <ContactForm />
    </>
  )
}
