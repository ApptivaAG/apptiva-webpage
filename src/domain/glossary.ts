import { GlossaryQueryData } from '@/sanity/lib/queries'
import portableTextToString from '../utils/portable-text-to-string'

export function orderGlossaryByTitle(glossary: GlossaryQueryData) {
  return glossary.sort((a, b) => {
    const leftTitle = a.header?.title
      ? portableTextToString(a.header.title)
      : ''
    const rightTitle = b.header?.title
      ? portableTextToString(b.header.title)
      : ''

    return leftTitle.localeCompare(rightTitle)
  })
}
