export const mapTags = (
  tags: (string | undefined)[] | null
): string[] | undefined =>
  tags?.filter((tag): tag is string => typeof tag === 'string') ?? undefined
