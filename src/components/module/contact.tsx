import SanityImage from '@/components/sanity-image'
import { ModuleData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import Image from 'next/image'
import { HTMLAttributes } from 'react'
import LogoIcon from '../logo-icon.svg'
import StyledPortableText from '../styled-portable-text'
import Button from '../ui/button'

export default function Contact(props: { module: ModuleData }) {
  const { module } = props

  const weekday = new Date().getDay()

  const getContactPersonOfWeekday = () => {
    switch (weekday) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      default:
        return module.persons[2]
    }
  }

  const contactPerson = getContactPersonOfWeekday()

  return (
    <section
      key={module._key}
      className={cn('full bg-primary py-8 text-base-white md:py-36')}
    >
      <div className="content">
        <div className="mx-auto flex flex-col flex-wrap justify-center gap-16 md:flex-row md:gap-36">
          <ContactElement>
            <Image
              src={LogoIcon}
              alt="Apptiva Logo Icon"
              className="absolute inset-y-0 size-[20rem] object-cover md:size-[26rem]"
            />
            <SanityImage
              image={contactPerson.imageWithoutBackground}
              className="absolute left-2 top-[-0.5rem] size-[19rem] rounded-md object-contain md:top-[-1rem] md:size-[25rem]"
            />
          </ContactElement>
          <ContactElement className="flex flex-col justify-center">
            {module.content && (
              <StyledPortableText content={module.content} spreadParagraphs />
            )}
            <Button intent="secondary" className="mb-5 mt-16 w-fit px-6">
              Termin buchen
            </Button>
            <p className="mb-3">{contactPerson.contact.mail}</p>
            <p>{contactPerson.contact.phone}</p>
          </ContactElement>
        </div>
      </div>
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
