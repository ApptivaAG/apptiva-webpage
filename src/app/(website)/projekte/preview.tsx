'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { projectsQuery } from '@/sanity/lib/queries'
import type { Category } from './category'
import ProjectList from './list'
import { ProjectQueryData } from './types'

export default function ProjectsPreview({
  initial,
  category = '',
}: {
  initial: QueryResponseInitial<ProjectQueryData[]>
  category?: Category
}) {
  const { data } = useQuery<ProjectQueryData[]>(
    projectsQuery.query,
    undefined,
    { initial }
  )
  return <ProjectList projects={data} category={category} />
}
