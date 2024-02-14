import Image from 'next/image'
import Link from 'next/link'
import Heading from './heading'
import logo from './logo.svg'
import sms from './swiss-made-software.svg'

export default function Footer() {
  return (
    <div className="p-4">
      <div className="rounded-md bg-primary-dark text-base-white">
        <div className="justify-between  gap-24 rounded-md bg-black/40 p-12 lg:flex">
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
          <div>
            <Heading level={2} size={4} className="pb-3">
              Newsletter
            </Heading>
            <p>
              Quartalsweise Apptiva-News mit hilfreichen Insights in deinem
              Postfach.
            </p>
          </div>
          <div>
            <Heading level={2} size={4} className="pb-3">
              Socials
            </Heading>
            <ul>
              <li>
                <a href="">LinkedIn</a>
              </li>
              <li>
                <a href="">Xing</a>
              </li>
              <li>
                <a href="">Facebook</a>
              </li>
              <li>
                <a href="">Youtube</a>
              </li>
              <li>X</li>
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
        <div className="flex flex-col justify-center gap-x-12 gap-y-4 py-4 opacity-60 lg:flex-row">
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
    </div>
  )
}
