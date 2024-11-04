import Heading from '@/components/heading'
import { PageHeader } from '@/components/page-header'
import Section from '@/components/section'
import Form from './form'

export default async function Kontakt() {
  return (
    <>
      <PageHeader
        title="What’s next: Forumsangebot!"
        lead="🌟 Kostenlose Unternehmensberatung zum Thema Chatbots! 🌟"
        links={[{ name: 'Forumsangebot' }]}
      />
      <Section intent={'light'} level={'one'}>
        <div className="content">
          <div className="">
            <Heading level={2} size={3} className={'pb-5'}>
              Forumsangebot
            </Heading>
          </div>
          <div className="col-left max-w-2xl lg:mt-6">
            <p className="mb-4">
              Entdecke, wie ein Chatbot deine Unternehmensprozesse
              revolutionieren kann! Wir nehmen uns die Zeit, deinen
              individuellen Praxisfall genau zu analysieren.
            </p>
            <p className="mb-4">
              Gemeinsam erarbeiten wir, in welchen Bereichen und in welcher Form
              ein Chatbot sinnvoll eingesetzt werden kann.
            </p>
            <p className="mb-4">
              Ob Kundenservice, Vertrieb oder interne Kommunikation – wir zeigen
              dir, wie du durch intelligente Automatisierung Zeit und Ressourcen
              sparen könnt. Und das Beste daran? Die Beratung ist{' '}
              <b>völlig kostenlos!</b>
            </p>
            <p className="mb-4">
              Melde dich heute an und lass uns gemeinsam die Zukunft deines
              Unternehmens gestalten! 🚀
            </p>
            <p>
              <b>Dein Weg zu smarter Kommunikation beginnt hier!</b>
            </p>
          </div>
          <div className="col-right max-lg:mt-4">
            <div className="flex flex-col gap-2 pt-6">
              <Heading level={3} size={5} className={''}>
                Jetzt gleich kostenlos anmelden!
              </Heading>
              <Form />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
