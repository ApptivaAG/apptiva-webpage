import React from 'react'
import Helmet from 'react-helmet'
import styled from "styled-components";
import Content, { HTMLContent } from '../components/Content'
import { Container } from '../layouts/style';

const HeadArea = styled.div`
`

const HeadImage = styled.img`
  width: 100%;
`

const HeaderTitle = styled.h1`
  font-size: 4rem;
  text-align: center;
`

const Header = ({ title, image }) =>
  <HeadArea>
    <Container>
      <HeaderTitle>{title}</HeaderTitle>
      <HeadImage src={image} />
    </Container>
  </HeadArea>

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet, image, author
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      <Header title={title} image={image} />
      {helmet || ''}
      <Container>
        <p>{author}</p>
        <p>{description}</p>
        <PostContent content={content} />
      </Container>
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
      title={post.frontmatter.title} author={post.frontmatter.author} image={post.frontmatter.image}
    />
  )
}

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image
        author
      }
    }
  }
`
