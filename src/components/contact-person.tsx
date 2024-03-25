import SanityImage from '@/components/sanity-image'
import { PersonData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import LogoIcon from './logo-icon.svg'
import { PortableText } from '@/utils/types'
import StyledPortableText from './styled-portable-text'
import Button from './ui/button'

export default function ContactPerson(props: {
  person: PersonData | null
  content: PortableText | undefined
}) {
  return (
    <section className={cn('full bg-primary py-8 text-base-white md:py-36')}>
      {props.person ? (
        <div className="content">
          <div className="mx-auto flex flex-col flex-wrap justify-center gap-16 md:flex-row md:gap-36">
            <ContactElement>
              <Image
                src={LogoIcon}
                alt="Apptiva Logo Icon"
                className="absolute inset-y-0 size-[20rem] object-cover md:size-[26rem]"
              />
              <SanityImage
                image={props.person.imageWithoutBackground}
                className="absolute left-7 top-[-2.7rem] h-[21rem] w-[16.5rem] rounded-b-[2.1rem] object-cover md:left-9 md:top-[-3.25rem] md:h-[27rem] md:w-[21.5rem] md:rounded-b-[2.75rem]"
              />
            </ContactElement>
            <ContactElement className="flex flex-col justify-center">
              {props.content && (
                <StyledPortableText content={props.content} spreadParagraphs />
              )}
              <Link href={'/kontakt/'}>
                <Button
                  intent="secondary"
                  className="mb-5 mt-16 w-fit px-6"
                  element="div"
                >
                  Kontakt aufnehmen
                </Button>
              </Link>
              <p className="mb-3">{props.person.contact?.mail}</p>
              <p>{props.person.contact?.phone}</p>
            </ContactElement>
          </div>
        </div>
      ) : (
        <p>no person found</p>
      )}
    </section>
  )
}

const ContactElement = ({
  className,
  children,
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('relative size-[20rem] md:size-[26rem]', className)}>
    {children}
  </div>
)
