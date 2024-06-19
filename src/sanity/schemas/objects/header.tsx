import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'array',
      // @ts-ignore
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {
              title: 'Normal',
              value: 'normal',
            },
          ],
          lists: [],
          marks: {
            decorators: [{ title: 'Underline', value: 'underline' }],
            annotations: [],
          },
        }),
      ],
    }),
    defineField({
      name: 'lead',
      title: 'Einleitung',
      type: 'text',
      // @ts-ignore
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'imageWithAlt',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'meta',
      title: 'Metadata',
      type: 'meta',
    }),
  ],
})
