// ./nextjs-app/sanity/lib/queries.ts

import { groq } from 'next-sanity'

// Get all posts
export const faqsQuery = groq`*[_type == "faq"]{
    _id, question, answer, slug, tags
  }`

// Get a single post by its slug
export const faqQuery = groq`*[_type == "faq" && slug.current == $slug][0]{ 
    question, answer, slug, tags
  }`
