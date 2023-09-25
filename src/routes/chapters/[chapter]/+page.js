import { error } from '@sveltejs/kit'

import { client } from '$lib/sanity.js'

export async function load({ params }) {
  const chapter = await client.fetch(
    `*[_type == "chapter" && slug.current == $slug][0]{
      ...,
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
