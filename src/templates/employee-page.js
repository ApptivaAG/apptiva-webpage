import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import {
  FaPhone as PhoneIcon,
  FaEnvelope as EnvelopeIcon,
  FaTwitter as TwitterIcon,
  FaXing as XingIcon,
  FaLinkedin as LinkedinIcon,
} from 'react-icons/fa'

import Content, { HTMLContent } from '../components/Content'
import { MainTitle, Subtitle, Section, Container } from '../layouts/style'
import Layout, { theme } from '../components/Layout'
import SEO from '../components/SEO'

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
  transform: translateZ(0); /* Safari bug rounded image flicker  */
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
            width: `${item.value}%`,
          }}
        />
      </Bar>
    ))}
  </SkillItem>
)

export const EmployeePageTemplate = ({
  content,
  contentComponent,
  metaData,
}) => {
  const PostContent = contentComponent || Content
  const {
    name,
    claim,
    avatar,
    role,
    education,
    slogan,
    contact,
    skills,
  } = metaData

  const seoImage =
    metaData.avatar &&
    metaData.avatar.childImageSharp.resize &&
    metaData.avatar.childImageSharp.resize.src

  return (
    <main>
      <Helmet title={`Mitarbeiter | ${name}`} />
      <SEO metaData={metaData} postImage={seoImage} />
      <Section>
        <Container>
          <MainTitle>{name}</MainTitle>
          <Subtitle>{claim}</Subtitle>
        </Container>
      </Section>
      <Section dark>
        <Container>
          <EmployeeBanner>
            <Avatar>
              <ImgRound
                fluid={{
                  ...avatar.childImageSharp.fluid,
                  base64: avatar.childImageSharp.sqip.dataURI,
                }}
              />
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
                {contact.twitter&&<li>
                  <a href={`https://twitter.com/${contact.twitter}`}>
                    <TwitterIcon />@ {contact.twitter}
                  </a>
                </li>}
                {contact.xing&&<li>
                  <a href={contact.xing}>
                    <XingIcon />
                    Xing
                  </a>
                </li>}
                {contact.linkedin&&<li>
                  <a href={contact.linkedin}>
                    <LinkedinIcon style={{ paddingBottom: 5 }} />
                    Linkedin
                  </a>
                </li>}
              </ContactList>
            </EmployeeData>
          </EmployeeBanner>
        </Container>
      </Section>
      <Section>
        <Container>
          <h1>Meine Skills</h1>
          <SkillList>
            {skills.map((skill, index) => (
              <Skill key={skill.title} color={colorPalett[index]} {...skill} />
            ))}
          </SkillList>
        </Container>
      </Section>
      <Section>
        <Container>
          <PostContent content={content} />
        </Container>
      </Section>
    </main>
  )
}

export default props => {
  const {
    data: { markdownRemark: post },
  } = props

  return (
    <Layout>
      <EmployeePageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        metaData={post.frontmatter}
      />
    </Layout>
  )
}

export const employeePageQuery = graphql`
  query EmployeePageByID($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        name
        claim
        avatar {
          childImageSharp {
            fluid(srcSetBreakpoints: [340, 600]) {
              ...GatsbyImageSharpFluid_noBase64
            }
            resize(width: 1200, height: 630, cropFocus: NORTH) {
              src
            }
            sqip(numberOfPrimitives: 8, blur: 12) {
              dataURI
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
