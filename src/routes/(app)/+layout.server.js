import { SANITY_API_TOKEN } from '$env/static/private'
import { error } from '@sveltejs/kit'

import { createClient } from '$lib/sanity.js'

export async function load({ request }) {
  const url = new URL(request.url)
  try {
    const client = createClient({
      preview: url.searchParams.has('preview'),
      token: SANITY_API_TOKEN
    })
    const settings =
      await client.fetch(`*[_type == "settings" && _id == "settings"][0]{
        ...,
        featuredImage{
          asset->
        },
        menu[]{
          children[]{
            label,
            url,
            link->{
              _type,
              slug
            },
            file{
              asset->
            }
          }
        }
      }`)

    const meta = {
      title: settings.title,
      description: settings.description,
      image: settings.featuredImage
    }

    return { settings, meta }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw error(500, message)
  }
}
