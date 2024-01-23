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
    _id: q.string().optional(),
    slug: q.slug('slug'),
    name: q.string().optional(),
    content: q.contentBlocks().optional(),
    author: q('author').deref().grabOne('personName', q.string()).nullable(),
    authors: q('*')
      .filterByType('person')
      .filter('references(^._id)')
      .grab({ _id: q.string(), personName: q.string() }),
    image: sanityImage('header.image'),
    header: q
      .object({
        title: q.string().optional().default('In Arbeit'),
        description: q.string().optional().default(''),
        imageAlt: q.string().optional().default('Fehlende Bildbeschreibung'),
      })
      .optional()
      .default({ title: 'In Arbeit', description: '' }),
    tags: q('tags').filter().deref().grabOne('name', q.string()),
  })

export const projectsQuery = q('*')
  .filterByType('project')
  .grab({
    _id: q.string().optional(),
    projectName: q.string(),
    slug: q.slug('slug'),
    order: q.number().optional(),
    description: q.string(),
  })
  .order('order asc')

export const projectBySlugQuery = q('*')
  .filterByType('project')
  .filter('slug.current == $slug')
  .slice(0)
  .grab({
    _id: q.string().optional(),
    projectName: q.string(),
    slug: q.slug('slug'),
    image: sanityImage('image'),
    imageAlt: q.string(),
    description: q.string(),
    tasks: q.string(),
    time: q.string(),
    technologies: q.string(),
    customer: q.string(),
    contactPerson: q('contactPerson').deref().grabOne('personName', q.string()),
    content: q.array(q.contentBlock()),
  })

export const queryServicePagesFromCms = q('*')
  .filterByType('service-page')
  .grab({
    _createdAt: q.string(),
    _id: q.string().optional(),
    slug: q.slug('slug'),
    header: q('header')
      .grab({
        title: q.string().nullable().default('In Arbeit'),
        description: q.string().nullable(),
        image: sanityImage('image').nullable(),
        imageAlt: q.string().nullable(),
        content: q.contentBlocks().nullable(),
      })
      .nullable(),
    modules: q('modules')
      .filter()
      .grab({
        title: q.string().nullable().default('Ohne Titel'),
        layout: q.string().nullable(),
        image: sanityImage('image').nullable(),
        imageAlt: q.string().nullable(),
        content: q.contentBlocks().nullable(),
      })
      .nullable(),
  })
