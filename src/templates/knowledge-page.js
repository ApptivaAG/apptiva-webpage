import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Content, { HTMLContent } from '../components/Content'
import { Container, MainTitle } from '../style'
import { company, knowledgeRoute } from '../config'
import SEO from '../components/SEO'
import { stripHTML } from '../util'
import Layout from '../components/Layout'
import BlogLinkItem from '../components/BlogLinkItem'

const Header = ({ title }) => (
  <HeadArea>
    <MainTitle dangerouslySetInnerHTML={{ __html: title }} />
  </HeadArea>
)

const Published = ({ author, date }) => (
  <Wrapper>
    {/* eslint-disable-next-line react/jsx-one-expression-per-line  */}
    Publiziert von <Author>{author.replace('-', ' ')}</Author> am{' '}
    <Date>{date}</Date>
  </Wrapper>
)

const Navigation = ({ next, prev }) => (
  <LayoutNavigation>
    {prev && (
      <BlogLinkItem
        frontmatter={{
          ...prev.md.frontmatter,
          date: prev.md.frontmatter.publishedAt.start,
        }}
        excerpt={prev.md.excerpt}
        route={knowledgeRoute}
      />
    )}
    {next && (
      <BlogLinkItem
        frontmatter={{
          ...next.md.frontmatter,
          date: next.md.frontmatter.publishedAt.start,
        }}
        excerpt={next.md.excerpt}
        route={knowledgeRoute}
      />
    )}
  </LayoutNavigation>
)

const KnowledgeTemplate = ({
  content,
  contentComponent,
  metaData,
  next,
  prev,
}) => {
  const PostContent = contentComponent || Content
  const { title, image, description, author, date, updatedAt, imageCaption } =
    metaData

  return (
    <main>
      <Helmet title={`${stripHTML(title)} - Blog - ${company}`} />
      <SEO isBlogPost metaData={metaData} />
      <Container>
        <article>
          <header>
            <Header title={title} />
            {description && <Description>{description}</Description>}
            {author && <Published author={author} date={date} />}
          </header>
          <section css="margin-bottom: 4em;">
            <PostContent content={content} />
          </section>
        </article>
      </Container>
      <footer css="background: #eee; padding: 3em 0">
        <Container>
          <Navigation next={next} prev={prev} />
        </Container>
      </footer>
    </main>
  )
}

const KnowledgePage = ({ data }) => {
  const { notion } = data

  const date = notion.md.frontmatter.publishedAt.start

  return (
    <Layout>
      <KnowledgeTemplate
        content={notion.md.html}
        contentComponent={HTMLContent}
        metaData={{
          ...notion.md.frontmatter,
          excerpt: notion.md.excerpt,
          date,
        }}
        next={data.next}
        prev={data.prev}
      />
    </Layout>
  )
}

export default KnowledgePage

export const pageQuery = graphql`
  query KnowledgePageByID($id: String!, $nextId: String, $prevId: String) {
    notion(id: { eq: $id }) {
      id
      md: childMarkdownRemark {
        html
        excerpt(pruneLength: 300)
        frontmatter {
          author
          title
          slug
          publishedAt {
            start(formatString: "DD.MM.YYYY")
          }
        }
      }
    }
    next: notion(id: { eq: $nextId }) {
      id
      md: childMarkdownRemark {
        excerpt(pruneLength: 300)
        frontmatter {
          title
          slug
          publishedAt {
            start(formatString: "DD.MM.YYYY")
          }
        }
      }
    }
    prev: notion(id: { eq: $prevId }) {
      id
      md: childMarkdownRemark {
        excerpt(pruneLength: 300)
        frontmatter {
          title
          slug
          publishedAt {
            start(formatString: "DD.MM.YYYY")
          }
        }
      }
    }
  }
`

const HeadArea = styled.div`
  margin-bottom: 0.6em;
`
const Wrapper = styled.div`
  margin-top: 0;
  margin-bottom: 3em;
  color: #0009;
  font-size: 0.8rem;
`
const Author = styled.span`
  font-weight: 400;
  text-transform: capitalize;
`
const Date = styled.span`
  font-weight: 400;
`
const LayoutNavigation = styled.div``

const Description = styled.p`
  font-weight: 600;
  margin-bottom: 0.4em;
  margin-top: 2em;
`
