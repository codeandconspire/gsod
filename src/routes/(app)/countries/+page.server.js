import { SANITY_API_TOKEN } from '$env/static/private'
import { error } from '@sveltejs/kit'

import { createClient } from '$lib/sanity.js'

export const prerender = true

export async function load({ request }) {
  const url = new URL(request.url)
  const client = createClient({
    preview: url.searchParams.has('preview'),
    token: SANITY_API_TOKEN
  })

  const countries = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      ...,
      "cover": *[_type == "cover" && slug.current == "2022"][0]{
        _type,
        slug,
        menu[]{
          label,
          link->{
            _type,
            slug
          },
          children[]{
            label,
            link->{
              _type,
              slug
            }
          }
        }
      }
    }`,
    { slug: 'countries' }
  )
  if (!countries) throw error(404, 'Country page not found')
  return { countries }
}
