import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { company, knowledgeRoute } from '../config'
import { Section, MainTitle, Container } from '../style'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import BlogLinkItem from '../components/BlogLinkItem'

const metadata = {
  title: 'Apptiva lernt',
  description: 'Kleine Wissenshappen, die wir jede Woche neu dazu lernen.',
  slug: knowledgeRoute,
}

const KnowledgeCollection = ({ data }) => {
  const { nodes: posts } = data.allNotion

  return (
    <Layout>
      <Helmet title={`Apptiva lernt - ${company}`} />
      <SEO metaData={metadata} />

      <Section>
        <Container>
          <MainTitle>Apptiva lernt</MainTitle>

          <p css="margin-bottom: 4em;">
            Kleine Wissenshappen, die wir jede Woche neu dazu lernen.
          </p>

          {posts.map(({ md: post }) => (
            <BlogLinkItem
              key={post.id}
              css={`
                background: ${(p) => p.theme.color.lightBg};
              `}
              frontmatter={{
                ...post.frontmatter,
                date: post.frontmatter.publishedAt.start,
              }}
              excerpt={post.frontmatter.summary || post.excerpt}
              route={knowledgeRoute}
            />
          ))}
        </Container>
      </Section>
    </Layout>
  )
}

export default KnowledgeCollection

export const knowledgeCollectionPageQuery = graphql`
  query KnowledgeCollectionPageQuery {
    allNotion(
      filter: { properties: { slug: { value: { ne: "" } } } }
      sort: { order: DESC, fields: [properties___publishedAt___value___start] }
    ) {
      nodes {
        id
        md: childMarkdownRemark {
          html
          excerpt(pruneLength: 300)
          frontmatter {
            author
            title
            slug
            summary
            publishedAt {
              start(formatString: "DD.MM.YYYY")
            }
          }
        }
      }
    }
  }
`
