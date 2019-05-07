import React from 'react'

export default ({ content, className }) => ({ content })
export const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)
