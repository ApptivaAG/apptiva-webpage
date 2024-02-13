import { SanityDocument } from 'next-sanity'
import Link from 'next/link'

export default function BlogsForPreview({
  blogs,
}: {
  blogs: SanityDocument[]
}) {
  return (
    <main className="divide-blue-100 container mx-auto grid grid-cols-1 divide-y">
      {blogs?.length > 0 ? (
        // <Link href={`/glossar/${glossaryEntry.slug}`}>
        blogs.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`}>
            <h2 className="hover:bg-blue-50 p-4">{post.header.title}</h2>
          </Link>
        ))
      ) : (
        <div className="text-red-500 p-4">No posts found</div>
      )}
    </main>
  )
}
