import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {
              title: 'Normal',
              value: 'normal',
              component: (props) => <h1>{props.children}</h1>,
            },
          ],
          lists: [],
          marks: {
            decorators: [{ title: 'Underline', value: 'underline' }],
            annotations: [],
          },
        },
      ],
    }),
    defineField({
      name: 'lead',
      title: 'Einleitung',
      type: 'text',
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
