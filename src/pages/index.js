import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import {
  Title,
  Section,
  Button,
  Centered,
  Right,
  Subtitle,
  Container,
} from '../style'
import Layout from '../components/Layout'
import Testimonials from '../components/Testimonials'
import Employees from '../components/Employees'
import ContactForm from '../components/ContactForm'

import { ReactComponent as Botfabrik } from '../img/botfabrik.svg'

import suva from '../img/suva-300.png'
import sanagate from '../img/sanagate-300x65.png'
import maxon from '../img/maxonmotor-300x45.png'
import insel from '../img/insel-gruppe-logo-300x70.png'
import hostettler from '../img/hostettler-300x70.png'
import energie360 from '../img/energie360-300x72.png'
import diepost from '../img/die-post-logo.png'
import schurch from '../img/schurch-logo.png'
import sd from '../img/sd.png'
import globus from '../img/globus.png'
import SEO from '../components/SEO'
import { truncate } from '../util'

const ColList = styled.ul`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5em 2em;
  padding: 0;
  list-style: none;
`
const ImgStyled = styled(Img)`
  max-width: 340px;
  transition: transform 0.3s;
`

const BotfabrikLogo = styled(Botfabrik)`
  width: 70%;
  margin: 2em 0.6em;
`
const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  flex: 1 1 12rem;
  margin: 0 0.5em 1em;
  border: 1px solid lightgray;
  border-radius: 0.2em;
  text-align: ${props => (props.align ? props.align : 'center')};

  a {
    flex: 1 1 auto;
    padding: ${props => (props.full ? 0 : '1em')};
    border-radius: 0.2em;
    color: ${props => props.theme.color.text};
    overflow: hidden;

    svg {
      transition: transform 0.3s;
    }

    &:hover {
      color: ${props => props.theme.color.bg};
      background-color: ${props => props.theme.color.primary};

      ${ImgStyled}, svg {
        transform: scale(1.06);
        color: black;
      }
    }
  }

  h2,
  h3,
  h4 {
    margin: 0.1em ${props => (props.full ? '1rem' : 0)};
  }
  h3 {
    font-size: 1em;
    font-weight: 300;
  }
  h4 {
    font-size: 0.8em;
    font-weight: 300;
  }

  ${ImgStyled} {
    margin-top: ${props => (props.full ? 0 : '1rem')};
    margin-bottom: ${props => (props.full ? '.6rem' : 0)};
    margin-left: auto;
    margin-right: auto;
  }

  p {
    line-height: 1.2;
    margin: 1em ${props => (props.full ? '1rem' : 0)};
  }
`
const Buttonlist = styled(Right)`
  a {
    margin-top: 1em;
  }
  @media (min-width: 381px) {
    a {
      margin-left: 1em;
    }
  }
`
const CustomerTitle = styled.h2`
  font-size: 1.7em;
  color: #cbcbcb;
  text-align: center;
`
const ImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: 1em -1em;
  img {
    flex: 0 1 6em;
    width: 100%;
    max-width: 6em;
    height: 100%;
    padding: 1em;
  }
`
const Blockquote = styled.blockquote`
  margin-top: 4em;
  padding-bottom: 1em;
`
const PartnerTitle = styled.h2`
  font-size: 1.7em;
  color: #cbcbcb;
  text-align: center;
`

const PartnerImage = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;

  a {
    margin: 2em;
  }
`

const IndexPage = ({ testimonials, posts, employees, partners, images }) => (
  <Layout showHero>
    <main>
      <SEO />
      <Section id="dienstleistungen">
        <Container>
          <Title>Dienst&shy;leistungen</Title>
          <ColList>
            <ListItem>
              <Link to="/individuelle-entwicklung/">
                <h3>Individuelle Entwicklung</h3>
                <h2>App-Lösungen</h2>
                <h4>Mobile und Desktop</h4>
                <ImgStyled
                  style={{ width: '100%', marginTop: '2rem' }}
                  fluid={images.appsImage.childImageSharp.fluid}
                  alt="Apps"
                />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/chatbots/">
                <h3>Individuelle</h3>
                <h2>Chatbots</h2>
                <h4>Botfabrik by Apptiva</h4>
                <ImgStyled
                  fluid={images.chatbot.childImageSharp.fluid}
                  alt="Chatbots"
                />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/produktkonfiguratoren/">
                <h2>
                  Produkt-
                  <br />
                  Konfiguratoren
                </h2>
                <h4>Komplexe Angebote einfach verkaufen</h4>
                <ImgStyled
                  fluid={images.partyplaner.childImageSharp.fluid}
                  alt="Angebots- und Produktkonfiguratoren"
                />
              </Link>
            </ListItem>
          </ColList>
          <h2>Weitere Angebote</h2>
          <ul>
            <li>
              <Link to="/dashboard-notaufnahme/">
                <h3>Dashboard für die Notaufnahme</h3>
              </Link>
            </li>
            <li>
              <Link to="/unterstuetzung">
                <h3>Erstklassige Unterstützung</h3>
              </Link>
            </li>
            <li>
              <Link to="/einsatzplanung">
                <h3>Einsatzplanung für den Gebäudeunterhalt</h3>
              </Link>
            </li>
            <li>
              <Link to="/future-hack-digitalisierung-gemeinsam-anpacken">
                <h3>Future Hack - Digitalisierung gemeinsam anpacken</h3>
              </Link>
            </li>
          </ul>
          <Blockquote>
            <h3>Unsere Spezialität</h3>
            <p css="margin-bottom: 0">
              Das Erstellen von individuellen Softwarelösungen ist unsere
              Spezialität. Wir unterstützen Sie bei der digitalen Transformation
              Ihres Unternehmens und beschleunigen Ihre Geschäftsprozesse. Dazu
              setzen wir modernste Methoden und Technologien ein und liefern
              schlanke und passgenaue Lösungen: „Lean Enterprise Apps“. Unsere
              Apps füllen die Lücken, die Standardsoftware nicht füllen kann.
            </p>
            <Buttonlist>
              <Button to="/vorgehensweise">Unser Vorgehen</Button>
              <Button to="/unsere-kompetenzen">Unsere Kompetenzen</Button>
            </Buttonlist>
          </Blockquote>
        </Container>
      </Section>

      <Section dark>
        <Container>
          <CustomerTitle>Auswahl unserer Kunden</CustomerTitle>
          <ImageList>
            <img
              className="lazyload"
              data-src={energie360}
              alt="Energie 360° AG"
              width="160"
              height="69"
            />
            <img
              className="lazyload"
              data-src={schurch}
              alt="Schürch Getränke AG"
              width="160"
              height="104"
            />
            <img
              className="lazyload"
              data-src={hostettler}
              alt="hostettler"
              width="160"
              height="68"
            />
            <img
              className="lazyload"
              data-src={insel}
              alt="Insel Gruppe"
              width="160"
              height="68"
            />
            <img
              className="lazyload"
              data-src={sd}
              alt="sd Gebäudeunterhalt AG"
              width="160"
              height="99"
            />
            <img
              className="lazyload"
              data-src={maxon}
              alt="maxon motor"
              width="160"
              height="58"
            />
            <img
              className="lazyload"
              data-src={sanagate}
              alt="sanagate"
              width="160"
              height="66"
            />
            <img
              className="lazyload"
              data-src={globus}
              alt="Magazine zum Globus"
              width="160"
              height="75"
            />
            <img
              className="lazyload"
              data-src={diepost}
              alt="Die Schweizerische Post AG"
              width="160"
              height="81"
            />
            <img
              className="lazyload"
              data-src={suva}
              alt="suva"
              width="160"
              height="70"
            />
          </ImageList>
        </Container>
      </Section>

      <Testimonials testimonials={testimonials} />

      <Employees employees={employees} />

      <Section id="blog">
        <Container>
          <Title>Blog</Title>
          <Subtitle>Aktuelle News rund um die Apptiva</Subtitle>

          <ColList>
            {posts.map(({ node: post }) => (
              <ListItem key={post.id} full align="left">
                <Link to={post.frontmatter.slug}>
                  <ImgStyled
                    style={{ width: '100%' }}
                    fixed={{
                      ...post.frontmatter.image.childImageSharp.fixed,
                      base64:
                        post.frontmatter.image.childImageSharp.sqip.dataURI,
                    }}
                    alt="Post image"
                  />
                  <h2
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}
                  />
                  <h4>{post.frontmatter.date}</h4>
                  <p>
                    {post.frontmatter.description
                      ? truncate(post.frontmatter.description, 140)
                      : post.excerpt}
                  </p>
                </Link>
              </ListItem>
            ))}
          </ColList>
          <Centered>
            <Button to="/blog/">Zum Apptiva Blog</Button>
          </Centered>
        </Container>
      </Section>
      <Section dark>
        <Container>
          <PartnerTitle>Partner</PartnerTitle>
          <PartnerImage>
            {partners.edges.map(({ node }) => {
              return (
                <Link to={node.frontmatter.slug}>
                  <Img
                    fixed={node.frontmatter.logo.childImageSharp.fixed}
                    alt={node.frontmatter.name}
                  />
                </Link>
              )
            })}
          </PartnerImage>
        </Container>
      </Section>
      <Section id="kontakt">
        <Container>
          <Title>Kontakt</Title>
          <Subtitle>Wir freuen uns, von Ihnen zu hören.</Subtitle>
          Möchten Sie uns kennenlernen oder haben Sie Fragen zu unseren
          Dienstleistungen?
          <br />
          Zögern Sie nicht und nehmen Sie mit uns Kontakt auf!
          <ContactForm />
        </Container>
      </Section>
      <Section style={{ padding: 0, marginBottom: '-4rem' }}>
        <iframe
          className="lazyload"
          title="Google Maps"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          data-src="https://maps.google.com/maps?q=Apptiva AG, Neuenkirchstrasse 19, Sempach Station&amp;hl=de&amp;geocode=+&amp;hnear=Apptiva AG+Neuenkirchstrasse 19,+Sempach Station&amp;t=m&amp;z=10&amp;iwloc=A&amp;output=embed"
          width="100%"
          height="550px"
          frameBorder="0"
        />
      </Section>
    </main>
  </Layout>
)

export default ({ data }) => {
  const { edges: posts } = data.blogs
  return (
    <IndexPage
      testimonials={data.testimonials}
      posts={posts}
      employees={data.employees}
      partners={data.partners}
      images={data}
    />
  )
}

export const indexPageQuery = graphql`
  query IndexPage {
    testimonials: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "testimonial-data" } } }
    ) {
      edges {
        node {
          id
          ...Testimonial_details
        }
      }
    }
    employees: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___name] }
      filter: { frontmatter: { templateKey: { eq: "employee-page" } } }
    ) {
      edges {
        node {
          id
          ...Employee_details
        }
      }
    }
    blogs: allMarkdownRemark(
      limit: 3
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 140)
          id
          frontmatter {
            title
            slug
            image {
              childImageSharp {
                fixed(height: 150, width: 300, cropFocus: ENTROPY) {
                  ...GatsbyImageSharpFixed_withWebp_noBase64
                }
                sqip(numberOfPrimitives: 8, blur: 6) {
                  dataURI
                }
              }
            }
            date(formatString: "DD.MM.YYYY")
            description
          }
        }
      }
    }
    partners: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___prio] }
      filter: { frontmatter: { templateKey: { eq: "partner-page" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            url
            slug
            logo {
              childImageSharp {
                fixed(width: 200) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
    }
    appsImage: file(
      absolutePath: { regex: "/individuelle-entwicklung/apps.png/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    partyplaner: file(
      absolutePath: { regex: "/produktkonfiguratoren/partyplaner.png/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    chatbot: file(
      absolutePath: { regex: "/services/chatbots/chatbot-screen2.png/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`
