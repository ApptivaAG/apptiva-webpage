import React from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'styled-components'

import { Container as DefaultContainer } from '../layouts/style'
import logo from '../img/logo.svg'

const NavBar = styled.nav`
  position: sticky;
  top: 0;
  background-color: ${props => props.theme.color.primary};
  z-index: 90;
`

const Container = DefaultContainer.extend`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.img`
  display: block;
  height: 2.1rem;
  padding: 1rem 0;
`
const Navigation = styled.div`
  @media (max-width: 739px) {
    position: fixed;
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
    top: 0;
    bottom: 0;
    right: -20rem;
    padding: 0.8em 2em 2em 0;
    background-color: ${p => p.theme.color.primary};
    transition: all 200ms ease 200ms;
  }
`
const MenuButton = styled.a`
  padding: 0.5em;
  margin-right: -0.5em;
  color: white;
  font-weight: 600;
  cursor: pointer;

  @media (min-width: 740px) {
    display: none;
  }

  &:active ~ ${Navigation}, &:focus ~ ${Navigation} {
    transform: translate3d(-20rem, 0px, 0px);
  }
`

const shared = props =>
  props['data-element'] !== 'logo' &&
  css`
    display: inline-block;
    font-size: 1.1em;
    font-weight: 500;
    margin-left: 2em;
    color: white;

    transition: transform 30ms ease-out;

    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      color: ${props.theme.color.secondary};
    }
  `
const NavItemsLink = styled(Link)`
  padding: 0.3em 0;
  ${shared};
`
const NavItemsA = styled.a`
  padding: 0.3em 0;
  ${shared};
`

const DynLink = ({ type, nav, ...props }) =>
  type === 'root' ? (
    <NavItemsA href={nav} {...props} />
  ) : (
    <NavItemsLink to={nav} {...props} />
  )

const Navbar = ({ location }) => (
  <NavBar>
    <Container>
      <div>
        <DynLink type={location} nav="/#start" data-element="logo">
          <Logo src={logo} alt="Apptiva" />
        </DynLink>
      </div>

      <MenuButton tabIndex="0">Menu</MenuButton>
      <Navigation>
        <DynLink type={location} nav="/#dienstleistungen">
          Dienstleistungen
        </DynLink>
        <DynLink type={location} nav="/#team">
          Team
        </DynLink>
        <DynLink type={location} nav="/#blog">
          Blog
        </DynLink>
        <DynLink type={location} nav="/#kontakt">
          Kontakt
        </DynLink>
      </Navigation>
    </Container>
  </NavBar>
)

export default Navbar
