import React from 'react'
import styled from 'styled-components'

const Markdown = styled.div`
  h1 {
    margin-top: 2em;
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
