import { InferType, q } from 'groqd'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import { Slug, sanityImageWithAlt } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { cleanStega } from '@/utils/clean-stega'

const entry = q.object({
  _key: q.string(),
  title: q.string().nullish(),
  subtitle: q.string().nullish(),
  content: q.contentBlocks().nullish(),
  href: q.string().nullish(),
  linkText: q.string().nullish(),
})

export const authorProfileQuery = q('*')
  .filterByType('person')
  .filter(
    'slug.current == $slug && active == true && authorProfile.enabled == true'
  )
  .slice(0)
  .grab$({
    _id: q.string(),
    personName: q.string(),
    slug: Slug,
    role: q.string().optional(),
    image: sanityImageWithAlt(),
    contact: q('contact')
      .grab$({
        mail: q.string().optional(),
        phone: q.string().optional(),
        socialNetworks: q
          .array(q.object({ title: q.string(), url: q.string().nullish() }))
          .nullish(),
      })
      .nullable(),
    authorProfile: q('authorProfile').grab$({
      headline: q.string().optional(),
      introduction: q.string().optional(),
      meta: q('meta')
        .grab$({
          title: q.string().optional(),
          description: q.string().optional(),
        })
        .nullable(),
      sections: q
        .array(
          q.object({
            _key: q.string(),
            label: q.string(),
            title: q.string().nullish(),
            layout: q.string().nullish(),
            content: q.contentBlocks().nullish(),
            entries: q.array(entry).nullish(),
          })
        )
        .optional(),
      articlesTitle: q.string().optional(),
      articlesIntroduction: q.string().optional(),
      contactTitle: q.string().optional(),
      contactIntroduction: q.string().optional(),
    }),
    articles: q('*')
      .filterByType('blog')
      .filter(
        'select(count(authors) > 0 => ^._id in authors[]._ref, author._ref == ^._id) && defined(slug.current)'
      )
      .order('publishedAt desc')
      .grab$({
        _id: q.string(),
        slug: Slug,
        name: q.string().optional(),
        publishedAt: q.string().optional(),
        title: ['pt::text(header.title)', q.string().nullable()],
        lead: ['header.lead', q.string().nullable()],
        isLearning: ['"Apptiva lernt" in tags[]->name', q.boolean()],
      }),
  })
  .nullable()

export const authorProfilesQuery = q('*')
  .filterByType('person')
  .filter(
    'active == true && authorProfile.enabled == true && defined(slug.current)'
  )
  .grab$({ slug: Slug, _updatedAt: q.string() })

export type AuthorProfileData = NonNullable<
  InferType<typeof authorProfileQuery>
>
export type ProfileSection = NonNullable<
  AuthorProfileData['authorProfile']['sections']
>[number]

export const getAuthorProfile = cache(async (slug: string) => {
  const { isEnabled } = await draftMode()
  const { published } = await load(authorProfileQuery, isEnabled, { slug }, [
    'person',
    'blog',
  ])
  return cleanStega(published)
})
