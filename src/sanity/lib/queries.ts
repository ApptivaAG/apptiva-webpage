import { InferType, nullToUndefined, q, sanityImage } from 'groqd'

const Slug = ['slug.current', q.string().optional()] satisfies [string, any]

const sanityImageWithAlt = (fieldName = 'image') =>
  sanityImage(fieldName, {
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
  .grab({
    _id: q.string(),
    slug: Slug,
    illustration: sanityImageWithAlt('illustration'),
    teaserTitle: q.string().optional().default('In Arbeit'),
    teaser: q.contentBlocks().optional().nullable(),
  })
  .nullable()

export const FAQs = q('faqs')
  .filter()
  .deref()
  .grab$({
    _id: q.string(),
    question: q.string().optional(),
    answer: q.string().optional(),
    slug: Slug,
    tags: Tags,
  })
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

export const Persons = q('*')
  .filterByType('person')
  .grab$({
    imageWithoutBackground: sanityImageWithAlt('imageWithoutBackground'),
    contact: q('contact').grab$({
      mail: q.string().optional().default('Keine Email-Adresse'),
      phone: q.string().optional().default('Keine Telefonnummer'),
    }),
  })

/*
export type ServiceTeaserData = NonNullable<
  InferType<typeof ServicesTeasers>
>[number]
export const ServicesTeasers = q('*')
  .filterByType('service-page')
  .filter('showInHome')
  //.slice(0)
  .grab$({
    _id: q.string(),
    slug: Slug,
    illustration: sanityImageWithAlt('illustration'),
    teaser: q.contentBlocks().optional(),
    teaserTitle: q.string().optional().default('In Arbeit'),
  })
  .nullable()
  */

export const servicesQuery = q('*')
  .filterByType('service-page')
  .grab$({
    _id: q.string(),
    slug: Slug,
    header: q('header')
      .grab$({
        title: q.string().optional().default('In Arbeit'),
        description: q.string().optional(),
        image: sanityImageWithAlt(),
        content: q.contentBlocks().optional(),
      })
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
    fullscreenImage: sanityImageWithAlt('fullscreenImage'),
    fullscreenImageText: q.contentBlocks().optional(),
  })
  .nullable()

const Header = q('header')
  .grab$({
    title: q.string().optional().default('In Arbeit'),
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

export const queryPostsFromCms = q('*')
  .filterByType('blog')
  .grab$({
    _createdAt: q.string(),
    _id: q.string(),
    slug: Slug,
    name: q.string().optional(),
    content: q.contentBlocks().optional(),
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

export const queryPostFromCmsBySlug = q('*')
  .filterByType('blog')
  .filter('slug.current == $slug')
  .slice(0)
  .grab$({
    _createdAt: q.string(),
    _id: q.string(),
    slug: Slug,
    name: q.string().optional(),
    content: q.contentBlocks().optional(),
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
  .nullable()

export const projectsQuery = q('*')
  .filterByType('project')
  .grab$({
    _id: q.string(),
    projectName: q.string().optional(),
    image: sanityImageWithAlt(),
    slug: Slug,
    order: q.number().optional(),
    description: q.string().optional(),
  })
  .order('order asc')

export const projectsFromSettingsQuery = q('*')
  .filterByType('settings')
  .slice(0)
  .grab$({
    projectStartpage: q('projectStartpage').grab$({
      introduction: q.contentBlocks().optional(),
      projects: Projects,
    }),
  })

export const projectBySlugQuery = q('*')
  .filterByType('project')
  .filter('slug.current == $slug')
  .slice(0)
  .grab$({
    _id: q.string(),
    projectName: q.string().optional(),
    slug: Slug,
    image: sanityImageWithAlt(),
    description: q.string().optional(),
    tasks: q.string().optional(),
    time: q.string().optional(),
    technologies: q.string().optional(),
    customer: q.string().optional(),
    contactPerson: q('contactPerson')
      .deref()
      .grabOne$('personName', q.string().optional())
      .nullable(),
    content: q.contentBlocks().optional(),
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

export const serviceBySlugQuery = q('*')
  .filterByType('service-page')
  .filter('slug.current == $slug')
  .slice(0)
  .grab$({
    _id: q.string(),
    slug: Slug,
    header: Header,
    modules: Modules,
  })

export const glossaryQuery = q('*')
  .filterByType('glossary')
  .grab$({
    _id: q.string(),
    title: q.string().optional().default('Ohne Titel'),
    slug: Slug,
    summary: q.contentBlocks().optional(),
    modules: q('modules')
      .filter()
      .grab$({
        title: q.string().optional().default('Ohne Titel'),
        layout: q.string().optional(),
        image: sanityImageWithAlt(),
        content: q.contentBlocks().optional(),
      })
      .nullable(),
    tags: Tags,
  })

export const glossaryBySlugQuery = q('*')
  .filterByType('glossary')
  .filter('slug.current == $slug')
  .slice(0)
  .grab$({
    _id: q.string(),
    title: q.string().optional().default('Ohne Titel'),
    slug: Slug,
    summary: q.contentBlocks().optional(),
    modules: q('modules')
      .filter()
      .grab$({
        title: q.string().optional().default('Ohne Titel'),
        layout: q.string().optional(),
        image: sanityImageWithAlt(),
        content: q.contentBlocks().optional(),
      })
      .nullable(),
    tags: Tags,
  })

export const faqsQuery = q('*').filterByType('faq').grab$({
  _id: q.string(),
  question: q.string().optional(),
  answer: q.string().optional(),
  slug: Slug,
  tags: Tags,
})

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

export type SettingsDataQueries = NonNullable<InferType<typeof settingsQuery>>

export const settingsQuery = q('*').filterByType('settings').slice(0).grab$({
  claim: q.contentBlocks().optional(),
  modules: Modules,
})
