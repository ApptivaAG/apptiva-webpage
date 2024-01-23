// ./nextjs-app/sanity/lib/queries.ts

import { q, sanityImage } from 'groqd'
import { groq } from 'next-sanity'

// Get all posts
export const faqsQuery = groq`*[_type == "faq"]{
    _id, question, answer, slug, tags
  }`

// Get a single post by its slug
export const faqQuery = groq`*[_type == "faq" && slug.current == $slug][0]{ 
    question, answer, slug, tags
  }`

// Get all blog Entries
export const blogsQuery = groq`*[_type == "blog"] {
  _id, slug, header{title}, tags
}`

// Get all service pages
export const servicePagesQuery = groq`*[_type == "service-page"] {
  _id, slug, header{title}, tags
}`

// Get blog Entry by Slug
export const blogBySlugQuery = (
  slug: string
) => groq`*[_type == "blog" && slug.current == "${slug}"]
{
  _createdAt,_updatedAt,  
  header{title, description, image, imageAlt, content },
  modules,
  author
}`

export const servicePageBySlugQuery = (
  slug: string
) => groq`*[_type == "service-page" && slug.current == "${slug}"]
{
  _createdAt,_updatedAt,  
  header{title, description, image, imageAlt, content},
  modules{title, layout, image, content},
}`

export const queryPostFromCms = q('*')
  .filterByType('blog')
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
    image: sanityImage('header.image', {
      additionalFields: { alt: q.string().nullable() },
    }),
    header: q
      .object({
        title: q.string().optional().default('In Arbeit'),
        description: q.string().optional().default(''),
        imageAlt: q.string().optional().default('Fehlende Bildbeschreibung'),
      })
      .optional()
      .default({ title: 'In Arbeit', description: '' }),
    tags: q('tags')
      .filter()
      .deref()
      .grabOne$('name', q.string().optional())
      .nullable(),
  })

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
    image: sanityImage('image').nullable(),
    imageAlt: q.string().optional(),
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

export const queryServicePagesFromCms = q('*')
  .filterByType('service-page')
  .grab$({
    _id: q.string(),
    slug: ['slug.current', q.string().optional()],
    header: q('header')
      .grab$({
        title: q.string().optional().default('In Arbeit'),
        description: q.string().optional(),
        image: sanityImage('image').nullable(),
        imageAlt: q.string().optional(),
        content: q.contentBlocks().optional(),
      })
      .nullable(),
    modules: q('modules')
      .filter()
      .grab$({
        title: q.string().optional().default('Ohne Titel'),
        layout: q.string().optional(),
        image: sanityImage('image').nullable(),
        imageAlt: q.string().optional(),
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
        image: sanityImage('image').nullable(),
        imageAlt: q.string().optional(),
        content: q.contentBlocks().optional(),
      })
      .nullable(),
    tags: q('tags')
      .filter()
      .deref()
      .grabOne$('name', q.string().optional())
      .nullable(),
  })
