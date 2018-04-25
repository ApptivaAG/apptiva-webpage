import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Section } from '../layouts/style'

export default ({ employees }) => {
  console.log('Employees', employees)
  return (
    <Section>
      <div>
        {employees.edges.map(edge => (
          <div key={edge.node.id}>
            <div>{edge.node.frontmatter.name}</div>
            <div>{edge.node.frontmatter.claim}</div>
            <div>{edge.node.frontmatter.function}</div>
            <div>{edge.node.frontmatter.education}</div>
            <div>{edge.node.frontmatter.slogan}</div>
            <Img
              resolutions={
                edge.node.frontmatter.avatar.childImageSharp.resolutions
              }
            />
          </div>
        ))}
      </div>
    </Section>
  )
}

export const employeeFragment = graphql`
  fragment Employee_details on MarkdownRemark {
    html
    frontmatter {
      templateKey
      name
      claim
      function
      education
      slogan
      skills
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
