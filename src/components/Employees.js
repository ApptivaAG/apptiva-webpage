import React from 'react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import styled from 'styled-components'
import PhoneIcon from 'react-icons/lib/fa/phone'
import EnvelopeIcon from 'react-icons/lib/fa/envelope'
import TwitterIcon from 'react-icons/lib/fa/twitter'

import { Section, Title } from '../layouts/style'
const Subtitle = styled.h4`
  font-size: 1.2em;
  font-weight: 300;
  text-transform: uppercase;
  margin-top: -1em;
  margin-bottom: 3em;
`
const EmployeeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -0.5rem;
`
const EmployeeStyled = styled.div`
  font-size: 0.8em;
  flex: 1 1 0%;
  margin: 0 0.5rem 3rem;
  @media (max-width: 500px) {
    text-align: center;
  }
`
const Avatar = styled(Img)`
  border: 3px solid #eee;
  border-radius: 50%;
  margin-right: 1em;
`
const LinkStyled = styled(Link)`
  display: block;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.06);
  }
`
const Name = styled.h2`
  margin: 0;
  color: ${props => props.theme.color.primary};
`
const Claim = styled.div`
  font-size: 0.8em;
`
const Contact = styled.div`
  font-size: 0.9em;
  margin-top: 1em;
  a {
    display: block;
    margin-top: 0.4em;
    color: #777;
    white-space: nowrap;

    svg {
      font-size: 0.9em;
      margin-right: 0.4em;
      color: #aaa;
    }
  }
`

export default ({ employees }) => {
  return (
    <Section>
      <Title>Team</Title>
      <Subtitle>
        Mehr als 40 Jahre Erfahrung bei der Entwicklung von Enterprise-Software.
      </Subtitle>
      <EmployeeList>
        {employees.edges.map(edge => {
          const { name, claim, contact, path, avatar } = edge.node.frontmatter
          return (
            <EmployeeStyled key={edge.node.id}>
              <LinkStyled to={path}>
                <Avatar resolutions={avatar.childImageSharp.resolutions} />
                <Name>{name}</Name>
                <Claim>{claim}</Claim>
              </LinkStyled>
              <Contact>
                <a href={`tel:${contact.tel}`}>
                  <PhoneIcon />
                  {contact.tel}
                </a>
                <a href={`mailto:${contact.mail}`}>
                  <EnvelopeIcon />
                  {contact.mail}
                </a>
                <a href={`https://twitter.com/${contact.twitter}`}>
                  <TwitterIcon />@{contact.twitter}
                </a>
              </Contact>
            </EmployeeStyled>
          )
        })}
      </EmployeeList>
    </Section>
  )
}

export const employeeFragment = graphql`
  fragment Employee_details on MarkdownRemark {
    html
    frontmatter {
      templateKey
      path
      name
      claim
      contact {
        tel
        mail
        twitter
      }
      avatar {
        childImageSharp {
          resolutions(width: 200, height: 200) {
            ...GatsbyImageSharpResolutions
          }
        }
      }
    }
  }
`
