import { SettingsDataQueries } from '@/sanity/lib/queries'
import StyledPortableText from '../../../../components/styled-portable-text'

export default async function Content(props: {
  claim: NonNullable<SettingsDataQueries>
}) {
  return (
    <div className="content">
      {props.claim.claim ? (
        <StyledPortableText content={props.claim.claim} spreadParagraphs />
      ) : (
        <p>No Claim</p>
      )}
    </div>
  )
}
