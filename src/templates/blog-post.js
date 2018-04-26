import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Content, { HTMLContent } from '../components/Content'

const HeadArea = styled.div``

const HeaderTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  line-height: 1;
  text-align: center;
`

const Header = ({ title, image }) => (
  <HeadArea>
    <HeaderTitle>{title}</HeaderTitle>
    <Img style={{ width: '100%' }} sizes={image.childImageSharp.sizes} />
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
  description,
  title,
  helmet,
  image,
  author,
  date,
  navigation,
}) => {
  const PostContent = contentComponent || Content

  const Description = styled.p`
    font-weight: 400;
  `
  return (
    <section>
      {helmet || ''}
      <Header title={title} image={image} />
      <Description>{description}</Description>
      {author && <Published author={author} date={date} />}
      <PostContent content={content} />
      <Navigation next={navigation.next} prev={navigation.prev} />
    </section>
  )
}

export default props => {
  const { markdownRemark: post } = props.data

  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet title={`Blog | ${post.frontmatter.title}`} />}
      title={post.frontmatter.title}
      author={post.frontmatter.author}
      image={post.frontmatter.image}
      date={post.frontmatter.date}
      navigation={props.pathContext}
    />
  )
}

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD.MM.YYYY")
        title
        description
        image {
          childImageSharp {
            sizes {
              ...GatsbyImageSharpSizes
            }
          }
        }
        author
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
