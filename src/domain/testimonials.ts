import Underline from '@/components/ui/underline'
import { cleanStega } from '@/utils/clean-stega'
import fs from 'fs'
import { CompileMDXResult, compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'

type TestimonialFrontmatter = {
  avatar: string
  name: string
  position: string
  company: string
  order: number
  tags?: ('chatbot' | 'sw-dev')[]
}

export type Testimonial = {
  id: string
  quoteText: string
} & CompileMDXResult<TestimonialFrontmatter>

type MarkdownNode = {
  type?: string
  value?: string
  alt?: string
  children?: MarkdownNode[]
}

function markdownText(node: MarkdownNode): string {
  if (node.type === 'text' || node.type === 'inlineCode') {
    return node.value ?? ''
  }

  if (node.type === 'image') {
    return node.alt ?? ''
  }

  return (node.children ?? []).map(markdownText).join(' ')
}

const postsDirectory = path.join(process.cwd(), './content/data/testimonials/')
export async function getTestimonialsData(tags?: ('chatbot' | 'sw-dev')[]) {
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
      let quoteText = ''
      const data = await compileMDX<TestimonialFrontmatter>({
        source: fileContents,
        components: {
          em: Underline,
        },
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [
              () => (tree: MarkdownNode) => {
                quoteText = markdownText(tree).replace(/\s+/g, ' ').trim()
              },
            ],
          },
        },
      })
      return {
        id,
        quoteText,
        ...data,
      }
    })

  const testimonials = await Promise.all(allPostsData)
  const sorted = testimonials.sort((a, b) => {
    const orderA = a.frontmatter.order ?? 999
    const orderB = b.frontmatter.order ?? 999
    return orderA - orderB
  })

  // Filter by tags if provided
  if (!tags || tags.length === 0) {
    return sorted
  }

  return sorted.filter((testimonial) => {
    const testimonialTags = testimonial.frontmatter.tags || []
    const cleanedTags = cleanStega(tags)
    return cleanedTags.some((tag) => testimonialTags.includes(tag))
  })
}
