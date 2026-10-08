import { Code } from 'bright'
import { cacheLife } from 'next/cache'

export default async function CachedCode(props: {
  lang?: string
  children: React.ReactNode
}) {
  'use cache'
  cacheLife('max')
  return <Code {...props} />
}
