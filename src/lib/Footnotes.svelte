<script context="module">
  import { setContext, getContext } from 'svelte'

  export const FOOTNOTES = Symbol('footnotes')

  export function anchor(key) {
    return `footnote-${key}`
  }

  export function reset() {
    setContext(FOOTNOTES, [])
  }

  export function all() {
    return getContext(FOOTNOTES) || []
  }
</script>

<script>
  import { page } from '$app/stores'

  import Text, { asText } from '$lib/Text.svelte'
  import Theme from '$lib/Theme.svelte'
  import Html from '$lib/Html.svelte'

  /** @type {string?}*/
  export let share = null
  export let selected = false
  export let items = all()

  const onshare = (event) => {
    const url = /** @type {string} */ (share)
    if ('share' in navigator) {
      navigator.share({ url, text: asText(items[0].content) })
      event.preventDefault()
    } else if ('clipboard' in navigator) {
      const type = 'text/plain'
      const blob = new Blob([url], { type })
      const data = [new ClipboardItem({ [type]: blob })]
      // @ts-ignore
      navigator.clipboard.write(data)
      event.preventDefault()
    }
  }
</script>

{#each items as item}
  {@const index = all().indexOf(item)}
  {@const id = anchor(item._key)}
  <div {id} class="note" class:selected>
    <div class="content">
      {#if index !== -1}
        <sup>[{index + 1}]</sup>
      {/if}
      <Theme primary="#000" secondary="#000">
        <Html size="small">
          <Text content={item.content} />
        </Html>
      </Theme>
      <div class="actions">
        <a
          href={share || $page.url.href.replace(/(#.+)|$/, `#${id}`)}
          class="action"
          title="Share"
          on:click|preventDefault={onshare}>
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
  </div>
{/each}

<style>
  .note {
    text-align: left;
  }

  .note:is(:target, .selected) {
    list-style: none;
    padding: clamp(1.2rem, 5vw, 1.6rem);
    position: fixed;
    inset: auto 0 0;
    z-index: 1;
    color: var(--theme-text-color, var(--text-color));
    background: var(--theme-primary-color, var(--background-color));
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.025),
      0 -0.8rem 1.4rem rgba(0, 0, 0, 0.035);
    animation: slide-in 400ms forwards cubic-bezier(0.25, 1, 0.5, 1);
  }

  @keyframes slide-in {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .content {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
  }

  .note:is(:target, .selected) .content {
    width: min(calc(100vw - var(--page-gutter) * 2), var(--page-width));
    margin: 0 auto;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .note:not(:is(:target, .selected)) .actions {
    display: none;
  }

  .action {
    width: 1rem;
    height: 1rem;
  }
</style>
