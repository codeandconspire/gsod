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

  export function find(id) {
    const figures = get(getContext(FIGURES))
    const item = figures.find((item) => item.id === id)
    if (!item) return null
    let index = 0
    for (const _item of figures) {
      if (_item.id === id) return { ...item, index }
      if (_item.label === item.label) index++
    }
    return null
  }
</script>

<script>
  import Html from '$lib/Html.svelte'

  export let fill = false
  export let label = 'Figure'

  /** @type {string?} */
  export let id

  const figures = getContext(FIGURES)
  const shortcode = getContext('SHORTCODE')

  let index
  if (id) {
    $figures = [...$figures, { id, label }]
    index = find(id).index
  }
</script>

<figure class="figure" class:fill id={anchor(id)}>
  <div class="main">
    <div class:contain={fill}>
      <slot />
    </div>
  </div>
  {#if $$slots.description || $$slots.source}
    <figcaption class:contain={fill}>
      <div class="caption">
        <Html size="small">
          <div
            class="description"
            data-prefix={index != null
              ? `${label} ${shortcode ? `${shortcode}.` : ''}${index + 1}: `
              : ''}>
            <slot name="description" />
          </div>
          <div class="source">
            <slot name="source" />
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

  .contain {
    max-width: var(--page-width);
    margin: 0 auto;
  }

  .main {
    background: #f8f8f8;
    padding: var(--page-gutter);
    user-select: none;
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
      flex: 0 0 auto;
    }

    .figure:not(.fill) .caption {
      position: sticky;
      top: var(--sticky-top-margin);
    }
  }

  .figure :global(img) {
    display: block;
    width: 100%;
  }

  .caption {
    margin: 0 auto;
    max-width: 35rem;
    text-wrap: balance;
  }

  .description:empty,
  .source:empty {
    display: none;
  }

  .description::before {
    content: attr(data-prefix);
  }

  .source {
    margin-top: 0.75em;
    opacity: 0.5;
  }

  .source::before {
    content: 'Source: ';
  }
</style>
