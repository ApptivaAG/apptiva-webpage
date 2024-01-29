// ./nextjs-app/sanity/lib/queries.ts

import { nullToUndefined, q, sanityImage } from 'groqd'

const Slug = ['slug.current', q.string().optional()] satisfies [string, any]

const SanityImageWithAlt = sanityImage('image', {
  additionalFields: nullToUndefined({
    alt: q.string().optional().default('Fehlende Bildbeschreibung'),
  }),
}).nullable()

const Tags = q('tags')
  .filter()
  .deref()
  .grabOne$('name', q.string().optional())
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
    header: q('header').grab$({
        title: q.string().optional().default('In Arbeit'),
        description: q.string().optional().default(''),
      image: SanityImageWithAlt,
    }),
    tags: Tags,
  })

export const queryPostFromCmsBySlug = q('*')
  .filterByType('blog')
  .filter('slug.current == $slug')
  .slice(0)
  .grab$({
    _createdAt: q.string(),
    _id: q.string(),
    slug: ['slug.current', q.string().optional()],
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
    header: q('header').grab$({
        title: q.string().optional().default('In Arbeit'),
        description: q.string().optional().default(''),
      image: SanityImageWithAlt,
    }),
    tags: Tags,
  })
  .nullable()

export const projectsQuery = q('*')
  .filterByType('project')
  .grab$({
    _id: q.string(),
    projectName: q.string().optional(),
    slug: ['slug.current', q.string().optional()],
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
    slug: ['slug.current', q.string().optional()],
    image: SanityImageWithAlt,
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
})

export const servicesQuery = q('*')
  .filterByType('service-page')
  .grab$({
    _id: q.string(),
    slug: ['slug.current', q.string().optional()],
    header: q('header')
      .grab$({
        title: q.string().optional().default('In Arbeit'),
        description: q.string().optional(),
        image: SanityImageWithAlt,
        content: q.contentBlocks().optional(),
      })
      .nullable(),
  })

export const serviceBySlugQuery = q('*')
  .filterByType('service-page')
  .filter('slug.current == $slug')
  .slice(0)
  .grab$({
    _id: q.string(),
    slug: ['slug.current', q.string().optional()],
    header: q('header')
      .grab$({
        title: q.string().optional().default('In Arbeit'),
        description: q.string().optional(),
        image: SanityImageWithAlt,
        content: q.contentBlocks().optional(),
      })
      .nullable(),
    modules: q('modules')
      .filter()
      .grab$({
        title: q.string().optional().default('Ohne Titel'),
        layout: q.string().optional(),
        image: SanityImageWithAlt,
        content: q.contentBlocks().optional(),
      })
      .nullable(),
  })

export const glossaryQuery = q('*')
  .filterByType('glossary')
  .grab$({
    _id: q.string(),
    title: q.string().optional().default('Ohne Titel'),
    slug: ['slug.current', q.string().optional()],
    summary: q.contentBlocks().optional(),
    modules: q('modules')
      .filter()
      .grab$({
        title: q.string().optional().default('Ohne Titel'),
        layout: q.string().optional(),
        image: SanityImageWithAlt,
        content: q.contentBlocks().optional(),
      })
      .nullable(),
    tags: Tags,
  })

export const faqsQuery = q('*')
  .filterByType('faq')
  .grab$({
    _id: q.string(),
    question: q.string().optional(),
    answer: q.string().optional(),
    slug: ['slug.current', q.string().optional()],
    tags: Tags,
  })
