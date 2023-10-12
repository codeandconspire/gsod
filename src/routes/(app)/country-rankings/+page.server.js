import { SANITY_API_TOKEN } from '$env/static/private'
import { error } from '@sveltejs/kit'

import { createClient } from '$lib/sanity.js'

export async function load({ request }) {
  const url = new URL(request.url)
  const client = createClient({
    preview: url.searchParams.has('preview'),
    token: SANITY_API_TOKEN
  })
  const ranking = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      ...,
      },
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
    { slug: 'country-rankings' }
  )
  if (!ranking) throw error(404, 'Chapter not found')
  return { ranking }
}
