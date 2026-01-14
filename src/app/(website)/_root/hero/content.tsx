import { HomepageDataQueries } from '@/sanity/lib/queries'
import StyledPortableText from '../../../../components/styled-portable-text'

export default function Content(props: {
  claim: NonNullable<HomepageDataQueries>
}) {
  const content = Array.isArray(props.claim.claim) ? props.claim.claim : []
  if (!content.length) {
    return <p>No Claim</p>
  }
  return (
    <div className="content">
      <StyledPortableText content={content} isHero />
    </div>
  )
}
