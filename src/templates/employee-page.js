import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import PhoneIcon from 'react-icons/lib/fa/phone'
import EnvelopeIcon from 'react-icons/lib/fa/envelope'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import XingIcon from 'react-icons/lib/fa/xing'
import LinkedinIcon from 'react-icons/lib/fa/linkedin'

import Content, { HTMLContent } from '../components/Content'
import { Title, Subtitle, Section } from '../layouts/style'

const EmployeeBanner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 -1rem;
`
const Avatar = styled.div`
  flex: 1 1 12rem;
  margin: 1rem;
  min-width: 8rem;
`
const ImgRound = styled(Img)`
  max-width: 16rem;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  border: 3px solid white;
`
const EmployeeData = styled.div`
  flex: 1 1 55%;
  margin: 1rem;
  h3,
  h4,
  p {
    margin: 0.3em 0;
  }
  svg {
    margin-right: 0.4em;
  }
`
const ContactList = styled.ul`
  margin-top: 1em;
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 0.3em;
  }

  a {
    white-space: nowrap;
  }
`

export const EmployeePageTemplate = ({
  content,
  contentComponent,
  helmet,
  name,
  claim,
  avatar,
  role,
  education,
  slogan,
  contact,
  skills,
}) => {
  const PostContent = contentComponent || Content

  return (
    <div>
      {helmet || ''}
      <Section>
        <Title>{name}</Title>
        <Subtitle>{claim}</Subtitle>
      </Section>
      <Section dark>
        <EmployeeBanner>
          <Avatar>
            <ImgRound sizes={avatar.childImageSharp.sizes} />
          </Avatar>
          <EmployeeData>
            <h3>{role}</h3>
            <h4>{education}</h4>
            <p>{slogan}</p>
            <ContactList>
              <li>
                <a href={`tel:${contact.tel}`}>
                  <PhoneIcon />
                  {contact.tel}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.mail}`}>
                  <EnvelopeIcon />
                  {contact.mail}
                </a>
              </li>
              <li>
                <a href={`https://twitter.com/${contact.twitter}`}>
                  <TwitterIcon />
                  @{contact.twitter}
                </a>
              </li>
              <li>
                <a href={contact.xing}>
                  <XingIcon />
                  Xing
                </a>
              </li>
              <li>
                <a href={contact.linkedin}>
                  <LinkedinIcon style={{ paddingBottom: 5 }} />
                  Linkedin
                </a>
              </li>
            </ContactList>
          </EmployeeData>
        </EmployeeBanner>
      </Section>
      <p>{skills[0].title}</p>
      <Section dark>
        <PostContent content={content} />
      </Section>
    </div>
  )
}

export default props => {
  const { markdownRemark: post } = props.data

  return (
    <EmployeePageTemplate
      content={post.html}
      contentComponent={HTMLContent}
      helmet={<Helmet title={`Mitarbeiter | ${post.frontmatter.name}`} />}
      {...post.frontmatter}
    />
  )
}

export const employeePageQuery = graphql`
  query EmployeePageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        claim
        avatar {
          childImageSharp {
            sizes(maxWidth: 300) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        role
        education
        slogan
        contact {
          tel
          mail
          twitter
          xing
          linkedin
        }
        skills {
          title
          color
          items {
            name
            value
          }
        }
      }
    }
  }
`
