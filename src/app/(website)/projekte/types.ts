import { InferType } from 'groqd'
import {
  Projects,
  projectBySlugQuery,
  projectsQuery,
} from '@/sanity/lib/queries'

export type ProjectQueryData = InferType<typeof projectsQuery>[number]

export type ProjectsQueryData = InferType<typeof Projects>
export type ProjectBySlugQueryData = InferType<typeof projectBySlugQuery>
