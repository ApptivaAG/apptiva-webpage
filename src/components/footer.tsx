import Image from 'next/image'
import Link from 'next/link'
import Heading from './heading'
import logo from './logo.svg'
import sms from './swiss-made-software.svg'
import { Input } from './ui/input'
import { Label } from './ui/label'
import Button from './ui/button'

export default function Footer() {
  return (
    <div className="bg-gradient-to-br from-primary-light to-primary-dark bg-300% pt-4">
      <div className="mx-4 rounded-md bg-primary text-base-white">
        <div className="flex flex-wrap justify-between gap-24 rounded-md bg-black/40 p-4 sm:p-12">
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
              <Link href="mail:info@apptiva.ch">info@apptiva.ch</Link>
            </p>
          </div>
          <div className="max-w-lg">
            <Heading level={2} size={4} className="pb-3">
              Newsletter
            </Heading>
            <p>
              Quartalsweise Apptiva-News mit hilfreichen Insights in deinem
              Postfach.
            </p>
            <div className="flex flex-col gap-2 pt-6 md:flex-row md:items-end">
              <div>
                <Label>Dein Vorname</Label>
                <Input intent="outline" type="text" name="name" />
              </div>
              <div>
                <Label>Deine Email-Adresse*</Label>
                <Input intent="outline" type="email" name="email" />
              </div>
              <Button className="max-md:mt-4" intent="secondary">
                Anmelden
              </Button>
            </div>
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
                <a href="https://www.xing.com/companies/apptivaag">Xing</a>
              </li>
              <li>
                <a href="https://www.facebook.com/apptivaag">Facebook</a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCkRetskswz9I4-ohcYuTG3Q">
                  Youtube
                </a>
              </li>
              <li>
                <a href="https://x.com/ApptivaTeam">X</a>
              </li>
            </ul>
          </div>
          <div className="flex items-end">
            <Image
              src={sms}
              className="w-32 mix-blend-luminosity"
              alt="Swiss Made Software"
            ></Image>
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
          <p>
            <Link href={'/tracking'}>Tracking</Link>
          </p>
        </div>
      </div>
      <p className="mx-auto my-16 max-w-2xl p-4 text-3xl font-bold text-base-white md:text-6xl">
        Du bist noch hier? Klasse! Wir haben noch ein paar{' '}
        <strong>Dinge für dich:</strong>
      </p>
      <div className="flex flex-wrap gap-x-24 gap-y-8 bg-primary px-4 py-8 text-base-white sm:p-12 lg:px-32 lg:py-24 xl:justify-between">
        <div>
          <Heading level={2} size={4} className="pb-4">
            Fokusthemen
          </Heading>
          <ul>
            <li>
              <Link href="/conversational-user-interfaces">
                Conversational User Interfaces
              </Link>
            </li>
            <li>
              <Link href={'/konfiguratoren'}>Konfiguratoren</Link>
            </li>
            <li>
              <Link href={'/user-centered-design'}>User Centered Design</Link>
            </li>
          </ul>
        </div>

        <div>
          <Heading level={2} size={4} className="pb-4">
            Angebot
          </Heading>
          <ul>
            <li>
              <Link href="/angebot/development">Development </Link>
            </li>
            <li>
              <Link href="/angebot/chatbots">Chatbots</Link>
            </li>
            <li>
              <Link href="/angebot/consulting">Consulting</Link>
            </li>
          </ul>
        </div>

        <div>
          <Heading level={2} size={4} className="pb-4">
            Workshops
          </Heading>
          <ul>
            <li>
              <Link href="/personas">Personas</Link>
            </li>
            <li>
              <Link href={'/user-centered-design'}>User Centered Design</Link>
            </li>
          </ul>
        </div>

        <div>
          <Heading level={2} size={4} className="pb-4">
            Apptiva
          </Heading>
          <ul>
            <li>
              <Link href="/firmenkultur">Less Waste - Firmenkultur </Link>
            </li>
            <li>
              <Link href="/holacracy">Holacracy</Link>
            </li>
            <li>
              <Link href="/consulting">Zusammenarbeit</Link>
            </li>
            <li>
              <Link href="/team">Team</Link>
            </li>
            <li>
              <Link href="/jobs">Jobs</Link>
            </li>
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
              <Link href="/datenschutz">Datenschutz</Link>
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
