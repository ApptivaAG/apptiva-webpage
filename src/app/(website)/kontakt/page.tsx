import ContactForm from '@/components/contact-form/contact-form'
import { PageHeader } from '@/components/page-header'
import Underline from '@/components/ui/underline'

export default async function Kontakt() {
  const leadText =
    'Möchtest du uns kennenlernen oder hast du Fragen zu unseren Dienstleistungen? Zögere nicht und nimm mit uns Kontakt auf!'

  return (
    <>
      <PageHeader
        title={<Underline>Kontakt</Underline>}
        lead={leadText}
        links={[{ name: 'Kontakt', href: '/kontakt' }]}
      />
      <ContactForm />
    </>
  )
}
