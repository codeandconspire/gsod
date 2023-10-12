<script>
  export let disabled = false

  /** @type {string?} */
  export let href = null

  $: ({ class: _class, ...attrs } = $$restProps)
</script>

{#if href}
  <a {href} on:click class={`button ${_class || ''}`} {...attrs}>
    <slot />
    <svg viewBox="0 -960 960 960" class="chevron">
      <path
        fill="currentcolor"
        d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </svg>
  </a>
{:else}
  <button on:click class={`button ${_class || ''}`} {disabled} {...attrs}>
    <slot />
    <svg viewBox="0 -960 960 960" class="chevron">
      <path
        fill="currentcolor"
        d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </svg>
  </button>
{/if}

<style>
  .button {
    display: inline-flex;
    align-items: center;
    padding: 0.8rem 1.1rem 0.8rem 1.5rem;
    font-family: var(--sans-serif);
    font-weight: var(--sans-serif-bold);
    border-radius: var(--border-radius);
    color: #fff;
    background-color: var(--theme-primary-color);
    transition: background-color 190ms cubic-bezier(0.33, 1, 0.68, 1),
      opacity 100ms ease-out;
    font-size: var(--framework-font-size);
  }

  .button:active {
    opacity: 0.7;
    transition: none;
  }

  .button:hover {
    background-color: var(--theme-dark-color);
  }

  .chevron {
    display: block;
    width: 1.35em;
    margin: 0 -0.2em 0 0;
    height: auto;
    transition: transform 190ms cubic-bezier(0.33, 1, 0.68, 1);
  }

  .button:hover .chevron {
    transform: translateX(0.15rem);
  }
</style>
