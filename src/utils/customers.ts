import fs from 'fs'
import path from 'path'

const customerList = [
  {
    fileName: 'post-logo.svg',
    alt: 'Die Schweizerische Post AG',
    height: 120,
  },
  {
    fileName: 'suva-logo.svg',
    alt: 'suva',
    height: 35,
  },
  {
    fileName: 'roche-logo.svg',
    alt: 'F. Hoffmann-La Roche AG',
    height: 80,
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
    fileName: 'kanton-bern-logo.svg',
    alt: 'Amt für Informatik und Organisation des Kantons Bern',
    height: 50,
  },
  {
    fileName: 'stadt-zuerich-finanzdepartement.svg',
    alt: 'Stadt Zürich Finanzdepartement',
    height: 30,
  },
  {
    fileName: 'luzerner-kantonsspital-logo.svg',
    alt: 'Luzerner Kantonsspital',
    height: 30,
  },
  {
    fileName: 'akso-logo.svg',
    alt: 'Ausgleichskasse Solothurn',
    height: 35,
  },
  {
    fileName: 'fhnw-logo.svg',
    alt: 'Fachhochschule Nordwestschweiz',
    height: 40,
  },
  {
    fileName: 'screenimage-logo.svg',
    alt: 'Screenimage Systems AG',
    height: 40,
  },
  {
    fileName: 'grandcasino-bern-logo.svg',
    alt: 'Grandcasino Bern',
    height: 35,
  },
  {
    fileName: 'energie360-logo.svg',
    alt: 'Energie 360° AG',
    height: 35,
  },
  {
    fileName: 'hostettler-logo.svg',
    alt: 'hostettler',
    height: 35,
  },
  {
    fileName: 'maxon-logo.svg',
    alt: 'maxon motor',
    height: 20,
  },
  {
    fileName: 'hbtec-logo.svg',
    alt: 'hbTec AG',
    height: 22,
  },
  {
    fileName: 'insel-gruppe-logo.svg',
    alt: 'Insel Gruppe',
    height: 35,
  },
  {
    fileName: 'schurch-logo.svg',
    alt: 'Schürch Getränke AG',
    height: 45,
  },
  {
    fileName: 'sd-logo.svg',
    alt: 'sd Gebäudeunterhalt AG',
    height: 35,
  },
  {
    fileName: 'welti-furrer.svg',
    alt: 'Welti-Furrer',
    height: 20,
  },
  {
    fileName: 'baumgartner-logo.svg',
    alt: 'Baumgartner Fenster',
    height: 40,
  },
  {
    fileName: 'oekowatt-logo.svg',
    alt: 'OekoWatt AG',
    height: 40,
  },
]

export default function getCustomerLogos() {
  const allPostsData = customerList.map((customer) => {
    const relativePath = path.join('/img/customers/', customer.fileName)
    const id = customer.fileName.replace(/\.png$/, '')

    return { ...customer, id, path: relativePath }
  })

  return allPostsData
}
