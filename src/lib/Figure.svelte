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
              ? `${label} ${shortcode ? `${shortcode}.` : ''}${index + 1} `
              : ''}>
            <slot name="description" />
          </div>
          <details class="source">
            <summary class="summary">
              <span>Source</span>
              <svg class="chevron" viewBox="0 -960 960 960">
                <path
                  fill="currentcolor"
                  d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </summary>
            <div class="body">
              <slot name="source" />
            </div>
          </details>
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
  }

  .contain {
    max-width: var(--page-width);
    margin: 0 auto;
  }

  .main {
    background: #f2f3f8;
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
    max-width: 40rem;
    text-wrap: balance;
  }

  .description:empty {
    display: none;
  }

  .description::before {
    content: attr(data-prefix);
    display: block;
    font-weight: bold;
  }

  /* Source */

  .source {
    --icon-line-width: 2px;

    margin-top: 0.5em;
  }

  .summary {
    display: flex;
    align-items: center;
    user-select: none;
    gap: 0.15rem;
    cursor: pointer;
    transition: opacity 100ms ease-out;
  }

  @media (width > 70rem) {
    .summary {
      justify-content: flex-end;
    }
  }

  .summary:active {
    opacity: 0.6;
    transition: none;
  }

  .summary::-webkit-details-marker {
    display: none;
  }

  .chevron {
    position: relative;
    top: 1px;
    width: 1.2em;
    height: auto;
    flex: 0 0 auto;
    transform-origin: center;
    transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .body {
    color: #707584;
  }
</style>
