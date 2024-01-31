import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import { getPersonBySlug } from '@/utils/person'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

export default async function Home(props: { params: { slug: string } }) {
  const person = (await getPersonBySlug(props.params.slug)) ?? notFound()

  return (
    <>
      <SanityImage image={person.image} />
      <Heading level={2}>{person.personName}</Heading>
      <p>{person.role}</p>
      <p>{person.education}</p>
      <p>{person.claim}</p>
      <p>{person.slogan}</p>
      {person.content && <PortableText value={person.content} />}
      <Heading level={3} size={4}>
        Kontakt
      </Heading>
      <p>{person.contact.mail}</p>
      <p>{person.contact.phone}</p>
      <p>
        {person.contact.socialNetworks?.map((network) => (
          <a key={network.title} href={network.url ?? ''}>
            {network.title}
          </a>
        ))}
      </p>
      <Heading level={3} size={4}>
        Skills
      </Heading>
      <p>
        {person.skills?.map((skill) => (
          <>
            <Heading level={4} size={5}>
              {skill.title}
            </Heading>
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
