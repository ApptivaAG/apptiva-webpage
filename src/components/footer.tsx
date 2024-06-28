import Image from 'next/image'
import Link from 'next/link'
import Heading from './heading'
import logo from './logo.svg'
import NewsletterForm from './newsletter/newsletter-form'
import sms from './swiss-made-software.svg'
import lbv from './lehrbetrieb-vignette.png'
import whatsApp from './whatsapp.svg'
import Underline from './ui/underline'

export default function Footer() {
  return (
    <div className="bg-gradient-to-br from-primary-light to-primary-dark bg-300% pt-4 [&_a]:underline [&_a]:decoration-from-font [&_a]:underline-offset-2 hover:[&_a]:decoration-2">
      <div className="mx-4 rounded-md bg-primary text-base-white">
        <div className="flex flex-wrap justify-between gap-x-24 gap-y-12 rounded-md bg-black/40 p-4 sm:p-12">
          <div>
            <Link href={'/'}>
              <Image
                src={logo}
                className="mt-2 h-7 w-auto"
                alt="Apptiva Logo"
              ></Image>
            </Link>
            <address className="pt-4 not-italic">
              Apptiva AG <br />
              Eichweid 1 <br />
              6203 Sempach Station
            </address>
            <p className="pt-4">
              <Link href="tel:+41413222626">041 322 26 26</Link>
            </p>
            <p className="pt-1">
              <Link href="mailto:info@apptiva.ch">info@apptiva.ch</Link>
            </p>
            <p className="pt-3">
              <a
                title="WhatsApp Chat starten"
                href="https://wa.me/41766012056"
                rel="noopener noreferrer"
                target="_blank"
                className="flex gap-1 rounded bg-base-white px-3 py-2 text-primary !no-underline"
              >
                <Image height="25" src={whatsApp} alt="WhatsApp Logo" />
                Chat auf WhatsApp
              </a>
            </p>
          </div>
          <div className="max-w-lg space-y-3">
            <Heading level={2} size={4} className="">
              Newsletter
            </Heading>
            <p>
              Quartalsweise Apptiva-News mit hilfreichen Insights in deinem
              Postfach.
            </p>
            <NewsletterForm />
          </div>
          <div>
            <Heading level={2} size={4} className="pb-3">
              Socials
            </Heading>
            <ul className="space-y-1">
              <li>
                <a href="https://www.linkedin.com/company/apptiva-ag">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCkRetskswz9I4-ohcYuTG3Q">
                  Youtube
                </a>
              </li>
            </ul>
          </div>
          <div className="gap4 flex items-end space-y-5 lg:flex-col lg:items-center">
            <Link
              href={
                'https://www.swissmadesoftware.org/companies/apptiva-ag/home.html'
              }
            >
              <Image
                src={sms}
                className="w-32 mix-blend-luminosity"
                alt="Swiss Made Software"
              ></Image>
            </Link>
            <Link href={'https://www.berufsbildungplus.ch/'}>
              <Image
                src={lbv}
                className=" w-28 mix-blend-luminosity"
                alt="Lehrbetrieb Vignette"
              ></Image>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-x-12 gap-y-4 p-4 opacity-60 sm:px-12 lg:flex-row">
          <p>© 2015 - 2024 Apptiva AG</p>
          <p>
            <Link href={'/'}>Softwareentwicklung in der Schweiz</Link>
          </p>
          <p>
            <Link href={'/impressum'}>Impressum</Link>
          </p>
          <p>
            <Link href={'/datenschutzerklaerung'}>Datenschutzerklärung</Link>
          </p>
        </div>
      </div>
      <p className="mx-auto my-16 max-w-[47rem] px-12 text-3xl font-bold text-base-white md:text-4xl lg:text-6xl">
        <RandomText />
      </p>
      <div className="grid gap-x-24 gap-y-8 text-nowrap bg-primary px-4 py-8 text-base-white [grid-template-columns:repeat(auto-fit,minmax(150px,1fr));] sm:p-12 lg:px-32 lg:py-24 max-sm:[&_li]:py-1">
        <div>
          <Heading level={2} size={4} className="pb-4">
            Fokusthemen
          </Heading>
          <ul>
            <li>
              <Link href="/angebot/development/schnittstellen">
                Schnittstellen
              </Link>
            </li>
            <li>
              <Link href="/angebot/development/konfiguratoren">
                Konfiguratoren
              </Link>
            </li>
            <li>
              <Link href="/angebot/development/webshops">Webshops</Link>
            </li>
            <li>
              <Link href="/angebot/development/weiterentwicklung">
                Weiterentwicklung
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Heading level={2} size={4} className="pb-4">
            Angebot
          </Heading>

          <ul>
            <li>
              <Link href="/angebot/development">Development</Link>
            </li>
            <li>
              <Link href="/angebot/chatbots">Chatbots</Link>
            </li>
            <li>
              <Link href="/angebot/development/webentwicklung">
                Webentwicklung
              </Link>
            </li>
            <li>
              <Link href="/angebot/development/app-entwicklung">
                App Entwicklung
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Heading level={2} size={4} className="pb-4">
            Workshops
          </Heading>
          <ul>
            <li>
              <Link href="/angebot/architektur-review">Architektur Review</Link>
            </li>
            <li>
              <Link href="/angebot/persona-workshop">Persona Workshop</Link>
            </li>
            <li>
              <Link href="/angebot/user-centered-design-workshop">
                User-Centered Design
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Heading level={2} size={4} className="pb-4">
            Apptiva
          </Heading>
          <ul>
            {/* <li>
              <Link href="/holacracy">Holacracy</Link>
            </li>
            <li>
              <Link href="/consulting">Zusammenarbeit</Link>
            </li> */}
            <li>
              <Link href="/ueber-uns">Über uns</Link>
            </li>
            {/* <li>
              <Link href="/jobs">Jobs</Link>
            </li> */}
          </ul>
        </div>

        <div>
          <Heading level={2} size={4} className="pb-4">
            Rechtliches
          </Heading>

          <ul>
            <li>
              <Link href="/impressum">Impressum</Link>
            </li>
            <li>
              <Link href="/datenschutzerklaerung">Datenschutz</Link>
            </li>
            <li>
              <Link href="/tracking">Tracking</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function RandomText() {
  switch (Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4) {
    case 0:
      return (
        <span>
          Du hast es geschafft! Zur Belohnung gibt&apos;s unser{' '}
          <Underline>Sahnehäubchen.</Underline>
        </span>
      )
    case 1:
      return (
        <span>
          Deine Neugier hat dich hierher geführt. Tauche jetzt tiefer in unsere{' '}
          <Underline>vielfältigen Inhalte</Underline> ein.
        </span>
      )
    case 2:
      return (
        <span>
          Du bist noch hier? Klasse! Wir haben noch ein paar{' '}
          <Underline>Dinge für dich:</Underline>
        </span>
      )
    case 3:
      return (
        <span>
          <Underline>Deine Entdeckungsreise</Underline> ist noch nicht vorbei.
          Schau, was es noch zu erkunden gibt!
        </span>
      )
    case 4:
      return (
        <span>
          Finde heraus, was noch auf <Underline>dich wartet:</Underline>
        </span>
      )
    default:
      return null
  }
}
