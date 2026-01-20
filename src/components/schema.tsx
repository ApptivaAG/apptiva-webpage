'use client'

import { JsonLd } from 'react-schemaorg'
import type { WithContext } from 'schema-dts'

export function Schema({ data }: { data: WithContext<any> }) {
  return <JsonLd item={data} />
}
