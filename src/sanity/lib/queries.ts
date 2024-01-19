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
    // .object({
    //   personName: q.string().optional().default('no name found'),
    // })
    // .optional(),
    image: sanityImage('header.image'),
    header: q
      .object({
        title: q.string().optional().default('In Arbeit'),
        description: q.string().optional().default(''),
        imageAlt: q.string().optional().default('Fehlende Bildbeschreibung'),
      })
      .optional()
      .default({ title: 'In Arbeit', description: '' }),
    tags: q.array(q.object({ name: q.string().optional() })).optional(),
  })
