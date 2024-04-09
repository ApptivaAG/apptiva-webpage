import { HomepageDataQueries } from '@/sanity/lib/queries'
import StyledPortableText from '../../../../components/styled-portable-text'

export default async function Content(props: {
  claim: NonNullable<HomepageDataQueries>
}) {
  if (!props.claim.claim) {
    return <p>No Claim</p>
  }

  return (
    <div className="content">
      <StyledPortableText content={props.claim.claim} spreadParagraphs />
    </div>
  )
}
