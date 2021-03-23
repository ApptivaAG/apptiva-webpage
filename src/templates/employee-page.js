import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getSrc } from 'gatsby-plugin-image'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import '@fortawesome/fontawesome-free/css/brands.min.css'

import Content, { HTMLContent } from '../components/Content'
import { MainTitle, Subtitle, Section, Container, theme } from '../style'
import Layout from '../components/Layout'
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
const ImgRound = styled(GatsbyImage)`
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

  a {
    display: inline-block;
    padding: 0.1em 0;
    white-space: nowrap;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.06);
    }

    i {
      margin-right: 0.5em;
    }
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
const {
  color: { primary, secondary, orange, darkGray },
} = theme

const colorPalett = {
  0: primary,
  1: secondary,
  2: orange,
  3: darkGray,
  4: primary,
  5: secondary,
  6: orange,
  7: darkGray,
  8: primary,
  9: secondary,
  10: orange,
  11: darkGray,
}

const Skill = ({ title, color, items }) => (
  <SkillItem>
    <h2>{title}</h2>
    {items.map((item) => (
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

const EmployeePageTemplate = ({ content, contentComponent, metaData }) => {
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

  const seoImage = getSrc(metaData.avatar.childImageSharp.gatsbyImageData)

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
                image={avatar.childImageSharp.gatsbyImageData}
                alt={name}
              />
            </Avatar>
            <EmployeeData>
              <h3>{role}</h3>
              <h4>{education}</h4>
              <p>{slogan}</p>
              <ContactList>
                <li>
                  <a href={`tel:${contact.tel}`}>
                    <i className="fas fa-phone" />
                    {contact.tel}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.mail}`}>
                    <i className="fas fa-envelope" />
                    {contact.mail}
                  </a>
                </li>
                {contact.twitter && (
                  <li>
                    <a href={`https://twitter.com/${contact.twitter}`}>
                      <i className="fab fa-twitter" />@ {contact.twitter}
                    </a>
                  </li>
                )}
                {contact.xing && (
                  <li>
                    <a href={contact.xing}>
                      <i className="fab fa-xing" />
                      Xing
                    </a>
                  </li>
                )}
                {contact.linkedin && (
                  <li>
                    <a href={contact.linkedin}>
                      <i className="fab fa-linkedin" />
                      Linkedin
                    </a>
                  </li>
                )}
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
              // eslint-disable-next-line react/jsx-props-no-spreading
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

const EmployeePage = (props) => {
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

export default EmployeePage

export const employeePageQuery = graphql`
  query EmployeePageByID($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        name
        slug
        claim
        avatar {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 300)
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
