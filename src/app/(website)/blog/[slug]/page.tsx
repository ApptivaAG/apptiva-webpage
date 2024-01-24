import { urlForImage } from '@/sanity/lib/image'
import { getPosts } from '@/utils/blog'
import { kebabCaseToTitleCase } from '@/utils/format'
import { PortableText } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
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

  return {
    title: post.title,
    description: post.description,
    // authors: post.authors.map((a) => ({
    //   name: a,
    // })),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      images: [
        {
          url: `https://apptiva-uber-website.netlify.app/_ipx/w_1200,q_75/%2Fassets%2Fblog%2F${props.params.slug}%2F${post.image}`,
        },
      ],
      publishedTime: post.publishDate,
    },
  }
}

export default async function Home(props: { params: { slug: string } }) {
  const posts = await getPosts()

  const post = posts.get(props.params.slug)
  if (!post) {
    notFound()
  }

  return (
    <>
      <h1>{post.title}</h1>
      <p>
        Publiziert am{' '}
        <time dateTime={post.publishDate}>
          {new Date(post.publishDate).toLocaleDateString('de-CH')}
        </time>{' '}
        von {post.author.toString()}.
        {/* {post.authors.map((a) => (
          <p>{a.toString()}</p>
          // <span key={a}>{kebabCaseToTitleCase(a)}</span>
        ))} */}
      </p>

      {post.kind === 'markdown' && post.image.src && (
        <Image
          className="full"
          src={post.image.src}
          width={post.image.width}
          height={post.image.height}
          alt=""
          sizes="(max-width: 600px) 100vw, 1200px"
        />
      )}
      {post.kind === 'cms' && post.image && (
        <Image
          key={post.image.toString()}
          src={urlForImage(post.image).url()}
          alt={post.image.alt}
          width={getImageDimensions(post.image).width}
          height={getImageDimensions(post.image).height}
          placeholder="blur"
          blurDataURL={urlForImage(post.image)
            .width(24)
            .height(24)
            .blur(10)
            .url()}
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            40vw"
        />
      )}
      <p className="font-semibold">{post.description}</p>
      {post.kind === 'markdown' && post.content}
      <hr />
      {post.kind === 'cms' &&
        post.content?.map((content) => (
          <PortableText key={content._key} value={content} />
        ))}
      <hr />
      <h2>Tags:</h2>
      <ul>{post.tags && post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
    </>
  )
}
