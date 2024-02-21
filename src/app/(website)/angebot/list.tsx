import Link from "next/link";
import { ServiceQueryData } from "./types";

export default function ServiceList(props: {services: ServiceQueryData[]}) {

  return (
    <ul>
    {props.services.map((servicePage) => (
      <li key={servicePage.slug}>
        <Link href={'angebot/' + servicePage.slug}>
          {servicePage.header?.title}
        </Link>
      </li>
    ))}
  </ul>
)
}
