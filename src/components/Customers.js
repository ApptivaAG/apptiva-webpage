import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import Marquee from 'react-fast-marquee'
import { DeemphasizedTitle } from '../style'

const CustomersTitle = styled(DeemphasizedTitle)`
  font-size: 1em !important;
`

const Customer = styled.div`
  flex: 0 1 5em;
  margin: 0.7em 2.5em;
  width: 160px;
`

const Customers = () => (
  <>
    <CustomersTitle>Auswahl unserer Kunden</CustomersTitle>
    <Marquee speed={40}>
      <Customer>
        <StaticImage
          src="../img/kanton-bern-200.png"
          alt="Amt für Informatik und Organisation des Kantons Bern"
        />
      </Customer>
      <Customer>
        <StaticImage src="../img/akso.png" alt="Ausgleichskasse Solothurn" />
      </Customer>
      <Customer>
        <StaticImage
          src="../img/die-post-logo.png"
          alt="Die Schweizerische Post AG"
        />
      </Customer>
      <Customer>
        <StaticImage src="../img/energie360-300x72.png" alt="Energie 360° AG" />
      </Customer>
      <Customer>
        <StaticImage src="../img/roche.png" alt="F. Hoffmann-La Roche AG" />
      </Customer>
      <Customer>
        <StaticImage src="../img/grandcasino-bern.png" alt="Grandcasino Bern" />
      </Customer>
      <Customer>
        <StaticImage src="../img/hbTec.png" alt="hbTec AG" />
      </Customer>
      <Customer>
        <StaticImage src="../img/hostettler-300x70.png" alt="hostettler" />
      </Customer>
      <Customer>
        <StaticImage
          src="../img/insel-gruppe-logo-300x70.png"
          alt="Insel Gruppe"
        />
      </Customer>
      <Customer>
        <StaticImage
          src="../img/luzerner-kantonsspital-500x113.png"
          alt="Luzerner Kantonsspital"
        />
      </Customer>
      <Customer>
        <StaticImage src="../img/globus.png" alt="Magazine zum Globus" />
      </Customer>
      <Customer>
        <StaticImage src="../img/maxonmotor-300x45.png" alt="maxon motor" />
      </Customer>
      <Customer>
        <StaticImage src="../img/schurch-logo.png" alt="Schürch Getränke AG" />
      </Customer>
      <Customer>
        <StaticImage src="../img/sd-295x145.png" alt="sd Gebäudeunterhalt AG" />
      </Customer>
      <Customer>
        <StaticImage
          src="../img/stadt-zuerich-finanzdepartement.png"
          alt="Stadt Zürich Finanzdepartement"
        />
      </Customer>
      <Customer>
        <StaticImage src="../img/suva-300x75.png" alt="suva" />
      </Customer>
      <Customer>
        <StaticImage src="../img/vivanco-200.png" alt="Vivanco Gruppe AG" />
      </Customer>
      <Customer>
        <StaticImage src="../img/welti-furrer-300x66.png" alt="Welti-Furrer" />
      </Customer>
    </Marquee>
  </>
)

export default Customers
