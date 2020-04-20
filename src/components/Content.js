import React from 'react'
import styled from 'styled-components'
import { sharedButtonStyle } from '../style'

require('prismjs/themes/prism.css')

const Markdown = styled.div`
  h2:not(:first-child),
  h3:not(:first-child) {
    margin-top: 2em;
  }

  h1,
  h2,
  h3 {
    margin-bottom: 0.6em;
  }

  img {
    max-width: 100%;
  }

  a {
    word-break: break-all;
  }

  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.5em 6vw 0.5em 0;
    border-bottom: 1px solid #ccc;
  }

  th {
    text-align: left;
  }

  th:last-child {
    width: 100%;
  }

  .container {
    margin-right: auto;
    margin-left: auto;
    max-width: 960px;
    padding-right: 1em;
    padding-left: 1em;
  }

  .full-width {
    position: relative;
    width: 100vw;
    left: 49.4%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .dark-section {
    background-color: #f6f6f6;
    padding-top: 1px;
    padding-bottom: 4em;
  }

  .full-width + .dark-section {
    margin-top: 4em;
  }

  .custom-block-left {
    @media (min-width: 640px) {
      float: left;
      width: 16rem;
      max-width: 100%;
      margin-right: 2rem;
    }
  }

  .custom-block-right {
    @media (min-width: 640px) {
      float: right;
      width: 16rem;
      max-width: 100%;
      margin-left: 2rem;
    }
  }

  .custom-block-button p {
    margin: 0;
    a {
      ${sharedButtonStyle}
    }
  }

  .custom-block-row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1rem;

    .custom-block-col {
      flex: 1 1 14rem;
      margin: 0 1rem 1rem;
    }
  }

  .custom-block-avatar > .custom-block-body {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    .gatsby-resp-image-wrapper {
      border: 5px solid #ececec;
      border-radius: 50%;
      overflow: hidden;
      transform: translateZ(0); /* Safari bug rounded image flicker  */
    }

    & > p {
      margin: 0;
    }
    @media (min-width: 640px) {
      width: 200px;
    }
  }

  .custom-block-no-margin > .custom-block-body > * {
    margin: 0 !important;
  }

  .custom-block-hide-on-mobile {
    @media (max-width: 640px) {
      display: none !important;
    }
  }

  @media (min-width: 400px) {
    .gatsby-resp-image-wrapper .gatsby-resp-image-background-image {
      transform: translateZ(0);

      img {
        transition: transform 0.3s;
        &:hover {
          transform: scale(1.06);
        }
      }
    }
  }

  .gatsby-resp-image-background-image {
    background-image: none !important;
  }

  .gatsby-resp-image-image {
    box-shadow: none !important;
  }

  .emojione {
    height: 1em;
    bottom: -3px;
    position: relative;
  }

  .gatsby-highlight {
    font-size: 0.8em;
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
