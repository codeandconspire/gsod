<script>
  import { CogIcon, DocumentsIcon, DocumentIcon, HomeIcon } from '@sanity/icons'
  import { StudioLayout, StudioProvider, defineConfig } from 'sanity'
  import { visionTool } from '@sanity/vision'
  import ReactDOM from 'react-dom/client'
  import { deskTool } from 'sanity/desk'
  import { onMount } from 'svelte'
  import React from 'react'

  import settings from './settings.jsx'
  import chapter from './chapter.jsx'
  import cover from './cover.jsx'
  import page from './page.jsx'

  const config = defineConfig({
    name: 'default',
    title: 'IDEA',
    projectId: '2e5hi812',
    dataset: 'production',
    plugins: [
      deskTool({
        structure(S) {
          return S.list()
            .title('Website')
            .items([
              // Our singleton type has a list item with a custom child
              S.listItem().title('Settings').icon(CogIcon).id('settings').child(
                // Instead of rendering a list of documents, we render a single
                // document, specifying the `documentId` manually to ensure
                // that we're editing the single instance of the document
                S.document().schemaType('settings').documentId('settings')
              ),
              S.divider(),
              S.listItem()
                .title('Cover Page')
                .icon(HomeIcon)
                .id('cover')
                .child(
                  S.document()
                    .schemaType('cover')
                    .documentId('4248bf6e-9400-4aff-a87d-2842ca25a305')
                ),
              S.documentTypeListItem('chapter')
                .title('Chapters')
                .icon(DocumentsIcon),
              S.divider(),
              // Misc document types
              S.documentTypeListItem('page').title('Pages').icon(DocumentIcon)
            ])
        }
      }),
      visionTool()
    ],
    schema: {
      types: [settings, cover, chapter, page]
    }
  })

  let node

  onMount(function () {
    const root = ReactDOM.createRoot(node)
    root.render(
      // @ts-ignore
      React.createElement(
        StudioProvider,
        // @ts-ignore
        { basePath: '/studio', config },
        React.createElement(StudioLayout)
      )
    )
  })
</script>

<div class="app" bind:this={node} />

<style>
  @import url('modern-normalize');

  .app {
    height: 100vh;
    width: 100vw;
  }
</style>
