'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { projectBySlugQuery } from '@/sanity/lib/queries'
import type { Category } from './category'
import ProjectDetail from './detail'
import { ProjectBySlugQueryData } from './types'

export default function ProjectsPreview(props: {
  initial: QueryResponseInitial<ProjectBySlugQueryData>
  params: { slug: string }
  category?: Category
}) {
  const { data } = useQuery<ProjectBySlugQueryData>(
    projectBySlugQuery.query,
    props.params,
    { initial: props.initial }
  )
  return <ProjectDetail project={data} category={props.category} />
}
