import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import {
  Section,
  Container,
  Subtitle,
  Title,
  ColList,
  ImgStyled,
  ListItem,
  Centered,
  Button,
  DeemphasizedTitle,
} from '../style'
import { truncate } from '../util'

const query = graphql`
  query {
    blogs: allMarkdownRemark(
      limit: 3
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 140)
          id
          frontmatter {
            title
            slug
            image {
              childImageSharp {
                fixed(height: 150, width: 300, cropFocus: ENTROPY) {
                  ...GatsbyImageSharpFixed_withWebp_noBase64
                }
                sqip(numberOfPrimitives: 8, blur: 6) {
                  dataURI
                }
              }
            }
            date(formatString: "DD.MM.YYYY")
            description
          }
        }
      }
    }
  }
`

export default () => {
  const {
    blogs: { edges: posts },
  } = useStaticQuery(query)
  return (
    <Section id="blog" dark>
      <Container>
        <DeemphasizedTitle>Blog</DeemphasizedTitle>

        <ColList>
          {posts.map(({ node: post }) => (
            <ListItem key={post.id} full align="left">
              <Link to={post.frontmatter.slug}>
                <ImgStyled
                  style={{ width: '100%' }}
                  fixed={{
                    ...post.frontmatter.image.childImageSharp.fixed,
                    base64: post.frontmatter.image.childImageSharp.sqip.dataURI,
                  }}
                  alt="Post image"
                />
                <h2
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}
                />
                <h4>{post.frontmatter.date}</h4>
                <p>
                  {post.frontmatter.description
                    ? truncate(post.frontmatter.description, 140)
                    : post.excerpt}
                </p>
              </Link>
            </ListItem>
          ))}
        </ColList>
        <Centered>
          <Button to="/blog/">Zum Apptiva Blog</Button>
        </Centered>
      </Container>
    </Section>
  )
}