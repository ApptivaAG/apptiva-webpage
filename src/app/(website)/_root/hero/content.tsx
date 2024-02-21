import StyledPortableText from '../../../../components/styled-portable-text'
import { SettingsData } from './types'

export default async function Content(props: {
  claim: NonNullable<SettingsData['claim']>
}) {
  return (
    <div className="content">
      <StyledPortableText content={props.claim} spreadParagraphs />
    </div>
  )
}
