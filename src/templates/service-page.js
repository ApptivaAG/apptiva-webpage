import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import {
  FaClockO,
  FaDatabase,
  FaExpand,
  FaMobile,
  FaDashboard,
  FaUser,
  FaBarChart,
  FaEye,
} from 'react-icons/lib/fa'

import Content, { HTMLContent } from '../components/Content'
import { Centered } from '../layouts/style'

const HeadArea = styled.div``

const HeaderTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1;
  text-align: center;

  @media (min-width: 381px) {
    font-size: 4rem;
  }
`

const icons = {
  'clock-o': <FaClockO />,
  database: <FaDatabase />,
  expand: <FaExpand />,
  mobile: <FaMobile />,
  dashboard: <FaDashboard />,
  user: <FaUser />,
  'bar-chart': <FaBarChart />,
  eye: <FaEye />,
}

const ListTitle = styled.div`
  margin: 5em 0 3em;
  text-align: center;
  * {
    margin: 0;
  }
`
const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1rem;
  padding: 0;
  list-style: none;
`
const Item = styled.li`
  display: flex;
  margin: 1rem;
  flex: 1 1 18rem;
`
const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  height: 1.8em;
  width: 1.8em;
  font-size: 1.4em;
  margin-right: 0.6em;
  color: ${props => props.theme.color.bg};
  border-radius: 50%;
  background-color: ${props => props.theme.color.secondary};
`
const ItemContent = styled.div`
  h2 {
    margin: 0.2em 0;
  }
  p {
    margin: 0.2em 0;
  }
`

const Header = ({ title, image, subtitle }) => (
  <HeadArea>
    <HeaderTitle dangerouslySetInnerHTML={{ __html: title }} />
    {subtitle && (
      <h2>
        {subtitle.text} {subtitle.swaps && subtitle.swaps[0]}
      </h2>
    )}
    {image && (
      <Img
        style={{ width: '80%', margin: '2rem auto' }}
        sizes={image.childImageSharp.sizes}
      />
    )}
  </HeadArea>
)

export const ServicePageTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
  image,
  subtitle,
  listOfText,
}) => {
  const PostContent = contentComponent || Content

  console.log('listOfText', listOfText)

  return (
    <section>
      {helmet || ''}
      <Centered>
        <Header title={title} image={image} subtitle={subtitle} />
      </Centered>
      {listOfText && (
        <div>
          <ListTitle>
            <h1>{listOfText.title}</h1>
            {/* eslint-disable-next-line react/no-danger */}
            <p dangerouslySetInnerHTML={{ __html: listOfText.description }} />
          </ListTitle>
          <ItemList>
            {listOfText.items.map(item => (
              <Item key={item.icon}>
                <Icon>{icons[item.icon]}</Icon>
                <ItemContent>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </ItemContent>
              </Item>
            ))}
          </ItemList>
        </div>
      )}
      <PostContent content={content} />
    </section>
  )
}

export default props => {
  const { markdownRemark: post } = props.data

  return (
    <ServicePageTemplate
      content={post.html}
      contentComponent={HTMLContent}
      helmet={<Helmet title={`${post.frontmatter.title} | Apptiva AG`} />}
      {...post.frontmatter}
    />
  )
}

export const pageQuery = graphql`
  query ServicePageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        image {
          childImageSharp {
            sizes {
              ...GatsbyImageSharpSizes
            }
          }
        }
        subtitle {
          text
          swaps
        }
        listOfText {
          title
          description
          items {
            icon
            title
            text
          }
        }
      }
    }
  }
`
