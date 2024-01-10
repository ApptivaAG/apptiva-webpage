import { getPosts } from '@/utils/blog'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPosts()

  return Array.from(posts.keys()).map((slug) => ({
    slug,
  }))
}

export default async function Home(props: { params: { slug: string } }) {
  const posts = await getPosts()

  if (!posts.has(props.params.slug)) {
    notFound()
  }

  const { frontmatter, content, image } = posts.get(props.params.slug)

  return (
    <>
      <h1>{frontmatter.title}</h1>

      <Image
        className="full"
        src={image.src}
        width={image.width}
        height={image.height}
        alt=""
        sizes="(max-width: 600px) 100vw, 1200px"
      />
      {content}
    </>
  )
}
