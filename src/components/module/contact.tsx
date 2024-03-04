import SanityImage from '@/components/sanity-image'
import { ModuleData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
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
        return module.persons[0]
    }
  }

  const contactPerson = getContactPersonOfWeekday()

  return (
    <section
      key={module._key}
      className={cn('full bg-primary py-8 text-base-white md:py-36')}
    >
      <div className="content">
        <div className="mx-auto flex flex-col justify-center gap-16 md:flex-row md:gap-36">
          <SanityImage
            image={contactPerson.image}
            className="size-[26rem] object-cover"
          />
          <div className="flex flex-col justify-center">
            <div className="w-[26rem]">
              {module.content && (
                <StyledPortableText content={module.content} spreadParagraphs />
              )}
            </div>
            <Button intent="secondary" className="mb-5 mt-16 w-fit px-6">
              Termin buchen
            </Button>
            <p className="mb-3">{contactPerson.mail.mail}</p>
            <p>{contactPerson.phone.phone}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
