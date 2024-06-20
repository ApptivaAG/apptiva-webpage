import portableTextToString from '@/utils/portable-text-to-string'
import { defineArrayMember, defineField, defineType } from 'sanity'

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
      name: 'breadcrumb',
      title: 'Breadcrumb',
      type: 'string',
    }),
    defineField({
      name: 'subPageOf',
      title: 'Unterseite von',
      type: 'reference',
      // @ts-ignore
      to: [defineArrayMember({ type: 'service-page' })],
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
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
      group: 'teaser',
    }),
    defineField({
      name: 'modules',
      title: 'Module',
      type: 'array',
      // @ts-ignore
      of: [defineArrayMember({ type: 'module' })],
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
          field: 'header.title[0].children[0].text',
          direction: 'asc',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'header.title',
      breadcrumb: 'breadcrumb',
    },
    prepare(selection) {
      return {
        title: selection.breadcrumb || portableTextToString(selection.title),
        subtitle: selection.breadcrumb
          ? portableTextToString(selection.title)
          : undefined,
      }
    },
  },
})
