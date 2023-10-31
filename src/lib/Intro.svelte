<script>
  import { getOffset } from './Text.svelte'
  import Level from '$lib/Level.svelte'

  export let image = null

  export let simple = false
  export let back = null

  $: heading = `h${1 + getOffset()}`
</script>

<header class="intro" class:simple class:has-menu={$$slots.menu}>
  {#if !simple}
    {#if image}
      <div class="graphic">
        <img alt="" {...image} class="image" />
      </div>
    {:else}
      <div class="graphic">
        <Level />
      </div>
    {/if}
  {/if}
  {#if $$slots.menu}
    <slot name="menu" />
  {/if}
  <div class="body">
    <div class="content">
      {#if back}
        <div>
          <a href={back} class="back">
            <svg class="chevron" fill="currentcolor" viewBox="0 -960 960 960">
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
            </svg>
            Back to home
          </a>
        </div>
      {/if}
      <svelte:element this={heading} class="heading">
        <slot name="heading" />
      </svelte:element>
      {#if $$slots.subheading}
        <p class="subheading">
          <slot name="subheading" />
        </p>
      {/if}
      {#if $$slots.extra}
        <div class="subheading">
          <slot name="extra" />
        </div>
      {/if}
      <div class="author">
        {#if $$slots.portrait}
          <slot name="portrait" />
        {/if}
        {#if $$slots.author}
          <div class="name">
            <slot name="author" />
          </div>
        {/if}
      </div>
    </div>
  </div>
</header>

<style>
  .intro {
    display: grid;
    position: relative;
    grid-template-rows: 1fr auto;
    padding: clamp(1rem, var(--page-gutter), 2.25rem) var(--page-gutter);
    line-height: 1.25;
    font-family: var(--sans-serif);
    color: var(--theme-text-color);
    background-color: var(--theme-primary-color);
  }

  .simple {
    background: transparent;
    color: var(--color-text);
    padding-bottom: 0;
    margin-bottom: var(--space-small);
  }

  @media (width > 70rem) {
    .simple {
      margin-bottom: calc((clamp(3rem, 10vh, 7rem) * -1) + var(--space-small));
    }
  }

  .intro.has-menu {
    grid-template-rows: auto 1fr auto;
  }

  .intro.fill {
    height: 100svh;
    width: 100svw;
  }

  .graphic {
    display: grid;
    position: absolute;
    inset: 0;
    background-color: var(--theme-primary-color);
    transform: var(--tilt-background-transform);
    transition: var(--tilt-transform-transition);
  }

  .image {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .body {
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
    max-width: var(--page-width);
    padding: clamp(3rem, 17vh, 6rem) 0;
    margin: 0 auto;
  }

  .intro.simple .body {
    padding-bottom: 0;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.25em;
    width: 100%;
    margin-top: -0.5rem;
  }

  @media (width > 70rem) {
    .content {
      max-width: var(--text-width);
      margin-left: auto;
      margin-right: auto;
    }
  }

  .back {
    font-weight: bold;
    font-size: var(--framework-font-size);
    display: inline-flex;
    align-items: flex-end;
    padding: 0.5rem;
    margin: -0.5rem;
    margin-left: -0.85rem;
    transition: opacity 100ms ease-out;
    user-select: none;
  }

  .back:active {
    opacity: 0.6;
    transition: none;
  }

  .chevron {
    width: 1.35em;
    margin: 0 -0.1em 0 -0.2em;
    height: auto;
    will-change: transform;
    transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .back:hover .chevron {
    transform: translateX(-0.15em);
  }

  .heading {
    line-height: 1;
    max-width: var(--text-width);
    text-align: left;
    font-weight: var(--sans-serif-heavy);
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    letter-spacing: -0.005em;
    margin: 0 0 -0.02em;
    text-wrap: balance;
  }

  .heading :global(strong) {
    font-weight: var(--sans-serif-heavy);
  }

  .simple .heading {
    color: var(--theme-primary-color);
  }

  @media (width > 40rem) {
    .heading {
      max-width: calc(var(--text-width) + 4rem);
    }
  }

  @media (width > 70rem) {
    .heading {
      width: 105%;
    }
  }

  .subheading {
    max-width: var(--text-width);
    text-align: left;
    font-weight: var(--sans-serif-normal);
    line-height: 1.3;
    font-size: clamp(1.5rem, 3vw, 1.75rem);
    text-wrap: balance;
  }

  .subheading:global(:has(> *:empty)) {
    display: none;
  }

  @media (width > 40rem) {
    .subheading {
      line-height: 1.2;
    }
  }

  .author {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: var(--framework-font-size);
  }

  .author :global(img) {
    border-radius: 50%;
    width: clamp(3rem, 5vw, 4rem);
  }

  .author .name {
    display: block;
    position: relative;
    top: -0.1rem;
    max-width: 18em;
    text-wrap: balance;
  }
</style>
