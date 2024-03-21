import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import StyledPortableText from './styled-portable-text'
import { Glossary } from '@/utils/types'
import Button from './ui/button'
import Link from 'next/link'
import UnderlineForLink from './ui/underline-for-link'

const GlossaryComponent = (props: {
  glossaryEntries: Map<string, Glossary>
}) => {
  const { glossaryEntries } = props
  const glossaryArray: Glossary[] = []

  for (let [key, value] of glossaryEntries) {
    console.log(value)
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
