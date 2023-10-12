<script>
  import { getOffset } from './Text.svelte'
  import Level from '$lib/Level.svelte'
  import Text from '$lib/Text.svelte'
  import { intersection } from '$lib/intersection.js'

  let inview = 1

  function onintersect(index) {
    return () => {
      console.log('hej')
      inview = index
    }
  }

  export let slides = []

  $: heading = `h${1 + getOffset()}`
</script>

<header class="hero" class:has-menu={$$slots.menu}>
  <div class="graphic">
    <Level />
  </div>
  {#if $$slots.menu}
    <div class="menu">
      <slot name="menu" />
    </div>
  {/if}
  <div class="slides">
    <div class="slide primary" class:inview={inview === 1}>
      <div class="body">
        <div class="content">
          <svelte:element
            this={heading}
            class="heading"
            use:intersection={onintersect(1)}>
            <slot name="heading" />
          </svelte:element>
          {#if $$slots.subheading}
            <p class="subheading">
              <slot name="subheading" />
            </p>
          {/if}
        </div>
      </div>
    </div>
    {#each slides as slide, index}
      <div class="slide" class:inview={inview === index}>
        <div class="body">
          <div class="content">
            <div class="subheading bump" use:intersection={onintersect(index)}>
              {slide.title}
            </div>
            <div class="subheading">
              <Text content={slide.description} />
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</header>

<style>
  .hero {
    display: grid;
    position: relative;
    width: 100svw;
    grid-template-rows: 1fr auto;
    line-height: 1.25;
    font-family: var(--sans-serif);
    color: var(--theme-text-color);
    background-color: var(--theme-primary-color);
    user-select: none;
    min-height: 35rem;
  }

  .menu {
    position: sticky;
    top: clamp(1rem, var(--page-gutter), 2.25rem);
    padding: 0 var(--page-gutter);
    margin-bottom: clamp(1rem, var(--page-gutter), 2.25rem);
    margin-top: -100svh;
  }

  .hero.has-menu {
    grid-template-rows: auto 1fr auto;
  }

  .graphic {
    --tilt-alternative-color: #fff;
    --tilt-alternative-opacity: 0.15;

    display: grid;
    position: sticky;
    top: 0;

    height: 100svh;
    background-color: var(--theme-primary-color);
    transform: var(--tilt-background-transform);
    transition: var(--tilt-transform-transition);
  }

  .slide {
    position: relative;
    height: 70svh;
    padding: clamp(1rem, var(--page-gutter), 2.25rem) var(--page-gutter);
  }

  .slide.primary {
    height: 100svh;
  }

  .slide:last-child {
    margin-bottom: 20svh;
  }

  .primary {
    margin-top: -100svh;
  }

  .body {
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.25em;
    width: 100%;
    margin-top: -0.5rem;
  }

  .chevron {
    width: 1.35em;
    margin: 0 -0.1em 0 -0.2em;
    height: auto;
    will-change: transform;
    transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .heading {
    font-size: clamp(3.9rem, 16.5vw, 7rem);
    text-align: center;
    line-height: 1;
    font-weight: var(--sans-serif-light);
    letter-spacing: -0.01em;
    max-width: 8em;
    margin: -0.5em auto 0;
  }

  .heading :global(strong) {
    font-weight: var(--sans-serif-heavy);
  }

  .subheading {
    margin: 0 auto;
    font-weight: var(--sans-serif-normal);
    line-height: 1.3;
    font-size: clamp(1.5rem, 3vw, 1.75rem);
    text-wrap: balance;
    text-align: center;
    max-width: 25em;
  }

  @media (width > 40rem) {
    .subheading {
      line-height: 1.2;
    }
  }

  .subheading.bump {
    line-height: 1;
    font-weight: var(--sans-serif-heavy);
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    letter-spacing: -0.005em;
    margin: 0 auto -0.02em;
    max-width: 15em;
  }
</style>
