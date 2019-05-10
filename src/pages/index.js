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
} from '../layouts/style'
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
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import SEO from '../components/SEO'
import swisscom from '../img/swisscom-gold-partner-300.png'
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
const CustomerTitle = styled.h1`
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
const PartnerTitle = styled.h1`
  font-size: 1.7em;
  color: #cbcbcb;
  text-align: center;
`

const PartnerImage = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: 1em -1em;
  img {
    flex: 1 1 6em;
    width: 100%;
    max-width: 12em;
    height: 100%;
    padding: 1em;
  }
`

const IndexPage = ({ testimonials, posts, employees, images }) => (
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
                  fluid={images.appsImage.fluid}
                  alt="Apps"
                />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/bot-entwicklung/">
                <h3>Individuelle</h3>
                <h2>Chatbots</h2>
                <h4>Botfabrik by Apptiva</h4>
                <BotfabrikLogo />
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
                  fluid={images.partyplaner.fluid}
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
            <img src={energie360} alt="Energie 360° AG" />
            <img src={schurch} alt="Schürch Getränke AG" />
            <img src={hostettler} alt="hostettler" />
            <img src={insel} alt="Insel Gruppe" />
            <img src={sd} alt="sd Gebäudeunterhalt AG" />
            <img src={maxon} alt="maxon motor" />
            <img src={sanagate} alt="sanagate" />
            <img src={diepost} alt="Die Schweizerische Post AG" />
            <img src={suva} alt="suva" />
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
                  <h2>{post.frontmatter.title}</h2>
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
          <PartnerTitle>Partnerschaften</PartnerTitle>
          <PartnerImage>
            <img src={swisscom} alt="Swisscom Gold Partner" />
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
          title="Google Maps"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?q=Apptiva AG, Neuenkirchstrasse 19, Sempach Station&amp;hl=de&amp;geocode=+&amp;hnear=Apptiva AG+Neuenkirchstrasse 19,+Sempach Station&amp;t=m&amp;z=10&amp;iwloc=A&amp;output=embed"
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
                fixed(height: 150, width: 300) {
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
    appsImage: imageSharp(fluid: { originalName: { regex: "/apps.png/" } }) {
      fluid(maxWidth: 600) {
        ...GatsbyImageSharpFluid_withWebp_noBase64
      }
    }
    partyplaner: imageSharp(
      fluid: { originalName: { regex: "/partyplaner.png/" } }
    ) {
      fluid(maxWidth: 600) {
        ...GatsbyImageSharpFluid_withWebp_noBase64
      }
    }
  }
`
