import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { rootUrl } from '@/app/env'
import AuthorProfile from '@/components/author-profile'
import { Schema } from '@/components/schema'
import { authorProfilesQuery, getAuthorProfile } from '@/domain/author-profile'
import { urlForImage } from '@/sanity/lib/image'
import { load } from '@/sanity/lib/sanityFetch'

export const instant = false

export async function generateStaticParams() {
  const { published } = await load(authorProfilesQuery, false, {}, ['person'])
  // Cache Components requires a sample path even before the first profile is published.
  return published.length
    ? published.map(({ slug }) => ({ slug }))
    : [{ slug: '__placeholder__' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const person = await getAuthorProfile((await params).slug)
  if (!person) return {}
  const title =
    person.authorProfile.meta?.title ?? `${person.personName} | Autorenprofil`
  const description =
    person.authorProfile.meta?.description ?? person.authorProfile.introduction
  const url = `/autoren/${person.slug}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'profile',
      url,
      ...(person.image
        ? {
            images: [
              {
                url: urlForImage(person.image).width(1200).url(),
                alt: person.image.alt,
              },
            ],
          }
        : {}),
    },
  }
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  if ((await params).slug === '__placeholder__') notFound()
  const person = (await getAuthorProfile((await params).slug)) ?? notFound()
  const url = `${rootUrl}/autoren/${person.slug}`
  return (
    <>
      <Schema
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          '@id': url,
          url,
          name: person.personName,
          mainEntity: {
            '@type': 'Person',
            '@id': `${url}#person`,
            name: person.personName,
            url,
            jobTitle: person.authorProfile.headline ?? person.role,
            description: person.authorProfile.introduction,
            ...(person.image ? { image: urlForImage(person.image).url() } : {}),
            sameAs: person.contact?.socialNetworks?.flatMap((network) =>
              network.url ? [network.url] : []
            ),
            worksFor: {
              '@type': 'Organization',
              name: 'Apptiva AG',
              url: rootUrl,
            },
          },
        }}
      />
      <AuthorProfile person={person} />
    </>
  )
}
