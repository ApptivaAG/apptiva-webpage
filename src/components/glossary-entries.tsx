import { Glossary } from '@/utils/types'
import Link from 'next/link'
import StyledPortableText from './styled-portable-text'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import UnderlineForLink from './ui/underline-for-link'

const GlossaryComponent = (props: {
  glossaryEntries: Map<string, Glossary>
}) => {
  const { glossaryEntries } = props
  const glossaryArray: Glossary[] = []

  for (let [key, value] of glossaryEntries) {
    glossaryArray.push(value)
  }

  return (
    <>
      <div className="col-right mt-4">
        <div className="w-full max-w-lg">
          <Accordion type="single" collapsible className="w-full">
            {glossaryArray?.map((ge) => (
              <AccordionItem key={ge._id} value={ge.title ?? 'no-question'}>
                <AccordionTrigger>{ge.title}</AccordionTrigger>
                <AccordionContent>
                  {ge.summary && <StyledPortableText content={ge.summary} />}
                  {ge.modules && (
                    <div className="pt-4">
                      <Link href={`/glossar/${ge.slug}`}>
                        <UnderlineForLink>mehr erfahren →</UnderlineForLink>
                      </Link>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  )
}
export default GlossaryComponent
