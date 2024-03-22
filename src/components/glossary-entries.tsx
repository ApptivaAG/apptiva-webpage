import { GlossaryQueryData } from '@/sanity/lib/queries'
import Link from 'next/link'
import StyledPortableText from './styled-portable-text'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import UnderlineForLink from './ui/underline-for-link'

const GlossaryComponent = (props: { glossaryEntries: GlossaryQueryData }) => {
  const { glossaryEntries } = props

  return (
    <>
      <div className="col-right mt-4">
        <div className="w-full max-w-lg">
          <Accordion type="single" collapsible className="w-full">
            {glossaryEntries?.map((ge) => (
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
