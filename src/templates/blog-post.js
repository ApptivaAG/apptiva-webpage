import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Content, { HTMLContent } from '../components/Content'
import { Container } from '../layouts/style'
import config from '../config'
import SEO from '../components/SEO'
import { stripHTML } from '../util'
import Layout from '../components/Layout'

const HeadArea = styled.div`
  margin-bottom: 0.6em;
`

const HeaderTitle = styled.h1`
  font-size: 2rem;
  @media (min-width: 400px) {
    font-size: 4rem;
  }
  font-weight: 800;
  line-height: 1;
  text-align: center;
`

const Header = ({ title, image }) => (
  <HeadArea>
    <HeaderTitle>{title}</HeaderTitle>
    <Img style={{ width: '100%' }} fluid={image.childImageSharp.fluid} />
  </HeadArea>
)

const Published = ({ author, date }) => {
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
  return (
    <Wrapper>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line  */}
      Publiziert von <Author>{author.replace('-', ' ')}</Author> am{' '}
      <Date>{date}</Date>
    </Wrapper>
  )
}

const Navigation = ({ next, prev }) => {
  const LayoutNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 -0.5em;
  `
  const NavigationLinks = styled(Link)`
    padding: 0.5em;
    margin: 0.5em;
    background-color: #eee;
    border-radius: 0.2em;
  `

  return (
    <LayoutNavigation>
      {prev && (
        <NavigationLinks to={prev.frontmatter.slug}>
          {prev.frontmatter.title}
        </NavigationLinks>
      )}
      {next && (
        <NavigationLinks to={next.frontmatter.slug}>
          {next.frontmatter.title}
        </NavigationLinks>
      )}
    </LayoutNavigation>
  )
}

export const BlogPostTemplate = ({
  content,
  contentComponent,
  metaData,
  navigation,
}) => {
  const PostContent = contentComponent || Content
  const { title, image, description, author, date } = metaData

  const Description = styled.p`
    font-weight: 600;
    margin-bottom: 0.4em;
    margin-top: 2em;
  `
  return (
    <main>
      <Helmet title={`${stripHTML(title)} - Blog - ${config.company}`} />
      <SEO
        isBlogPost
        metaData={metaData}
        postImage={metaData.image.childImageSharp.resize.src}
      />
      <Container>
        <article>
          <header>
            <Header title={title} image={image} />
            {description && <Description>{description}</Description>}
            {author && <Published author={author} date={date} />}
          </header>
          <section>
            <PostContent content={content} />
          </section>
          <footer>
            <Navigation next={navigation.next} prev={navigation.prev} />
          </footer>
        </article>
      </Container>
    </main>
  )
}

export default ({ data, pageContext }) => {
  const { markdownRemark: post } = data

  post.frontmatter.excerpt = post.excerpt

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        metaData={post.frontmatter}
        navigation={pageContext}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByID($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      excerpt(pruneLength: 300)
      frontmatter {
        title
        description
        author
        date(formatString: "DD.MM.YYYY")
        isoDate: date(formatString: "DD-MM-YYYY")
        slug
        image {
          childImageSharp {
            fluid(maxWidth: 960, srcSetBreakpoints: [340, 960, 1600]) {
              ...GatsbyImageSharpFluid
            }
            resize(width: 1200, height: 630, cropFocus: ENTROPY) {
              src
            }
          }
        }
      }
    }
  }
`
