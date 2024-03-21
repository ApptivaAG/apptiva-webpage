import Heading from '@/components/heading'
import { PageHeader } from '@/components/page-header'
import Section from '@/components/section'
import Form from './form'

export default async function Kontakt() {
  return (
    <>
      <PageHeader
        title="Du willst deinen Kundendialog effizienter gestalten?"
        lead="In der ca. einstündigen Online-Präsentation zeigen wir dir, wie das mit Hilfe eines Chatbots geht. Dabei gehen wir gezielt auf deine Fragen ein."
      />
      <Section intent={'light'} level={'one'}>
        <div className="content">
          <div className="">
            <Heading level={2} size={3} className={'pb-5'}>
              Demo vereinbaren
            </Heading>
          </div>
          <div className="col-left max-w-2xl lg:mt-6">
            <p>Folgendes wartet auf dich:</p>
            <ul className="ml-4 mt-4 list-arrow *:pl-2">
              <li>Einführung ins Thema Chatbot</li>
              <li>Beispiele von Chatbots</li>
              <li>Wie funktionieren KI-basierte Chatbots?</li>
              <li>Funktionsumfang von Bubble Chat</li>
              <li>Erstellen von einfachen Frage-Antworte-Absichten</li>
              <li>Einsatz von GPT Features</li>
              <li>Trainieren eines Chatbots</li>
              <li>Die wichtigsten Chatbot Metriken</li>
            </ul>
          </div>
          <div className=" col-right max-lg:mt-4">
            <div className="flex flex-col gap-2 pt-6 ">
              <Heading level={3} size={5} className={''}>
                Kostenlose Produkt-Demo anfordern
              </Heading>
              <Form />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
