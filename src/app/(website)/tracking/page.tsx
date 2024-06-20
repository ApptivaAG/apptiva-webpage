'use client'

import Heading from '@/components/heading'
import Section from '@/components/section'
import Button from '@/components/ui/button'
import { useLocalStorage } from '@/domain/use-local-storage'

export default function Tracking() {
  const [ignore, setIgnore] = useLocalStorage('plausible_ignore', false)

  return (
    <Section className="content">
      <Heading level={1} size={3}>
        Analytics ausschliessen
      </Heading>
      <p className="pb-4 pt-12">
        Klicke auf den unten stehenden Button, um deine Analytics-Einstellungen
        zu ändern.
      </p>
      <p>
        Du schliesst deine Besuche aktuell <b>{ignore ? 'aus' : 'nicht aus'}</b>
        .
      </p>
      <Button
        element="div"
        className="my-12 w-fit"
        onClick={() => setIgnore(!ignore)}
      >
        Meine Besuche {ignore ? 'nicht mehr' : ''} ausschliessen
      </Button>
    </Section>
  )
}
