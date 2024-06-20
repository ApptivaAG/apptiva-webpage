import portableTextToString from '@/domain/portable-text-to-string'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  initialValue: () => ({
    publishedAt: new Date().toISOString(),
  }),
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Publiziert am',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (document: any) => portableTextToString(document.header.title),
        maxLength: 96,
      },
    }),
    defineField({
      name: 'breadcrumb',
      title: 'Breadcrumb',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'array',
      // @ts-ignore
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
        {
          type: 'imageWithAlt',
        },
        {
          type: 'code',
          title: 'Code',
          options: {
            languageAlternatives: [
              //Add this list to have nix as a possible language
              { title: 'Bash', value: 'sh' },
              { title: 'Typescript', value: 'typescript' },
              { title: 'React Typescript', value: 'tsx' },
              { title: 'JSON', value: 'json' },
              { title: 'CSS', value: 'css' },
              { title: 'Html', value: 'html' },
              { title: 'Yaml', value: 'yaml' },
              { title: 'Java', value: 'java' },
              { title: 'SQL', value: 'sql' },
              { title: 'Xml', value: 'xml' },
              { title: 'Rust', value: 'rust' },
              { title: 'NIX', value: 'nix', mode: 'json' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Autor:in',
      type: 'reference',
      // @ts-ignore
      to: { type: 'person' },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      // @ts-ignore
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'header.title',
    },
    prepare(selection) {
      return {
        title: portableTextToString(selection.title),
      }
    },
  },
})
