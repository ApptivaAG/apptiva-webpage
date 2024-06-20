import { GlossaryQueryData } from '@/sanity/lib/queries'
import portableTextToString from '@/domain/portable-text-to-string'
import Link from 'next/link'
import StyledPortableText from './styled-portable-text'
import { Accordion, AccordionContent, AccordionItem } from './ui/accordion'
import UnderlineForLink from './ui/underline-for-link'

const GlossaryComponent = (props: { glossaryEntries: GlossaryQueryData }) => {
  const { glossaryEntries } = props

  return (
    <>
      <div className="col-right mt-4">
        <div className="w-full max-w-lg">
          <Accordion
            className="w-full divide-y"
            transition
            transitionTimeout={200}
          >
            {glossaryEntries?.map((ge) => (
              <AccordionItem
                key={ge._id}
                header={
                  ge.header?.title
                    ? portableTextToString(ge.header.title)
                    : 'Kein Titel'
                }
              >
                <AccordionContent>
                  {ge.summary && <StyledPortableText content={ge.summary} />}
                  {ge.content && (
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
