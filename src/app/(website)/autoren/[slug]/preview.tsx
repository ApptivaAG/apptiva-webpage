'use client'

import { type QueryResponseInitial, useQuery } from '@sanity/react-loader'
import AuthorProfile from '@/components/author-profile'
import {
  type AuthorProfileData,
  authorProfileQuery,
} from '@/domain/author-profile'

export default function AuthorPreview({
  initial,
  slug,
}: {
  initial: QueryResponseInitial<AuthorProfileData | null>
  slug: string
}) {
  const { data } = useQuery<AuthorProfileData | null>(
    authorProfileQuery.query,
    { slug },
    { initial }
  )

  return data ? <AuthorProfile person={data} /> : null
}
