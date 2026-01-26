import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'doc',
  title: 'Dokument',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
      rows: 3,
      description: 'Kurze Beschreibung oder Zusammenfassung des Dokuments.',
    }),
    defineField({
      name: 'file',
      title: 'PDF-Dokument',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      description: 'Das eigentliche PDF-Dokument.',
    }),
    defineField({
      name: 'previewImage',
      title: 'Vorschaubild',
      type: 'image',
      description:
        'Wird als Vorschaubild angezeigt. Tipp: Screenshot der ersten PDF-Seite hochladen.',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) =>
        Rule.custom((value: any, context: any) => {
          if (context.document.file && !value) {
            return 'Ein Vorschaubild wird für die Kachel-Darstellung empfohlen.'
          }
          return true
        }),
    }),
    defineField({
      name: 'externalLink',
      title: 'Externer Link',
      type: 'url',
      description:
        'Optionaler Link zur Originalquelle oder weiterführenden Infos.',
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      description: 'Optional: Vorschaubild oder Logo zum Dokument.',
      options: {
        hotspot: true,
      },
    }),
  ],
})
