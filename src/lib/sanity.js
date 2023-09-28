import { createClient as createSanityClient } from '@sanity/client'
import { dev } from '$app/environment'

export function createClient({ preview, token }) {
  return createSanityClient({
    token,
    apiVersion: '2023-09-19',
    projectId: '2e5hi812',
    dataset: 'production',
    perspective: preview || dev ? 'previewDrafts' : 'published',
    useCdn: !preview && !dev
  })
}

export function resolve(doc) {
  switch (doc?._type) {
    case 'cover':
    case 'settings':
      return '/'
    case 'chapter':
      return `/chapters/${doc.slug.current}`
    case 'page':
      return `/${doc.slug.current}`
    default:
      return null
  }
}
