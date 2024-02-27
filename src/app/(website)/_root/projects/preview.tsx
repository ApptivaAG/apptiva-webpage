'use client'

import { projectsQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import ProjectsLayout from './projects-layout'
import { ProjectsFromSettingsQueryData } from '../../projekte/types'

export default function ProjectsPreview({
  initial,
}: {
  initial: QueryResponseInitial<ProjectsFromSettingsQueryData>
}) {
  const { data } = useQuery<ProjectsFromSettingsQueryData>(
    projectsQuery.query,
    undefined,
    { initial }
  )

  return <ProjectsLayout projects={data.projects} />
}
