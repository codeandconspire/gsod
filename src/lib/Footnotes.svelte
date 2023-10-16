<script context="module">
  import { setContext, getContext } from 'svelte'
  import { get, writable } from 'svelte/store'

  const FOOTNOTES = Symbol('footnotes')

  export function reset() {
    setContext(FOOTNOTES, writable(new Set()))
  }

  export function add(footnote) {
    const footnotes = getContext(FOOTNOTES)
    footnotes.set(new Set([...get(footnotes), footnote]))
  }
</script>

<script>
  import Text, { asText } from '$lib/Text.svelte'
  import Html from '$lib/Html.svelte'

  const footnotes = getContext(FOOTNOTES)

  $: byName = Array.from($footnotes).sort((a, b) => {
    const aName = asText(a.content)?.replace(/^The /, '') || ''
    const bName = asText(b.content)?.replace(/^The /, '') || ''
    return aName < bName ? -1 : aName > bName ? 1 : 0
  })
</script>

<ul>
  {#each byName as item}
    <li id="footnote-{item._key}" class="note">
      <Html>
        <Text content={item.content} />
      </Html>
    </li>
  {/each}
</ul>

<style>
  .note {
    text-align: left;
    font-family: var(--serif);
  }
</style>
