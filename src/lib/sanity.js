import { createClient as createSanityClient } from '@sanity/client'
import { dev } from '$app/environment'
import { get } from 'svelte/store'
import { page } from '$app/stores'

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
    case 'chapter': {
      if (!doc.slug?.current) return null
      return `/chapters/${doc.slug.current}`
    }
    case 'case': {
      const { chapter } = get(page).data
      return `${resolve(chapter)}/case/${doc.slug.current}`
    }
    case 'box': {
      const { chapter } = get(page).data
      return `${resolve(chapter)}/box/${doc.slug.current}`
    }
    case 'page': {
      if (!doc.slug?.current) return null
      return `/${doc.slug.current}`
    }
    default:
      return null
  }
}
