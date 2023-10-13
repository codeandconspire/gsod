<script context="module">
  import { setContext, getContext } from 'svelte'
  import { get, writable } from 'svelte/store'

  const FOOTNOTES = Symbol('footnotes')

  export const selected = writable(null)

  export function select(footnote) {
    selected.set(footnote)
  }

  export function reset() {
    setContext(FOOTNOTES, writable(new Set()))
  }

  export function add(footnote) {
    const footnotes = getContext(FOOTNOTES)
    footnotes.set(new Set([...get(footnotes), footnote]))
  }
</script>

<script>
  import { page } from '$app/stores'

  import Text, { asText } from '$lib/Text.svelte'
  import Html from '$lib/Html.svelte'

  export let selection = false

  const footnotes = getContext(FOOTNOTES)

  $: _selected = $selected
  $: byName = selection
    ? []
    : Array.from($footnotes).sort((a, b) => {
        const aName = asText(a.content)?.replace(/^The /, '') || ''
        const bName = asText(b.content)?.replace(/^The /, '') || ''
        return aName < bName ? -1 : aName > bName ? 1 : 0
      })

  const onshare = (text) => (event) => {
    const { href } = event.currentTarget
    if ('share' in navigator) {
      navigator.share({ url: href, text })
    } else if ('clipboard' in navigator) {
      const type = 'text/plain'
      const blob = new Blob([href], { type })
      const data = [new ClipboardItem({ [type]: blob })]
      // @ts-ignore
      navigator.clipboard.write(data)
    }
  }
</script>

{#if selection}
  {#if _selected}
    <div class="note selected">
      <div class="content">
        <Html>
          <Text content={_selected.content} />
        </Html>
        <div class="actions">
          <a
            title="Share"
            class="action"
            on:click|preventDefault={onshare(asText(_selected.content))}
            href={$page.url.href.replace(
              /(#.+)|$/,
              `#anchor-${_selected._key}`
            )}>
            <svg viewBox="0 -960 960 960" class="icon">
              <path
                d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
            </svg>
          </a>
          <button
            class="action"
            title="Close"
            on:click|preventDefault={() => {
              select(null)
            }}>
            <svg viewBox="0 -960 960 960" class="icon">
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  {/if}
{:else}
  <ul>
    {#each byName as item}
      <li id="footnote-{item.key}" class="note">
        <div class="content">
          <Html>
            <Text content={item.content} />
          </Html>
          <div class="actions">
            <a
              title="Share"
              class="action"
              href={$page.url.href.replace(/(#.+)|$/, `#anchor-${item._key}`)}>
              <svg viewBox="0 -960 960 960" class="icon">
                <path
                  d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
              </svg>
            </a>
            <a href="#_" class="action" title="Close" on:click>
              <svg viewBox="0 -960 960 960" class="icon">
                <path
                  d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </a>
          </div>
        </div>
      </li>
    {/each}
  </ul>
{/if}

<style>
  .note {
    text-align: left;
    font-family: var(--serif);
  }

  .note:is(:target, .selected) {
    list-style: none;
    padding: 1rem 5rem 1rem var(--page-gutter);
    position: fixed;
    inset: auto 0 0;
    z-index: 1;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.025),
      0 -0.8rem 1.4rem rgba(0, 0, 0, 0.035);
    animation: slide-in 400ms forwards cubic-bezier(0.25, 1, 0.5, 1);
    background: #fff;
    box-shadow: 0 -0.3rem 1.5rem rgba(0, 0, 0, 0.1),
      0 0 0 0.5px rgba(0, 0, 0, 0.1);
    font-family: var(--sans-serif);
    letter-spacing: 0;
    font-size: var(--framework-font-size);
  }

  .note:is(:target, .selected) :global(p) {
    margin: 0;
  }

  @media (width > 45rem) {
    .note:is(:target, .selected) {
      width: calc(var(--text-width) - 2rem);
      max-width: 36rem;
      margin: 0 auto;
      padding: 1rem 4.5rem 1rem 1.5rem;
      bottom: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 0.3rem 1.5rem rgba(0, 0, 0, 0.1),
        0 0 0 0.5px rgba(0, 0, 0, 0.1);
    }
  }

  @keyframes slide-in {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
  }

  .note:not(:is(:target, .selected)) .actions {
    display: none;
  }

  .action {
    width: 1.2rem;
    height: 1.2rem;
  }
</style>
