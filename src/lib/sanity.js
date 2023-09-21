import { createClient } from '@sanity/client'
import { dev } from '$app/environment'

export const client = createClient({
  apiVersion: '2023-09-19',
  projectId: '2e5hi812',
  dataset: 'production',
  perspective: 'raw',
  useCdn: !dev
})

export function resolve(doc) {
  switch (doc._type) {
    case 'cover':
    case 'settings':
      return '/'
    case 'chapter':
      return `/chapters/${doc.slug.current}`
    case 'page':
      return doc.slug.current
  }
}
