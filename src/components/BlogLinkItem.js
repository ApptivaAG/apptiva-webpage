import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import LinkItemDefault from './LinkItem'

const LinkItem = styled(LinkItemDefault)`
  display: grid;
  gap: 1em 3em;
  margin-bottom: 1em;
  grid: 'title' 'excerpt' 'image' 'date';
  @media (min-width: 768px) {
    grid: 'title image' 'excerpt image' 1fr 'date image' / 1fr auto;
  }
  h2,
  p {
    margin: 0;
  }
  small {
    font-weight: 500;
  }
`

const BlogLinkItem = ({ frontmatter, excerpt }) => (
  <LinkItem to={frontmatter.slug} key={frontmatter.slug} align="left">
    <h2
      css="grid-area: title"
      dangerouslySetInnerHTML={{ __html: frontmatter.title }}
    />
    {frontmatter.image && (
      <Img
        css="grid-area: image; justify-self: center;"
        fixed={frontmatter.image.childImageSharp.fixed}
      />
    )}
    <p css="grid-area: excerpt">{excerpt}</p>
    <p
      css={`
        grid-area: date;
        @media (max-width: 768px) {
          justify-self: right;
        }
      `}
    >
      <small>{frontmatter.date}</small>
    </p>
  </LinkItem>
)

export default BlogLinkItem
