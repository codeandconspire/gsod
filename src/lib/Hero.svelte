<script>
  import { quadIn } from 'svelte/easing'

  import { intersection } from '$lib/intersection.js'
  import { getOffset } from '$lib/Text.svelte'
  import Level from '$lib/Level.svelte'
  import Text from '$lib/Text.svelte'

  export let slides = []
  export let scrolljack = true

  $: heading = `h${1 + getOffset()}`

  const threshold = Array(100)
    .fill(0)
    .map((_, i) => i * 0.01)
    .concat(1)

  const progress = new Map()
  function reel(node) {
    const onintersect = (value) => {
      value = quadIn(value)
      progress.set(node, value)
      node.style.setProperty('--ratio', Math.ceil(value * 100) / 100)
    }
    return intersection(node, { onintersect, threshold })
  }

  let timeout
  function align() {
    clearTimeout(timeout)
    if (!scrolljack) return
    timeout = setTimeout(function () {
      let candidate
      for (const [node, value] of progress) {
        if (value > 0.1 && (!candidate || value > progress.get(candidate))) {
          candidate = node
        }
      }
      if (candidate) {
        candidate.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 200)
  }
</script>

<svelte:window on:scroll={align} on:resize={align} />

<header class="hero" class:has-menu={$$slots.menu}>
  <div class="graphic">
    <Level inview loop />
  </div>
  {#if $$slots.menu}
    <div class="menu">
      <slot name="menu" />
    </div>
  {/if}
  <div class="slides">
    <div class="slide primary" use:reel>
      <div class="body">
        <div class="content">
          <svelte:element this={heading} class="heading">
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
    {#each slides as slide}
      <div class="slide" use:reel>
        <div class="body">
          <div class="content">
            <div class="subheading bump">
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
    margin-top: -100vh;
    z-index: 1;
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

    height: 100vh;
    background-color: var(--theme-primary-color);
    transform: var(--tilt-background-transform);
    transition: var(--tilt-transform-transition);
  }

  .slide {
    position: relative;
    height: 70vh;
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
    perspective: 1000px;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.25em;
    width: 100%;
    margin-top: -0.5rem;
  }

  @media (min-width: 50rem) {
    .content {
      opacity: var(--ratio, 1);
      will-change: transform, opacity;
      transform: translateY(calc(20% * (1 - var(--ratio, 1))));
    }
  }

  .heading {
    font-size: clamp(3.9rem, 16.5vw, 7rem);
    text-align: center;
    line-height: 0.95;
    font-weight: var(--sans-serif-light);
    letter-spacing: -0.01em;
    max-width: 8em;
    margin: -0.5em auto 0;
  }

  .heading :global(strong) {
    font-weight: var(--sans-serif-heavy);
  }

  .subheading {
    font-weight: var(--sans-serif-normal);
    line-height: 1.25;
    font-size: clamp(1.5rem, 3vw, 1.75rem);
    text-wrap: balance;
    text-align: left;
    max-width: 25em;
  }

  .primary .subheading {
    margin: 0 auto;
    text-align: center;
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
    margin: 0 0 -0.02em;
    max-width: 15em;
  }
</style>
