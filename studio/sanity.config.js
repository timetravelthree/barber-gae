import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { siteSettings } from './schemaTypes/siteSettings'

export default defineConfig({
    name: 'dagae',
    title: 'Da Gae - Barbiere',
    projectId: 'ufce17om', // replace after creating project at sanity.io/manage
    dataset: 'production',
    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Contenuto')
                    .items([
                        S.listItem()
                            .title('Contenuto Sito')
                            .id('siteSettings')
                            .child(
                                S.document()
                                    .schemaType('siteSettings')
                                    .documentId('siteSettings')
                            ),
                    ]),
        }),
    ],
    schema: {
        types: [siteSettings],
        templates: (templates) =>
            templates.filter(({ schemaType }) => schemaType !== 'siteSettings'),
    },
    document: {
        actions: (input, context) =>
            context.schemaType === 'siteSettings'
                ? input.filter(({ action }) => ['publish', 'discardChanges', 'restore'].includes(action))
                : input,
    },
})
