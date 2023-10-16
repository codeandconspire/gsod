// Removes whitespace between tags
// https://github.com/sveltejs/svelte/issues/189#issuecomment-1376746165
/** @type {[RegExp|string, string][]} */
export const replacers = [
  [/(>)[\s]*([<{])/g, '$1$2'],
  [/({[/:][a-z]+})[\s]*([<{])/g, '$1$2'],
  [/({[#:][a-z]+ .+?})[\s]*([<{])/g, '$1$2'],
  [/([>}])[\s]+(<|{[/#:][a-z][^}]*})/g, '$1$2']
]

export async function handle({ event, resolve }) {
  const render = async () => {
    const response = await resolve(event, {
      transformPageChunk({ html }) {
        return replacers.reduce(
          (html, [pattern, replacement]) => html.replace(pattern, replacement),
          html
        )
      }
    })

    response.headers.set('cache-control', `s-maxage=${60 * 60}, max-age=0`)

    return response
  }

  if (!event.platform) return render()

  try {
    const { env, context, caches } = event.platform
    const url = new URL(event.request.url)

    // Try and fetch static asset
    const asset = await env.ASSETS.fetch(event.request).catch(
      Function.prototype
    )

    if (asset?.status === 200) {
      // Duplicate the asset so that we can mutate it
      const response = new Response(asset.body, asset)

      if (url.pathname.startsWith('/assets/')) {
        // Cache hashed assets for 1 year
        response.headers.set(
          'cache-control',
          `public, max-age=${60 * 60 * 24 * 365}`
        )
      }

      return response
    }

    // Return any found asset as is
    if (asset?.status < 400) return asset

    /** @type {Cache} */
    // @ts-ignore
    const cache = await caches.default
    let cached = await cache.match(url)

    if (cached) {
      context.waitUntil(
        render().then(
          // Update cache in background – like stale-while-revalidate
          // see: https://community.cloudflare.com/t/when-will-cloudflare-fully-support-stale-while-revalidate-with-asynchronous-background-revalidation/287764
          (res) => cache.put(url, res),
          console.error
        )
      )
      return cached
    }

    return await render().then(function (res) {
      // Cache response in background
      context.waitUntil(cache.put(url, res.clone()))
      return res
    })
  } catch {
    return render()
  }
}
