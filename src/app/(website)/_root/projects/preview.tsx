'use client'

import {
  ModuleData,
  projectsFromSettingsQuery,
  projectsQuery,
} from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { ProjectsFromSettingsQueryData } from '../../projekte/types'
import ProjectsLayout from './projects-layout'

export default function ProjectsPreview({
  initial,
}: {
  initial: QueryResponseInitial<ProjectsFromSettingsQueryData>
}) {
  const { data } = useQuery<ProjectsFromSettingsQueryData>(
    projectsFromSettingsQuery.query,
    undefined,
    { initial }
  )

  return (
    <ProjectsLayout
      projects={data.projectStartpage.projects}
      introduction={data.projectStartpage.introduction}
    />
  )
}
