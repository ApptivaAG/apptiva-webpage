import { ModuleData } from '@/sanity/lib/queries'
import ContactPerson from '../contact-person'

export default function Contact(props: { module: ModuleData }) {
  const { module } = props

  const weekday = new Date().getDay()

  const getPersonsExcludingNames = ({
    persons,
    names,
  }: {
    persons: typeof module.persons
    names: string[]
  }) =>
    persons.filter(
      (person) =>
        !names.some((name) => person.personName?.toLowerCase().includes(name))
    )

  const getContactPersonOfWeekday = () => {
    const contactablePersons = getPersonsExcludingNames({
      persons: module.persons,
      names: ['brigitte', 'sarah', 'patrik', 'kevin'],
    })

    const getRandomPerson = (persons: typeof module.persons) =>
      persons[Math.floor(Math.random() * persons.length)]

    const getRandomPersonExcludingNames = (names: string[]) => {
      const contactablePersonsOfWeekday = getPersonsExcludingNames({
        persons: contactablePersons,
        names,
      })
      return getRandomPerson(contactablePersonsOfWeekday)
    }

    switch (weekday) {
      case 3: // wednesday
        return getRandomPersonExcludingNames(['david', 'markus', 'robin'])
      case 4: // thursday
        return getRandomPersonExcludingNames(['david', 'roman'])
      case 5: // friday
        return getRandomPersonExcludingNames(['david', 'philip', 'robin'])
      case 1: // monday
      case 2: // tuesday
      case 6: // saturday
      case 0: // sunday
        return getRandomPerson(contactablePersons)
    }
  }

  const contactPerson = getContactPersonOfWeekday()

  if (!contactPerson) return null

  return <ContactPerson person={contactPerson} content={module.content} />
}
