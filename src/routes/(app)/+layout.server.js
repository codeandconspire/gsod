import { SANITY_API_TOKEN } from '$env/static/private'
import { error } from '@sveltejs/kit'

import { createClient } from '$lib/sanity.js'

export function load({ request }) {
  try {
    const client = createClient({ request, token: SANITY_API_TOKEN })
    const settings = client.fetch(`*[_type == "settings"][0]`)
    return { settings }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw error(500, message)
  }
}
