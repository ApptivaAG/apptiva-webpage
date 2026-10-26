import type { InferResultType } from 'groqd'
import {
  Projects,
  projectBySlugQuery,
  projectsQuery,
} from '@/sanity/lib/queries'

export type ProjectQueryData = InferResultType<typeof projectsQuery>[number]

export type ProjectsQueryData = InferResultType<typeof Projects>
export type ProjectBySlugQueryData = InferResultType<typeof projectBySlugQuery>
