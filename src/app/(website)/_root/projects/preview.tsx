'use client'

import { projectsQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import Layout from './layout'
import { ProjectQueryData } from './types'

export default function ProjectsPreview({
  initial,
}: {
  initial: QueryResponseInitial<ProjectQueryData[]>
}) {
  const { data } = useQuery<ProjectQueryData[]>(
    projectsQuery.query,
    undefined,
    { initial }
  )
  return <Layout projects={data} />
}
