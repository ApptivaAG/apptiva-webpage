import {
  createGroqBuilderWithZod,
  type GroqBuilder,
  type IGroqBuilder,
  type InferParserOutput,
  type Parser,
} from 'groqd'
import { type ZodType, z } from 'zod'
import type * as SanityTypes from '../sanity.types'

type SanityQueryConfig = {
  schemaTypes: SanityTypes.AllSanitySchemaTypes
  referenceSymbol: typeof SanityTypes.internalGroqTypeReferenceTo
}

const builder = createGroqBuilderWithZod<SanityQueryConfig>()

export function contentBlocks<
  TMarkDef extends ZodType = ReturnType<typeof defaultMarkDef>,
>(options?: { markDefs?: TMarkDef }) {
  const markDef = options?.markDefs ?? defaultMarkDef()

  return builder.array(
    builder.object({
      _type: builder.string(),
      _key: builder.string().optional(),
      children: builder.array(
        builder.object({
          _key: builder.string(),
          _type: builder.string(),
          text: builder.string(),
          marks: builder.array(builder.string()).optional().default([]),
        })
      ),
      markDefs: builder.array(markDef).optional(),
      style: builder.string().optional(),
      listItem: builder.string().optional(),
      level: builder.number().optional(),
    })
  )
}

export function sanityImageWithAlt(fieldName = 'image') {
  return q(fieldName)
    .project({
      _key: q
        .string()
        .nullish()
        .transform((key) => key ?? null),
      _type: q.string(),
      alt: q
        .string()
        .nullish()
        .transform((alt) => alt ?? 'Fehlende Bildbeschreibung'),
      asset: q('asset->').project({
        _id: q.string(),
        _type: q.string(),
        _rev: q.string(),
        extension: q.string(),
        mimeType: q.string(),
        originalFilename: q.string(),
        path: q.string(),
        sha1hash: q.string(),
        size: q.number(),
        url: q.string(),
        _updatedAt: q.string().nullable(),
        metadata: q('metadata').project({ lqip: q.string() }),
      }),
    })
    .nullable()
}

function defaultMarkDef() {
  return builder
    .object({
      _type: builder.string(),
      _key: builder.string(),
    })
    .catchall(z.unknown())
}

export type LegacySelectionValue =
  | LegacyBuilder<any>
  | IGroqBuilder<any, any>
  | ZodType
  | readonly [string, Parser]
export type LegacySelection = Record<string, LegacySelectionValue>
type LegacyOutput<Value> =
  Value extends LegacyBuilder<infer Result>
    ? Result
    : Value extends IGroqBuilder<infer Result, any>
      ? Result
      : Value extends readonly [string, infer ValueParser]
        ? InferParserOutput<ValueParser & Parser>
        : Value extends ZodType
          ? z.output<Value>
          : never
type LegacySelectionResult<Selection extends LegacySelection> = {
  [Key in keyof Selection]: LegacyOutput<Selection[Key]>
}

type ProjectedResult<
  Result,
  Selection extends LegacySelection,
> = Result extends readonly unknown[]
  ? LegacySelectionResult<Selection>[]
  : Result extends null
    ? null
    : LegacySelectionResult<Selection>

export type LegacyBuilder<Result = any> = Omit<
  GroqBuilder<Result, SanityQueryConfig>,
  | 'deref'
  | 'filter'
  | 'filterByType'
  | 'nullable'
  | 'order'
  | 'project'
  | 'slice'
> &
  IGroqBuilder<Result, SanityQueryConfig> & {
    deref(): LegacyBuilder<
      Result extends readonly unknown[] ? unknown[] : unknown
    >
    filter(
      ...expressions: string[]
    ): LegacyBuilder<Result extends readonly unknown[] ? Result : Result[]>
    filterByType(...types: string[]): LegacyBuilder<Result>
    project<Selection extends LegacySelection>(
      selection: Selection
    ): LegacyBuilder<ProjectedResult<Result, Selection>>
    nullable(): LegacyBuilder<Result | null>
    order(...orderings: string[]): LegacyBuilder<Result>
    slice(
      index: number
    ): LegacyBuilder<Result extends readonly (infer Item)[] ? Item : Result>
    slice(min: number, max: number): LegacyBuilder<Result>
  }

type LegacyQueryFactory = typeof builder & {
  (query: '*'): LegacyBuilder<SanityTypes.AllSanitySchemaTypes[]>
  (query: string): LegacyBuilder<unknown>
  contentBlocks: typeof contentBlocks
}

// Existing GROQ paths are mapped to Groqd 1.x builders; projections use its parser output types.
const query = (query: string) =>
  (query === '*'
    ? builder.star
    : builder.raw(query)) as unknown as LegacyBuilder

export const q = new Proxy(query, {
  get(_target, property) {
    if (property === 'contentBlocks') return contentBlocks

    const value = Reflect.get(builder, property, builder)
    return typeof value === 'function' ? value.bind(builder) : value
  },
}) as unknown as LegacyQueryFactory
