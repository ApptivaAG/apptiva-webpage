import type { InferResultType } from 'groqd'
import { q, sanityImageWithAlt } from './groqd'

export { sanityImageWithAlt } from './groqd'

export const Slug = ['slug.current', q.string().optional()] satisfies [
  string,
  any,
]

export const Tags = q.raw(
  'tags[]->name',
  q
    .array(q.string())
    .nullish()
    .transform((tags) => tags ?? undefined)
)

const Cards = q('cards')
  .filter()
  .project({
    _key: q.string(),
    title: q.string().optional().default('Ohne Titel'),
    pill: q.string().optional(),
    style: q.string().optional(),
    image: sanityImageWithAlt(),
    coverImage: sanityImageWithAlt('coverImage'),
    content: q.contentBlocks().optional(),
  })
  .nullable()

export const Documents = q('documents')
  .filter()
  .project({
    _key: q.string(),
    title: q.string().optional().default('Dokument ohne Titel'),
    description: q.string().optional(),
    file: q('file')
      .project({
        asset: q('asset')
          .deref()
          .project({
            url: q.string(),
            size: q.number().optional(),
          })
          .nullable(),
      })
      .nullable(),
    externalLink: q.string().optional(),
    previewImage: sanityImageWithAlt('previewImage'),
  })
  .nullable()

export type ProjectsData = NonNullable<InferResultType<typeof Projects>>[number]
export const Projects = q('projects')
  .filter()
  .deref()
  .project({
    _id: q.string(),
    projectName: q.string().optional(),
    image: sanityImageWithAlt(),
    slug: Slug,
    customerRef: q('customerRef')
      .deref()
      .project({
        customerName: q.string().optional(),
        logo: sanityImageWithAlt('logo'),
      })
      .nullable(),
    order: q.number().optional().nullable(),
    description: q.string().optional().nullable(),
    meta: q('meta')
      .project({
        title: q.string().optional(),
        description: q.string().optional(),
      })
      .nullable(),
  })
  .order('order asc')
  .nullable()

export type ServicePageTeasersData = NonNullable<
  InferResultType<typeof ServicePageTeasers>
>[number]
export const ServicePageTeasers = q('servicePageTeaser')
  .filter()
  .deref()
  .project({
    _id: q.string().nullable(),
    slug: Slug,
    illustration: sanityImageWithAlt('illustration'),
    teaserTitle: q.string().optional().default('In Arbeit'),
    teaser: q.contentBlocks().optional().nullable(),
  })
  .nullable()

export type FAQQueryModuleData = NonNullable<InferResultType<typeof FAQs>>
export const FAQs = q('faqs')
  .filter()
  .deref()
  .project({
    _id: q.string(),
    question: q.string().optional(),
    answerStyled: q.contentBlocks().optional(),
    slug: Slug,
    tags: Tags,
  })
  .order('question asc')
  .nullable()

export const Prices = q('priceCards')
  .filter()
  .project({
    _key: q.string(),
    title: q.string().optional().default('Ohne Titel'),
    image: sanityImageWithAlt(),
    content: q.contentBlocks().optional(),
    subtitle: q.string().optional(),
    pillText: q.string().optional(),
    isFavourite: q.boolean().optional(),
    linktext: q.string().optional(),
    link: q.string().optional(),
  })
  .nullable()

export type PersonData = NonNullable<InferResultType<typeof Persons>>[number]

const PersonSelection = {
  slug: Slug,
  hasAuthorProfile: [
    'authorProfile.enabled == true && active == true',
    q.boolean(),
  ] as [string, ReturnType<typeof q.boolean>],
  personName: q.string().optional(),
  active: q.boolean().default(true),
  image: sanityImageWithAlt('image'),
  imageWithoutBackground: sanityImageWithAlt('imageWithoutBackground'),
  role: q.string().optional(),
  slogan: q.string().optional(),
  contact: q('contact')
    .project({
      mail: q.string().optional().default('Keine E-Mail-Adresse'),
      phone: q.string().optional().default('Keine Telefonnummer'),
    })
    .nullable(),
}
export const Persons = q('*')
  .filterByType('person')
  .filter('active == true')
  .project(PersonSelection)

export const ContentAuthors = q(
  '(select(count(authors) > 0 => authors, defined(author) => [author], [])[]->)'
)
  .filter('defined(_id) && defined(personName) && active == true')
  .project({
    _id: q.string(),
    personName: q.string(),
    slug: Slug,
    image: sanityImageWithAlt(),
    role: ['coalesce(authorProfile.headline, role)', q.string().nullable()],
    summary: [
      'coalesce(authorProfile.summary, authorProfile.introduction)',
      q.string().nullable(),
    ],
    hasAuthorProfile: [
      'authorProfile.enabled == true && defined(slug.current)',
      q.boolean(),
    ],
  })

export type ContentAuthorData = InferResultType<typeof ContentAuthors>[number]

const Header = q('header')
  .project({
    title: q.contentBlocks().optional(),
    lead: q.string().optional().default(''),
    image: sanityImageWithAlt(),
    meta: q('meta')
      .project({
        title: q.string().optional(),
        description: q.string().optional(),
      })
      .nullable(),
  })
  .nullable()

export type ServicesQueryData = NonNullable<
  InferResultType<typeof servicesQuery>
>

const SubPageOf = (depth = 0): any =>
  depth > 5
    ? q('subPageOf')
        .deref()
        .project({
          slug: Slug,
          breadcrumb: q.string().optional(),
        })
        .nullable()
    : q('subPageOf')
        .deref()
        .project({
          slug: Slug,
          breadcrumb: q.string().optional(),
          subPageOf: SubPageOf(depth + 1),
        })
        .nullable()

export const servicesQuery = q('*').filterByType('service-page').project({
  _id: q.string(),
  _updatedAt: q.string(),
  slug: Slug,
  header: Header,
  subPageOf: SubPageOf(),
})

export type ModuleData = NonNullable<InferResultType<typeof Modules>>[number]
const Modules = q('modules')
  .filter()
  .project({
    _key: q.string(),
    title: q.string().optional().default('Ohne Titel'),
    introduction: q.contentBlocks().optional(),
    level: q.number().optional(),
    type: q.string().optional(),
    layout: q.string().optional(),
    style: q.string().optional(),
    image: sanityImageWithAlt(),
    orientation: q.string().optional(),
    content: q.contentBlocks().optional(),
    cards: Cards,
    projects: Projects,
    faqs: FAQs,
    prices: Prices,
    persons: Persons,
    quotetext: q.contentBlocks().optional(),
    hint: q.string().optional(),
    calStyle: q.string().optional(),
    calLink: q.string().optional(),
    servicePageTeaser: ServicePageTeasers,
    documents: Documents,
    tags: q.array(q.string()).optional(),
  })
  .nullable()

export type PostsQueryData = NonNullable<
  InferResultType<typeof queryPostsFromCms>
>
export const queryPostsFromCms = q('*')
  .filterByType('blog')
  .project({
    _createdAt: q.string(),
    _updatedAt: q.string(),
    _id: q.string(),
    publishedAt: q.string().optional(),
    slug: Slug,
    name: q.string().optional(),
    content: q
      .contentBlocks({
        markDefs: q.object({
          _type: q.literal('code'),
          language: q.string(),
          _key: q.string(),
          code: q.string(),
        }),
      })
      .optional(),
    author: q.raw(
      'author->personName',
      q
        .string()
        .nullish()
        .transform((personName) => personName ?? undefined)
    ),
    authorProfileSlug: [
      'select(author->active == true && author->authorProfile.enabled == true => author->slug.current)',
      q.string().nullable(),
    ],
    authors: ContentAuthors,
    header: Header,
    tags: Tags,
    faqs: FAQs,
  })

export type PostBySlugQueryData = NonNullable<
  InferResultType<typeof queryPostFromCmsBySlug>
>
export const queryPostFromCmsBySlug = q('*')
  .filterByType('blog')
  .filter('slug.current == $slug')
  .slice(0)
  .project({
    _createdAt: q.string(),
    _updatedAt: q.string(),
    _id: q.string(),
    publishedAt: q.string().optional(),
    slug: Slug,
    breadcrumb: q.string().optional(),
    name: q.string().optional(),
    content: q
      .contentBlocks({
        markDefs: q.object({
          _type: q.literal('code'),
          language: q.string(),
          _key: q.string(),
          code: q.string(),
        }),
      })
      .optional(),
    author: q.raw(
      'author->personName',
      q
        .string()
        .nullish()
        .transform((personName) => personName ?? undefined)
    ),
    authorProfileSlug: [
      'select(author->active == true && author->authorProfile.enabled == true => author->slug.current)',
      q.string().nullable(),
    ],
    authors: ContentAuthors,
    header: Header,
    tags: Tags,
    faqs: FAQs,
  })

export const projectsQuery = q('*')
  .filterByType('project')
  .project({
    _id: q.string(),
    _updatedAt: q.string(),
    projectName: q.string().optional(),
    image: sanityImageWithAlt(),
    customerRef: q('customerRef')
      .deref()
      .project({
        customerName: q.string().optional(),
        logo: sanityImageWithAlt('logo'),
      })
      .nullable(),
    slug: Slug,
    order: q.number().optional(),
    description: q.string().optional(),
    meta: q('meta')
      .project({
        title: q.string().optional(),
        description: q.string().optional(),
      })
      .nullable(),
    tags: Tags,
  })
  .order('order asc')

export const projectBySlugQuery = q('*')
  .filterByType('project')
  .filter('slug.current == $slug')
  .slice(0)
  .project({
    _id: q.string(),
    _createdAt: q.string(),
    _updatedAt: q.string(),
    projectName: q.string().optional(),
    slug: Slug,
    image: sanityImageWithAlt(),
    imageHeader: sanityImageWithAlt('imageHeader'),
    description: q.string().optional(),
    meta: q('meta')
      .project({
        title: q.string().optional(),
        description: q.string().optional(),
      })
      .nullable(),
    tags: Tags,
    tasks: q.string().optional(),
    time: q.string().optional(),
    technologies: q.string().optional(),
    customer: q.string().optional(),
    customerRef: q('customerRef')
      .deref()
      .project({
        customerName: q.string().optional(),
        logo: sanityImageWithAlt('logo'),
        logoHeight: q.number().optional(),
      })
      .nullable(),
    contactPerson: q('contactPerson')
      .deref()
      .project(PersonSelection)
      .nullable(),
    content: q.contentBlocks().optional(),
    callToAction: q.contentBlocks().optional(),
  })

export const queryTags = q('*').filterByType('tag').project({
  name: q.string(),
  _id: q.string(),
})

export const mediaPageQuery = q('*')
  .filterByType('media-page')
  .filter()
  .slice(0)
  .project({
    _id: q.string(),
    slug: Slug,
    header: Header,
    modules: Modules,
  })

export const aboutPageQuery = q('*')
  .filterByType('about-page')
  .filter()
  .slice(0)
  .project({
    _id: q.string(),
    slug: Slug,
    header: Header,
    modules: Modules,
  })

export type ServiceBySlugQueryData = NonNullable<
  InferResultType<typeof serviceBySlugQuery>
>
export const serviceBySlugQuery = q('*')
  .filterByType('service-page')
  .filter('slug.current == $slug')
  .slice(0)
  .project({
    _id: q.string(),
    _createdAt: q.string(),
    _updatedAt: q.string(),
    slug: Slug,
    breadcrumb: q.string().optional(),
    subPageOf: SubPageOf(),
    header: Header,
    modules: Modules,
    authors: ContentAuthors,
    callToAction: q('callToAction')
      .project({
        name: q.string().optional(),
        href: q.string().optional(),
      })
      .nullable(),
    isProduct: q.boolean().optional(),
    productType: q.string().optional(),
    products: q('products')
      .filter()
      .project({
        name: q.string(),
        description: q.string().optional(),
        price: q.number(),
        priceCurrency: q.string().optional(),
        priceValidUntil: q.string().optional(),
      })
      .nullable(),
  })

export type GlossaryQueryData = NonNullable<
  InferResultType<typeof glossaryQuery>
>
export const glossaryQuery = q('*').filterByType('glossary').project({
  _id: q.string(),
  _updatedAt: q.string(),
  header: Header,
  slug: Slug,
  summary: q.contentBlocks().optional(),
  content: q.contentBlocks().optional(),
  tags: Tags,
})

export const glossaryBySlugQuery = q('*')
  .filterByType('glossary')
  .filter('slug.current == $slug')
  .slice(0)
  .project({
    _id: q.string(),
    header: Header,
    slug: Slug,
    summary: q.contentBlocks().optional(),
    content: q.contentBlocks().optional(),
    tags: Tags,
  })

export type FAQQueryData = NonNullable<InferResultType<typeof faqsQuery>>
export const faqsQuery = q('*')
  .filterByType('faq')
  .filter('showAtWissen')
  .project({
    _id: q.string(),
    question: q.string().optional(),
    answerStyled: q.contentBlocks().optional(),
    slug: Slug,
    tags: Tags,
  })
  .order('question asc')

export const personsQuery = q('*').filterByType('person').project({
  personName: q.string().optional(),
  slug: Slug,
  image: sanityImageWithAlt(),
})

export const personBySlugQuery = q('*')
  .filterByType('person')
  .filter('slug.current == $slug')
  .slice(0)
  .project({
    personName: q.string().optional(),
    slug: Slug,
    role: q.string().optional(),
    education: q.string().optional(),
    claim: q.string().optional(),
    slogan: q.string().optional(),
    content: q.contentBlocks().optional(),
    contact: q
      .object({
        mail: q.string().optional(),
        phone: q.string().optional(),
        socialNetworks: q
          .array(
            q
              .object({
                title: q.string().optional(),
                url: q.string().optional(),
              })
              .optional()
          )
          .optional(),
      })
      .optional(),
    image: sanityImageWithAlt(),
    skills: q
      .array(
        q
          .object({
            title: q.string().optional(),
            items: q
              .array(
                q
                  .object({
                    name: q.string().optional(),
                    value: q.number().optional(),
                  })
                  .optional()
              )
              .optional(),
          })
          .optional()
      )
      .optional(),
  })

export type HomepageDataQueries = NonNullable<
  InferResultType<typeof homepageQuery>
>

export const homepageQuery = q('*').filterByType('homepage').slice(0).project({
  claim: q.contentBlocks().optional(),
  modules: Modules,
})
