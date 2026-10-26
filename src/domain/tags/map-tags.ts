export const mapTags = (
  tags: (string | undefined)[] | null | undefined
): string[] | undefined =>
  tags?.filter((tag): tag is string => typeof tag === 'string') ?? undefined
