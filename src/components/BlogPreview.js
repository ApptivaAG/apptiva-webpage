import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import {
  Section,
  Container,
  Row,
  ImgStyled,
  Col,
  Centered,
  Button,
  Card,
} from '../style'
import { truncate } from '../util'

const query = graphql`
  {
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
                gatsbyImageData(
                  height: 140
                  transformOptions: { cropFocus: ENTROPY }
                  layout: CONSTRAINED
                )
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

const BlogPreview = () => {
  const {
    blogs: { edges: posts },
  } = useStaticQuery(query)
  return (
    <Section id="blog" divider>
      <Container>
        <h2>Blog</h2>

        <Row css="margin-bottom: 2em;">
          {posts.map(({ node: post }) => (
            <Col key={post.id} full align="left">
              <Link
                to={`/${post.frontmatter.slug}/`}
                css="display: block; height: 100%;"
              >
                <Card css="display: flex; flex-direction: column; height: 100%;">
                  <h3
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}
                  />
                  <p>
                    {post.frontmatter.description
                      ? truncate(post.frontmatter.description, 140)
                      : post.excerpt}
                  </p>
                  <div css="flex: 1;" />
                  <ImgStyled
                    image={
                      post.frontmatter.image.childImageSharp.gatsbyImageData
                    }
                    alt="Post image"
                  />
                  <p css="margin-top: 0.5em !important;">
                    {post.frontmatter.date}
                  </p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <Centered>
          <Button
            css={`
              border: 1px solid #fff2;
              background: #fff1;
            `}
            to="/blog/"
          >
            Zum Apptiva Blog
          </Button>
        </Centered>
      </Container>
    </Section>
  )
}

export default BlogPreview
