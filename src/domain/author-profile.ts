import type { InferResultType } from 'groqd'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import { q } from '@/sanity/lib/groqd'
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
  .project({
    _id: q.string(),
    personName: q.string(),
    slug: Slug,
    role: q.string().optional(),
    image: sanityImageWithAlt(),
    contact: q('contact')
      .project({
        mail: q.string().optional(),
        phone: q.string().optional(),
        socialNetworks: q
          .array(q.object({ title: q.string(), url: q.string().nullish() }))
          .nullish(),
      })
      .nullable(),
    authorProfile: q('authorProfile').project({
      headline: q.string().optional(),
      introduction: q.string().optional(),
      meta: q('meta')
        .project({
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
      .project({
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

export type AuthorProfileData = NonNullable<
  InferResultType<typeof authorProfileQuery>
>
export type ProfileSection = NonNullable<
  NonNullable<AuthorProfileData['authorProfile']['sections']>[number]
>

export const authorProfilesQuery = q('*')
  .filterByType('person')
  .filter(
    'active == true && authorProfile.enabled == true && defined(slug.current)'
  )
  .project({ slug: Slug, _updatedAt: q.string() })

export const getAuthorProfile = cache(
  async (slug: string): Promise<AuthorProfileData | null> => {
    const { isEnabled } = await draftMode()
    const { published } = await load(authorProfileQuery, isEnabled, { slug }, [
      'person',
      'blog',
    ])
    return cleanStega(published)
  }
)
