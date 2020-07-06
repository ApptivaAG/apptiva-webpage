import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Item = styled.div`
  box-sizing: border-box;
  height: 100%;
  font-weight: 200;
  padding: 1.5em 1em;
  background: ${(p) => p.theme.color.bg};
  color: black;
  text-align: ${(p) => (p.align ? p.align : 'center')};
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
  h2,
  h3,
  p {
    margin: 0;
  }
  .gatsby-image-wrapper:hover {
    transform: none;
  }
`

const LinkItem = ({ to, children, className, align }) => (
  <Link to={to}>
    <Item className={className} align={align}>
      {children}
    </Item>
  </Link>
)

export default LinkItem
