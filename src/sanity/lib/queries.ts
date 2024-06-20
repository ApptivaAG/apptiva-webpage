import { InferType, nullToUndefined, q, sanityImage } from 'groqd'

const Slug = ['slug.current', q.string().optional()] satisfies [string, any]

const sanityImageWithAlt = (fieldName = 'image') =>
  sanityImage(fieldName, {
    withAsset: ['base', 'lqip'],
    additionalFields: nullToUndefined({
      alt: q.string().optional().default('Fehlende Bildbeschreibung'),
    }),
  }).nullable()

const Tags = q('tags')
  .filter()
  .deref()
  .grabOne$('name', q.string().optional())
  .nullable()

const Cards = q('cards')
  .filter()
  .grab$({
    _key: q.string(),
    title: q.string().optional().default('Ohne Titel'),
    pill: q.string().optional(),
    style: q.string().optional(),
    image: sanityImageWithAlt(),
    content: q.contentBlocks().optional(),
  })
  .nullable()

export type ProjectsData = NonNullable<InferType<typeof Projects>>[number]

export const Projects = q('projects')
  .filter()
  .deref()
  .grab({
    _id: q.string(),
    projectName: q.string().optional(),
    image: sanityImageWithAlt(),
    slug: Slug,
    order: q.number().optional().nullable(),
    description: q.string().optional().nullable(),
  })
  .order('order asc')
  .nullable()

export type ServicePageTeasersData = NonNullable<
  InferType<typeof ServicePageTeasers>
>[number]
export const ServicePageTeasers = q('servicePageTeaser')
  .filter()
  .deref()
  .grab$({
    _id: q.string().nullable(),
    slug: Slug,
    illustration: sanityImageWithAlt('illustration'),
    teaserTitle: q.string().optional().default('In Arbeit'),
    teaser: q.contentBlocks().optional().nullable(),
  })
  .nullable()

export type FAQQueryModuleData = NonNullable<InferType<typeof FAQs>>
export const FAQs = q('faqs')
  .filter()
  .deref()
  .grab$({
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
  .grab$({
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

export type PersonData = NonNullable<InferType<typeof Persons>>[number]

const PersonSelection = {
  personName: q.string().optional(),
  image: sanityImageWithAlt('image'),
  imageWithoutBackground: sanityImageWithAlt('imageWithoutBackground'),
  role: q.string().optional(),
  slogan: q.string().optional(),
  contact: q('contact')
    .grab$({
      mail: q.string().optional().default('Keine Email-Adresse'),
      phone: q.string().optional().default('Keine Telefonnummer'),
    })
    .nullable(),
}
export const Persons = q('*').filterByType('person').grab$(PersonSelection)

const Header = q('header')
  .grab$({
    title: q.contentBlocks().optional(),
    lead: q.string().optional().default(''),
    image: sanityImageWithAlt(),
    meta: q('meta')
      .grab$({
        title: q.string().optional(),
        description: q.string().optional(),
      })
      .nullable(),
  })
  .nullable()

export type ServicesQueryData = NonNullable<InferType<typeof servicesQuery>>
export const servicesQuery = q('*')
  .filterByType('service-page')
  .grab$({
    _id: q.string(),
    _updatedAt: q.string(),
    slug: Slug,
    header: Header,
    subPageOf: q('subPageOf')
      .deref()
      .grab$({ slug: Slug, breadcrumb: q.string().optional() })
      .nullable(),
  })

export type ModuleData = NonNullable<InferType<typeof Modules>>[number]
const Modules = q('modules')
  .filter()
  .grab$({
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
    servicePageTeaser: ServicePageTeasers,
  })
  .nullable()

export type PostsQueryData = NonNullable<InferType<typeof queryPostsFromCms>>
export const queryPostsFromCms = q('*')
  .filterByType('blog')
  .grab$({
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
    author: q('author')
      .deref()
      .grabOne$('personName', q.string().optional())
      .nullable(),
    authors: q('*')
      .filterByType('person')
      .filter('references(^._id)')
      .grab$({ _id: q.string(), personName: q.string().optional() }),
    header: Header,
    tags: Tags,
  })

export type PostBySlugQueryData = NonNullable<
  InferType<typeof queryPostFromCmsBySlug>
>
export const queryPostFromCmsBySlug = q('*')
  .filterByType('blog')
  .filter('slug.current == $slug')
  .slice(0)
  .grab$({
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
    author: q('author')
      .deref()
      .grabOne$('personName', q.string().optional())
      .nullable(),
    authors: q('*')
      .filterByType('person')
      .filter('references(^._id)')
      .grab$({ _id: q.string(), personName: q.string().optional() }),
    header: Header,
    tags: Tags,
  })

export const projectsQuery = q('*')
  .filterByType('project')
  .grab$({
    _id: q.string(),
    _updatedAt: q.string(),
    projectName: q.string().optional(),
    image: sanityImageWithAlt(),
    slug: Slug,
    order: q.number().optional(),
    description: q.string().optional(),
  })
  .order('order asc')

export const projectBySlugQuery = q('*')
  .filterByType('project')
  .filter('slug.current == $slug')
  .slice(0)
  .grab$({
    _id: q.string(),
    projectName: q.string().optional(),
    slug: Slug,
    image: sanityImageWithAlt(),
    imageHeader: sanityImageWithAlt('imageHeader'),
    description: q.string().optional(),
    tasks: q.string().optional(),
    time: q.string().optional(),
    technologies: q.string().optional(),
    customer: q.string().optional(),
    contactPerson: q('contactPerson').deref().grab$(PersonSelection).nullable(),
    content: q.contentBlocks().optional(),
    callToAction: q.contentBlocks().optional(),
  })

export const queryTags = q('*').filterByType('tag').grab$({
  name: q.string(),
  _id: q.string(),
})

export const aboutPageQuery = q('*')
  .filterByType('about-page')
  .filter()
  .slice(0)
  .grab$({
    _id: q.string(),
    slug: Slug,
    header: Header,
    modules: Modules,
  })

export type ServiceBySlugQueryData = NonNullable<
  InferType<typeof serviceBySlugQuery>
>
export const serviceBySlugQuery = q('*')
  .filterByType('service-page')
  .filter('slug.current == $slug')
  .slice(0)
  .grab$({
    _id: q.string(),
    _createdAt: q.string(),
    _updatedAt: q.string(),
    slug: Slug,
    breadcrumb: q.string().optional(),
    subPageOf: q('subPageOf')
      .deref()
      .grab$({ slug: Slug, breadcrumb: q.string().optional() })
      .nullable(),
    header: Header,
    modules: Modules,
    callToAction: q('callToAction')
      .grab$({
        name: q.string().optional(),
        href: q.string().optional(),
      })
      .nullable(),
  })

export type GlossaryQueryData = NonNullable<InferType<typeof glossaryQuery>>
export const glossaryQuery = q('*').filterByType('glossary').grab$({
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
  .grab$({
    _id: q.string(),
    header: Header,
    slug: Slug,
    summary: q.contentBlocks().optional(),
    content: q.contentBlocks().optional(),
    tags: Tags,
  })

export type FAQQueryData = NonNullable<InferType<typeof faqsQuery>>
export const faqsQuery = q('*')
  .filterByType('faq')
  .filter('showAtWissen')
  .grab$({
    _id: q.string(),
    question: q.string().optional(),
    answerStyled: q.contentBlocks().optional(),
    slug: Slug,
    tags: Tags,
  })
  .order('question asc')

export const personsQuery = q('*').filterByType('person').grab$({
  personName: q.string().optional(),
  slug: Slug,
  image: sanityImageWithAlt(),
})

export const personBySlugQuery = q('*')
  .filterByType('person')
  .filter('slug.current == $slug')
  .slice(0)
  .grab$({
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

export type HomepageDataQueries = NonNullable<InferType<typeof homepageQuery>>

export const homepageQuery = q('*').filterByType('homepage').slice(0).grab$({
  claim: q.contentBlocks().optional(),
  modules: Modules,
})
