import { SettingsDataQueries } from '@/sanity/lib/queries'
import StyledPortableText from '../../../../components/styled-portable-text'
import { PortableTextComponents, toHTML } from '@portabletext/to-html'
import { groupBy } from 'remeda'
import Typewriter from '@/components/typewriter'

export default async function Content(props: {
  claim: NonNullable<SettingsDataQueries>
}) {
  if (!props.claim.claim) {
    return <p>No Claim</p>
  }

  const myPortableTextComponents: PortableTextComponents = {
    marks: {
      underline: ({ children }) => `<u>${children}</u>`,
    },
    block: {
      h1: ({ children }) => children ?? '',
    },
  }

  const blocks = groupBy(props.claim.claim, (x) => x.style)

  return (
    <div className="content space-y-8">
      {blocks.h1 && (
        <Typewriter
          text={toHTML(blocks.h1, { components: myPortableTextComponents })}
        />
      )}
      {blocks.normal && (
        <StyledPortableText content={blocks.normal} spreadParagraphs />
      )}
    </div>
  )
}
