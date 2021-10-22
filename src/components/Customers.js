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
    flex: 0 1 4em;
    margin: 0.5em 1em;
  }
`

const Customers = () => (
  <>
    <CustomersTitle>Auswahl unserer Kunden</CustomersTitle>
    <ImageList>
      <StaticImage
        src="../img/kanton-bern-200.png"
        alt="Amt für Informatik und Organisation des Kantons Bern"
        height={50}
        objectFit="contain"
      />
      <StaticImage
        src="../img/die-post-logo.png"
        alt="Die Schweizerische Post AG"
        height={45}
        objectFit="contain"
      />
      <StaticImage
        src="../img/energie360-300x72.png"
        alt="Energie 360° AG"
        height={34}
        objectFit="contain"
      />
      <StaticImage
        src="../img/roche.png"
        alt="F. Hoffmann-La Roche AG"
        height={50}
        objectFit="contain"
      />
      <StaticImage
        src="../img/grandcasino-bern.png"
        alt="Grandcasino Bern"
        objectFit="contain"
      />
      <StaticImage
        src="../img/hbTec.png"
        alt="hbTec AG"
        height={28}
        objectFit="contain"
      />
      <StaticImage
        src="../img/hostettler-300x70.png"
        alt="hostettler"
        height={34}
        objectFit="contain"
      />
      <StaticImage
        src="../img/insel-gruppe-logo-300x70.png"
        alt="Insel Gruppe"
        height={34}
        objectFit="contain"
      />
      <StaticImage
        src="../img/luzerner-kantonsspital-500x113.png"
        alt="Luzerner Kantonsspital"
        height={45}
        objectFit="contain"
      />
      <StaticImage
        src="../img/globus.png"
        alt="Magazine zum Globus"
        height={38}
        objectFit="contain"
      />
      <StaticImage
        src="../img/maxonmotor-300x45.png"
        alt="maxon motor"
        height={20}
        objectFit="contain"
      />
      <StaticImage
        src="../img/schurch-logo.png"
        alt="Schürch Getränke AG"
        height={52}
        objectFit="contain"
      />
      <StaticImage
        src="../img/sd-295x145.png"
        alt="sd Gebäudeunterhalt AG"
        height={50}
        objectFit="contain"
      />
      <StaticImage
        src="../img/suva-300x75.png"
        alt="suva"
        height={35}
        objectFit="contain"
      />
      <StaticImage
        src="../img/vivanco-200.png"
        alt="Vivanco Gruppe AG"
        height={60}
        objectFit="contain"
      />

      <StaticImage
        src="../img/welti-furrer-300x66.png"
        alt="Welti-Furrer"
        height={28}
        objectFit="contain"
      />
    </ImageList>
  </>
)

export default Customers
