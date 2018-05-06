import React from 'react'
import styled from 'styled-components'

const Markdown = styled.div`
  h1,
  h2 {
    margin-top: 2em;
  }

  li {
    margin-bottom: 0.5em;
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
