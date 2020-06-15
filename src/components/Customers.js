import React from 'react'
import styled from 'styled-components'

import { Section, Container, DeemphasizedTitle } from '../style'

import suva from '../img/suva-300.png'
import maxon from '../img/maxonmotor-300x45.png'
import insel from '../img/insel-gruppe-logo-300x70.png'
import hostettler from '../img/hostettler-300x70.png'
import energie360 from '../img/energie360-300x72.png'
import diepost from '../img/die-post-logo.png'
import globus from '../img/globus.png'
import schurch from '../img/schurch-logo.png'
import sd from '../img/sd.png'

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

export default () => {
  return (
    <Section>
      <Container>
        <DeemphasizedTitle>Auswahl unserer Kunden</DeemphasizedTitle>
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
  )
}
