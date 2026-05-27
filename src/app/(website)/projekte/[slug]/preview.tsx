'use client'

import { projectBySlugQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { ProjectBySlugQueryData } from '../types'
import ProjectDetail from './detail'
import { useSearchParams } from 'next/navigation'
import { Category } from '../search-params'

export default function ProjectsPreview(props: {
  initial: QueryResponseInitial<ProjectBySlugQueryData>
  params: { slug: string }
}) {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') as Category
  const { data } = useQuery<ProjectBySlugQueryData>(
    projectBySlugQuery.query,
    props.params,
    { initial: props.initial }
  )
  return <ProjectDetail project={data} category={category} />
}
