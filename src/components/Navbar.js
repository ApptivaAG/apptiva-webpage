import React from 'react'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

import { Container as DefaultContainer } from '../style'
import logo from '../img/logo.svg'
import NavigationMenuDesktop, { DynLink } from './NavigationMenuDesktop'
import NavigationMenuMobile from './NavigationMenuMobile'

const navbarData = [
  {
    title: 'Dienstleistungen',
    href: '/dienstleistungen/',
    type: 'one',
    callout: {
      image: (
        <StaticImage src="../../content/services/individuelle-entwicklung/apps.png" />
      ),
      title: 'Individuelle Softwareentwicklung',
      text: 'Apps für Mobile und Desktop',
      href: '/individuelle-entwicklung/',
      items: [
        {
          title: 'Mobile Apps',
          text: 'Apps für iOS und Android',
          href: '/mobile-apps-ios-android/',
        },
        {
          title: 'Web Apps',
          text: 'Apps und Applikationen im Browser',
          href: '/web-apps/',
        },
        {
          title: 'Dashboards',
          text: 'Individuelle für Ihre Bedürfnisse',
          href: '/custom-dashboard/',
        },
        {
          title: 'Webshops',
          text: 'Einzigartige und spezialisierte Webshops',
          href: '/einzigartiger-webshop/',
        },
        {
          title: 'Zahlungslösungen',
          text: 'Bargeldlose in Apps bezahlen',
          href: '/bargeldlos-bezahlen/',
        },
        {
          title: 'Weiterentwicklung',
          text: 'Bestehenden Apps und Produkte weiterentwickeln',
          href: '/weiterentwicklung-apps-produkte/',
        },
      ],
    },
    items: [
      {
        image: (
          <StaticImage src="../../content/services/chatbots/chatbot-window.png" />
        ),
        title: 'Chatbots',
        text: 'Apps für Mobile und Desktop',
        href: '/chatbots/',
      },
      {
        image: (
          <StaticImage src="../../content/services/produktkonfiguratoren/partyplaner.png" />
        ),
        title: 'Konfiguratoren',
        text: 'Angebots- & Produkt-Konfiguratoren',
        href: '/produktkonfiguratoren/',
      },
      {
        image: (
          <StaticImage src="../../content/services/support/unterstuetzung.png" />
        ),
        title: 'Unterstützung',
        text: 'Apps für Mobile und Desktop',
        href: '/unterstuetzung/',
      },
    ],
  },
  {
    title: 'Über uns',
    href: '/ueber-uns/',
    type: 'two',
    items: [
      {
        title: 'Unternehmen',
        text: 'Mehr über uns erfahren',
        href: '/ueber-uns/',
      },
      {
        title: 'Team',
        text: 'Unser erfahrenes Entwicklungsteam',
        href: '/ueber-uns/#team',
      },
      {
        title: 'Kompetenzen',
        text: 'Dies sind unsere Kompetenzen',
        href: '/unsere-kompetenzen/',
      },
      {
        title: 'Vorgehen',
        text: 'Unser Vorgehen macht uns aus',
        href: '/vorgehen/',
      },
      {
        title: 'Blog',
        text: 'Blogbeiträge',
        href: '/blog/',
      },
      {
        title: 'Jobs',
        text: 'Jetzt bewerben',
        href: '/jobs/',
      },
    ],
  },
  {
    title: 'Referenzen',
    href: '/referenzen/',
  },
  {
    title: 'Kontakt',
    href: '/kontakt/',
  },
]

const NavBar = styled.header`
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.color.primary};
  z-index: 90;
  border-bottom: 1px solid #fff2;
`

const Container = styled(DefaultContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.img`
  display: block;
  height: 30px;
  padding: 0.8rem 0;
`

const MenuButton = styled.div`
  padding: 0.5em;
  margin-right: -0.5em;
  border: none;
  background-color: transparent;
  color: white;
  font-weight: 600;
  cursor: pointer;

  @media (min-width: 901px) {
    display: none;
  }

  &:active ~ nav,
  &:focus ~ nav {
    transform: translate3d(-26rem, 0px, 0px);
  }
`

const Navbar = ({ location }) => (
  <NavBar>
    <Container>
      <DynLink type={location} nav="/#start" data-element="logo">
        <Logo src={logo} alt="Apptiva" width="147" height="30" />
      </DynLink>

      <MenuButton tabIndex="0">Menu</MenuButton>
      <NavigationMenuDesktop data={navbarData} />
      <NavigationMenuMobile data={navbarData} location={location} />
    </Container>
  </NavBar>
)

export default Navbar
