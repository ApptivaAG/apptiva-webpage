import React from 'react'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'
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

const BlogLinkItem = ({ frontmatter, excerpt, className }) => {
  return (
    <LinkItem
      to={`/${frontmatter.slug}`}
      key={frontmatter.slug}
      align="left"
      className={className}
    >
      <h2
        css="grid-area: title"
        dangerouslySetInnerHTML={{ __html: frontmatter.title }}
      />
      {frontmatter.image && (
        <GatsbyImage
          image={frontmatter.image.childImageSharp.gatsbyImageData}
          css="grid-area: image; justify-self: center;"
          alt={frontmatter.title}
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
}

export default BlogLinkItem
