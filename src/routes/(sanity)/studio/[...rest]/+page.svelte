<script>
  import {
    DocumentsIcon,
    DocumentIcon,
    HomeIcon,
    CaseIcon,
    CogIcon
  } from '@sanity/icons'
  import { StudioProvider, StudioLayout, defineConfig } from 'sanity'
  import { Iframe } from 'sanity-plugin-iframe-pane'
  import { visionTool } from '@sanity/vision'
  import ReactDOM from 'react-dom/client'
  import { deskTool } from 'sanity/desk'
  import { onMount } from 'svelte'
  import React from 'react'

  import { resolve } from '$lib/sanity.js'

  const types = import.meta.glob('./types/*.jsx')

  const resolveURL = (doc) => {
    const pathname = resolve(doc)
    if (!pathname) throw new Error('Could not resolve preview url')
    const url = new URL(pathname, window.location.href)
    url.searchParams.set('preview', doc._rev)
    return url.href
  }

  let node

  onMount(async function () {
    const root = ReactDOM.createRoot(node)

    const config = defineConfig({
      name: 'default',
      title: 'IDEA',
      projectId: '2e5hi812',
      dataset: 'production',
      plugins: [
        deskTool({
          defaultDocumentNode(S) {
            return S.document().views([
              S.view.form(),
              S.view
                .component(Iframe)
                .options({
                  url: resolveURL,
                  reload: {
                    button: true,
                    revision: true
                  }
                })
                .title('Preview')
            ])
          },
          structure(S) {
            return S.list()
              .title('Website')
              .items([
                // Our singleton type has a list item with a custom child
                S.listItem()
                  .title('Settings')
                  .icon(CogIcon)
                  .id('settings')
                  .child(
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
                      .views([
                        S.view.form(),
                        S.view
                          .component(Iframe)
                          .options({
                            url: resolveURL,
                            reload: {
                              button: true,
                              revision: true
                            }
                          })
                          .title('Preview')
                      ])
                  ),
                S.documentTypeListItem('chapter')
                  .title('Chapters')
                  .icon(DocumentsIcon),
                S.divider(),
                S.documentTypeListItem('caseStudy')
                  .title('Case Studies')
                  .icon(CaseIcon),
                S.documentTypeListItem('page').title('Pages').icon(DocumentIcon)
              ])
          }
        }),
        visionTool()
      ],
      schema: {
        types: await Promise.all(
          Object.values(types).map(async (importer) => {
            const { default: type } = await importer()
            return type
          })
        )
      }
    })

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
