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
import { referenzenRoute } from '../config'

const query = graphql`
  {
    blogs: allMarkdownRemark(
      limit: 3
      sort: { order: ASC, fields: [frontmatter___order] }
      filter: { frontmatter: { templateKey: { eq: "referenz" } } }
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

const ReferenzenPreview = () => {
  const {
    blogs: { edges: posts },
  } = useStaticQuery(query)
  return (
    <Section id="referenzen">
      <Container>
        <h2>Referenzen</h2>

        <Row css="margin-bottom: 2em;">
          {posts.map(({ node: post }) => (
            <Col key={post.id} full align="left">
              <Link
                to={`${referenzenRoute}/${post.frontmatter.slug}/`}
                css="display: block; height: 100%;"
              >
                <Card
                  css="display: flex; flex-direction: column; height: 100%;"
                  $light
                >
                  <h3
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}
                  />
                  <p>
                    {post.frontmatter.description
                      ? truncate(post.frontmatter.description, 300)
                      : post.excerpt}
                  </p>
                  <div css="flex: 1;" />
                  <ImgStyled
                    image={
                      post.frontmatter.image.childImageSharp.gatsbyImageData
                    }
                    alt="Post image"
                    css="box-shadow: 0px 2px 5px -1px #00000055; border-radius: 0.5em;"
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
          <Button to="/referenzen/">Zu den Referenzen</Button>
        </Centered>
      </Container>
    </Section>
  )
}

export default ReferenzenPreview
