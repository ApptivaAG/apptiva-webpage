import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

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

const NavItems = styled(Link)`
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
    color: ${props => props.theme.color.secondary};
  }
`

const Navbar = () => (
  <NavBar>
    <Container>
      <div>
        <Link to="/">
          <Logo src={logo} alt="Apptiva" />
        </Link>
      </div>
      <div>
        <NavItems to="/#dienstleistungen">Dienstleistungen</NavItems>
        <NavItems to="/products">Products</NavItems>
        <NavItems to="/blog">Blog</NavItems>
        <NavItems to="/about">About</NavItems>
      </div>
    </Container>
  </NavBar>
)

export default Navbar
