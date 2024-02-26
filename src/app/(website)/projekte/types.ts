import {
  Projects,
  projectBySlugQuery,
  projectsFromSettingsQuery,
  projectsQuery,
} from '@/sanity/lib/queries'
import { InferType } from 'groqd'

export type ProjectQueryData = InferType<typeof projectsQuery>[number]
export type ProjectsFromSettingsQueryData = InferType<
  typeof projectsFromSettingsQuery
>
export type ProjectsQueryData = InferType<typeof Projects>
export type ProjectBySlugQueryData = InferType<typeof projectBySlugQuery>
