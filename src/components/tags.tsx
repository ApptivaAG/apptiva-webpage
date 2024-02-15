// ./nextjs-app/app/_components/Posts.tsx

import { Tags } from "@/app/(website)/page";
import type { SanityDocument } from "@sanity/client";

export default function Tags({ tags: tags = [] }: { tags: Tags }) {
  const title = tags.length === 1 ? `1 Tag` : `${tags.length} Tags`;

  return (
    <main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
      <h1 className="text-2xl p-4 font-bold">{title}</h1>
      {tags.map((tag) => (
          <h2 key={tag._id}>{tag.name}</h2>
      ))}
    </main>
  );
}
