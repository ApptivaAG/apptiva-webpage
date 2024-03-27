import portableTextToString from '@/utils/portable-text-to-string'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service-page',
  title: 'Service Pages',
  type: 'document',
  groups: [
    {
      name: 'teaser',
      title: 'Teaser',
    },
  ],
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
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
      name: 'teaserTitle',
      title: 'Teaser Titel',
      type: 'string',
      group: 'teaser',
    }),
    defineField({
      name: 'illustration',
      title: 'Illustration',
      type: 'imageWithAlt',
      group: 'teaser',
    }),
    defineField({
      name: 'teaser',
      title: 'Teaser',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      group: 'teaser',
    }),
    defineField({
      name: 'modules',
      title: 'Module',
      type: 'array',
      of: [{ type: 'module' }],
    }),
    defineField({
      name: 'callToAction',
      title: 'Call To Action',
      type: 'link',
    }),
  ],
  orderings: [
    {
      title: 'Title',
      name: 'title',
      by: [
        {
          field: 'header.title',
          direction: 'asc',
        },
      ],
    },
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
