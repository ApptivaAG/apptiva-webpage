import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getSrc } from 'gatsby-plugin-image'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Content, { HTMLContent } from '../components/Content'
import { Container, Section, Icon, MainTitle } from '../style'
import { referenzenRoute } from '../config'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import ReferenzLinkItem from '../components/ReferenzLinkItem'
import Contact from '../components/Contact'

const icons = (icon) => `fas fa-${icon}`

const Header = ({ title, image, imageCaption }) => (
  <HeadArea>
    <MainTitle dangerouslySetInnerHTML={{ __html: title }} />
    <figure>
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        css="width: 100%; box-shadow: 0px 2px 6px -1px #00000033; border-radius: 0.5em;"
        alt={title}
      />
      {imageCaption && <figcaption>{imageCaption}</figcaption>}
    </figure>
  </HeadArea>
)

const Navigation = ({ next, prev }) => (
  <LayoutNavigation>
    {prev && (
      <ReferenzLinkItem
        frontmatter={prev.frontmatter}
        excerpt={prev.frontmatter.description}
        route={referenzenRoute}
      />
    )}
    {next && (
      <ReferenzLinkItem
        frontmatter={next.frontmatter}
        excerpt={next.frontmatter.description}
        route={referenzenRoute}
      />
    )}
  </LayoutNavigation>
)

const ReferenzTemplate = ({
  content,
  contentComponent,
  metaData,
  next,
  prev,
}) => {
  const PostContent = contentComponent || Content
  const {
    title,
    image,
    description,
    imageCaption,
    bulletGroups,
    contactPerson,
  } = metaData

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
      <SEO
        metaData={{
          ...metaData,
          image: getSrc(metaData.image.childImageSharp.gatsbyImageData),
        }}
        postImage={getSrc(metaData.image.childImageSharp.gatsbyImageData)}
      />
      <Container>
        <article>
          <header>
            <Header title={title} image={image} imageCaption={imageCaption} />
            {description && <Description>{description}</Description>}
          </header>
          <section css="margin-bottom: 4em;">
            <PostContent content={content} />
          </section>
          {bulletGroups &&
            bulletGroups.map((group) => (
              <Section key="{group.title}">
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
              </Section>
            ))}
          <section>
            <Section key="contact-person">
              <Contact contactPerson={contactPerson} />
            </Section>
          </section>
        </article>
      </Container>
      <footer css="background: #eee; padding: 3em 0">
        <Container>
          <Navigation next={next} prev={prev} />
        </Container>
      </footer>
    </main>
  )
}

const Referenz = ({ data, pageContext }) => {
  const { markdownRemark: post } = data

  post.frontmatter.excerpt = post.excerpt
  post.frontmatter.updatedAt = post.updatedAt
  post.frontmatter.dateModified = post.updatedAt

  return (
    <Layout>
      <ReferenzTemplate
        content={post.html}
        contentComponent={HTMLContent}
        metaData={{
          ...post.frontmatter,
          slug: `${referenzenRoute}/${post.slug}`,
        }}
        next={data.next}
        prev={data.prev}
      />
    </Layout>
  )
}

export default Referenz

export const pageQuery = graphql`
  query ReferenzByID($id: String!, $prevId: String, $nextId: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 300)
      updatedAt(formatString: "DD.MM.YYYY")
      frontmatter {
        title
        description
        author
        date(formatString: "DD.MM.YYYY")
        datePublished: date(formatString: "DD-MM-YYYY")
        slug
        image {
          childImageSharp {
            gatsbyImageData(width: 1280, layout: CONSTRAINED)
          }
        }
        imageCaption
        order
        bulletGroups {
          title
          description
          bulletList {
            icon
            title
            text
          }
        }
        contactPerson {
          name
          role
          phone
          email
          text1
          text2
          image {
            childImageSharp {
              gatsbyImageData(height: 200)
            }
          }
        }
      }
    }
    next: markdownRemark(id: { eq: $nextId }) {
      id
      frontmatter {
        title
        slug
        templateKey
        date(formatString: "DD.MM.YYYY")
        description
        image {
          childImageSharp {
            gatsbyImageData(width: 240, placeholder: BLURRED, layout: FIXED)
          }
        }
      }
    }
    prev: markdownRemark(id: { eq: $prevId }) {
      id
      frontmatter {
        title
        slug
        templateKey
        date(formatString: "DD.MM.YYYY")
        description
        image {
          childImageSharp {
            gatsbyImageData(width: 240, placeholder: BLURRED, layout: FIXED)
          }
        }
      }
    }
  }
`

const HeadArea = styled.div`
  margin-bottom: 0.6em;
`

const LayoutNavigation = styled.div``

const Description = styled.p`
  font-weight: 600;
  margin-bottom: 0.4em;
  margin-top: 2em;
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
