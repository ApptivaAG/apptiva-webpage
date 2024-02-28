'use client'

import { ModuleData, projectsQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { ProjectsFromSettingsQueryData } from '../../projekte/types'
import ProjectsLayout from './projects-layout'

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

  return <ProjectsLayout module={data.projectStartpage as ModuleData} />
}
