import SanityImage from '@/components/sanity-image'
import { getPersonBySlug } from '@/utils/person'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

export default async function Home(props: { params: { slug: string } }) {
  const person = (await getPersonBySlug(props.params.slug)) ?? notFound()

  return (
    <>
      <SanityImage image={person.image} />
      <h1>{person.personName}</h1>
      <p>{person.role}</p>
      <p>{person.education}</p>
      <p>{person.claim}</p>
      <p>{person.slogan}</p>
      {person.content && <PortableText value={person.content} />}
      <h2>Kontakt</h2>
      <p>{person.contact.mail}</p>
      <p>{person.contact.phone}</p>
      <p>
        {person.contact.socialNetworks?.map((network) => (
          <a key={network.title} href={network.url ?? ''}>
            {network.title}
          </a>
        ))}
      </p>
      <h2>Skills</h2>
      <p>
        {person.skills?.map((skill) => (
          <>
            <h3>{skill.title}</h3>
            {skill.items?.map((item) => (
              <>
                <b>{item.name}:</b> {item.value}
              </>
            ))}
          </>
        ))}
      </p>
    </>
  )
}
