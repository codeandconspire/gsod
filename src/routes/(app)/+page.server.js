import { SANITY_API_TOKEN } from '$env/static/private'
import { error } from '@sveltejs/kit'

import { createClient } from '$lib/sanity.js'

export async function load({ request }) {
  const url = new URL(request.url)
  const client = createClient({
    preview: url.searchParams.has('preview'),
    token: SANITY_API_TOKEN
  })
  const cover = await client.fetch(
    `*[_type == "cover" && slug.current == $slug][0]{
      ...,
      featuredChapter{
        ...,
        link->{
          _type,
          slug
        },
        image{
          ...,
          image{
            asset->
          }
        }
      },
      chapters[]->{
        _type,
        slug,
        title,
        category,
        shortname,
        primaryColor,
        secondaryColor,
        darkColor,
        featuredImage
      },
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
    }`,
    { slug: '2022' }
  )
  if (!cover) throw error(404, 'Cover not found')
  return { cover }
}
