import { getPosts } from '@/utils/blog'
import { kebabCaseToTitleCase } from '@/utils/format'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPosts()

  return Array.from(posts.keys()).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata(props: {
  params: { slug: string }
}): Promise<Metadata> {
  const posts = await getPosts()

  const post = posts.get(props.params.slug)
  if (!post) {
    notFound()
  }

  const { frontmatter, image } = post
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    authors: { name: frontmatter.author },
    alternates: { canonical: `/blog/${frontmatter.slug}` },
    openGraph: {
      type: 'article',
      images: [
        {
          url: `https://apptiva-uber-website.netlify.app/_ipx/w_1200,q_75/%2Fassets%2Fblog%2F${props.params.slug}%2F${frontmatter.image}`,
        },
      ],
      publishedTime: frontmatter.date,
    },
  }
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