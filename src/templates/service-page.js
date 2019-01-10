import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import * as FontAwesome from 'react-icons/fa'

import Content, { HTMLContent } from '../components/Content'
import { Centered, Container, Section, Icon } from '../layouts/style'
import config from '../config'
import SEO from '../components/SEO'
import { stripHTML } from '../util'
import Layout from '../components/Layout'
import IconErrorBoundary from '../components/IconErrorBoundary'

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
const CustomerTitle = styled.h1`
  font-size: 1.7em;
  color: #cbcbcb;
  text-align: center;
`
const Customers = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 0 -0.5rem;

  & > div {
    flex: 1 1 6rem;
    width: 100%;
    margin: 0.5rem;
    text-align: center;
  }
`
const Cols = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1rem;

  & > * {
    flex: 1 1 14rem;
    margin: 0 1rem 1rem;
  }
`
const faName = string => {
  const faPrefix = `Fa-${string}`
  const str = faPrefix.replace(/-([a-z])/g, g => g[1].toUpperCase())
  return str
}

const icons = icon => React.createElement(FontAwesome[faName(icon)])

const ListTitle = styled.div`
  margin-bottom: 3em;
  text-align: center;
`
const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1rem 4rem;
  padding: 0;
  list-style: none;
`
const Item = styled.li`
  display: flex;
  margin: 1rem;
  flex: 1 1 18rem;
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
        fluid={image.childImageSharp.fluid}
      />
    )}
  </HeadArea>
)

const ServicePageTemplate = ({ content, contentComponent, metaData }) => {
  const PostContent = contentComponent || Content
  const {
    title,
    image,
    subtitle,
    description,
    customers,
    solutions,
    specs,
    bulletGroups,
  } = metaData
  const seoImage =
    metaData.image &&
    metaData.image.childImageSharp.resize &&
    metaData.image.childImageSharp.resize.src

  return (
    <main>
      <Helmet title={`${stripHTML(title)} - ${config.company}`} />
      <SEO metaData={metaData} postImage={seoImage} />
      <Section>
        <Container>
          <Centered>
            <Header title={title} image={image} subtitle={subtitle} />
          </Centered>
          {!subtitle && description && (
            <Centered>
              <p>{description}</p>
            </Centered>
          )}
        </Container>
      </Section>

      {customers && (
        <Section dark>
          <Container>
            <CustomerTitle>Auswahl unserer Kunden</CustomerTitle>
            <Customers>
              {customers.map(customer => (
                <Img
                  key={customer.childImageSharp.fixed.src}
                  fixed={customer.childImageSharp.fixed}
                />
              ))}
            </Customers>
          </Container>
        </Section>
      )}
      {solutions && (
        <Section>
          <Container>
            <Centered>
              <h1>Lösungen</h1>
              <Cols>
                {solutions.map(solution => (
                  <div key={solution.title}>
                    <h2>{solution.title}</h2>
                    <a href={solution.image.childImageSharp.fluid.src}>
                      <Img
                        className="lightbox"
                        fluid={solution.image.childImageSharp.fluid}
                        alt={solution.title}
                      />
                    </a>
                    <p>{solution.text}</p>
                  </div>
                ))}
              </Cols>
            </Centered>
          </Container>
        </Section>
      )}
      {bulletGroups &&
        bulletGroups.map(group => (
          <Section key={group.title}>
            <Container key={group.title}>
              <ListTitle>
                <h1>{group.title}</h1>
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={{ __html: group.description }} />
              </ListTitle>
              <ItemList>
                {group.bulletList.map(item => (
                  <Item key={item.title}>
                    <IconErrorBoundary icon={item.icon}>
                      <Icon>{icons(item.icon)}</Icon>
                    </IconErrorBoundary>
                    <ItemContent>
                      <h2>{item.title}</h2>
                      {/* eslint-disable-next-line react/no-danger */}
                      <p dangerouslySetInnerHTML={{ __html: item.text }} />
                    </ItemContent>
                  </Item>
                ))}
              </ItemList>
            </Container>
          </Section>
        ))}
      {specs && (
        <Section dark>
          <Container>
            <Centered>
              <h1>{specs.title}</h1>
              <Cols>
                {specs.specItems.map(spec => (
                  <div key={spec.title}>
                    <h2>{spec.title}</h2>
                    {/* eslint-disable-next-line react/no-danger */}
                    <p>{spec.text}</p>
                  </div>
                ))}
              </Cols>
            </Centered>
          </Container>
        </Section>
      )}
      <Section>
        <Container>
          <PostContent content={content} />
        </Container>
      </Section>
    </main>
  )
}

export default props => {
  const { markdownRemark: post } = props.data

  return (
    <Layout>
      <ServicePageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        metaData={post.frontmatter}
      />
    </Layout>
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
            fluid(srcSetBreakpoints: [340, 800, 1600]) {
              ...GatsbyImageSharpFluid
            }
            resize(width: 1200, height: 630, cropFocus: ENTROPY) {
              src
            }
          }
        }
        subtitle {
          text
          swaps
        }
        description
        customers {
          childImageSharp {
            fixed(width: 200, grayscale: true) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
        solutions {
          title
          text
          image {
            childImageSharp {
              fluid(srcSetBreakpoints: [340, 800, 1600]) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        bulletGroups {
          title
          description
          bulletList {
            icon
            title
            text
          }
        }
        specs {
          title
          specItems {
            title
            text
          }
        }
      }
    }
  }
`
