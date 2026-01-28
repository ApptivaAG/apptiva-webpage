import Underline from '@/components/ui/underline'
import fs from 'fs'
import { CompileMDXResult, compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'

type TestimonialFrontmatter = {
  avatar: string
  name: string
  position: string
  company: string
  order: number
}

export type Testimonial = {
  id: string
} & CompileMDXResult<TestimonialFrontmatter>

const postsDirectory = path.join(process.cwd(), './content/data/testimonials/')
export async function getTestimonialsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(
      (fileName) =>
        fs.statSync(path.join(postsDirectory, fileName)).isFile() &&
        fileName.endsWith('.md')
    )
    .map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const id = fileName.replace(/\.md$/, '')
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const data = await compileMDX<TestimonialFrontmatter>({
        source: fileContents,
        components: {
          em: Underline,
        },
        options: {
          parseFrontmatter: true,
        },
      })
      return {
        id,
        ...data,
      }
    })

  const testimonials = await Promise.all(allPostsData)
  return testimonials.sort((a, b) => {
    const orderA = a.frontmatter.order ?? 999
    const orderB = b.frontmatter.order ?? 999
    return orderA - orderB
  })
}
