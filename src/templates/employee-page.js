import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export default props => {
  const {
    data: { markdownRemark: post },
  } = props

  return (
    <Layout>
      <h1>Hi</h1>
    </Layout>
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
