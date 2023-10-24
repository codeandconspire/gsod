import { SANITY_API_TOKEN } from '$env/static/private'
import { error } from '@sveltejs/kit'

import { createClient } from '$lib/sanity.js'
import { asText } from '$lib/Text.svelte'

export const prerender = true

export async function load({ request, parent }) {
  const url = new URL(request.url)
  const client = createClient({
    preview: url.searchParams.has('preview'),
    token: SANITY_API_TOKEN
  })

  const [{ meta }, countries] = await Promise.all([
    parent(),
    client.fetch(
      `*[_type == "page" && slug.current == $slug][0]{
      ...,
      image{
        ...,
        asset->
      },
      featuredImage{
        ...,
        asset->
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
      { slug: 'countries' }
    )
  ])

  if (!countries) throw error(404, 'Country page not found')
  return {
    countries,
    meta: {
      ...meta,
      title: `${countries.title.replace(/\s+/g, ' ')} – ${meta.title}`,
      description: asText(countries.description) || meta.description,
      image: countries.featuredImage || countries.image || meta.image
    }
  }
}
