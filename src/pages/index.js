import React from 'react'
import Link from 'gatsby-link'

import { Title, Section, FullWidth, Container } from '../layouts/style'
import styled from 'styled-components'
import Testimonials from '../components/Testimonials'

const ColList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1em 4em;
  padding: 0;
  list-style: none;
`
const ListItem = styled.li`
  flex: 1;
  padding: 0 1em 1em;
  text-align: center;

  a {
    display: block;
    padding: 1em;
    border: 1px solid lightgray;
    border-radius: 0.2em;
    color: ${props => props.theme.color.text};

    &:hover {
      color: ${props => props.theme.color.bg}
      background-color: ${props => props.theme.color.primary};
    }
  }

  h2, h3, h4 {
    margin: .1em;
  }
  h3 {
    font-size: 1em;
    font-weight: 300;
  }
  h4 {
    font-size: .8em;
    font-weight: 300;
  }

  img {
    width: 100%;
    margin-top: 1em;
  }
`
const ImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: 2em -1em 0;
  img {
    flex: 0 1 6em;
    width: 100%;
    max-width: 6em;
    height: 100%;
    padding: 1em;
  }
`

const IndexPage = ({ testimonials }) => (
  <div>
    <Section>
      <Title id="dienstleistungen">Dienst&shy;leistungen</Title>
      <ColList>
        <ListItem>
          <Link to="/individuelle-entwicklung/">
            <h3>Individuelle Entwicklung</h3>
            <h2>App-Lösungen</h2>
            <h4>Mobile und Desktop</h4>
            <img
              src="https://apptiva.ch/wp-content/uploads/2015/06/Apps-1024x737.png"
              alt="Apps"
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/individuelle-entwicklung/">
            <h3>Individuelle Entwicklung</h3>
            <h2>App-Lösungen</h2>
            <h4>Mobile und Desktop</h4>
            <img
              src="https://apptiva.ch/wp-content/uploads/2015/06/Apps-1024x737.png"
              alt="Apps"
            />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/individuelle-entwicklung/">
            <h3>Individuelle Entwicklung</h3>
            <h2>App-Lösungen</h2>
            <h4>Mobile und Desktop</h4>
            <img
              src="https://apptiva.ch/wp-content/uploads/2015/06/Apps-1024x737.png"
              alt="Apps"
            />
          </Link>
        </ListItem>
      </ColList>
      <blockquote>
        <h3>Unsere Spezialität</h3>
        <p>
          Das Erstellen von individuellen Softwarelösungen ist unsere
          Spezialität. Wir unterstützen Sie bei der digitalen Transformation
          Ihres Unternehmens und beschleunigen Ihre Geschäftsprozesse. Dazu
          setzen wir modernste Methoden und Technologien ein und liefern
          schlanke und passgenaue Lösungen: „Lean Enterprise Apps“. Unsere Apps
          füllen die Lücken, die Standardsoftware nicht füllen kann.
        </p>
      </blockquote>
    </Section>

    <Section dark>
      <ImageList>
        <img
          src="https://apptiva.ch/wp-content/uploads/2016/11/sanagate-300x65.png"
          alt=""
        />
        <img
          src="https://apptiva.ch/wp-content/uploads/2016/02/insel-gruppe-logo-300x70.png"
          alt="insel-gruppe-logo"
        />
        <img
          src="https://apptiva.ch/wp-content/uploads/2016/07/57d088b5-0519-4d8a-8180-4f95d7cea1ad-300x72.png"
          alt=""
        />
        <img
          src="https://apptiva.ch/wp-content/uploads/2016/07/logo_organisationen_suva-300x75.png"
          alt="suva"
        />
        <img
          src="https://apptiva.ch/wp-content/uploads/2016/07/hostettler-300x70.png"
          alt="hostettler"
        />
        <img
          src="https://apptiva.ch/wp-content/uploads/2016/11/maxonmotor_desat-300x45.png"
          alt=""
        />
      </ImageList>
    </Section>

    <Testimonials testimonials={testimonials} />
  </div>
)

export default ({ data }) => {
  console.log('start page frontmatter', data.testimonials)

  return <IndexPage testimonials={data.testimonials} />
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
  }
`
