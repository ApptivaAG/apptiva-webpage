import Heading from '@/components/heading'
import { PageHeader } from '@/components/page-header'
import Section from '@/components/section'
import Form from './form'

export default async function Kontakt() {
  return (
    <>
      <PageHeader
        title="Erlebe Bubble Chat live auf deiner Website"
        lead="Wir sparen uns die PowerPoint-Folien. Statt einer theoretischen Demo zeigen wir dir direkt an deiner eigenen Website, wie Bubble Chat funktioniert und wo er deine Besucher:innen konkret unterstützen kann."
        links={[
          { name: 'Angebot' },
          { name: 'Chatbots', href: '/angebot/chatbots' },
          { name: 'Demo vereinbaren' },
        ]}
      />
      <Section intent={'light'} level={'one'}>
        <div className="content">
          <div className="">
            <Heading level={2} size={3} className={'pb-5'}>
              Demo vereinbaren
            </Heading>
          </div>
          <div className="col-left max-w-2xl lg:mt-6">
            <p>Das erwartet dich in der 30-minütigen Demo:</p>
            <ul className="ml-4 mt-4 list-arrow *:pl-2">
              <li>
                <b>Live-Vorschau:</b> Wir projizieren den Chatbot auf deine
                Seite, damit du ein echtes Gefühl für die User Experience
                bekommst.
              </li>
              <li>
                <b>KI-Check:</b> Du siehst live, wie GPT deine Webinhalte nutzt,
                um Fragen sofort und präzise zu beantworten.
              </li>
              <li>
                <b>Praxis-Training:</b> Wir zeigen dir, wie du dem Bot im
                Handumdrehen neues Wissen beibringst.
              </li>
              <li>
                <b>Zahlen & Fakten:</b> Wir besprechen die Metriken, die deinen
                Support entlasten und die Lead-Generierung automatisieren.
              </li>
              <li>
                <b>KI-Beratung:</b> Wir klären deine Fragen rund um KI und
                Chatbots und räumen eventuelle Unsicherheiten gemeinsam aus dem
                Weg.
              </li>
            </ul>
          </div>
          <div className="col-right max-lg:mt-4">
            <div className="flex flex-col gap-2 pt-6">
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
