import { jobsPageQuery } from '@/sanity/lib/queries'
import { InferType } from 'groqd'

export type JobsPageQueryData = InferType<typeof jobsPageQuery>
