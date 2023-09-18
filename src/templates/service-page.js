import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getSrc } from 'gatsby-plugin-image'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Content, { HTMLContent } from '../components/Content'
import {
  Container,
  Section,
  Icon,
  Button,
  MainTitle,
  DeemphasizedTitle,
} from '../style'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import ContactForm from '../components/ContactForm'

const HeadArea = styled.header``

const Subtitle = styled.p`
  font-size: 1.2;
  font-weight: 600;
  line-height: 1;
  @media (min-width: 640px) {
    font-size: 1.4em;
  }
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

const icons = (icon) => `fas fa-${icon}`

const ListTitle = styled.header`
  margin-bottom: 3em;
`
const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 -1rem;
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

const CallToAction = styled.div`
  display: grid;

  .collapsed {
    grid-area: 1/1/1/1;

    transition: opacity 500ms;
    &[aria-hidden='true'] {
      opacity: 0;
      pointer-events: none;
    }
  }
  .expanded {
    grid-area: 1/1/1/1;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 500ms;

    &[aria-hidden='false'] {
      grid-template-rows: 1fr;
    }
    & > div {
      overflow: hidden;
    }
  }
`

const Header = ({ title, image, subtitle, breadcrumbs }) => (
  <HeadArea>
    {breadcrumbs && (
      <nav>
        {breadcrumbs.map((breadcrumb) => (
          <>
            <Link to={`/${breadcrumb.route}/`}>{breadcrumb.name}</Link> &gt;{' '}
            <span dangerouslySetInnerHTML={{ __html: title }}></span>
          </>
        ))}
      </nav>
    )}
    <MainTitle dangerouslySetInnerHTML={{ __html: title }} />
    {subtitle && (
      <div>
        <Subtitle>
          {subtitle.text} {subtitle.swaps && subtitle.swaps[0]}
        </Subtitle>
        {subtitle.bullets && (
          <ul>
            {subtitle.bullets.map((b) => (
              <li key={b} dangerouslySetInnerHTML={{ __html: b }}></li>
            ))}
          </ul>
        )}
      </div>
    )}
    {image && (
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        alt={title}
        css={`
          margin: 2rem auto 0;
        `}
      />
    )}
  </HeadArea>
)

const ServicePageTemplate = ({ content, contentComponent, metaData }) => {
  const [isExpanded, setIsExpanded] = useState(false)
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
    callToAction,
    breadcrumbs,
  } = metaData
  const seoImage = getSrc(image?.childImageSharp.gatsbyImageData)

  return (
    <main>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/solid.min.css"
        />
      </Helmet>
      <SEO metaData={metaData} postImage={seoImage} />
      <Section>
        <Container>
          <Header
            title={title}
            image={image}
            subtitle={subtitle}
            breadcrumbs={breadcrumbs}
          />
          {description && <p>{description}</p>}
        </Container>
      </Section>
      {introduction && (
        <Section>
          <Container>
            <HTMLContent content={introduction} />
          </Container>
        </Section>
      )}
      {customers && (
        <Section dark>
          <Container>
            <DeemphasizedTitle>Auswahl unserer Kunden</DeemphasizedTitle>
            <Customers>
              {customers.map((customer) => (
                <GatsbyImage
                  image={customer.childImageSharp.gatsbyImageData}
                  key={getSrc(customer.childImageSharp.gatsbyImageData)}
                  alt=""
                />
              ))}
            </Customers>
          </Container>
        </Section>
      )}
      {solutions && (
        <Section>
          <Container>
            <h2>Lösungen</h2>
            <Cols>
              {solutions.map((solution) => (
                <div key={solution.title}>
                  <h3>{solution.title}</h3>
                  <a
                    href={getSrc(
                      solution.image.childImageSharp.gatsbyImageData
                    )}
                  >
                    <GatsbyImage
                      image={solution.image.childImageSharp.gatsbyImageData}
                      className="lightbox"
                      alt={solution.title}
                    />
                  </a>
                  <p>{solution.text}</p>
                </div>
              ))}
            </Cols>
          </Container>
        </Section>
      )}
      {bulletGroups &&
        bulletGroups.map((group) => (
          <Section key={group.title}>
            <Container key={group.title}>
              <ListTitle>
                <h2>{group.title}</h2>
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={{ __html: group.description }} />
              </ListTitle>
              <ItemList>
                {group.bulletList.map((item) => (
                  <Item key={item.text}>
                    <Icon>
                      <i className={icons(item.icon)} />
                    </Icon>
                    <ItemContent>
                      <h3>{item.title}</h3>
                      {/* eslint-disable-next-line react/no-danger */}
                      <p dangerouslySetInnerHTML={{ __html: item.text }} />
                    </ItemContent>
                  </Item>
                ))}
              </ItemList>
            </Container>
          </Section>
        ))}
      {references &&
        references.map((ref) => (
          <Section key={ref.title} dark>
            <Container>
              <h2>{ref.title}</h2>
              <p>{ref.description}</p>
              <Cols>
                {ref.referenceList.map((reference) => (
                  <div key={reference.title}>
                    <h3>{reference.title}</h3>
                    <Link to={reference.link}>
                      <GatsbyImage
                        image={reference.image.childImageSharp.gatsbyImageData}
                        className="lightbox"
                        alt={reference.title}
                      />
                    </Link>
                    <p>{reference.text}</p>
                  </div>
                ))}
              </Cols>
            </Container>
          </Section>
        ))}
      {specs && (
        <Section dark>
          <Container>
            <h2>{specs.title}</h2>
            <Cols>
              {specs.specItems.map((spec) => (
                <div key={spec.title}>
                  <h3>{spec.title}</h3>
                  {/* eslint-disable-next-line react/no-danger */}
                  <p>{spec.text}</p>
                </div>
              ))}
            </Cols>
          </Container>
        </Section>
      )}
      <Section>
        <Container>
          <PostContent content={content} />
        </Container>
      </Section>
      <Section dark>
        <Container>
          <h2>
            {callToAction ||
              'Wir unterstützen Sie gerne bei der Beschleunigung ihrer Geschäftsprozesse'}
          </h2>
          <p>
            Rufen Sie uns an unter <a href="tel:+41413222626">041 322 26 26</a>{' '}
            oder schreiben Sie uns.
          </p>
          <CallToAction>
            <div className="collapsed" aria-hidden={isExpanded}>
              <Button
                type="button"
                onClick={() => {
                  window.scrollBy({ behavior: 'smooth', top: 200 })
                  setIsExpanded(true)
                }}
              >
                Jetzt Nachricht schreiben
              </Button>
            </div>
            <div className="expanded" aria-hidden={!isExpanded}>
              <div>
                <p>
                  Füllen Sie unser Formular aus oder schreiben Sie ein Mail an{' '}
                  <a href="mailto:info@apptiva.ch">info@­apptiva.ch</a> und wir
                  melden uns sobald wie möglich bei ihnen.
                </p>
                <ContactForm />
              </div>
            </div>
          </CallToAction>
        </Container>
      </Section>
    </main>
  )
}

const ServicePage = (props) => {
  const {
    data: { markdownRemark: post },
  } = props

  const frontmatter = { ...post.frontmatter, ...post.fields }

  return (
    <Layout>
      <ServicePageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        metaData={frontmatter}
      />
    </Layout>
  )
}

export default ServicePage

export const pageQuery = graphql`
  query ServicePageByID($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      fields {
        introduction
      }
      frontmatter {
        title
        titleTag
        metaDescription
        slug
        image {
          childImageSharp {
            gatsbyImageData(width: 1280, layout: CONSTRAINED)
          }
        }
        subtitle {
          text
          swaps
          bullets
        }
        callToAction
        description
        customers {
          childImageSharp {
            gatsbyImageData(
              width: 200
              placeholder: NONE
              transformOptions: { grayscale: true }
              layout: FIXED
            )
          }
        }
        solutions {
          title
          text
          image {
            childImageSharp {
              gatsbyImageData(width: 960, layout: CONSTRAINED)
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
                gatsbyImageData(width: 960, layout: CONSTRAINED)
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
        breadcrumbs {
          route
          name
        }
      }
    }
  }
`
