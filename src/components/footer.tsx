'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import Heading from './heading'
import lbv from './lehrbetrieb-vignette.png'
import logo from './logo.svg'
import NewsletterForm from './newsletter/newsletter-form'
import sms from './swiss-made-software.svg'
import Underline from './ui/underline'
import UnderlineForLink from './ui/underline-for-link'
import whatsApp from './whatsapp.svg'

export default function Footer() {
  const { ref, inView } = useInView({
    rootMargin: '300% 0px 0px 0px',
    threshold: 0,
  })

  return (
    <>
      {/* The footer has to be higher in the z-index, so that the content coming after the footer is behind */}
      <footer>
        <div className="relative z-10 bg-gradient-to-br from-primary-light to-primary-dark bg-300% py-4">
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
                  <Link href="tel:+41413222626">
                    <UnderlineForLink>041 322 26 26</UnderlineForLink>
                  </Link>
                </p>
                <p className="pt-1">
                  <Link href="mailto:info@apptiva.ch">
                    <UnderlineForLink>info@apptiva.ch</UnderlineForLink>
                  </Link>
                </p>
                <p className="pt-3">
                  <a
                    title="WhatsApp Chat starten"
                    href="https://wa.me/41766012056"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex gap-1 rounded bg-base-white px-3 py-2 text-primary !no-underline transition-colors hover:bg-base-white/80"
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
                      <UnderlineForLink>LinkedIn</UnderlineForLink>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UCkRetskswz9I4-ohcYuTG3Q">
                      <UnderlineForLink>Youtube</UnderlineForLink>
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
                    className="w-28 mix-blend-luminosity"
                    alt="Lehrbetrieb Vignette"
                  ></Image>
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-x-12 gap-y-4 p-4 opacity-60 sm:px-12 lg:flex-row">
              <p>© 2015 - 2024 Apptiva AG</p>
              <p>
                <Link href={'/'}>
                  <UnderlineForLink>
                    Softwareentwicklung in der Schweiz
                  </UnderlineForLink>
                </Link>
              </p>
              <p>
                <Link href={'/impressum'}>
                  <UnderlineForLink>Impressum</UnderlineForLink>
                </Link>
              </p>
              <p>
                <Link href={'/datenschutzerklaerung'}>
                  <UnderlineForLink>Datenschutzerklärung</UnderlineForLink>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="absolute z-20 ml-[50vw] flex h-lvh w-px flex-col">
          <div className="flex-1"></div>
          <div className="h-0.5" ref={ref}></div>
        </div>
        <div
          className={`${!inView ? 'fixed' : 'relative'} left-0 right-0 top-0 z-0 flex min-h-lvh flex-col justify-end`}
        >
          <div className="flex flex-1 flex-col justify-end bg-gradient-to-br from-primary-light to-primary-dark bg-300% py-4">
            <p className="mx-auto my-36 max-w-[47rem] px-12 text-3xl font-bold text-base-white md:text-4xl lg:text-6xl">
              <RandomText />
            </p>
          </div>
          <div className="grid gap-x-24 gap-y-8 text-nowrap bg-primary px-4 py-8 text-base-white [grid-template-columns:repeat(auto-fit,minmax(150px,1fr));] sm:p-12 lg:px-32 lg:py-24 max-sm:[&_li]:py-1">
            <div>
              <Heading level={2} size={4} className="pb-4">
                Fokusthemen
              </Heading>
              <ul>
                <li>
                  <Link href="/angebot/development/schnittstellen">
                    <UnderlineForLink>Schnittstellen</UnderlineForLink>
                  </Link>
                </li>
                <li>
                  <Link href="/angebot/development/konfiguratoren">
                    <UnderlineForLink>Konfiguratoren</UnderlineForLink>
                  </Link>
                </li>
                <li>
                  <Link href="/angebot/development/webshops">
                    <UnderlineForLink>Webshops</UnderlineForLink>
                  </Link>
                </li>
                <li>
                  <Link href="/angebot/development/weiterentwicklung">
                    <UnderlineForLink>Weiterentwicklung</UnderlineForLink>
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
                  <Link href="/angebot/development">
                    <UnderlineForLink>Development</UnderlineForLink>
                  </Link>
                </li>
                <li>
                  <Link href="/angebot/chatbots">
                    <UnderlineForLink>Chatbots</UnderlineForLink>
                  </Link>
                </li>
                <li>
                  <Link href="/angebot/development/webentwicklung">
                    <UnderlineForLink>Webentwicklung</UnderlineForLink>
                  </Link>
                </li>
                <li>
                  <Link href="/angebot/development/app-entwicklung">
                    <UnderlineForLink>App Entwicklung</UnderlineForLink>
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
                  <Link href="/angebot/architektur-review">
                    <UnderlineForLink>Architektur Review</UnderlineForLink>
                  </Link>
                </li>
                <li>
                  <Link href="/angebot/persona-workshop">
                    <UnderlineForLink>Persona Workshop</UnderlineForLink>
                  </Link>
                </li>
                <li>
                  <Link href="/angebot/user-centered-design-workshop">
                    <UnderlineForLink>User-Centered Design</UnderlineForLink>
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
                  <Link href="/ueber-uns">
                    <UnderlineForLink>Über uns</UnderlineForLink>
                  </Link>
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
                  <Link href="/impressum">
                    <UnderlineForLink>Impressum</UnderlineForLink>
                  </Link>
                </li>
                <li>
                  <Link href="/datenschutzerklaerung">
                    <UnderlineForLink>Datenschutz</UnderlineForLink>
                  </Link>
                </li>
                <li>
                  <Link href="/tracking">
                    <UnderlineForLink>Tracking</UnderlineForLink>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

const RandomText = React.memo(() => {
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
})
