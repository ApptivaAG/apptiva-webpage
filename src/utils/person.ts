import { personBySlugQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { cache } from 'react'
import { Person } from './types'

export const getPersonBySlug = cache(async (slug: string) => {
  const person = await runQuery(
    personBySlugQuery,
    {
      slug,
    },
    ['person']
  )

  if (!person.slug || !person.personName) {
    return undefined
  }

  return {
    slug: person.slug,
    personName: person.personName,
    role: person.role,
    education: person.education,
    claim: person.claim,
    slogan: person.slogan,
    content: person.content,
    contact: {
      ...person.contact,
      socialNetworks: person.contact?.socialNetworks?.filter(
        (network): network is { title: string; url?: string } =>
          !!network?.title
      ),
    },
    image: person.image,
    skills: person.skills?.filter(
      (
        skill
      ): skill is {
        title: string
        items?: { name?: string; value?: number }[]
      } => !!skill?.title
    ),
  } satisfies Person
})
