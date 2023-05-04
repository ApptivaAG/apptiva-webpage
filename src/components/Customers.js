import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const CustomerList = () => (
  <>
    <li>
      <StaticImage
        src="../img/kanton-bern-200.png"
        alt="Amt für Informatik und Organisation des Kantons Bern"
        height={70}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/akso.png"
        alt="Ausgleichskasse Solothurn"
        height={50}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/die-post-logo.png"
        alt="Die Schweizerische Post AG"
        height={60}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/suva-300x75.png"
        alt="suva"
        height={50}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/energie360-300x72.png"
        alt="Energie 360° AG"
        height={50}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/roche.png"
        alt="F. Hoffmann-La Roche AG"
        height={70}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/globus.png"
        alt="Magazine zum Globus"
        height={50}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/maxonmotor-300x45.png"
        alt="maxon motor"
        height={30}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/grandcasino-bern.png"
        alt="Grandcasino Bern"
        height={50}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/hbTec.png"
        alt="hbTec AG"
        height={35}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/hostettler-300x70.png"
        alt="hostettler"
        height={50}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/insel-gruppe-logo-300x70.png"
        alt="Insel Gruppe"
        height={50}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/luzerner-kantonsspital-500x113.png"
        alt="Luzerner Kantonsspital"
        height={50}
        loading="eager"
      />
    </li>

    <li>
      <StaticImage
        src="../img/schurch-logo.png"
        alt="Schürch Getränke AG"
        height={60}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/sd-295x145.png"
        alt="sd Gebäudeunterhalt AG"
        height={50}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/stadt-zuerich-finanzdepartement.png"
        alt="Stadt Zürich Finanzdepartement"
        height={50}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/vivanco-200.png"
        alt="Vivanco Gruppe AG"
        height={70}
        loading="eager"
      />
    </li>
    <li>
      <StaticImage
        src="../img/welti-furrer-300x66.png"
        alt="Welti-Furrer"
        height={40}
        loading="eager"
      />
    </li>
  </>
)

const Customers = () => (
  <MarqueeStyle>
    <div className="marquee">
      <ul>
        <CustomerList />
      </ul>
      <ul style={{ translate: '100%', position: 'absolute', inset: 0 }}>
        <CustomerList />
      </ul>
    </div>
  </MarqueeStyle>
)

const MarqueeStyle = styled.div`
  overflow: hidden;
  width: 100vw;
  max-width: 100%;

  .marquee {
    width: clamp(220rem, 400%, 260rem);
    margin-block: 1rem;
    position: relative;
  }
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    animation: slide 50s linear infinite;
    margin: 0;
    padding: 1em 0;
  }

  li {
    list-style: none;
  }

  @keyframes slide {
    0% {
      transform: translate(0%);
    }

    100% {
      transform: translate(-100%);
    }
  }
`

export default Customers
