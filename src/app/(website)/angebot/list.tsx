import portableTextToString from '@/domain/portable-text-to-string'
import Link from 'next/link'
import { ServiceQueryData } from './types'

export default function ServiceList(props: { services: ServiceQueryData[] }) {
  return (
    <ul>
      {props.services.map((servicePage) =>
        servicePage.header?.title ? (
          <li key={servicePage.slug}>
            <Link href={'angebot/' + servicePage.slug}>
              {portableTextToString(servicePage.header.title)}
            </Link>
          </li>
        ) : (
          <></>
        )
      )}
    </ul>
  )
}
