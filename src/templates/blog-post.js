import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Content, { HTMLContent } from '../components/Content'
import { Container } from '../layouts/style'

const HeadArea = styled.div``

const HeadImage = styled.img`
  width: 100%;
`

const HeaderTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  line-height: 1;
  text-align: center;
`

const Header = ({ title, image }) => (
  <HeadArea>
    <HeaderTitle>{title}</HeaderTitle>
    <HeadImage src={image} />
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

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
  image,
  author,
  date
}) => {
  const PostContent = contentComponent || Content

  const Description = styled.p`
    font-weight: 400;
  `
  return (
    <section>
      {helmet || ''}
      <Header title={title} image={image} />
      {author && <Published author={author} date={date} />}
      <Description>{description}</Description>
      <PostContent content={content} />
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
        image
        author
      }
    }
  }
`
