import SanityImage from '@/components/sanity-image'
import { ModuleData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import StyledPortableText from '../styled-portable-text'

export default function Contact(props: { module: ModuleData }) {
  const { module } = props

  const darkBg = module.style === 'dark-bg'

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

  return (
    <section
      key={module._key}
      className={cn(
        'full py-8 lg:py-28',
        darkBg ? 'bg-primary text-base-white' : 'text-primary'
      )}
    >
      <div className="content">
        <div className="space-y-20">
          <div className="flex flex-wrap gap-x-32 gap-y-8">
            <SanityImage
              image={getContactPersonOfWeekday().image}
              className="size-[26rem] object-cover"
            />
            <div>
              {module.content && (
                <StyledPortableText content={module.content} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
