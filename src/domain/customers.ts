import path from 'path'

export type Group = 'chatbot' | 'web' | 'mobile'
type Logo = {
  fileName: string
  alt: string
  height: number
  group: Group[]
}

const customerList = [
  {
    fileName: 'post-logo.svg',
    alt: 'Die Schweizerische Post AG',
    height: 120,
    group: ['chatbot'],
  },
  {
    fileName: 'suva-logo.svg',
    alt: 'suva',
    height: 35,
    group: ['chatbot', 'web', 'mobile'],
  },
  {
    fileName: 'roche-logo.svg',
    alt: 'F. Hoffmann-La Roche AG',
    height: 80,
    group: ['chatbot'],
  },
  {
    fileName: 'vivanco-logo.svg',
    alt: 'Vivanco Gruppe AG',
    height: 50,
    group: ['web'],
  },
  {
    fileName: 'globus-logo.svg',
    alt: 'Magazine zum Globus',
    height: 60,
    group: ['web', 'mobile'],
  },
  {
    fileName: 'kanton-bern-logo.svg',
    alt: 'Amt für Informatik und Organisation des Kantons Bern',
    height: 50,
    group: ['chatbot'],
  },
  {
    fileName: 'stadt-zuerich-finanzdepartement.svg',
    alt: 'Stadt Zürich Finanzdepartement',
    height: 30,
    group: ['chatbot'],
  },
  {
    fileName: 'shv-logo.svg',
    alt: 'Schweizerischer Handball-Verband',
    height: 50,
    group: ['chatbot'],
  },
  {
    fileName: 'luzerner-kantonsspital-logo.svg',
    alt: 'Luzerner Kantonsspital',
    height: 30,
    group: ['chatbot'],
  },
  {
    fileName: 'akso-logo.svg',
    alt: 'Ausgleichskasse Solothurn',
    height: 35,
    group: ['chatbot'],
  },
  {
    fileName: 'fhnw-logo.svg',
    alt: 'Fachhochschule Nordwestschweiz',
    height: 40,
    group: ['web'],
  },
  {
    fileName: 'screenimage-logo.svg',
    alt: 'Screenimage Systems AG',
    height: 40,
    group: ['web', 'mobile'],
  },
  {
    fileName: 'kanton-schwyz.svg',
    alt: 'Konton Schwyz',
    height: 60,
    group: ['chatbot'],
  },
  {
    fileName: 'grandcasino-bern-logo.svg',
    alt: 'Grandcasino Bern',
    height: 35,
    group: ['web'],
  },
  {
    fileName: 'energie360-logo.svg',
    alt: 'Energie 360° AG',
    height: 35,
    group: ['chatbot', 'web'],
  },
  {
    fileName: 'hostettler-logo.svg',
    alt: 'hostettler',
    height: 35,
    group: ['web'],
  },
  {
    fileName: 'maxon-logo.svg',
    alt: 'maxon motor',
    height: 20,
    group: ['chatbot'],
  },
  {
    fileName: 'hbtec-logo.svg',
    alt: 'hbTec AG',
    height: 22,
    group: ['mobile'],
  },
  {
    fileName: 'insel-gruppe-logo.svg',
    alt: 'Insel Gruppe',
    height: 35,
    group: ['web'],
  },
  {
    fileName: 'schurch-logo.svg',
    alt: 'Schürch Getränke AG',
    height: 45,
    group: ['web'],
  },
  {
    fileName: 'sd-logo.svg',
    alt: 'sd Gebäudeunterhalt AG',
    height: 35,
    group: ['web'],
  },
  {
    fileName: 'welti-furrer.svg',
    alt: 'Welti-Furrer',
    height: 20,
    group: ['web', 'mobile'],
  },
  {
    fileName: 'baumgartner-logo.svg',
    alt: 'Baumgartner Fenster',
    height: 40,
    group: ['web', 'mobile'],
  },
  {
    fileName: 'oekowatt-logo.svg',
    alt: 'OekoWatt AG',
    height: 40,
    group: ['chatbot'],
  },
] satisfies Logo[]

export default function getCustomerLogos(group?: Group[] | undefined) {
  const allPostsData = customerList
    .filter((_) => (group ? arraysHaveSameElement(_.group, group) : true))
    .map((customer) => {
      const relativePath = path.join('/img/customers/', customer.fileName)
      const id = customer.fileName.replace(/\.png$/, '')

      return { ...customer, id, path: relativePath }
    })

  return allPostsData
}

function arraysHaveSameElement(arr1: string[], arr2: string[]) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      return true
    }
  }
  return false
}
