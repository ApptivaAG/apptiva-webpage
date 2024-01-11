import { getPosts } from '@/utils/blog'
import { kebabCaseToTitleCase } from '@/utils/format'
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

  const post = posts.get(props.params.slug)
  if (!post) {
    notFound()
  }

  const { frontmatter, content, image } = post

  return (
    <>
      <h1>{frontmatter.title}</h1>
      <p>
        Publiziert am{' '}
        <time dateTime={frontmatter.date}>
          {new Date(frontmatter.date).toLocaleDateString('de-CH')}
        </time>{' '}
        von <span>{kebabCaseToTitleCase(frontmatter.author)}</span>.
      </p>

      {image.src && (
        <Image
          className="full"
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
          sizes="(max-width: 600px) 100vw, 1200px"
        />
      )}
      <p className="font-semibold">{frontmatter.description}</p>
      {content}
    </>
  )
}
