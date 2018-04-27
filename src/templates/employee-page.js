import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Content, { HTMLContent } from '../components/Content'

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
    <section>
      {helmet || ''}
      <h1>{name}</h1>
      <h2>{claim}</h2>
      <Img sizes={avatar.childImageSharp.resolutions} />
      <h3>{role}</h3>
      <h4>{education}</h4>
      <p>{slogan}</p>
      <p>{contact.tel}</p>
      <p>{skills[0].title}</p>
      <PostContent content={content} />
    </section>
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
            resolutions(height: 300, width: 300) {
              ...GatsbyImageSharpResolutions
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
