import Link from 'next/link'
import { ServiceQueryData } from './types'

export default function ServiceList(props: { services: ServiceQueryData[] }) {
  return (
    <ul>
      {props.services.map((servicePage) =>
        servicePage.header?.title ? (
          <li key={servicePage.slug}>
            <Link href={'angebot/' + servicePage.slug}>
              {servicePage.header?.title
                .flatMap((block: { children: { text: string }[] }) =>
                  block.children.map((child) => child.text)
                )
                .join('')}
            </Link>
          </li>
        ) : (
          <></>
        )
      )}
    </ul>
  )
}
