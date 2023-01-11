import { z, defineCollection } from 'astro:content'

const blog = defineCollection({
  schema: {
    title: z.string(),
    slug: z.string(),
    image: z.string(),
    date: z.date(),
    author: z.string(),
    description: z.string().min(10).max(300),
    categories: z.array(z.string()),
  },
})

export const collections = {
  blog: blog,
}
