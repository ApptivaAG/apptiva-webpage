import { zusammenarbeitPageQuery } from '@/sanity/lib/queries'
import { InferType } from 'groqd'

export type ZusammenarbeitPageQueryData = InferType<
  typeof zusammenarbeitPageQuery
>
