import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { DeemphasizedTitle } from '../style'

const CustomersTitle = styled(DeemphasizedTitle)`
  font-size: 1em !important;
`

const ImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: 0 1em 1em 1em;
  > div {
    flex: 0 1 5em;
    margin: 0.7em 1.5em;
  }
`

const Customers = () => (
  <>
    <CustomersTitle>Auswahl unserer Kunden</CustomersTitle>
    <ImageList>
      <StaticImage
        src="../img/kanton-bern-200.png"
        alt="Amt für Informatik und Organisation des Kantons Bern"
        objectFit="contain"
      />
      <StaticImage
        src="../img/akso.png"
        alt="Ausgleichskasse Solothurn"
        objectFit="contain"
      />
      <StaticImage
        src="../img/die-post-logo.png"
        alt="Die Schweizerische Post AG"
        objectFit="contain"
      />
      <StaticImage
        src="../img/energie360-300x72.png"
        alt="Energie 360° AG"
        objectFit="contain"
      />
      <StaticImage
        src="../img/roche.png"
        alt="F. Hoffmann-La Roche AG"
        objectFit="contain"
      />
      <StaticImage
        src="../img/grandcasino-bern.png"
        alt="Grandcasino Bern"
        objectFit="contain"
      />
      <StaticImage src="../img/hbTec.png" alt="hbTec AG" objectFit="contain" />
      <StaticImage
        src="../img/hostettler-300x70.png"
        alt="hostettler"
        objectFit="contain"
      />
      <StaticImage
        src="../img/insel-gruppe-logo-300x70.png"
        alt="Insel Gruppe"
        objectFit="contain"
      />
      <StaticImage
        src="../img/luzerner-kantonsspital-500x113.png"
        alt="Luzerner Kantonsspital"
        objectFit="contain"
      />
      <StaticImage
        src="../img/globus.png"
        alt="Magazine zum Globus"
        objectFit="contain"
      />
      <StaticImage
        src="../img/maxonmotor-300x45.png"
        alt="maxon motor"
        objectFit="contain"
      />
      <StaticImage
        src="../img/schurch-logo.png"
        alt="Schürch Getränke AG"
        objectFit="contain"
      />
      <StaticImage
        src="../img/sd-295x145.png"
        alt="sd Gebäudeunterhalt AG"
        objectFit="contain"
      />
      <StaticImage
        src="../img/stadt-zuerich-finanzdepartement.png"
        alt="Stadt Zürich Finanzdepartement"
        objectFit="contain"
      />
      <StaticImage
        src="../img/suva-300x75.png"
        alt="suva"
        objectFit="contain"
      />
      <StaticImage
        src="../img/vivanco-200.png"
        alt="Vivanco Gruppe AG"
        objectFit="contain"
      />

      <StaticImage
        src="../img/welti-furrer-300x66.png"
        alt="Welti-Furrer"
        objectFit="contain"
      />
    </ImageList>
  </>
)

export default Customers
