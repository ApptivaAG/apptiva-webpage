import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'

import { company } from '../config'
import { Section, MainTitle, Container } from '../style'
import { truncate } from '../util'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

const metadata = {
  title: 'Blog',
  description: 'Aktuelle News rund um die Apptiva.',
  slug: 'blog',
}

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <main>
        <Helmet title={`Blog - ${company}`} />
        <SEO metaData={metadata} />

        <Section>
          <Container>
            <MainTitle>Blogbeiträge</MainTitle>

            {posts.map(({ node: post }) => (
              <div key={post.id}>
                <h2
                  css={`
                    margin-top: 4em;
                  `}
                >
                  <Link
                    to={`/${post.frontmatter.slug}`}
                    dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}
                  />
                  <span> &bull; </span>
                  <small>{post.frontmatter.date}</small>
                </h2>
                <Img fixed={post.frontmatter.image.childImageSharp.fixed} />
                <p>
                  {post.frontmatter.description
                    ? truncate(post.frontmatter.description, 400)
                    : post.excerpt}
                  <Link
                    style={{ fontWeight: 500, marginLeft: 5 }}
                    to={`/${post.frontmatter.slug}`}
                  >
                    Weiterlesen →
                  </Link>
                </p>
              </div>
            ))}
          </Container>
        </Section>
      </main>
    </Layout>
  )
}

export const blogListPage = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            slug
            templateKey
            date(formatString: "D. MMMM YYYY", locale: "de")
            description
            image {
              childImageSharp {
                fixed(height: 150, width: 300, cropFocus: ENTROPY) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
