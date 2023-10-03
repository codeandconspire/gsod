<script context="module">
  import { setContext, getContext } from 'svelte'
  import { writable, get } from 'svelte/store'

  export const FIGURES = Symbol('figures')

  export function anchor(key) {
    return `figure-${key}`
  }

  export function reset() {
    setContext(FIGURES, writable([]))
  }

  export function all() {
    return get(getContext(FIGURES))
  }
</script>

<script>
  import Html from '$lib/Html.svelte'

  export let fill = false

  /** @type {string?} */
  export let id

  let index
  const figures = getContext(FIGURES)
  if (id) {
    $figures = [...$figures, id]
    index = $figures.length
  }
</script>

<figure class="figure" class:fill {id}>
  <div class="main">
    <div class:u-container={fill}>
      <slot />
    </div>
  </div>
  {#if $$slots.description}
    <figcaption class:u-container={fill}>
      <div class="caption">
        <Html size="small">
          <div
            class="description"
            data-prefix={index ? `Figure ${index}: ` : ''}>
            <slot name="description" />
          </div>
        </Html>
      </div>
    </figcaption>
  {/if}
</figure>

<style>
  .figure {
    display: flex;
    flex-direction: column;
    gap: 1.25rem 2rem;
    text-align: center;
  }

  .main {
    background: #f8f8f8;
    padding: var(--page-gutter);
  }

  .figure:not(.fill) .main {
    border-radius: 0.5rem;
    padding: 1.5rem;
  }

  @media (width > 70rem) {
    .figure:not(.fill) {
      flex-direction: row;
      flex-wrap: nowrap;
      text-align: right;
    }

    .figure:not(.fill) .main {
      max-width: var(--text-width);
    }

    .figure:not(.fill) .caption {
      position: sticky;
      top: var(--sticky-top-margin);
    }
  }

  .figure :global(img) {
    width: 100%;
  }

  .caption {
    margin: 0 auto;
    max-width: 35rem;
    text-wrap: balance;
  }

  .description:empty {
    display: none;
  }

  .description::before {
    content: attr(data-prefix);
  }
</style>
