/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { StreamLanguage } from '@codemirror/language'
import { codeInput } from '@sanity/code-input'
import { visionTool } from '@sanity/vision'
import { groqdPlaygroundTool } from 'groqd-playground'
import { FaAddressCard, FaHome } from 'react-icons/fa'
import { defineConfig } from 'sanity'
import { media } from 'sanity-plugin-media'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schema'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Startseite')
              .child(
                S.editor()
                  .schemaType('homepage')
                  .documentId('homepage')
                  .title('Startseite')
              )
              .icon(FaHome),
            S.listItem()
              .title('Über Apptiva Seite')
              .child(
                S.editor()
                  .schemaType('about-page')
                  .documentId('about-page')
                  .title('Über Apptiva Seite')
              )
              .icon(FaAddressCard),

            // List out the rest of the document types, but filter out the singleton types
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !['homepage', 'about-page'].includes(String(listItem.getId()))
            ),
          ]),
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    groqdPlaygroundTool(),
    media(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    codeInput({
      codeModes: [
        {
          name: 'rust',
          // dynamic import so the language is only be loaded on demand
          loader: () =>
            import('@codemirror/legacy-modes/mode/rust').then(({ rust }) =>
              StreamLanguage.define(rust)
            ),
        },
      ],
    }),
  ],
})
