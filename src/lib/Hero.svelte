<script>
  import Level from '$lib/Level.svelte'
  import { luma } from '$lib/utils.js'

  export let image = null

  /** @type {('small'|'fill')?} */
  export let size = null

  /** @type {string?} */
  export let back = null

  /** @type {string?} */
  export let primaryColor = null

  /** @type {string?} */
  export let secondaryColor = null

  let bottom

  $: textColor = primaryColor
    ? luma(primaryColor) > 165
      ? '#000'
      : '#fff'
    : null
</script>

<header
  class="hero"
  class:fill={size === 'fill'}
  class:small={size === 'small'}
  class:has-menu={$$slots.menu}
  style:--text-color={textColor}
  style:--primary-color={primaryColor}
  style:--secondary-color={secondaryColor}>
  {#if image}
    <div class="graphic">
      <img alt="" {...image} class="image" />
    </div>
  {:else if primaryColor}
    <div
      class="graphic"
      style:--primary-color={primaryColor}
      style:--secondary-color={secondaryColor}>
      <Level />
    </div>
  {/if}
  {#if size === 'fill'}
    <div class="skip">
      <a
        href="#hero-bottom"
        tabindex="-1"
        aria-hidden="true"
        on:click|preventDefault={() =>
          bottom.scrollIntoView({ block: 'start', behavior: 'smooth' })}>
        <span class="u-hidden">Skip to content</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 27"
          fill="none"
          class="chevron">
          <path
            stroke="#fff"
            stroke-linecap="round"
            stroke-width="3"
            d="M62 2 32 25 2 2" />
        </svg>
      </a>
    </div>
  {/if}
  {#if $$slots.menu}
    <slot name="menu" />
  {/if}
  <div class="body">
    <div class="content">
      {#if back}
        <div>
          <a href={back} class="back">
            <svg class="chevron" fill="currentColor" viewBox="0 -960 960 960">
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
            </svg>
            Back
          </a>
        </div>
      {/if}
      <h1 class="heading"><slot name="heading" /></h1>
      {#if $$slots.subheading}
        <p class="subheading">
          <slot name="subheading" />
        </p>
      {/if}
    </div>
  </div>
</header>
<div id="hero-bottom" class="bottom" bind:this={bottom} />

<style>
  .hero {
    --text-color: #fff;
    --primary-color: #62a3bf;
    --secondary-color: #326593;

    display: grid;
    position: relative;
    grid-template-rows: 1fr auto;
    padding: clamp(1rem, var(--page-gutter), 2.25rem) var(--page-gutter);
    line-height: 1.25;
    font-family: var(--sans-serif);
    color: var(--text-color);
    background-color: var(--primary-color);
  }

  .hero.has-menu {
    grid-template-rows: auto 1fr auto;
  }

  .hero.fill {
    height: 100svh;
    width: 100svw;
  }

  .graphic {
    display: grid;
    position: absolute;
    inset: 0;
    background-color: var(--primary-color);
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
  }

  .hero.small .body {
    max-width: var(--page-max-width);
    padding: clamp(3rem, 17vh, 6rem) 0;
    margin: 0 auto;
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
    .hero.small .content {
      max-width: var(--text-max-width);
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
    font-size: clamp(3rem, 8vw, 7rem);
    text-align: center;
    line-height: 1.05;
    font-weight: var(--sans-serif-light);
    text-wrap: balance;
    margin-left: -0.02em;
  }

  .heading :global(strong) {
    font-weight: var(--sans-serif-heavy);
  }

  .hero.small .heading {
    max-width: var(--text-max-width);
    text-align: left;
    font-weight: var(--sans-serif-heavy);
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    letter-spacing: -0.005em;
  }

  .subheading {
    font-size: 1.5rem;
    font-weight: var(--sans-serif-bold);
    text-align: center;
    text-wrap: balance;
  }

  .hero.small .subheading {
    max-width: var(--text-max-width);
    text-align: left;
    font-weight: var(--sans-serif-normal);
    font-size: clamp(1.25rem, 3vw, 1.75rem);
  }

  .skip {
    grid-row: 3;
    display: flex;
    justify-content: center;
  }
</style>
