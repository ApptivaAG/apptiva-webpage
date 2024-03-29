import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getSrc } from 'gatsby-plugin-image'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Content, { HTMLContent } from '../components/Content'
import { Container, MainTitle } from '../style'
import config from '../config'
import SEO from '../components/SEO'
import { stripHTML } from '../util'
import Layout from '../components/Layout'
import BlogLinkItem from '../components/BlogLinkItem'

const Header = ({ title, image, imageCaption }) => (
  <HeadArea>
    <MainTitle dangerouslySetInnerHTML={{ __html: title }} />
    <figure>
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        style={{ width: '100%' }}
        alt={imageCaption}
      />

      {imageCaption && <figcaption>{imageCaption}</figcaption>}
    </figure>
  </HeadArea>
)

const Published = ({ author, date, updatedAt }) => (
  <Wrapper>
    {/* eslint-disable-next-line react/jsx-one-expression-per-line  */}
    Publiziert von <Author>{author.replace('-', ' ')}</Author> am{' '}
    <Date>{date}</Date>
    {updatedAt && (
      <span>
        {' '}
        - Aktualisiert am: <Date>{updatedAt}</Date>
      </span>
    )}
  </Wrapper>
)

const Navigation = ({ next, prev }) => (
  <LayoutNavigation>
    {prev && (
      <BlogLinkItem
        frontmatter={prev.frontmatter}
        excerpt={prev.frontmatter.description}
      />
    )}
    {next && (
      <BlogLinkItem
        frontmatter={next.frontmatter}
        excerpt={next.frontmatter.description}
      />
    )}
  </LayoutNavigation>
)

const BlogPostTemplate = ({
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
    <>
      <Helmet title={`${stripHTML(title)} - Blog - ${config.company}`} />
      <SEO
        isBlogPost
        metaData={metaData}
        postImage={getSrc(metaData.image.childImageSharp.gatsbyImageData)}
      />
      <Container>
        <article>
          <header>
            <Header title={title} image={image} imageCaption={imageCaption} />
            {description && <Description>{description}</Description>}
            {author && (
              <Published author={author} date={date} updatedAt={updatedAt} />
            )}
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
    </>
  )
}

const BlogPost = ({ data, pageContext }) => {
  const { markdownRemark: post } = data

  post.frontmatter.excerpt = post.excerpt
  post.frontmatter.updatedAt = post.updatedAt
  post.frontmatter.dateModified = post.dateModified

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        metaData={post.frontmatter}
        next={data.next}
        prev={data.prev}
      />
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!, $prevId: String, $nextId: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 300)
      updatedAt(formatString: "DD.MM.YYYY")
      dateModified: updatedAt(formatString: "DD-MM-YYYY")
      frontmatter {
        title
        titleTag
        description
        metaDescription
        author
        date(formatString: "DD.MM.YYYY")
        datePublished: date(formatString: "DD-MM-YYYY")
        slug
        image {
          childImageSharp {
            gatsbyImageData(width: 1280, layout: CONSTRAINED)
          }
        }
        imageCaption
      }
    }
    next: markdownRemark(id: { eq: $nextId }) {
      id
      frontmatter {
        title
        slug
        templateKey
        date(formatString: "DD.MM.YYYY")
        description
        image {
          childImageSharp {
            gatsbyImageData(width: 240, placeholder: BLURRED, layout: FIXED)
          }
        }
      }
    }
    prev: markdownRemark(id: { eq: $prevId }) {
      id
      frontmatter {
        title
        slug
        templateKey
        date(formatString: "DD.MM.YYYY")
        description
        image {
          childImageSharp {
            gatsbyImageData(width: 240, placeholder: BLURRED, layout: FIXED)
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
