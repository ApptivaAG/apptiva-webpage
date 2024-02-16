import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service-page',
  title: 'Service Pages',
  type: 'document',
  groups: [
    {
      name: 'home',
      title: 'Startseite',
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
        source: 'header.title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'showInHome',
      title: 'Auf Startseite anzeigen',
      type: 'boolean',
      initialValue: false,
      group: 'home',
    }),
    defineField({
      name: 'illustration',
      title: 'Illustration',
      type: 'imageWithAlt',
      group: 'home',
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
      group: 'home',
    }),
    defineField({
      name: 'modules',
      title: 'Module',
      type: 'array',
      of: [{ type: 'module' }],
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
      return { title: selection.title }
    },
  },
})
