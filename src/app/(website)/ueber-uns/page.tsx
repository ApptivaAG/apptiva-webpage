import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import { personsQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'

export default async function Home() {
  const persons = await runQuery(personsQuery, undefined, ['person'])

  return (
    <div className="container mx-auto px-4">
      <Heading level={3}>Kultur & Firmenfacts</Heading>
      <Heading level={3} id="team">
        Team
      </Heading>
      <ul>
        {persons.map((person) => (
          <li key={person.slug}>
            <a href={`ueber-uns/${person.slug}`} title={person.personName}>
              <SanityImage image={person.image} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
