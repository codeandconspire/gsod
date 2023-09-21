import { error } from '@sveltejs/kit'

import { client } from '$lib/sanity.js'

export async function load() {
  const cover = await client.fetch(
    `*[_type == "cover" && slug.current == $slug][0]{
      ..., chapters[]->{ slug, shortname, title }
    }`,
    { slug: 'the-new-checks-and-balances' }
  )
  if (!cover) throw error(404, 'Cover not found')
  return { cover }
}
