import Heading from '@/components/heading'
import Section from '@/components/section'
import UnderlineForLink from '@/components/ui/underline-for-link'
import Link from 'next/link'
import { ContactFormContent } from './contact-form-content'

const ContactForm = () => {
  return (
    <Section intent={'light'} level={'one'}>
      <div className="content">
        <div className="col-left mt-4 max-w-2xl lg:mt-6">
          <Heading level={2} size={5}>
            Telefon
          </Heading>
          <p>
            <Link href="tel:+41413222626">
              <UnderlineForLink>041 322 26 26</UnderlineForLink>
            </Link>
          </p>
          <Heading level={2} size={5} className="pt-3">
            Mail
          </Heading>
          <p>
            <Link href="mailto:info@apptiva.ch">
              <UnderlineForLink>info@apptiva.ch</UnderlineForLink>
            </Link>
          </p>
          <Heading level={2} size={5} className="pt-3">
            Adresse
          </Heading>
          <p>
            Apptiva AG
            <br />
            Obergrundstrasse 73
            <br />
            6003 Luzern
          </p>
        </div>
        <div className="col-right max-lg:mt-4">
          <div className="flex flex-col gap-2 pt-6">
            <Heading level={2} size={5}>
              Kontaktformular
            </Heading>
            <ContactFormContent />
          </div>
        </div>
      </div>
    </Section>
  )
}

export default ContactForm
