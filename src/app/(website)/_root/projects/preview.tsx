'use client'

import { projectsQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import ProjectsLayout from './projects-layout'
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
  return <ProjectsLayout projects={data} />
}
