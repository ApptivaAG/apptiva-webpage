import { projectBySlugQuery, projectsQuery } from '@/sanity/lib/queries'
import { InferType } from 'groqd'

export type ProjectQueryData = InferType<typeof projectsQuery>[number]
export type ProjectBySlugQueryData = InferType<typeof projectBySlugQuery>
