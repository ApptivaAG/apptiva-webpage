import SanityImage from '@/components/sanity-image'
import { PersonData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import { PortableText } from '@/utils/types'
import Image from 'next/image'
import Link from 'next/link'
import LogoIcon from './logo-icon.svg'
import StyledPortableText from './styled-portable-text'
import Button from './ui/button'

export default function ContactPerson(props: {
  person: PersonData | null
  content: PortableText | undefined
}) {
  return (
    <section
      className={cn('full bg-primary pb-8 pt-12 text-base-white md:py-36')}
    >
      {props.person ? (
        <div className="content middle-grid gap-y-8">
          <div className="relative col-left size-[20rem] max-lg:m-auto md:size-[26rem]">
            <Image
              src={LogoIcon}
              alt="Apptiva Logo Icon"
              className="absolute inset-y-0 size-[20rem] object-cover md:size-[26rem]"
            />
            <SanityImage
              image={props.person.imageWithoutBackground}
              className="absolute left-7 top-[-2.7rem] h-[21rem] w-[16.5rem] rounded-b-[2.1rem] object-cover md:left-9 md:top-[-3.25rem] md:h-[27rem] md:w-[21.5rem] md:rounded-b-[2.75rem]"
            />
          </div>
          <div className="col-right flex flex-col justify-center">
            {props.content && (
              <StyledPortableText content={props.content} spreadParagraphs />
            )}
            <Link href={'/kontakt/'}>
              <Button
                intent="secondary"
                className="my-5 w-fit px-6 md:mt-16"
                element="div"
              >
                Kontakt aufnehmen
              </Button>
            </Link>
            <p className="mb-3">{props.person.contact?.mail}</p>
            <p>+41 41 322 26 26</p>
          </div>
        </div>
      ) : (
        <p>no person found</p>
      )}
    </section>
  )
}
