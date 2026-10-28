import CalBooking from '@/components/cal-booking'
import Section from '@/components/section'
import StyledPortableText from '@/components/styled-portable-text'
import { ModuleData } from '@/sanity/lib/queries'
import { cleanStega } from '@/utils/clean-stega'
import { calNamespaceFromLink, normalizeCalLink } from './cal-link'

export default function CalBookingModule(props: { module: ModuleData }) {
  const { module } = props
  const calLink = normalizeCalLink(cleanStega(module.calLink))
  if (!calLink) return null
  const namespace = calNamespaceFromLink(calLink)
  const dark = cleanStega(module.calStyle) === 'dark-bg'
  // Ohne Auswahl bleibt der Hintergrund grau
  const intent = dark ? 'dark' : 'lightGray'

  return (
    <Section intent={intent} level="one">
      <div className="content">
        <CalBooking
          calLink={calLink}
          namespace={namespace}
          title={module.title}
          dark={dark}
          description={
            module.content && <StyledPortableText content={module.content} />
          }
          hint={module.hint}
        />
      </div>
    </Section>
  )
}
