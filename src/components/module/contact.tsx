import { ModuleData } from '@/sanity/lib/queries'
import ContactPerson from '../contact-person'

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
        return module.persons.at(0)
      //return module.persons[2]
    }
  }

  const contactPerson = getContactPersonOfWeekday()

  if (!contactPerson) return null

  return <ContactPerson person={contactPerson} content={module.content} />
}
