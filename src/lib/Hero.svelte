<script>
  export let back = null
  export let fill = false
  export let primaryColor = null
  export let secondaryColor = null

  let bottom

  $: textColor = primaryColor
    ? luma(primaryColor) > 165
      ? '#000'
      : '#fff'
    : null

  function luma(str) {
    var hex = str.replace(/^#/, '')
    var rgb = parseInt(hex, 16)
    var r = (rgb >> 16) & 0xff
    var g = (rgb >> 8) & 0xff
    var b = (rgb >> 0) & 0xff

    // per ITU-R BT.709
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
</script>

<header
  class="hero"
  class:fill
  class:has-menu={$$slots.menu}
  style:--text-color={textColor}
  style:--primary-color={primaryColor}
  style:--secondary-color={secondaryColor}>
  {#if fill}
    <div class="skip">
      <a
        href="#hero-bottom"
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
    <div class="menu">
      <slot name="menu" />
    </div>
  {/if}
  <div class="body">
    {#if back}<a href={back} class="back">Back</a>{/if}
    <h1 class="heading"><slot name="heading" /></h1>
    {#if $$slots.subheading}
      <p class="subheading">
        <slot name="subheading" />
      </p>
    {/if}
  </div>
</header>
<div id="hero-bottom" class="bottom" bind:this={bottom} />

<style>
  .hero {
    --text-color: #fff;
    --primary-color: #62a3bf;
    --secondary-color: #326593;

    display: grid;
    grid-template-rows: 1fr auto;
    padding: min(5vh, 2rem) var(--page-gutter);
    line-height: var(--sans-serif-line-height);
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

  .body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
  }

  .heading {
    font-size: clamp(3rem, 8vw, 7rem);
    text-align: center;
    font-weight: var(--sans-serif-light);
  }

  .heading :global(strong) {
    font-weight: var(--sans-serif-heavy);
  }

  .subheading {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
  }

  .skip {
    grid-row: 3;
    display: flex;
    justify-content: center;
  }

  .chevron {
    width: min(10vw, 3.5rem);
    height: auto;
  }
</style>
