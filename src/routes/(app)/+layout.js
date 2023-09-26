import { client } from '$lib/sanity.js'
import { error } from '@sveltejs/kit'

export function load() {
  try {
    const settings = client.fetch(`*[_type == "settings"][0]`)
    return { settings }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw error(500, message)
  }
}
