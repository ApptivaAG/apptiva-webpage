import Link from 'next/link'
import portableTextToString from '@/utils/portable-text-to-string'
import { ServiceQueryData } from './types'

export default function ServiceList(props: { services: ServiceQueryData[] }) {
  return (
    <ul>
      {props.services.map((servicePage) =>
        servicePage.header?.title ? (
          <li key={servicePage.slug}>
            <Link
              href={
                'angebot/' +
                (servicePage.subPageOf?.slug
                  ? `${servicePage.subPageOf?.slug}/`
                  : '') +
                servicePage.slug
              }
            >
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
