import path from 'path'

type Logo = {
  fileName: string
  alt: string
  height: number
}

const partnerList = [
  {
    fileName: 'post-logo.svg',
    alt: 'Digital Enterprise',
    height: 120,
  },
  {
    fileName: 'post-logo.svg',
    alt: 'dox42',
    height: 120,
  },
  {
    fileName: 'post-logo.svg',
    alt: 'swisscom',
    height: 120,
  },
  {
    fileName: 'post-logo.svg',
    alt: 'cashctrl',
    height: 120,
  },
  {
    fileName: 'post-logo.svg',
    alt: 'flm kassen',
    height: 120,
  },
] satisfies Logo[]

export default function getPartnerLogos() {
  const allPostsData = partnerList.map((partner) => {
    const relativePath = path.join('/img/partners/', partner.fileName)
    const id = partner.fileName.replace(/\.png$/, '')

    return { ...partner, id, path: relativePath }
  })

  return allPostsData
}
