import fs from 'fs'
import path from 'path'

const customerList = [
  {
    fileName: 'post-logo-2023.png',
    alt: 'Die Schweizerische Post AG',
    height: 55,
  },
  {
    fileName: 'suva-300x75.png',
    alt: 'suva',
    height: 35,
  },
  {
    fileName: 'roche.png',
    alt: 'F. Hoffmann-La Roche AG',
    height: 50,
  },
  {
    fileName: 'vivanco-200.png',
    alt: 'Vivanco Gruppe AG',
    height: 50,
  },
  {
    fileName: 'globus.png',
    alt: 'Magazine zum Globus',
    height: 35,
  },
  {
    fileName: 'kanton-bern-200.png',
    alt: 'Amt für Informatik und Organisation des Kantons Bern',
    height: 50,
  },
  {
    fileName: 'stadt-zuerich-finanzdepartement.png',
    alt: 'Stadt Zürich Finanzdepartement',
    height: 35,
  },
  {
    fileName: 'luzerner-kantonsspital-500x113.png',
    alt: 'Luzerner Kantonsspital',
    height: 35,
  },
  {
    fileName: 'akso.png',
    alt: 'Ausgleichskasse Solothurn',
    height: 35,
  },
  {
    fileName: 'fhnw-logo.png',
    alt: 'Fachhochschule Nordwestschweiz',
    height: 45,
  },
  {
    fileName: 'screenimage-logo.png',
    alt: 'Screenimage Systems AG',
    height: 40,
  },
  {
    fileName: 'grandcasino-bern.png',
    alt: 'Grandcasino Bern',
    height: 35,
  },
  {
    fileName: 'energie360-300x72.png',
    alt: 'Energie 360° AG',
    height: 35,
  },
  {
    fileName: 'hostettler-300x70.png',
    alt: 'hostettler',
    height: 35,
  },
  {
    fileName: 'maxonmotor-300x45.png',
    alt: 'maxon motor',
    height: 20,
  },
  {
    fileName: 'hbTec.png',
    alt: 'hbTec AG',
    height: 22,
  },
  {
    fileName: 'insel-gruppe-logo-300x70.png',
    alt: 'Insel Gruppe',
    height: 35,
  },
  {
    fileName: 'schurch-logo.png',
    alt: 'Schürch Getränke AG',
    height: 45,
  },
  {
    fileName: 'sd-295x145.png',
    alt: 'sd Gebäudeunterhalt AG',
    height: 35,
  },
  {
    fileName: 'welti-furrer-300x66.png',
    alt: 'Welti-Furrer',
    height: 25,
  },
  {
    fileName: 'baumgartner-logo.png',
    alt: 'Baumgartner Fenster',
    height: 40,
  },
]

export default function getCustomerLogos() {
  const allPostsData = customerList
    .map((customer) => {
      const relativePath = path.join('/img/customers/', customer.fileName)
      const id = customer.fileName.replace(/\.png$/, '')

      return { ...customer, id, path: relativePath }
    })

  return allPostsData
}
