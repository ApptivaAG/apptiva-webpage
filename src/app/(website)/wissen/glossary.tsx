import Heading from "@/components/heading"
import { getGlossary } from "@/utils/glossary"

export default async function Glossar() {
  const glossaries = await getGlossary()
  return (
    <>
       <section className="full py-16 text-primary">
        <div className="content">
          <Heading level={2} size={3} className="col-left">
            Glossar
          </Heading>
          <div className="col-right max-lg:mt-4">
            <p>Hier kommt der FAQ Text</p>
          </div>
          {/* {faqs && <FAQsComponent faqs={faqs}></FAQsComponent>} */}
          {glossaries && }
        </div>
      </section>
    </>
    </>
  )
}
