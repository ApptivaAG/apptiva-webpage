import Wrapper from '../wrapper'
import Content, { meta } from './content.mdx'

export const metadata = meta

export default function Impressum() {
  return (
    <Wrapper meta={metadata}>
      <Content />
    </Wrapper>
  )
}
