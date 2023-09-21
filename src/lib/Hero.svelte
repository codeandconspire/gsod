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
  style:--text-color={textColor}
  style:--primary-color={primaryColor}
  style:--secondary-color={secondaryColor}>
  {#if fill}
    <a
      href="#hero-bottom"
      class="skip"
      on:click|preventDefault={() =>
        bottom.scrollIntoView({ block: 'start', behavior: 'smooth' })}>
      <span class="label">Skip to content</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="27"
        fill="none"
        class="chevron">
        <path
          stroke="#fff"
          stroke-linecap="round"
          stroke-width="3"
          d="M62 2 32 25 2 2" />
      </svg>
    </a>
  {/if}
  {#if $$slots.menu}
    <div class="menu">
      <slot name="menu" />
    </div>
  {/if}
  {#if back}<a href={back} class="back">Back</a>{/if}
  <h1 class="heading"><slot name="heading" /></h1>
  {#if $$slots.subheading}
    <p class="subheading">
      <slot name="subheading" />
    </p>
  {/if}
  <div id="hero-bottom" class="bottom" bind:this={bottom} />
</header>

<style>
  .hero {
    --text-color: #fff;
    --primary-color: #62a3bf;
    --secondary-color: #326593;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: var(--sans-serif);
    color: var(--text-color);
    background-color: var(--primary-color);
  }

  .hero.fill {
    height: 100svh;
    width: 100svw;
  }

  .menu {
    position: absolute;
    inset: 0 0 auto;
  }

  .heading {
    font-size: 7rem;
    text-align: center;
    line-height: 1;
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
    position: absolute;
    bottom: min(5vh, 2rem);
    left: 50%;
    transform: translate(-50%);
  }

  .label {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
</style>
