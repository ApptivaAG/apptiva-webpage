import {
  GlossaryQueryData,
  ServicesQueryData,
  glossaryQuery,
  projectsQuery,
  servicesQuery,
} from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { getPosts } from '@/domain/blog/repository'
import { CmsBlog } from '@/domain/types'
import { MetadataRoute } from 'next'
import { ProjectQueryData } from './(website)/projekte/types'
import { rootUrl } from './env'
import { hasTag } from '@/domain/blog/mappers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  const { published: services } = await load(servicesQuery, false, undefined, [
    'service-page',
  ])

  const { published: projects } = await load(projectsQuery, false, undefined, [
    'project',
  ])

  const { published: glossary } = await load(glossaryQuery, false, undefined, [
    'glossary',
  ])

  return [
    {
      url: rootUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...buildServicesSiteMap(services),
    {
      url: buildFullUrl('/angebot/chatbots/demo-vereinbaren'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: buildFullUrl('/ueber-uns'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: buildFullUrl('/kontakt'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: buildFullUrl('/projekte'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...buildSiteMap(projects, { parentSlug: 'projekte' }),
    {
      url: buildFullUrl('/wissen'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: buildFullUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    ...buildPostsSiteMap(posts, 'blog'),
    {
      url: buildFullUrl('/apptiva-lernt'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...buildPostsSiteMap(posts, 'apptiva-lernt'),
    {
      url: buildFullUrl('/glossar'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...buildSiteMap(
      glossary.filter((g) => g.content),
      { parentSlug: 'glossar' }
    ),
    {
      url: buildFullUrl('/impressum'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: buildFullUrl('/datenschutzerklaerung'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}

function buildSiteMap(
  data: ProjectQueryData[] | GlossaryQueryData,
  options: {
    parentSlug: string
    changeFrequency?: 'weekly' | 'monthly' | 'daily' | 'yearly' | 'never'
  }
) {
  return data.map(
    ({ slug, _updatedAt }) =>
      ({
        url: buildFullUrl(`/${options.parentSlug}/${slug}`),
        lastModified: new Date(_updatedAt),
        changeFrequency: options.changeFrequency ?? 'weekly',
        priority: 0.5,
      }) as const
  )
}

function buildServicesSiteMap(services: ServicesQueryData) {
  return services.map(({ slug, subPageOf, _updatedAt }) => {
    const url: `/${string}` = subPageOf
      ? `/angebot/${subPageOf.slug}/${slug}`
      : `/angebot/${slug}`
    return {
      url: buildFullUrl(url),
      lastModified: new Date(_updatedAt),
      changeFrequency: 'weekly',
      priority: 0.9,
    } as const
  })
}

function buildPostsSiteMap(
  posts: Array<CmsBlog>,
  tag: 'blog' | 'apptiva-lernt'
) {
  return posts.filter(hasTag(tag)).map(
    (post) =>
      ({
        url: buildFullUrl(`/${tag}/${post.slug}`),
        lastModified: new Date(post.publishDate),
        changeFrequency: 'weekly',
        priority: 0.5,
      }) as const
  )
}

function buildFullUrl(absolutUrl: `/${string}`) {
  return `${rootUrl}${absolutUrl}`
}
