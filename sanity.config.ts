/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { groqdPlaygroundTool } from 'groqd-playground'
import { FaCog } from 'react-icons/fa'
import { defineConfig } from 'sanity'
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
              .title('Einstellungen')
              .child(
                S.editor()
                  .schemaType('settings')
                  .documentId('settings')
                  .title('Einstellungen')
              )
              .icon(FaCog),

            // List out the rest of the document types, but filter out the singleton types
            ...S.documentTypeListItems().filter(
              (listItem) => !['settings'].includes(String(listItem.getId()))
            ),
          ]),
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    groqdPlaygroundTool(),
  ],
})
