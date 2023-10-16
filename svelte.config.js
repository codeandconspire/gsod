import adapter from '@sveltejs/adapter-cloudflare'
import preprocess from 'svelte-preprocess'

const tagsRegex1 = /(>)[\s]*([<{])/g
const tagsRegex2 = /({[/:][a-z]+})[\s]*([<{])/g
const tagsRegex3 = /({[#:][a-z]+ .+?})[\s]*([<{])/g
const tagsRegex4 = /([>}])[\s]+(<|{[/#:][a-z][^}]*})/g
const tagsReplace = '$1$2'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter()
  },
  preprocess: preprocess({
    replace: [
      // Remove whitespace between tags
      // https://github.com/sveltejs/svelte/issues/189#issuecomment-1376746165
      [tagsRegex1, tagsReplace],
      [tagsRegex2, tagsReplace],
      [tagsRegex3, tagsReplace],
      [tagsRegex4, tagsReplace]
    ]
  })
}

export default config
