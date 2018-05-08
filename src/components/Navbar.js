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
  overflow-x: hidden;
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

      <div>
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
      </div>
    </Container>
  </NavBar>
)

export default Navbar
