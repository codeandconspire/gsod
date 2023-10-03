import { createClient as createSanityClient } from '@sanity/client'
import { setContext, getContext } from 'svelte'
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

const RESOLVER = Symbol('resolver')
const BYPASS = Symbol('bypass')

export function resolver(fn) {
  setContext(RESOLVER, fn)
}

export function resolve(doc) {
  const resolver = getContext(RESOLVER)
  const bypass = getContext(BYPASS)
  if (resolver && !bypass) {
    try {
      setContext(BYPASS, true)
      const resolved = resolver(doc)
      if (resolved) return resolved
    } finally {
      setContext(BYPASS, false)
    }
  }

  switch (doc?._type) {
    case 'cover':
    case 'settings':
      return '/'
    case 'chapter': {
      if (!doc.slug?.current) return null
      return `/chapters/${doc.slug.current}`
    }
    case 'page': {
      if (!doc.slug?.current) return null
      return `/${doc.slug.current}`
    }
    default:
      return null
  }
}
