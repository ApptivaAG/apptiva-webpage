import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'

import Content, { HTMLContent } from '../components/Content'
import { Centered, Container, Section, Icon, Button } from '../style'
import config from '../config'
import SEO from '../components/SEO'
import { stripHTML } from '../util'
import Layout from '../components/Layout'

const HeadArea = styled.header``

const HeaderTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1;
  text-align: center;

  @media (min-width: 381px) {
    font-size: 4rem;
  }
`
const CustomerTitle = styled.h2`
  font-size: 1.7em;
  color: #cbcbcb;
  text-align: center;
`
const Customers = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: 0 -0.5rem;

  & > div {
    margin: 1em;
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

const icons = icon => `fas fa-${icon}`

const ListTitle = styled.header`
  margin-bottom: 3em;
  text-align: center;
`
const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
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
    introduction,
    customers,
    solutions,
    references,
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
      {introduction && (
        <Section dark>
          <Container>
            <h2>{introduction.title}</h2>
            {introduction.paragraphs.map(paragraph => (
              <div key={paragraph.text + paragraph.textBold}>
                {paragraph.text && <p>{paragraph.text}</p>}
                {paragraph.textBold && (
                  <p>
                    <b>{paragraph.textBold}</b>
                  </p>
                )}
              </div>
            ))}
          </Container>
        </Section>
      )}
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
              <h2>Lösungen</h2>
              <Cols>
                {solutions.map(solution => (
                  <div key={solution.title}>
                    <h3>{solution.title}</h3>
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
                <h2>{group.title}</h2>
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={{ __html: group.description }} />
              </ListTitle>
              <ItemList>
                {group.bulletList.map(item => {
                  return (
                    <Item key={item.title}>
                      <Icon>
                        <i className={icons(item.icon)} />
                      </Icon>
                      <ItemContent>
                        <h3>{item.title}</h3>
                        {/* eslint-disable-next-line react/no-danger */}
                        <p dangerouslySetInnerHTML={{ __html: item.text }} />
                      </ItemContent>
                    </Item>
                  )
                })}
              </ItemList>
            </Container>
          </Section>
        ))}
      {references &&
        references.map(ref => (
          <Section dark>
            <Container>
              <Centered>
                <h2>{ref.title}</h2>
                <p>{ref.description}</p>
                <Cols>
                  {ref.referenceList.map(reference => (
                    <div key={reference.title}>
                      <h3>{reference.title}</h3>
                      <Link to={reference.link}>
                        <Img
                          className="lightbox"
                          fluid={reference.image.childImageSharp.fluid}
                          alt={reference.title}
                        />
                      </Link>
                      <p>{reference.text}</p>
                    </div>
                  ))}
                </Cols>
              </Centered>
            </Container>
          </Section>
        ))}
      {specs && (
        <Section dark>
          <Container>
            <Centered>
              <h2>{specs.title}</h2>
              <Cols>
                {specs.specItems.map(spec => (
                  <div key={spec.title}>
                    <h3>{spec.title}</h3>
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
  const {
    data: { markdownRemark: post },
  } = props

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
  query ServicePageByID($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 960, srcSetBreakpoints: [340, 960, 1600]) {
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
        introduction {
          title
          paragraphs {
            text
            textBold
          }
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
              fluid(maxWidth: 960, srcSetBreakpoints: [340, 960, 1600]) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        references {
          title
          description
          referenceList {
            title
            text
            link
            image {
              childImageSharp {
                fluid(maxWidth: 960, srcSetBreakpoints: [340, 960, 1600]) {
                  ...GatsbyImageSharpFluid
                }
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
