import { glossaryQuery } from '@/sanity/lib/queries';
import Link from 'next/link';
import { InferType } from 'groqd';

export function GlossaryList(props: { data?: InferType<typeof glossaryQuery>; }) {

  if (!props.data) {
    return <>Empty</>;
  }
  return (
    <ul>
      {props.data.map((glossaryEntry) => (
        <li key={glossaryEntry.slug}>
          <Link href={`/glossar/${glossaryEntry.slug}`}>
            {glossaryEntry.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
