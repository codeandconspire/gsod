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
  return resolve(event, {
    transformPageChunk({ html }) {
      return replacers.reduce(
        (html, [pattern, replacement]) => html.replace(pattern, replacement),
        html
      )
    }
  })
}
