import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import github from '../img/github-icon.svg'
import logo from '../img/apptiva-logo.svg'

import { Container as DefaultContainer } from '../layouts/style'

const NavBar = styled.nav`
  position: sticky;
  top: 0;
  background-color: ${props => props.theme.color.primary};
`

const Container = DefaultContainer.extend`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.img`
  display: block;
  height: 2.4rem;
  padding: 1.3rem 0;
`

const NavItems = styled(Link)`
  display: inline-block;
  font-size: 1.375rem;
  font-weight: 500;
  margin-left: 3rem;
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
        <NavItems to="/about">About</NavItems>
        <NavItems to="/products">Products</NavItems>
      </div>
    </Container>
  </NavBar>
)

export default Navbar
