import {
  projectBySlugQuery,
  projectsFromSettingsQuery,
  projectsQuery,
} from '@/sanity/lib/queries'
import { InferType } from 'groqd'

export type ProjectQueryData = InferType<typeof projectsQuery>[number]
export type ProjectsFromSettingsQueryData = InferType<
  typeof projectsFromSettingsQuery
>
export type ProjectBySlugQueryData = InferType<typeof projectBySlugQuery>
