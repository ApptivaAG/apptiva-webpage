import SanityImage from '@/components/sanity-image'
import { personsQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'

export default async function Home() {
  const persons = await runQuery(personsQuery)

  return (
    <div className="container mx-auto px-4">
      <h2>Kultur & Firmenfacts</h2>
      <h2 id="team">Team</h2>
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
