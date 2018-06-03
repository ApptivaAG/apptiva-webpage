import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Content, { HTMLContent } from '../components/Content'
import { Container } from '../layouts/style'
import config from '../config'
import SEO from '../components/SEO'

const HeadArea = styled.div``

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
    <Img
      style={{ width: '100%' }}
      sizes={{
        ...image.childImageSharp.sizes,
        base64: image.childImageSharp.sqip.dataURI,
      }}
    />
  </HeadArea>
)

const Published = ({ author, date }) => {
  const Div = styled.div`
    margin-top: 2rem;
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
    <Div>
      Publiziert von <Author>{author.replace('-', ' ')}</Author> am{' '}
      <Date>{date}</Date>
    </Div>
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
        <NavigationLinks to={prev.frontmatter.path}>
          {prev.frontmatter.title}
        </NavigationLinks>
      )}
      {next && (
        <NavigationLinks to={next.frontmatter.path}>
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
    font-weight: 400;
  `
  return (
    <section>
      <Helmet title={`${title} - Blog - ${config.company}`} />
      <SEO
        isBlogPost
        metaData={metaData}
        postImage={metaData.image.childImageSharp.resize.src}
      />
      <Container>
        <Header title={title} image={image} />
        <Description>{description}</Description>
        {author && <Published author={author} date={date} />}
        <PostContent content={content} />
        <Navigation next={navigation.next} prev={navigation.prev} />
      </Container>
    </section>
  )
}

export default ({ data, pathContext }) => {
  const { markdownRemark: post } = data

  post.frontmatter.excerpt = post.excerpt

  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      metaData={post.frontmatter}
      navigation={pathContext}
    />
  )
}

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 300)
      frontmatter {
        title
        description
        author
        date(formatString: "DD.MM.YYYY")
        isoDate: date(formatString: "DD-MM-YYYY")
        path
        image {
          childImageSharp {
            sqip(numberOfPrimitives: 16, blur: 6) {
              dataURI
            }
            sizes {
              ...GatsbyImageSharpSizes_withWebp_noBase64
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

// {
//   childImageSharp {
//     sizes {
//       ...GatsbyImageSharpSizes
//     }
//   }
// }
