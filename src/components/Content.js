import React from 'react'
import styled from 'styled-components'

const Markdown = styled.div`
  h1,
  h2 {
    margin-top: 2em;
    margin-bottom: 1em;
  }

  li {
    margin-bottom: 0.5em;
  }

  .full-width {
    position: relative;
    width: 100vw;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .dark-section {
    background-color: #f6f6f6;
    margin-top: 4em;
    padding-top: 1px;
    padding-bottom: 4em;
  }

  .gatsby-resp-image-background-image {
    background-image: none !important;
  }

  .gatsby-resp-image-image {
    box-shadow: none !important;
  }
`

export default ({ content, className }) => (
  <Markdown className={className}>{content}</Markdown>
)
export const HTMLContent = ({ content, className }) => (
  <Markdown
    className={className}
    dangerouslySetInnerHTML={{ __html: content }}
  />
)
