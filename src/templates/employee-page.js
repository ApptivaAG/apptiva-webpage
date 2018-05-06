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
import { theme } from '../layouts'

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
const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  display: grid;
  @media (min-width: 20rem) {
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  }
  margin: 0 -1rem;
`
const SkillItem = styled.div`
  flex: 1 1 16rem;
  margin: 0 1rem;
`
const Bar = styled.div`
  position: relative;
  font-weight: 400;
  color: white;
  background-color: #ccc;
  height: 1.8em;
  margin: 0.5em 0;
`
const Text = styled.div`
  position: absolute;
  height: 100%;
  padding: 0.3em 0.5em;
`
const Color = styled.div`
  height: 100%;
`
const colorPalett = {
  0: theme.color.primary,
  1: theme.color.secondary,
  2: theme.color.orange,
  3: theme.color.darkGray,
  4: theme.color.primary,
  5: theme.color.secondary,
  6: theme.color.orange,
  7: theme.color.darkGray,
  8: theme.color.primary,
  9: theme.color.secondary,
  10: theme.color.orange,
  11: theme.color.darkGray,
}

const Skill = ({ title, color, items }) => (
  <SkillItem>
    <h2>{title}</h2>
    {items.map(item => (
      <Bar key={item.name}>
        <Text>{item.name}</Text>
        <Color
          style={{
            backgroundColor: color,
            width: `${item.value} + %`,
          }}
        />
      </Bar>
    ))}
  </SkillItem>
)

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
      <Section>
        <h1>Meine Skills</h1>
        <SkillList>
          {skills.map((skill, index) => (
            <Skill key={skill.title} color={colorPalett[index]} {...skill} />
          ))}
        </SkillList>
      </Section>
      <PostContent content={content} />
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
          items {
            name
            value
          }
        }
      }
    }
  }
`
