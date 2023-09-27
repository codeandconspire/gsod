import { SANITY_API_TOKEN } from '$env/static/private'
import { error } from '@sveltejs/kit'

import { createClient } from '$lib/sanity.js'

export async function load({ params, request }) {
  const client = createClient({ request, token: SANITY_API_TOKEN })
  const chapter = await client.fetch(
    `*[_type == "chapter" && slug.current == $slug][0]{
      ...,
      modules[]{
        ...,
        _type == "teaser" => {
          image{
            ...,
            asset->{
              url
            }
          },
          link{
            ...,
            document->{
              _type,
              slug,
              primaryColor,
              secondaryColor
            }
          }
        }
      },
      "cover": *[_type == "cover" && references(^._id)][0]{
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
    { slug: params.chapter }
  )
  if (!chapter) throw error(404, 'Chapter not found')
  return { chapter }
}
