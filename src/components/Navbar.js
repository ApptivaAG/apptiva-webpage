import React from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'styled-components'

import { Container as DefaultContainer } from '../layouts/style'
import logo from '../img/apptiva-logo.svg'

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
    top: 0;
    bottom: 0;
    right: -20rem;
    padding: 2em 2em 2em 0;
    background-color: ${p => p.theme.color.primary};
    transition: all 200ms ease 0s;
  }
`
const MenuButton = styled.button`
  border: none;
  background: transparent;
  color: white;
  font-weight: 600;

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
    font-size: 1.1rem;
    font-weight: 500;
    margin-left: 2rem;
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
  ${shared};
`
const NavItemsA = styled.a`
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

      <MenuButton>Menu</MenuButton>
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
        <NavItemsLink to="/about">About</NavItemsLink>
      </Navigation>
    </Container>
  </NavBar>
)

export default Navbar
